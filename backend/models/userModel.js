import pool from "../config/db.js";

// Insert a new user
export const createUser = async (first_name, last_name, email, password, username) => {
    const query = `
        INSERT INTO users (first_name, last_name, email, password, username, is_public)
        VALUES ($1, $2, $3, $4, $5, TRUE)
        RETURNING user_id, first_name, last_name, email, username, is_public;
    `;
    return pool.query(query, [first_name, last_name, email, password, username]);
};

// Fetch user by email
export const getUserByEmail = async (email) => {
    const query = `SELECT * FROM users WHERE email = $1;`;
    return pool.query(query, [email]);
};

/*
// Fetch user by ID
export const getUserById = async (user_id) => {
    const query = `SELECT * FROM users WHERE user_id = $1;`;
    return pool.query(query, [user_id]);
};

// Delete a user by ID
/*export const deleteUserById = async (user_id) => {
    const query = `DELETE FROM users WHERE user_id = $1;`;
    return pool.query(query, [user_id]);

};
*/

// Delete a user by email
export const deleteUserByEmail = async (email) => {
    console.log("Deleting user with email:", email); // Debug log
    const query = `DELETE FROM users WHERE email = $1 RETURNING *;`;
    return pool.query(query, [email]);
};
