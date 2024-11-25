import { createUser, getUserByEmail, deleteUserByEmail } from "../models/userModel.js";
import { createToken, hashPassword, comparePassword } from "../middleware/authMiddleware.js";
import { ApiError } from "../helpers/errorClass.js";

// User registration
export const postSignup = async (req, res, next) => {
    try {
        const { first_name, last_name, email, password } = req.body;

        if (!first_name || !last_name || !email || !password) {
            throw new ApiError("All fields are required", 400);
        }

        const hashedPassword = await hashPassword(password);
        const result = await createUser(first_name, last_name, email, hashedPassword);
        const user = result.rows[0];

        res.status(201).json({ message: "User registered successfully", user });
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

        const token = createToken({ user_id: user.user_id, email: user.email });
        res.status(200).json({
            message: "Login successful",
            user: {
                user_id: user.user_id,
                first_name: user.first_name,
                last_name: user.last_name,
            },
            token,
        });
    } catch (error) {
        next(error);
    }
};

// Delete user account
export const deleteAccount = async (req, res, next) => {
    try {
        const { email } = req.body;

        if (!email) throw new ApiError("Email is required", 400);

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