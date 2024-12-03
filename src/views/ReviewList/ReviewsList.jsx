import React, { useState, useEffect } from "react";
import { fetchAllReviews } from "../../api/reviewApi";
import { Link } from "react-router-dom";
import "./ReviewsList.css";

export default function ReviewsList() {
  const [reviews, setReviews] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await fetchAllReviews(searchQuery); // Pass search query
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, [searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="reviews-list">
      <h1>All Reviews</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by movie title..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <div className="review-cards-container">
        {reviews.map((review) => (
          <div key={review.review_id} className="review-card-modern">
            <h2 className="movie-title">{review.movie_title}</h2>
            <p className="reviewer-name">By: {review.first_name} {review.last_name}</p>
            <p className="review-comment">
              <strong>Review:</strong> {review.review_text || "No comment provided."}
            </p>
            <p className="review-rating">
              <strong>Rating:</strong> {review.rating} <span>⭐</span>
            </p>
            <p className="review-date">
              Reviewed on: {new Date(review.created_at).toLocaleDateString()}
            </p>
            <Link to={`/movie/${review.tmdb_id}`} className="details-button">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
