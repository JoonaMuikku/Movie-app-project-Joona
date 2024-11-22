import express from 'express';
import { getGenres, getMovies, getMovieDetails } from '../controllers/movieController.js';

const router = express.Router();

// Routes
router.get('/genres', getGenres); // GET /api/genres
router.get('/movies', getMovies); // GET /api/movies
router.get('/movies/details/:id', getMovieDetails); // GET /api/movies/details/:id


export default router;