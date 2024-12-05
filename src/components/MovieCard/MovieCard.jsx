import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import { useFavorites } from "../../context/FavoritesContext";
import "./MovieCard.css";

export const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const { token, user } = useAuth();
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
  const [isFavorited, setIsFavorited] = useState(false);

  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
    : "https://via.placeholder.com/200x300";

  const { vote_average, original_title, release_date } = movie;

  const toMovieDetails = () => {
    navigate(`/movie/${movie.id}`, { state: { movie } });
  };

  useEffect(() => {
    if (!user || !token) {
      setIsFavorited(false);
      return;
    }
    setIsFavorited(favorites.some((fav) => fav.tmdb_id === movie.id));
  }, [user, token, favorites, movie.id]);

  const toggleFavorite = async (e) => {
    e.stopPropagation();

    if (!user || !token) {
      toast.error("Please log in to manage your favorites.");
      return;
    }

    try {
      if (isFavorited) {
        await removeFromFavorites(movie.id);
        toast.success("Movie removed from favorites.");
      } else {
        await addToFavorites(movie.id);
        toast.success("Movie added to favorites.");
      }
      setIsFavorited(!isFavorited);
    } catch (error) {
      toast.error("Failed to update favorites. Please try again.");
    }
  };

  return (
    <div className="movie-card">
      <div
        className="card bg-dark text-white position-relative"
        onClick={toMovieDetails}
        style={{ cursor: "pointer" }}
      >
        <img
          src={imageUrl}
          className="card-img-top img-fluid"
          alt={movie.title || "Movie image"}
          style={{ height: "100%", objectFit: "cover" }}
        />
        <div className="card-body d-flex flex-column justify-content-between">
          <h5 className="card-title text-truncate">{original_title}</h5>
          <p className="card-text d-flex justify-content-between align-items-center">
            <span className="d-flex align-items-center gap-2">
              <span className="bi bi-star-fill text-warning"></span>
              <span>{vote_average ? vote_average.toFixed(1) : "N/A"}</span>
            </span>
            <span>{release_date ? movie.release_date.split("-")[0] : "N/A"}</span>
          </p>
          <button className="btn btn-dark watch-now-button d-flex align-items-center justify-content-center gap-2">
            <span className="bi bi-play-circle"></span> Watch now
          </button>
        </div>
        <button
          className={`favorite-btn position-absolute top-0 end-0 m-2 ${isFavorited ? "favorited" : ""}`}
          onClick={toggleFavorite}
        >
          {isFavorited ? "💖" : "🤍"}
        </button>
      </div>
    </div>
  );
};