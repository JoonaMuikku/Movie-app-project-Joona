import './MovieCard.css';
export const MovieCard = ({ movie }) => {
  return (
      <div className='card-container'>
          <div className='card-img-container'>
              <img src={movie.'/hZkgoQYus5vegHoetLkCJzb17zJ.jpg'} alt={movie.title} />
          </div>
          <div className='card-details'>
              <div>
                  <span className='title'>{movie.original_title}</span>
              </div>
              <div>
                  <span className='genre'>{movie.id}</span>
              </div>
              <div className='ratings'>
                  <span>Rating: {movie.vote_average}</span>
                  <span>{movie.runtime}</span>
              </div>
          </div>
      </div>
  );
};
