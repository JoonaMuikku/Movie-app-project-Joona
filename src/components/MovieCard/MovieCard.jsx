import { useNavigate } from "react-router-dom";

export const MovieCard = ({ movie }) => {
<<<<<<< HEAD:movie_app_project/src/components/MovieCard/MovieCard.jsx
    const navigate = useNavigate();
    const imageUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
        : 'https://via.placeholder.com/200x300'; // Fallback image
=======
  const navigate = useNavigate();
  const imageUrl = movie.poster_path
      ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
      : 'https://via.placeholder.com/200x300'; // Fallback image

  const { vote_average, original_title, release_date } = movie;
>>>>>>> 296e7f0a2684e425857d08862ea9029bc7da0e45:src/components/MovieCard/MovieCard.jsx

    const { vote_average, original_title, release_date } = movie;

    const toMovieDetails = () => {
        navigate(`/movie/${movie.id}`, { state: { movie } });
    };

<<<<<<< HEAD:movie_app_project/src/components/MovieCard/MovieCard.jsx
    return (
        <div>
            <div
                className="card bg-dark text-white h-100"
                onClick={toMovieDetails}
                style={{ cursor: "pointer" }}
            >
                <img
                    src={imageUrl}
                    className="card-img-top img-fluid"
                    alt={original_title || "Movie image"}
                    style={{  objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column justify-content-between">
                    <h5 className="card-title text-truncate">{original_title || "No Title"}</h5>
                    <p className="card-text d-flex justify-content-between align-items-center">
                        <span className="d-flex align-items-center gap-2">
                            <span className="bi bi-star-fill text-warning"></span>
                            <span>{vote_average ? vote_average.toFixed(1) : "N/A"}</span>
                        </span>
                        <span>{release_date ? release_date.split("-")[0] : "N/A"}</span>
                    </p>
=======
  return (
    <div>
      <div
        className="card bg-dark text-white"
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
            <span>
              {release_date ? movie.release_date.split("-")[0] : "N/A"}
            </span>
          </p>
>>>>>>> 296e7f0a2684e425857d08862ea9029bc7da0e45:src/components/MovieCard/MovieCard.jsx

                    <button className="btn btn-dark watch-now-button d-flex align-items-center justify-content-center gap-2">
                        <span className="bi bi-play-circle"></span> Watch now
                    </button>
                </div>
            </div>
        </div>
    );
};