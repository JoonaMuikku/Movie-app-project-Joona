import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { MovieCard } from './components/MovieCard/MovieCard';
import MovieDetails from './components/MovieDetails/MovieDetails'; // Import the new component

function App() {
  const [movies, setMovies] = useState([]);

  const getMovies = async () => {
    try {
      const { data } = await axios.get(
        'https://api.themoviedb.org/3/movie/popular?api_key=51def6820408da94d7df01a357112de5'
      );
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
    <Router>
      <div className="App">
        <header className="header">
          <h1 className="heading-1">Moviq</h1>
        </header>

        <Routes>
          <Route
            path="/"
            element={
              <main className="main">
                {movies.length > 0 ? (
                  movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                  ))
                ) : (
                  'Loading...'
                )}
              </main>
            }
          />
          <Route
            path="/movie/:id"
            element={<MovieDetails movies={movies} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
