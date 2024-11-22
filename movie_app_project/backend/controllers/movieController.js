import axios from 'axios'

// Fetch movies with filters
export const getMovies = async (req, res) => {
    const { genre, title, year } = req.query;

    try {
        let url;

        // If title is provided, use the search endpoint
        if (title) {
            url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${title}`;
            if (year) {
                url += `&primary_release_year=${year}`; // Add year filter if provided
            }
        } else {
            // Otherwise, use the discover endpoint for genre and/or year
            url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}`;
            if (genre) {
                url += `&with_genres=${genre}`; // Add genre filter if provided
            }
            if (year) {
                url += `&primary_release_year=${year}`; // Add year filter if provided
            }
        }

        //console.log('TMDB API URL:', url); // Log the final URL for debugging

        const response = await axios.get(url);
        res.json(response.data.results); // Send the results back to the client
    } catch (error) {
        console.error('Error fetching movies:', error.message);
        res.status(500).send('Failed to fetch movies');
    }
};

// Fetch genres from TMDB
export const getGenres = async (req, res) => {
    try {
        const response = await axios.get(
            `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.TMDB_API_KEY}`
        );
        res.json(response.data.genres);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Failed to fetch genres');
    }
};


// Fetch movie details and cast
export const getMovieDetails = async (req, res) => {
    const { id } = req.params;

    try {
        const movieResponse = await axios.get(
            `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}`
        );

        const castResponse = await axios.get(
            `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.TMDB_API_KEY}`
        );

        res.json({
            movie: movieResponse.data,
            cast: castResponse.data.cast.slice(0, 6), // Limit to top 6 cast members
        });
    } catch (error) {
        console.error('Error fetching movie details or cast:', error);
        res.status(500).send('Failed to fetch movie details or cast');
    }
};