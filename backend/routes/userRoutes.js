
import express from "express";
import { postSignup, postLogin, deleteAccount } from "../controllers/userController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", postSignup);
router.post("/login", postLogin);
router.delete("/delete", verifyToken, deleteAccount); 

export default router;