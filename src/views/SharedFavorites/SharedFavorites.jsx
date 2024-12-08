import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import "./SharedFavorites.css";

const SharedFavorites = () => {
  const { username } = useParams();
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPublicFavorites = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_FAVORITES_API_BASE_URL}/public/${username}`);
        setFavorites(response.data.favorites);
      } catch (err) {
        console.error("Failed to load public favorites:", err.message);
        setError("Could not load favorites for this user. They may not be public or might not exist.");
      }
    };

    fetchPublicFavorites();
  }, [username]);

  return (
    <div className="shared-favorites-container">
      <h1 className="shared-favorites-title">{username}'s Favorites Movies</h1>
      {error && <p className="shared-favorites-error">{error}</p>}
      {favorites.length > 0 ? (
        <div className="shared-favorites-grid">
          {favorites.map((fav) => (
            <Link to={`/movie/${fav.tmdb_id}`} key={fav.tmdb_id} className="shared-favorite-card">
            <img
              src={fav.poster_url}
              alt={fav.title}
              className="shared-favorite-poster"
            />
            <h3 className="shared-favorite-title">{fav.title}</h3>
          </Link>
          ))}
        </div>
      ) : (
        !error && <p className="shared-favorites-empty">This user has no public favorites.</p>
      )}
    </div>
  );
};

export default SharedFavorites;
