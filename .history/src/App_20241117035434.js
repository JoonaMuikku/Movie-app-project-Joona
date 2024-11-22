import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { MovieCard } from './components/MovieCard/MovieCard';

function App() {
  const [movies, setMovies] = useState([]);

  const getMovies = async () => {
    try {
      const { data } = await axios.get('http://www.omdbapi.com/?i=tt3896198&apikey=76fd291f');
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
      <header className='header'>  
         <h1 className='heading-1'>Moviq</h1>
         </header>
   
      <main className='main'>
        {movies.length > 0 ? (
          movies.map(movie => <MovieCard key={movie.id} movie={movie} />)
        ) : 'Loading...'}
      </main>
    </div>
  );
}

export default App;
