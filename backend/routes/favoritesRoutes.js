import express from "express";
import { addFavorite, removeFavorite, getFavorites, getPublicFavorites } from "../controllers/favoritesController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", verifyToken, addFavorite);
router.delete("/remove", verifyToken, removeFavorite);
router.get("/", verifyToken, getFavorites);

// Public route for viewing favorites by username
router.get("/public/:username", getPublicFavorites);

export default router;
