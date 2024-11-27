import React, { createContext, useState, useContext, useEffect } from "react";
import { fetchFavorites, addFavorite, removeFavorite } from "../api/favoriteApi"
import { useAuth } from "./AuthContext";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const { token, user } = useAuth(); // Get token and user from AuthContext
  const [favorites, setFavorites] = useState([]);

  // Fetch all favorites when the user logs in or the token changes
  useEffect(() => {
    const loadFavorites = async () => {
      if (!user || !token) return;
      try {
        const userFavorites = await fetchFavorites(token);
        setFavorites(userFavorites);
      } catch (error) {
        console.error("Failed to load favorites:", error.message);
      }
    };

    loadFavorites();
  }, [token, user]);

  // Add a movie to favorites
  const addToFavorites = async (tmdb_id) => {
    if (!user || !token) throw new Error("User not authenticated.");
    try {
      await addFavorite(tmdb_id, token);
      setFavorites((prev) => [...prev, { tmdb_id }]); // Optimistically update state
    } catch (error) {
      console.error("Failed to add to favorites:", error.message);
      throw error;
    }
  };

  // Remove a movie from favorites
  const removeFromFavorites = async (tmdb_id) => {
    if (!user || !token) throw new Error("User not authenticated.");
    try {
      await removeFavorite(tmdb_id, token);
      setFavorites((prev) => prev.filter((fav) => fav.tmdb_id !== tmdb_id)); // Optimistically update state
    } catch (error) {
      console.error("Failed to remove from favorites:", error.message);
      throw error;
    }
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);