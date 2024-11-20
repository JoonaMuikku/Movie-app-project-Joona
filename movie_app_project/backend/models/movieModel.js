import {pool} from '../config/db.js';
import axios from 'axios';

const getMovies = async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM movies'); // Fetching movies from the database
        if (rows.length === 0) {
            return res.status(404).json({ message: 'No movies found' }); // Return a 404 if no movies are found
        }
        res.json(rows); // Send the movies as a JSON response
    } catch (error) {
        console.error('Error fetching movies:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const getMoviesfromAPI = async (req, res) => {
   
    let movies =[];
    try { 
  //gets the moviers and stores them in the database
   
    //the api should be for all movies
    //!!!use your own API from the tmdb website!!!
  const response = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=cbf0362bb54624f00a21c2e51270b3a0');
   
     movies = response.data.results;
    
    // Clear existing movies (optional, based on your requirements)
        await pool.query('DELETE FROM movies');
        console.log(response.data.results);
    // Insert movies into the database
    for (const movie of movies) {
     

        await pool.query('INSERT INTO movies (title,  description, release_date , genre, poster_image , rating, movie_id_tmdb) VALUES ($1, $2, $3, $4, $5, $6 , $7)', 
            [
                movie.title,  
                movie.overview, 
                movie.release_date, 
                movie.genre_ids,
                movie.poster_path, 
                movie.vote_average,
                movie.id
            ]);
    }
    return { message: 'Movies added to the database' };
} catch (error) {
    console.error('Error fetching movies from API:', error);
    throw new Error('Failed to fetch movies from API');
}
};


const getMovieImage = async (req, res) => {
    try {
        //gets movie_id_tmdb from the datbase using the title
        const movie_id_tmdb = await pool.query('SELECT movie_id_tmdb FROM movies WHERE title = $1', [req.params.title]);
        
        
        //uses url to get the image from the tmdb website

        //send the data to the client
    
        `https://api.themoviedb.org/3/movie/ + ${movie_id_tmdb} + ?api_key=cbf0362bb54624f00a21c2e512`


    }
    catch (error) {
        console.error('Error fetching movie image:', error);
        res.status(500).json({ message: 'Server Error' });
    }
}


export {getMovies, getMovieImage ,getMoviesfromAPI}; 