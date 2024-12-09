import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./SharedFavorites.css";

const SharedFavorites = () => {
  const { username } = useParams();
  const [favorites, setFavorites] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPublicFavorites = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_FAVORITES_API_BASE_URL}/public/${username}`);
        setFavorites(response.data.favorites);
        setUserInfo(response.data.user);
      } catch (err) {
        console.error("Failed to load public favorites:", err.message);
        setError("Could not load favorites for this user. They may not be public or might not exist.");
      }
    };

    fetchPublicFavorites();
  }, [username]);

  return (
    <div className="shared-favorites-container">
      {error && <p className="shared-favorites-error">{error}</p>}

      {!error && userInfo && (
        <div className="shared-favorites-content">
          {/* User Info Section */}
          <div className="shared-favorites-user-section">
            <h2 className="user-info-title">Public Profile</h2>
            <div className="shared-favorites-user">
              <div className="user-avatar">
                {userInfo.first_name[0].toUpperCase()}
                {userInfo.last_name[0].toUpperCase()}
              </div>
              <h2 className="user-full-name">{userInfo.first_name} {userInfo.last_name}</h2>
              <p className="user-username">@{userInfo.username}</p>
              <p className="user-status">This is a public profile</p>
            </div>
          </div>

          {/* Favorite Movies Section */}
          <div className="shared-favorites-movies-section">
            <h2 className="movies-section-title">Favorite Movies of {userInfo.username}</h2>
            <div className="shared-favorites-grid">
              {favorites.length > 0 ? (
                favorites.map((fav) => (
                  <div key={fav.tmdb_id} className="shared-favorite-card">
                    <img
                      src={fav.poster_url}
                      alt={fav.title}
                      className="shared-favorite-poster"
                    />
                    <h3 className="shared-favorite-title">{fav.title}</h3>
                  </div>
                ))
              ) : (
                <p className="shared-favorites-empty">This user has no public favorites.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SharedFavorites;
