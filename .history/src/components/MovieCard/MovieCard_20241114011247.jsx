export const MovieCard = ({ movie }) => {
  const imageUrl = `https://image.tmdb.org/t/p/w200${movie.poster_path}`;

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
          <span className='genre'>{movie.genres?.length > 0 ? movie.genres[0].name : 'No genre'}</span>
        </div>
        <div className='ratings'>
          <span>Rating: {movie.vote_average}</span>
          <span>{movie.runtime} mins</span>
        </div>
      </div>
    </div>
  );
};
