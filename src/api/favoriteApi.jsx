import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/favorites";

// Fetch all favorites
export const fetchFavorites = async (token) => {
  const response = await axios.get(API_BASE_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.favorites;
};

// Add a movie to favorites
export const addFavorite = async (tmdb_id, token) => {
  const response = await axios.post(
    `${API_BASE_URL}/add`,
    { tmdb_id },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

// Remove a movie from favorites
export const removeFavorite = async (tmdb_id, token) => {
  const response = await axios.delete(`${API_BASE_URL}/remove`, {
    headers: { Authorization: `Bearer ${token}` },
    data: { tmdb_id },
  });
  return response.data;
};