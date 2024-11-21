export const MovieCard = ({ movie, genresList }) => {
  const imageUrl = `https://image.tmdb.org/t/p/w200${movie.poster_path}`;

  // Function to get genre names from genre IDs
  const getGenres = (genreIds) => {
    return genreIds.map(id => {
      const genre = genresList.find(g => g.id === id);
      return genre ? genre.name : 'Unknown';
    }).join(', ');
  };

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
          {/* Display genres based on IDs */}
          <span className='genre'>{getGenres(movie.genre_ids)}</span>
        </div>
        <div className='ratings'>
          <span>Rating: {movie.vote_average.toFixed(1)}</span>
        </div>
      </div>
    </div>
  );
};

