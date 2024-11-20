export const MovieCard = ({ movie }) => {
  return (
      <div className='card-container'>
          <div className='card-img-container'>
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.original_title} />
          </div>
          <div className='card-details'>
              <div>
                  <span className='title'>{movie.original_title}</span>
              </div>
              <div>
                  <span className='genre'>{movie.genres.map(genre => genre.name).join(', ')}</span> // Ensure genres is an array and you're mapping over it
              </div>
              <div className='ratings'>
                  <span>Rating: {movie.vote_average}</span>
                  <span>{movie.runtime} min</span>
              </div>
          </div>
      </div>
  );
};
