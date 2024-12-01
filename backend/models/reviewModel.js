import pool from "../config/db.js";


export const createReview = async (user_id, movie_id, rating, review) => {
    const query = `
        INSERT INTO reviews (user_id, tmdb_id, review_text, rating)
        VALUES ($1, $2, $3, $4)
        RETURNING review_id, user_id, tmdb_id, review_text, rating;
    `;
    return pool.query(query, [user_id, movie_id, review, rating]);
}

export const  getReviewById = async (review_id) => {
    const query = `SELECT * FROM reviews WHERE review_id = $1;`;
    return pool.query(query, [review_id]);
}

export const getReviewofMovieId = async (movie_id) => {
    const query = `SELECT * FROM reviews WHERE tmdb_id = $1;`;
    return pool.query(query, [movie_id]);
}

export const getReviewsfromUserId = async (user_id) => {
    const query = `SELECT * FROM reviews WHERE user_id = $1;`;
    return pool.query(query, [user_id]);
}

 export const DeleteReviewbyId = async (review_id) => {
    const query = `DELETE FROM reviews WHERE review_id = $1 RETURNING *;`;
    return pool.query(query, [review_id]);
}

export const UpdateReviewbyId = async (review_id, review_text, rating) => {
    const query = `UPDATE reviews SET review_text = $1, rating = $2 WHERE review_id = $3 RETURNING *;`;
    return pool.query(query, [review_text, rating, review_id]);
}
