import pool from "../config/db.js";
import { ApiError } from "../helpers/errorClass.js";

// Create a new group
export const createGroup = async (req, res, next) => {
    try {
        const { group_name } = req.body;
        const owner_id = req.user.user_id;

        if (!group_name) {
            throw new ApiError("Group name is required", 400);
        }

        const createGroupQuery = `
            INSERT INTO groups (owner_id, group_name)
            VALUES ($1, $2)
            RETURNING *;
        `;
        const groupResult = await pool.query(createGroupQuery, [owner_id, group_name]);
        const group = groupResult.rows[0];

        // Add owner as a member
        const addMemberQuery = `
            INSERT INTO group_users (group_id, user_id)
            VALUES ($1, $2);
        `;
        await pool.query(addMemberQuery, [group.group_id, owner_id]);

        res.status(201).json({ message: "Group created successfully", group });
    } catch (error) {
        next(error);
    }
};

// Get all groups
export const getAllGroups = async (req, res, next) => {
    try {
        const query = `
            SELECT g.*, u.first_name, u.last_name, 
            (SELECT COUNT(*) FROM group_users WHERE group_id = g.group_id) as member_count
            FROM groups g
            JOIN users u ON g.owner_id = u.user_id
            ORDER BY g.created_at DESC;
        `;
        const result = await pool.query(query);
        res.status(200).json({ groups: result.rows });
    } catch (error) {
        next(error);
    }
};

// Get group details
export const getGroupDetails = async (req, res, next) => {
    try {
        const { id: group_id } = req.params;
        const user_id = req.user.user_id;

        // Get group details and members
        const query = `
            SELECT g.*, 
                u.first_name as owner_first_name, 
                u.last_name as owner_last_name,
                EXISTS(SELECT 1 FROM group_users WHERE group_id = $1 AND user_id = $2) as is_member,
                EXISTS(SELECT 1 FROM group_join_requests 
                    WHERE group_id = $1 AND user_id = $2 AND status = 'pending') as has_pending_request,
                (
                    SELECT json_agg(json_build_object(
                        'user_id', u2.user_id,
                        'first_name', u2.first_name,
                        'last_name', u2.last_name,
                        'joined_at', gu.joined_at
                    ))
                    FROM group_users gu
                    JOIN users u2 ON gu.user_id = u2.user_id
                    WHERE gu.group_id = g.group_id
                ) as members
            FROM groups g
            JOIN users u ON g.owner_id = u.user_id
            WHERE g.group_id = $1;
        `;
        const result = await pool.query(query, [group_id, user_id]);

        if (result.rowCount === 0) {
            throw new ApiError("Group not found", 404);
        }

        res.status(200).json({ group: result.rows[0] });
    } catch (error) {
        next(error);
    }
};

// Delete group
export const deleteGroup = async (req, res, next) => {
    try {
        const { id: group_id } = req.params;
        const user_id = req.user.user_id;

        // Check if user is the owner
        const ownerCheckQuery = `
            SELECT * FROM groups WHERE group_id = $1 AND owner_id = $2;
        `;
        const ownerCheck = await pool.query(ownerCheckQuery, [group_id, user_id]);

        if (ownerCheck.rowCount === 0) {
            throw new ApiError("Access denied: You are not the owner of this group", 403);
        }

        // Delete all related records in a transaction
        await pool.query('BEGIN');
        try {
            // Delete join requests first
            await pool.query(
                'DELETE FROM group_join_requests WHERE group_id = $1',
                [group_id]
            );

            // Delete group members
            await pool.query(
                'DELETE FROM group_users WHERE group_id = $1',
                [group_id]
            );

            // Finally delete the group
            await pool.query(
                'DELETE FROM groups WHERE group_id = $1',
                [group_id]
            );

            await pool.query('COMMIT');
            res.status(200).json({ message: "Group deleted successfully" });
        } catch (error) {
            await pool.query('ROLLBACK');
            throw error;
        }
    } catch (error) {
        next(error);
    }
};

// Request to join a group
export const requestJoinGroup = async (req, res, next) => {
    try {
        const { id: group_id } = req.params;
        const user_id = req.user.user_id;

        // Check if user is already a member
        const memberCheckQuery = `
            SELECT * FROM group_users WHERE group_id = $1 AND user_id = $2;
        `;
        const memberCheck = await pool.query(memberCheckQuery, [group_id, user_id]);

        if (memberCheck.rowCount > 0) {
            throw new ApiError("You are already a member of this group", 400);
        }

        // Delete any existing rejected requests
        const deleteRejectedQuery = `
            DELETE FROM group_join_requests 
            WHERE group_id = $1 AND user_id = $2 AND status = 'rejected';
        `;
        await pool.query(deleteRejectedQuery, [group_id, user_id]);

        // Check if there's a pending request
        const requestCheckQuery = `
            SELECT * FROM group_join_requests 
            WHERE group_id = $1 AND user_id = $2 AND status = 'pending';
        `;
        const requestCheck = await pool.query(requestCheckQuery, [group_id, user_id]);

        if (requestCheck.rowCount > 0) {
            throw new ApiError("You already have a pending request", 400);
        }

        // Create join request
        const createRequestQuery = `
            INSERT INTO group_join_requests (group_id, user_id)
            VALUES ($1, $2)
            RETURNING *;
        `;
        await pool.query(createRequestQuery, [group_id, user_id]);

        res.status(201).json({ message: "Join request sent successfully" });
    } catch (error) {
        next(error);
    }
};

// Handle join request (accept/reject)
export const handleJoinRequest = async (req, res, next) => {
    try {
        const { request_id } = req.params;
        const { action } = req.body; 
        const user_id = req.user.user_id;

        // Verify the user is the group owner
        const verifyOwnerQuery = `
            SELECT g.* FROM groups g
            JOIN group_join_requests r ON g.group_id = r.group_id
            WHERE r.request_id = $1 AND g.owner_id = $2;
        `;
        const ownerCheck = await pool.query(verifyOwnerQuery, [request_id, user_id]);

        if (ownerCheck.rowCount === 0) {
            throw new ApiError("Access denied: You are not the owner of this group", 403);
        }

        if (action === 'accept') {
            // Add user to group
            const acceptRequestQuery = `
                WITH request_data AS (
                    SELECT group_id, user_id FROM group_join_requests
                    WHERE request_id = $1
                )
                INSERT INTO group_users (group_id, user_id)
                SELECT group_id, user_id FROM request_data
                RETURNING *;
            `;
            await pool.query(acceptRequestQuery, [request_id]);
        }

        // Update request status
        const updateRequestQuery = `
            UPDATE group_join_requests
            SET status = $1
            WHERE request_id = $2;
        `;
        await pool.query(updateRequestQuery, [action === 'accept' ? 'accepted' : 'rejected', request_id]);

        res.status(200).json({ message: `Request ${action}ed successfully` });
    } catch (error) {
        next(error);
    }
};

// Remove member from group
export const removeMember = async (req, res, next) => {
    try {
        const { group_id, user_id: member_id } = req.params;
        const requester_id = req.user.user_id;

        // Check if requester is owner
        const ownerCheckQuery = `
            SELECT * FROM groups WHERE group_id = $1 AND owner_id = $2;
        `;
        const ownerCheck = await pool.query(ownerCheckQuery, [group_id, requester_id]);

        if (ownerCheck.rowCount === 0) {
            throw new ApiError("Access denied: You are not the owner of this group", 403);
        }

        // Remove member from group_users
        const removeMemberQuery = `
            DELETE FROM group_users
            WHERE group_id = $1 AND user_id = $2 AND user_id != $3
            RETURNING *;
        `;
        const result = await pool.query(removeMemberQuery, [group_id, member_id, ownerCheck.rows[0].owner_id]);

        if (result.rowCount === 0) {
            throw new ApiError("Member not found or cannot remove owner", 404);
        }

        // Clean up join requests
        const cleanupRequestsQuery = `
            DELETE FROM group_join_requests
            WHERE group_id = $1 AND user_id = $2;
        `;
        await pool.query(cleanupRequestsQuery, [group_id, member_id]);

        res.status(200).json({ message: "Member removed successfully" });
    } catch (error) {
        next(error);
    }
};

// Leave group
export const leaveGroup = async (req, res, next) => {
    try {
        const { id: group_id } = req.params;
        const user_id = req.user.user_id;

        // Check if user is not the owner
        const ownerCheckQuery = `
            SELECT * FROM groups WHERE group_id = $1 AND owner_id = $2;
        `;
        const ownerCheck = await pool.query(ownerCheckQuery, [group_id, user_id]);

        if (ownerCheck.rowCount > 0) {
            throw new ApiError("Group owner cannot leave the group", 400);
        }

        // Remove user from group
        const leaveGroupQuery = `
            DELETE FROM group_users
            WHERE group_id = $1 AND user_id = $2
            RETURNING *;
        `;
        const result = await pool.query(leaveGroupQuery, [group_id, user_id]);

        if (result.rowCount === 0) {
            throw new ApiError("You are not a member of this group", 404);
        }

        // Clean up join requests separately
        const cleanupRequestsQuery = `
            DELETE FROM group_join_requests
            WHERE group_id = $1 AND user_id = $2;
        `;
        await pool.query(cleanupRequestsQuery, [group_id, user_id]);

        res.status(200).json({ message: "Left group successfully" });
    } catch (error) {
        next(error);
    }
};

// Get pending join requests for a group
export const getPendingRequests = async (req, res, next) => {
    try {
        const { id: group_id } = req.params;
        const user_id = req.user.user_id;

        // Verify user is group owner
        const ownerCheckQuery = `
            SELECT * FROM groups WHERE group_id = $1 AND owner_id = $2;
        `;
        const ownerCheck = await pool.query(ownerCheckQuery, [group_id, user_id]);

        if (ownerCheck.rowCount === 0) {
            throw new ApiError("Access denied: You are not the owner of this group", 403);
        }

        // Get pending requests
        const requestsQuery = `
            SELECT r.request_id, r.created_at, u.user_id, u.first_name, u.last_name
            FROM group_join_requests r
            JOIN users u ON r.user_id = u.user_id
            WHERE r.group_id = $1 AND r.status = 'pending'
            ORDER BY r.created_at DESC;
        `;
        const requests = await pool.query(requestsQuery, [group_id]);

        res.status(200).json({ requests: requests.rows });
    } catch (error) {
        next(error);
    }
};

// Add movie to group
export const addMovieToGroup = async (req, res, next) => {
    try {
        const { group_id } = req.params;
        const { tmdb_id } = req.body;
        const user_id = req.user.user_id;

        // Check if user is a member of the group
        const memberCheckQuery = `
            SELECT 1 FROM group_users 
            WHERE group_id = $1 AND user_id = $2;
        `;
        const memberCheck = await pool.query(memberCheckQuery, [group_id, user_id]);

        if (memberCheck.rowCount === 0) {
            throw new ApiError("Only group members can add movies", 403);
        }

        // Add movie to group
        const addMovieQuery = `
            INSERT INTO group_movies (group_id, tmdb_id, added_by)
            VALUES ($1, $2, $3)
            RETURNING *;
        `;
        await pool.query(addMovieQuery, [group_id, tmdb_id, user_id]);

        res.status(201).json({ message: "Movie added to group successfully" });
    } catch (error) {
        next(error);
    }
};

// Get group movies with the group details
export const getGroupMovies = async (req, res, next) => {
    try {
        const { id: group_id } = req.params;
        
        const query = `
            SELECT gm.*, u.first_name, u.last_name
            FROM group_movies gm
            JOIN users u ON gm.added_by = u.user_id
            WHERE gm.group_id = $1
            ORDER BY gm.added_at DESC;
        `;
        const result = await pool.query(query, [group_id]);
        
        res.status(200).json({ movies: result.rows });
    } catch (error) {
        next(error);
    }
};

export const removeGroupMovie = async (req, res, next) => {
    try {
        const { group_id, movie_id } = req.params;
        const user_id = req.user.user_id;

        // Check if user is group owner or the one who added the movie
        const checkQuery = `
            SELECT 1 FROM groups g
            LEFT JOIN group_movies gm ON g.group_id = gm.group_id
            WHERE g.group_id = $1 
            AND (g.owner_id = $2 OR gm.added_by = $2)
            AND gm.group_movie_id = $3;
        `;
        const check = await pool.query(checkQuery, [group_id, user_id, movie_id]);

        if (check.rowCount === 0) {
            throw new ApiError("You don't have permission to remove this movie", 403);
        }

        // Remove the movie
        const removeQuery = `
            DELETE FROM group_movies 
            WHERE group_id = $1 AND group_movie_id = $2;
        `;
        await pool.query(removeQuery, [group_id, movie_id]);

        res.status(200).json({ message: "Movie removed successfully" });
    } catch (error) {
        next(error);
    }
};
