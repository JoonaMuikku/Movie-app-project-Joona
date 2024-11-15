

export const MovieCard = ({ movie }) => {
    const url = `https://image.tmdb.org/t/p/w200`;
    const image_url =  "http://localhost:3001/movies/image"
  
    const {  movie_rating,movie_title,movie_poster} = movie;






    return (
      <div className='card-container'>
        <div className='card-img-container'>
          
          <img src={ url + movie_poster} alt={movie.title} />
        </div>
        <div className='card-details'>
          <div>
            <span className='title'>{movie_title}</span>
          </div>
         
          <div className='ratings'>
            <span>Rating: {Number(movie_rating).toFixed(1)}</span>
          </div>
        </div>
      </div>
    );
  };
  



  //.toFixed(1) 
          
  
      //genre doesnt show up on the main search page?
  //    <div>
          //   {/* Safely accessing the genre name */}
          //   //<span className='genre'>{genre}</span>
          // </div>