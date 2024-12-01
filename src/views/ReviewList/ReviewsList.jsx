import React, { useEffect, useState } from "react";
import { fetchAllReviews } from "../../api/reviewApi";
import { Link } from "react-router-dom";
import "./ReviewsList.css";

export default function ReviewsList() {
  const [reviews, setReviews] = useState([]);
  const [visibleReviews, setVisibleReviews] = useState(10); // Initially display 10 reviews

  useEffect(() => {
    const getAllReviews = async () => {
      try {
        const reviewsData = await fetchAllReviews();
        setReviews(reviewsData);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    getAllReviews();
  }, []);

  const handleLoadMore = () => {
    setVisibleReviews((prev) => prev + 10); // Load 10 more reviews
  };

  if (reviews.length === 0) {
    return (
      <div className="reviews-list">
        <h1>All Reviews</h1>
        <p>No reviews available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="reviews-list">
      <h1>All Reviews</h1>
      <div className="review-cards-container">
        {reviews.slice(0, visibleReviews).map((review) => (
          <div key={review.review_id} className="review-card-modern">
            <h3 className="movie-title">{review.movie_title}</h3>
            <p className="reviewer-name">By: {review.first_name} {review.last_name}</p>
            <p className="review-comment"><strong>Review:</strong> {review.review_text}</p>
            <p className="review-rating">
              <strong>Rating:</strong> ⭐ {review.rating} / 5
            </p>
            <small className="review-date">
              Reviewed on: {new Date(review.created_at).toLocaleDateString()}
            </small>
            <Link to={`/movie/${review.tmdb_id}`} className="details-button">
              View Details
            </Link>
          </div>
        ))}
      </div>
      {visibleReviews < reviews.length && (
        <div className="load-more-container">
          <button onClick={handleLoadMore} className="load-more-button">
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
