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
    const { id: tmdb_id } = req.params;

    try {
        // Fetch movie details and cast from TMDB
        const movieResponse = await axios.get(
            `https://api.themoviedb.org/3/movie/${tmdb_id}?api_key=${process.env.TMDB_API_KEY}`
        );

        const castResponse = await axios.get(
            `https://api.themoviedb.org/3/movie/${tmdb_id}/credits?api_key=${process.env.TMDB_API_KEY}`
        );

        res.status(200).json({
            movie: movieResponse.data,
            cast: castResponse.data.cast.slice(0, 6), // Top 6 cast members
        });
    } catch (error) {
        console.error("Error fetching movie details:", error);
        res.status(500).send("Failed to fetch movie details");
    }
};
// In case we go for movie table :-

// Fetch movie details and cast with caching
/*export const getMovieDetails = async (req, res) => {
  const { id: tmdb_id } = req.params;
  try {
    // Fetch movie details from TMDB
    const movieResponse = await axios.get(
      `https://api.themoviedb.org/3/movie/${tmdb_id}?api_key=${process.env.TMDB_API_KEY}`
    );
    // Fetch cast details from TMDB
    const castResponse = await axios.get(
      `https://api.themoviedb.org/3/movie/${tmdb_id}/credits?api_key=${process.env.TMDB_API_KEY}`
    );
    const movie = movieResponse.data;
    const cast = castResponse.data.cast.slice(0, 6); // Limit to top 6 cast members
    // Cache movie details (but always fetch cast data fresh)
    const upsertQuery = `
      INSERT INTO movies (tmdb_id, title, description, release_date, genre, rating, poster_url, last_updated)
      VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
      ON CONFLICT (tmdb_id)
      DO UPDATE SET title = $2, description = $3, release_date = $4, genre = $5, rating = $6, poster_url = $7, last_updated = NOW()
      RETURNING *;
    `;
    await pool.query(upsertQuery, [
      tmdb_id,
      movie.title,
      movie.overview,
      movie.release_date,
      movie.genres.map((g) => g.name).join(", "),
      movie.vote_average,
      movie.poster_path,
    ]);
    // Respond with movie and cast data
    res.status(200).json({ movie, cast });
  } catch (error) {
    console.error("Error fetching movie details or cast:", error);
    res.status(500).send("Failed to fetch movie details or cast");
  }
};*/