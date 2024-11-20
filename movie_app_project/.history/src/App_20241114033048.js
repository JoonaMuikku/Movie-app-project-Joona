import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { MovieCard } from './components/MovieCard/MovieCard';

function App() {
  const [movies, setMovies] = useState([]);

  const getMovies = async () => {
    try {
      const { data } = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=51def6820408da94d7df01a357112de5');
      console.log(data.results);
      setMovies(data.results); // Assuming 'results' contains the list of movies
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className="App">
      <header></header>
   
      <main className='main'>
        {movies.length > 0 ? (
          movies.map(movie => <MovieCard key={movie.id} movie={movie} />)
        ) : 'Loading...'}
      </main>
    </div>
  );
}

export default App;
