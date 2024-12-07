import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieDetails } from "../../api/movieApi";
import "./MovieDetails.css";
import { useAuth } from "../../context/AuthContext";
import {
  fetchMovieReviews,
  addReview,
  updateReview,
  deleteReview,
} from "../../api/reviewApi";
import { toast } from "react-toastify";
import { format } from "date-fns"; 


export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editReviewData, setEditReviewData] = useState(null); // Stores the review being edited
  const { user, token } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const movieData = await fetchMovieDetails(id);
        setMovie(movieData.movie);
        setCast(movieData.cast);

        const movieReviews = await fetchMovieReviews(id);
        setReviews(movieReviews);
      } catch (error) {
        console.error("Error fetching movie details or reviews:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmitReview = async () => {
    try {
      await addReview({ tmdb_id: id, movie_title: movie.title, review_text: reviewText, rating }, token);
      toast.success("Review added!");
  
      // Refresh reviews
      const movieReviews = await fetchMovieReviews(id);
      setReviews(movieReviews);
  
      // Reset form
      setReviewText("");
      setRating(5);
    } catch (error) {
      console.error("Error adding review:", error);
  
      // If the error message is about a duplicate review, display a specific message
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to submit the review.");
      }
    }
  };
  

  const handleOpenEditModal = (review) => {
    setEditReviewData(review);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditReviewData(null);
  };

  const handleUpdateReview = async () => {
    try {
      await updateReview(
        editReviewData.review_id,
        { review_text: editReviewData.review_text, rating: editReviewData.rating },
        token
      );
      toast.success("Review updated!");

      // Refresh reviews
      const movieReviews = await fetchMovieReviews(id);
      setReviews(movieReviews);

      // Close modal
      handleCloseEditModal();
    } catch (error) {
      console.error("Error updating review:", error);
      toast.error("Failed to update the review.");
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await deleteReview(reviewId, token);
      toast.success("Review deleted!");

      // Refresh reviews
      const movieReviews = await fetchMovieReviews(id);
      setReviews(movieReviews);
    } catch (error) {
      console.error("Error deleting review:", error);
      toast.error("Failed to delete the review.");
    }
  };

  if (!movie) {
    return <h2>Loading...</h2>;
  }

  const backgroundPoster = `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`;
  const smallerPoster = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <div className="movie-details-page">
      {/* Movie Backdrop */}
      <div
        className="movie-header"
        style={{ backgroundImage: `url(${backgroundPoster})` }}
      >
        <div className="movie-header-overlay"></div>
      </div>

      {/* Movie Content */}
      <div className="movie-details">
        <div className="movie-poster">
          <img src={smallerPoster} alt={movie.title} />
        </div>
        <div className="movie-info">
          <h1>{movie.title}</h1>
          <p>{movie.overview}</p>
          <p><strong>Release Date:</strong> {movie.release_date}</p>
          <p><strong>Language:</strong> {movie.original_language}</p>
          <p><strong>Rating:</strong> {(movie.vote_average).toFixed(1)}</p>
          {movie.genres && movie.genres.length > 0 && (
          <p><strong>Genres:</strong>{" "}
            {movie.genres.map((genre) => genre.name).join(", ")}
          </p>
    )}
        </div>
      </div>

      {/* Cast Section */}
      <div className="movie-cast">
        <h3>Cast:</h3>
        <div className="cast-grid">
          {cast.map((member) => (
            <div className="cast-member" key={member.id}>
              <img
                src={`https://image.tmdb.org/t/p/w200${member.profile_path}`}
                alt={member.name}
              />
              <p>{member.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews Section */}
      <div className="movie-reviews">
        <h3>Reviews:</h3>
        {reviews.map((review) => {
          const formattedDate = format(
            new Date(review.created_at),
            "MMMM d, yyyy 'at' h:mm a"
          );

          return (
            <div className="review-card" key={review.review_id}>
              <div>
                <p>
                  <strong>{review.first_name} {review.last_name}</strong>: {review.review_text}
                </p>
                <p>⭐ {review.rating} / 5</p>
                <p className="review-timestamp">Reviewed on {formattedDate}</p>
              </div>
              {user && review.email === user.email && (
                <div className="review-buttons">
                  <button onClick={() => handleOpenEditModal(review)}>Edit</button>
                  <button onClick={() => handleDeleteReview(review.review_id)}>Delete</button>
                </div>
              )}
            </div>
          );
        })}

        {/* Add Review Form */}
        {user && (
          <div className="add-review">
            <h4>Add a Review</h4>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Write your review here..."
            ></textarea>
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => setRating(star)}
                  style={{ color: star <= rating ? "#ffcc00" : "#ccc", cursor: "pointer" }}
                >
                  ★
                </span>
              ))}
            </div>
            <button onClick={handleSubmitReview}>Submit</button>
          </div>
        )}
      </div>

      {/* Edit Review Modal */}
        {showEditModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <button
                className="modal-close"
                onClick={handleCloseEditModal}
              >
                &times;
              </button>
              <h2>Edit Your Review</h2>
              <textarea
                value={editReviewData.review_text}
                onChange={(e) =>
                  setEditReviewData((prev) => ({ ...prev, review_text: e.target.value }))
                }
                placeholder="Edit your review..."
              ></textarea>
              <div className="star-rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={() =>
                      setEditReviewData((prev) => ({ ...prev, rating: star }))
                    }
                    style={{ color: star <= editReviewData.rating ? "#ffcc00" : "#ccc", cursor: "pointer" }}
                  >
                    ★
                  </span>
                ))}
              </div>
              <button onClick={handleUpdateReview}>Update</button>
            </div>
          </div>
        )} 
    </div>
  );
}
