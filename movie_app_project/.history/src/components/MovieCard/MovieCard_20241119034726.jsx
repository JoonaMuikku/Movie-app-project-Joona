import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {
  const imageUrl = `https://image.tmdb.org/t/p/w200${movie.poster_path}`;
  const { vote_average, original_title } = movie;

  return (
    <div className="card movie-card text-white bg-dark">
      <Link to={`/movie/${movie.id}`} style={{ textDecoration: "none" }}>
        <img
          src={imageUrl}
          className="card-img-top"
          alt={movie.title || "Movie image"}
        />
      </Link>
      <div className="card-body">
        <h5 className="card-title">{original_title}</h5>
        <p className="card-text">
          <span className="badge bg-warning text-dark">⭐ {vote_average || "N/A"}</span>
        </p>
        <button className="btn btn-primary d-flex align-items-center gap-2">
          <span className="bi bi-play-circle"></span> Watch now
        </button>
      </div>
    </div>
  );
};
