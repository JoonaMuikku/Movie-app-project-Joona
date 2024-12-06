import express from "express";
import { postSignup, postLogin, logoutUser,  deleteAccount, updateProfile } from "../controllers/userController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", postSignup);
router.post("/login", postLogin);
router.post("/logout", verifyToken, logoutUser);
router.delete("/delete", verifyToken, deleteAccount); 
router.patch("/update-profile", verifyToken, updateProfile);

export default router;