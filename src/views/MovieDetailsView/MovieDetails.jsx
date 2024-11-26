import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieDetails } from '../../api/movieApi';
import "./MovieDetails.css";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);

  useEffect(() => {
      const fetchData = async () => {
          const data = await fetchMovieDetails(id);
          setMovie(data.movie);
          setCast(data.cast);
      };

      fetchData();
  }, [id]);

  if (!movie) {
      return <h2>Loading...</h2>;
  }


  const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <div className="movie-details">
        <div className="movie-details-image">
            <img src={imageUrl} alt={movie.title} />
        </div>
        <div className="movie-details-info">
            <h1>{movie.original_title}</h1>
            <p><strong>Overview:</strong> {movie.overview}</p>
            <p><strong>Rating:</strong> {movie.vote_average.toFixed(1)}</p>
            <p><strong>Language:</strong> {movie.original_language}</p>
            <p><strong>Genres:</strong> {movie.genres.map((genre) => genre.name).join(", ")}</p>
            <p><strong>Runtime:</strong> {movie.runtime} min</p>
            <p><strong>Release Date:</strong> {movie.release_date}</p>
        </div>
        <div className="movie-cast">
            {cast.map((member) => (
              <div key={member.id} className="cast-member">
                <img src={`https://image.tmdb.org/t/p/w200${member.profile_path}`} alt={member.name} />
                <div className="cast-member-name">{member.name}</div>
                <div className="cast-member-character">{member.character}</div>
              </div>
          ))}
      </div>


    </div>
);
}

