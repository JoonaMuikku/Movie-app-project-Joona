export const MovieCard = () => {
  return (
    <div className='card-container'>
      <div className='card-img-container'>
      <img src='/' alt='movie-card'/>
      </div>
      <div>
        <span className='title'>The Shawshank</span>
        </div>
        <div>
          <span className='genre'>Genre: Drama</span>
        </div>
        <div>
          <span className='rating'>Rating: 4.8</span>
          <span className='duration'>: 2h 22min</span>
        </div>
      
      </div>
  )
}