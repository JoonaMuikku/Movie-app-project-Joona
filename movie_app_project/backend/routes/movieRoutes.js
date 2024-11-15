import {  getMoviesfromAPI,getMovies, getMovieImage  } from '../models/movieModel.js';
import { Router } from 'express';

const Movierouter = Router();

Movierouter.get('/movies', getMovies);

//Movierouter.get('/movies/:id', getMovieById);

// Endpoint to populate the database with movies from the external API
Movierouter.get('/populate-movies', async (req, res) => {
    try {
        const result = await getMoviesfromAPI();
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: 'Error populating movies' });
    }
});

Movierouter.get('/movies/image', getMovieImage)

export default Movierouter;