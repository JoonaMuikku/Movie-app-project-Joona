import express from "express";
import { addFavorite, removeFavorite, getFavorites } from "../controllers/favoritesController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", verifyToken, addFavorite);
router.delete("/remove", verifyToken, removeFavorite);
router.get("/", verifyToken, getFavorites);

export default router;
