import './MovieCard.css';
export const MovieCard = ({ movie }) => {
  return (
      <div className='card-container'>
          <div className='card-img-container'>
              <img src={movie.poster_path} alt={movie.original_title} />
          </div>
          <div className='card-details'>
              <div>
                  <span className='title'>{movie.original_title}</span>
              </div>
              <div>
                  <span className='genre'>{movie.genres}</span>
              </div>
              <div className='ratings'>
              {movie.spoken_languages.map((lang, index) => (
            <span key={index}>{lang.english_name}></span>
                  <span>Rating: {movie.vote_average}</span>
                  <span>{movie.runtime}</span>
              </div>
          </div>
      </div>
  );
};
