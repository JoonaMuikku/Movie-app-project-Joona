import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { ApiError } from "../helpers/errorClass.js";

dotenv.config();

// Create a JWT Token
export const createToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "12h" });
};

// Hash a Password
export const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
};

// Compare Passwords
export const comparePassword = async (plainPassword, hashedPassword) => {
    return await bcrypt.compare(plainPassword, hashedPassword);
};

// Verify the Token
export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return next(new ApiError("Authorization token is missing or invalid", 401));
    }

    const token = authHeader.split(" ")[1];

    // Check if token is blacklisted
    if (isTokenBlacklisted(token)) {
        // console.log("Blocked blacklisted token:", token);
        return next(new ApiError("Token has been invalidated", 401));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach decoded token payload (e.g., user info) to req.user
        next();
    } catch (err) {
        return next(new ApiError("Invalid or expired token", 401));
    }
};

// Temporary in-memory blacklist
const tokenBlacklist = new Set();

// Blacklist a Token
export const blacklistToken = (token) => {
    // console.log("Blacklisting token:", token);
    tokenBlacklist.add(token);
    setTimeout(() => {
        tokenBlacklist.delete(token);
        // console.log("Token removed from blacklist:", token);
    }, 43200000); // Automatically remove after 12 hours
};

// Check if a Token is Blacklisted
export const isTokenBlacklisted = (token) => tokenBlacklist.has(token);
