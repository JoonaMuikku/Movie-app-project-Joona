import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';
import {
  addReview,
  updateReview,
  deleteReview,
  getMovieReviews,
  getUserReviews,
} from '../controllers/reviewController.js';

const router = express.Router();

// Add a review
router.post('/add', verifyToken, addReview);

// Update a review
router.put('/:id', verifyToken, updateReview);

// Delete a review
router.delete('/:id', verifyToken, deleteReview);

// Get reviews for a specific movie
router.get('/:id', getMovieReviews);

// Get reviews by a specific user
router.get('/', verifyToken, getUserReviews);

export default router;