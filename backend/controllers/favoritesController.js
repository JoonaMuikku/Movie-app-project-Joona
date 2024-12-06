import axios from "axios";
import pool from "../config/db.js";

// Add a movie to favorites
export const addFavorite = async (req, res, next) => {
    const { tmdb_id } = req.body;
    const user_id = req.user.user_id;

    try {
        if (!tmdb_id) return res.status(400).json({ error: "TMDB ID is required" });

        // Fetch movie details from TMDB
        const movieResponse = await axios.get(
            `https://api.themoviedb.org/3/movie/${tmdb_id}?api_key=${process.env.TMDB_API_KEY}`
        );
        const { title, poster_path } = movieResponse.data;
        const poster_url = `https://image.tmdb.org/t/p/w500${poster_path}`;

        const query = `
            INSERT INTO favorites (user_id, tmdb_id, title, poster_url)
            VALUES ($1, $2, $3, $4)
            ON CONFLICT (user_id, tmdb_id) DO NOTHING
            RETURNING *;
        `;
        const result = await pool.query(query, [user_id, tmdb_id, title, poster_url]);

        if (result.rowCount === 0) {
            return res.status(200).json({ message: "Movie is already in favorites" });
        }

        res.status(201).json({ message: "Movie added to favorites", favorite: result.rows[0] });
    } catch (error) {
        next(error);
    }
};

// Remove a movie from favorites
export const removeFavorite = async (req, res, next) => {
    const { tmdb_id } = req.body;
    const user_id = req.user.user_id;

    try {
        if (!tmdb_id) return res.status(400).json({ error: "TMDB ID is required" });

        const query = `
            DELETE FROM favorites WHERE user_id = $1 AND tmdb_id = $2 RETURNING *;
        `;
        const result = await pool.query(query, [user_id, tmdb_id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Movie not found in favorites" });
        }

        res.status(200).json({ message: "Movie removed from favorites" });
    } catch (error) {
        next(error);
    }
};

// Fetch all favorited movies for a user
export const getFavorites = async (req, res, next) => {
    const user_id = req.user.user_id;

    try {
        const query = `SELECT tmdb_id, title, poster_url FROM favorites WHERE user_id = $1;`;
        const result = await pool.query(query, [user_id]);

        if (result.rows.length === 0) {
            return res.status(200).json({ favorites: [] });
        }

        res.status(200).json({ favorites: result.rows });
    } catch (error) {
        next(error);
    }
};
