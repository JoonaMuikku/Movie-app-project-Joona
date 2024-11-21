import { Link } from 'react-router-dom';

export const MovieCard = ({ movie }) => {
  const imageUrl = `https://image.tmdb.org/t/p/w200${movie.poster_path}`;

  const { vote_average, original_title } = movie;
  return (
    <div className="card-container">
      <Link to={`/movie/${movie.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className="card-img-container">
          <img src={imageUrl} alt={movie.title || 'Movie image'} />
        </div>
        <div className="card-details">
          <div>
            <span className="title">{original_title}</span>
          </div>
          <div className="ratings">
            <span>Rating: {vote_average.toFixed(1)}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};
