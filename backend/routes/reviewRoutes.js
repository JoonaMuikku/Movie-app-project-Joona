//needs aunthentication
import express from 'express';
import { verifyToken } from "../middleware/authMiddleware.js";
import pkg from 'jsonwebtoken';
import { CreateReview, getReviewByMovieId , getReviewByUserId, DeleteReview , UpdateReview } from '../controllers/reviewController.js';

const { verify } = pkg;
const router = express.Router();

// Create a new review
router.post('/create', verifyToken , CreateReview);
// // Update a review
router.put('/:id', verifyToken , UpdateReview );
// // Delete a review
router.delete('/:id', verifyToken, DeleteReview);
// // Fetch all reviews for a movie
router.get('/movie/:movieId', getReviewByMovieId);
// // Fetch all reviews for a user
router.get('/user/:userId', getReviewByUserId);


export default router;

//UpdateReview, DeleteReview, getMovieReviews, getUserReviews