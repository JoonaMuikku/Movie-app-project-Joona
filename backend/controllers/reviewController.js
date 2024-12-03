import pool from "../config/db.js";
import { ApiError } from "../helpers/errorClass.js";

// Add a review
export const addReview = async (req, res) => {
  const { tmdb_id, movie_title, review_text, rating } = req.body;

  // Validate inputs
  if (!tmdb_id || !movie_title || !review_text || typeof rating !== "number" || rating < 1 || rating > 5) {
    return res.status(400).json({ error: "Invalid input data" });
  }

  const user_id = req.user.user_id; // Ensure user is authenticated

  try {
    // Check if a review already exists
    const reviewQuery = `SELECT * FROM reviews WHERE user_id = $1 AND tmdb_id = $2;`;
    const reviewResult = await pool.query(reviewQuery, [user_id, tmdb_id]);

    if (reviewResult.rowCount > 0) {
      return res.status(400).json({
        message: "You have already reviewed this movie. Please update your review instead.",
      });
    }

    // Insert the review with `movie_title`
    const insertReviewQuery = `
      INSERT INTO reviews (user_id, tmdb_id, movie_title, review_text, rating)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const result = await pool.query(insertReviewQuery, [user_id, tmdb_id, movie_title, review_text, rating]);

    res.status(201).json({ review: result.rows[0] });
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).send("Failed to add review");
  }
};


// Update a review
export const updateReview = async (req, res, next) => {
  const { id: review_id } = req.params;
  const { review_text, rating } = req.body;
  const user_id = req.user.user_id;

  try {
    const query = `
            UPDATE reviews
            SET review_text = $1, rating = $2, updated_at = NOW()
            WHERE review_id = $3 AND user_id = $4
            RETURNING *;
        `;
    const result = await pool.query(query, [review_text, rating, review_id, user_id]);

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Review not found or you do not have permission to update this review.",
      });
    }

    res.status(200).json({ review: result.rows[0] });
  } catch (error) {
    next(error);
  }
};

// Delete a review
export const deleteReview = async (req, res, next) => {
  const { id: review_id } = req.params;
  const user_id = req.user.user_id;

  try {
    const query = `
            DELETE FROM reviews
            WHERE review_id = $1 AND user_id = $2
            RETURNING *;
        `;

    const result = await pool.query(query, [review_id, user_id]);

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Review not found or you do not have permission to delete this review.",
      });
    }

    res.status(200).json({ message: "Review deleted successfully." });
  } catch (error) {
    console.error("Error deleting review:", error.message);
    next(new ApiError("Failed to delete review", 500));
  }
};

// Fetch reviews for a specific movie
export const getMovieReviews = async (req, res, next) => {
  const { id: tmdb_id } = req.params;

  try {
    const query = `
          SELECT r.review_id, r.review_text, r.rating, r.created_at, u.first_name, u.last_name, u.email
          FROM reviews r
          INNER JOIN users u ON r.user_id = u.user_id
          WHERE r.tmdb_id = $1
          ORDER BY r.created_at DESC;
        `;

    const result = await pool.query(query, [tmdb_id]);

    // Always return reviews as an array
    res.status(200).json({ reviews: result.rows });
  } catch (error) {
    console.error("Error fetching reviews:", error.message);
    next(new ApiError("Failed to fetch reviews for this movie", 500));
  }
};

// Fetch all reviews by a user
export const getUserReviews = async (req, res) => {
  const user_id = req.user.user_id;

  try {
    const query = `
            SELECT r.review_id, r.tmdb_id, r.review_text, r.rating, r.created_at
            FROM reviews r
            WHERE r.user_id = $1
            ORDER BY r.created_at DESC;
        `;
    const result = await pool.query(query, [user_id]);
    res.status(200).json({ reviews: result.rows });
  } catch (error) {
    console.error("Error fetching user reviews:", error);
    res.status(500).send("Failed to fetch reviews");
  }
};

// Fetch all reviews with movie titles
export const getAllReviews = async (req, res, next) => {
  try {
    const { title } = req.query; // Retrieve search query from the request

    let query = `
      SELECT r.review_id,r.tmdb_id, r.review_text, r.rating, r.movie_title, r.created_at,
             u.first_name, u.last_name, u.email
      FROM reviews r
      INNER JOIN users u ON r.user_id = u.user_id
    `;

    const values = [];

    if (title) {
      query += ` WHERE LOWER(r.movie_title) LIKE LOWER($1) `;
      values.push(`%${title}%`);
    }

    query += ` ORDER BY r.created_at DESC;`;

    const result = await pool.query(query, values);

    res.status(200).json({ reviews: result.rows });
  } catch (error) {
    console.error("Error fetching all reviews:", error.message);
    next(new ApiError("Failed to fetch all reviews", 500));
  }
};


