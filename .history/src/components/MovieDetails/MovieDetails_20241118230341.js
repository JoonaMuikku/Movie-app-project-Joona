import React from 'react';
import { useParams } from 'react-router-dom';
import './MovieDetails.css';


const MovieDetails = ({ movies }) => {
  const { id } = useParams(); // Get the movie ID from the URL
  const movie = movies.find((m) => m.id === parseInt(id)); // Find the movie with the matching ID

  if (!movie) {
    return <h2>Movie not found!</h2>;
  }

  const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <div className="movie-details">
      <div className="movie-details-image">
        <img src={imageUrl} alt={movie.title} />
      </div>
      <div className="movie-details-info">
        <h1>{movie.original_title}</h1>
        <p><strong>Rating:</strong> {movie.vote_average.toFixed(1)}</p>
        <p><strong>Overview:</strong> {movie.overview}</p>
        <p><strong>Release Date:</strong> {movie.release_date}</p>
        <p><strong>Language:</strong> {movie.original_language}</p>
      </div>
    </div>
  );
};

export default MovieDetails;
