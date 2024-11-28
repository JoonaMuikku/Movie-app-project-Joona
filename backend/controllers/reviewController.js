import { createReview, getReviewById, getReviewofMovieId, getReviewsfromUserId, DeleteReviewbyId, UpdateReviewbyId } from "../models/reviewModel.js";
import { ApiError } from "../helpers/errorClass.js";
import  { verifyToken , comparePassword } from "../middleware/authMiddleware.js";

// Create a new review
//needs authirization
export const CreateReview = async (req, res, next) => {
    try {
        const { tmdb_id, review_text, rating} = req.body;
        const user_id = req.user.user_id; // Get user ID from the decoded token

        // Validate input
        if (!review_text || review_text.length === 0) {
            throw new ApiError('Review must have text and rating', 400);
        }

      // Create the review
      const review = await createReview(user_id, tmdb_id, review_text, rating);
      res.status(201).json({
        message: 'Review created successfully',
        review:
        {
            review_id: review.rows[0].review_id,
            user_id: review.rows[0].user_id,
            tmdb_id: review.rows[0].tmdb_id,
            review_text: review.rows[0].review_text,
            rating: review.rows[0].rating
        },
        token 
        });
      } catch (error) {
        next(error);
    }
}
//get review by movie id
export const getReviewByMovieId = async (req, res, next) => {
    try {
        const movie_id = req.params.movie_id;
        const reviews = await getReviewofMovieId(movie_id);
        res.json(reviews);
        } catch (error) {
            next(error);
                }
}
//get review by user id
export const getReviewByUserId = async (req, res, next) => {
    try {
        const user_id = req.params.user_id;
        const reviews = await getReviewsfromUserId(user_id);
        res.json(reviews);
        } catch (error) {
            next(error);
                }
}
//delete review
//needs authirization
export const DeleteReview = async (req, res, next) => {
    try{
        const review_id = req.params.review_id;
        const review = await DeleteReviewbyId(review_id);
        res.status(200).json({
            message: 'Review deleted successfully',
            review: review.rows[0]
        });
        } catch (error) {
            next(error);
            }
    }

   //updata review
   //needs authirization
   export const UpdateReview = async (req, res, next) => {
    try {
        const review_id = req.params.review_id;
        const { review_text, rating } = req.body;
        const review = await getReviewById(review_id);
        if (review) {
            const updatedReview = await UpdateReviewbyId(review_id, review_text, rating);
            res.status(200).json({
                message: 'Review updated successfully',
                review: updatedReview.rows[0]
                });
                } else
                {
                res.status(404).json({
                        message: 'Review not found'
                });
                }
                } catch (error) {
                    next(error);
                    }
                }