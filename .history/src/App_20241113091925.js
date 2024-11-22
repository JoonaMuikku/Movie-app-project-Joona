import { useEffect, useState } from 'react';
import axios from 'axios';
import { MovieCard } from './components/MovieCard/MovieCard';

function App() {
  // Change to an object
  const [movie, setMovie] = useState();

  const getMovies = async () => {
    try {
      const { data } = await axios.get('https://api.themoviedb.org/3/movie/550?api_key=your_api_key');
      setMovie(data); // Set the movie data
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  console.log(movie); // To check what you're receiving

  return (
    <div className="App">
      <h1>Movies</h1>
      <main className='main'>
        { movie && <MovieCard movie={movie} /> } // Update to check for a single movie object
      </main>
    </div>
  );
}

export default App;
