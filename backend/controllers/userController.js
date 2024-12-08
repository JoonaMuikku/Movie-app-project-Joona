import { createUser, getUserByEmail, deleteUserByEmail } from "../models/userModel.js";
import { createToken, hashPassword, comparePassword, blacklistToken } from "../middleware/authMiddleware.js";
import { ApiError } from "../helpers/errorClass.js";
import pool from "../config/db.js";

// User registration
export const postSignup = async (req, res, next) => {
    try {
        const { first_name, last_name, email, password, username } = req.body;

        if (!first_name || !last_name || !email || !password) {
            throw new ApiError("All fields are required", 400);
        }

        if (!username) {
            // If username is not provided, auto-generate one based on the email or name.
            // For example:
            const generatedUsername = email.split("@")[0] + Math.floor(Math.random() * 1000);
            req.body.username = generatedUsername;
        }

        const hashedPassword = await hashPassword(password);
        const result = await createUser(first_name, last_name, email, hashedPassword, req.body.username);
        const user = result.rows[0];

        const token = createToken({ user_id: user.user_id, email: user.email, username: user.username }); // Generate token
      
        res.status(201).json({ message: "User registered successfully",  
            user: {
            user_id: user.user_id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            username: user.username,
            is_public: user.is_public,
        }, token });

    } catch (error) {
        if (error.code === "23505") {
            next(new ApiError("Email already exists", 409));
        } else {
            console.error("Error during user registration:", error);
            next(error);
        }
    }
};

// User login
export const postLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const userResult = await getUserByEmail(email);

        if (userResult.rowCount === 0) return next(new ApiError("Invalid credentials", 401));

        const user = userResult.rows[0];
        if (!(await comparePassword(password, user.password))) return next(new ApiError("Invalid credentials", 401));

        const token = createToken({ user_id: user.user_id, email: user.email, username: user.username });
        res.status(200).json({
            message: "Login successful",
            user: {
                user_id: user.user_id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                username: user.username,
                is_public: user.is_public,
            },
            token,
        });
    } catch (error) {
        next(error);
    }
};

// User logout
export const logoutUser = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return next(new ApiError("Authorization token is missing or invalid", 401));
    }

    const token = authHeader.split(" ")[1];

    // Blacklist the token
    blacklistToken(token);

    res.status(200).json({ message: "Logged out successfully" });
};

// Delete user account
export const deleteAccount = async (req, res, next) => {
    try {
        const email = req.user.email; // Fetch email from the decoded token

        const result = await deleteUserByEmail(email);
        if (result.rowCount > 0) {
            res.status(200).json({ message: `User with email ${email} has been deleted` });
        } else {
            throw new ApiError("No account found to delete", 404);
        }
    } catch (error) {
        next(error);
    }
};

// Update user
export const updateProfile = async (req, res, next) => {
    try {
        const { first_name, last_name, is_public } = req.body;
        const user_id = req.user.user_id;

        if (!first_name || !last_name) {
            return res.status(400).json({ message: "First name and last name are required." });
        }

        // Start building the query
        let query = "UPDATE users SET first_name = $1, last_name = $2";
        const params = [first_name, last_name];

        // If is_public is provided and is boolean, update it as well
        if (typeof is_public === "boolean") {
            query += ", is_public = $3 WHERE user_id = $4 RETURNING first_name, last_name, email, username, is_public";
            params.push(is_public, user_id);
        } else {
            query += " WHERE user_id = $3 RETURNING first_name, last_name, email, username, is_public";
            params.push(user_id);
        }

        const result = await pool.query(query, params);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: "User not found." });
        }

        res.status(200).json({
            message: "Profile updated successfully.",
            user: result.rows[0],
        });
    } catch (error) {
        console.error("Error updating profile:", error);
        next(error);
    }
};

