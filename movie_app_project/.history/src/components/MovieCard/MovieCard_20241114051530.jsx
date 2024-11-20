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
          <span className='title'>{original_title}</span>
        </div>
        <div>
          
          <span className='genre'>{genre}</span>
        </div>
        <div className='ratings'>
          <span>Rating: {vote_average.toFixed(1)}</span>
        </div>
      </div>
    </div>
  );
};
