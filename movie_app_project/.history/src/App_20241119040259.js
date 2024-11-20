import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import axios from 'axios';
import { MovieCard } from './components/MovieCard/MovieCard';
import MovieDetails from './components/MovieDetails/MovieDetails'; // Import the new component
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [movies, setMovies] = useState([]);

  const getMovies = async () => {
    try {
      const { data } = await axios.get(
        'https://api.themoviedb.org/3/movie/popular?api_key=51def6820408da94d7df01a357112de5'
      );
      setMovies(data.results); // Assuming 'results' contains the list of movies
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  // Custom header that dynamically hides based on the current route
  const Header = () => {
    const location = useLocation();

    // Check if the current path is NOT the home page
    if (location.pathname.startsWith('/movie/')) {
      return null; // Don't render the header
    }

    return (
      <div></div>
      
    );
  };

  return (
    
    <Router>
      <Header />
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
        <Route path="/movie/:id" element={<MovieDetails movies={movies} />} />
      </Routes>
    </Router>
  );
}

export default App;
