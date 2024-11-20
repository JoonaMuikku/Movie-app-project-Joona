export const MovieCard = ({ movie }) => {
  const imageUrl = `https://image.tmdb.org/t/p/w200${movie.poster_path}`;

  const { genre, vote_average,original_title} = movie;
  return (
    <div className='card-container'>
      <div className='card-img-container'>
        <img src={imageUrl} alt={movie.title || 'Movie image'} />
      </div>
      <div className='card-details'>
        <div>
          <span className='title'>{movie.original_title}</span>
        </div>
        <div>
          {/* Safely accessing the genre name */}
          <span className='genre'>{movie.genre}</span>
        </div>
        <div className='ratings'>
          <span>Rating: {movie.vote_average}</span>
        </div>
      </div>
    </div>
  );
};
