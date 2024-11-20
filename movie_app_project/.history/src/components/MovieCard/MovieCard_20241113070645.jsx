import './MovieCard.css';
export const MovieCard = ({ movie }) => {
  return (
      <div className='card-container'>
          <div className='card-img-container'>
              <img src={movie.poster_path} alt={movie.title} />
          </div>
          <div className='card-details'>
              <div>
                  <span className='title'>{movie.title}</span>
              </div>
              <div>
                  <span className='genre'>{movie.genre}</span>
              </div>
              <div className='ratings'>
                  <span>Rating: {movie.vote_average}</span>
                  <span>{movie.runtime}</span>
              </div>
          </div>
      </div>
  );
};
