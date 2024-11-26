import express from "express";
import { postSignup, postLogin, deleteAccount } from "../controllers/userController.js";

const router = express.Router();

router.post("/signup", postSignup);
router.post("/login", postLogin);
router.delete("/delete", deleteAccount);

export default router;
