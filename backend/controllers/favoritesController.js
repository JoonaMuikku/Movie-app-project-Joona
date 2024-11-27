import axios from "axios";
import pool from "../config/db.js";

// Add a movie to favorites
export const addFavorite = async (req, res, next) => {
    const { tmdb_id } = req.body;
    const user_id = req.user.user_id;

    try {
        if (!tmdb_id) return res.status(400).json({ error: "TMDB ID is required" });

        const query = `
            INSERT INTO favorites (user_id, tmdb_id)
            VALUES ($1, $2)
            ON CONFLICT (user_id, tmdb_id) DO NOTHING
            RETURNING *;
        `;
        const result = await pool.query(query, [user_id, tmdb_id]);

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
        const query = `SELECT tmdb_id FROM favorites WHERE user_id = $1;`;
        const result = await pool.query(query, [user_id]);

        const favoriteIds = result.rows.map((row) => row.tmdb_id);

        if (favoriteIds.length === 0) {
            return res.status(200).json({ favorites: [] });
        }

        // Fetch from cache or TMDB
        const promises = favoriteIds.map(async (tmdb_id) => {
            const cacheQuery = `SELECT * FROM movies WHERE tmdb_id = $1;`;
            const cacheResult = await pool.query(cacheQuery, [tmdb_id]);

            if (cacheResult.rowCount > 0) {
                return cacheResult.rows[0]; // Use cached data
            }

            // Fetch from TMDB if not cached
            const movieResponse = await axios.get(
                `https://api.themoviedb.org/3/movie/${tmdb_id}?api_key=${process.env.TMDB_API_KEY}`
            );
            const movie = movieResponse.data;

            // Cache the movie
            const insertQuery = `
                INSERT INTO movies (tmdb_id, title, description, release_date, genre, rating, poster_url, last_updated)
                VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
                RETURNING *;
            `;
            const cacheInsert = await pool.query(insertQuery, [
                tmdb_id,
                movie.title,
                movie.overview,
                movie.release_date,
                movie.genres.map((g) => g.name).join(", "),
                movie.vote_average,
                movie.poster_path,
            ]);

            return cacheInsert.rows[0];
        });

        const favorites = await Promise.all(promises);
        res.status(200).json({ favorites });
    } catch (error) {
        next(error);
    }
};