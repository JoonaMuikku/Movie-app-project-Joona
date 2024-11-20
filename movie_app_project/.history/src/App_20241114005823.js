import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { MovieCard } from './components/MovieCard/MovieCard';

function App() {
  // Change to an object or null
  const [movies, setMovie] = useState(null);

  const getMovies = async () => {
    try {
      const { data } = await axios.get('https://api.themoviedb.org/3/movie/550?api_key=51def6820408da94d7df01a357112de5');
      setMovie(data); // Set the movie data
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  console.log(movies); // To check what you're receiving

  return (
    <div className="App">
      <h1>Moviq</h1>
      <main className='main'>
        { movies && movies.length>0 && movies.map( movie=> <MovieCard key={movie.id} movie={movie}/> 
      </main>
    </div>
  );
}

export default App;
