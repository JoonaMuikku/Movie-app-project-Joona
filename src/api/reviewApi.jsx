import axios from "axios";

const API_BASE_URL = "http://localhost:3001/api/reviews";

// Add a review
export const addReview = async (reviewData, token) => {
  const response = await axios.post(`${API_BASE_URL}/add`, reviewData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Update a review
export const updateReview = async (reviewId, updatedData, token) => {
  const response = await axios.put(`${API_BASE_URL}/${reviewId}`, updatedData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Delete a review
export const deleteReview = async (reviewId, token) => {
  const response = await axios.delete(`${API_BASE_URL}/${reviewId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Get reviews for a movie
export const fetchMovieReviews = async (tmdb_id) => {
  const response = await axios.get(`${API_BASE_URL}/${tmdb_id}`);
  return response.data.reviews;
};

// Get reviews by the signed-in user
export const fetchUserReviews = async (token) => {
  const response = await axios.get(API_BASE_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.reviews;
};