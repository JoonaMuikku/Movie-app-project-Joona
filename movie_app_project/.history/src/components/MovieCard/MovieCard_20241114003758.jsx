import './MovieCard.css';
export const MovieCard = ({ movie }) => {

  const imageUrl = `https://image.tmdb.org/t/p/w50${movie.poster_path}`;
  return (
      <div className='card-container'>
          <div className='card-img-container'>
              <img src={imageUrl} alt={movie.title} />
          </div>
          <div className='card-details'>
              <div>
                  <span className='title'>{movie.original_title}</span>
              </div>
              <div>
                  <span className='genre'>{movie.genres[0].name}</span>
              </div>
              <div className='ratings'>
                  <span>Rating: {movie.vote_average}</span>
                  <span>{movie.runtime}</span>
              </div>
          </div>
      </div>
  );
};
