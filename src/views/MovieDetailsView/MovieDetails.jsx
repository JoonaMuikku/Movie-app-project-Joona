import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieDetails } from "../../api/movieApi";
import "./MovieDetails.css";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchMovieDetails(id);
        setMovie(data.movie);
        setCast(data.cast);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchData();
  }, [id]);

  if (!movie) {
    return <h2>Loading...</h2>;
  }

  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : `https://via.placeholder.com/500x750`;

  return (
    <div className="movie-details">
      <div className="movie-details-image">
        <img src={imageUrl} alt={movie.title || "Movie poster"} />
      </div>
      <div className="movie-details-info">
        <h1>{movie.title || "Title not available"}</h1>
        <p>
          <strong>Overview:</strong> {movie.overview || "No overview available."}
        </p>
        <p>
          <strong>Rating:</strong>{" "}
          {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
        </p>
        <p>
          <strong>Language:</strong>{" "}
          {movie.original_language || "Language not available"}
        </p>
        <p>
          <strong>Genres:</strong>{" "}
          {movie.genres && movie.genres.length > 0
            ? movie.genres.map((genre) => genre.name).join(", ")
            : "No genres available"}
        </p>
        <p>
          <strong>Runtime:</strong> {movie.runtime ? `${movie.runtime} min` : "N/A"}
        </p>
        <p>
          <strong>Release Date:</strong>{" "}
          {movie.release_date
            ? new Date(movie.release_date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : "N/A"}
        </p>
      </div>
            <div className="movie-cast">
        {cast.length > 0 ? (
            cast.map((member) => (
            <div key={member.id} className="cast-member">
                <img
                src={
                    member.profile_path
                    ? `https://image.tmdb.org/t/p/w200${member.profile_path}`
                    : "https://via.placeholder.com/200x300"
                }
                alt={member.name || "Actor"}
                />
                <div className="cast-member-name">{member.name || "Unknown Actor"}</div>
                <div className="cast-member-character">
                {member.character || "Unknown Character"}
                </div>
            </div>
            ))
        ) : (
            <p>No cast information available.</p>
        )}
        </div>
    </div>
  );
}