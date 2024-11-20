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
      <div className="App bg-dark text-white">
        <header className="header">
      <h1 className="heading-1">Moviq</h1>
    </header>
    </div>
      
    );
  };

  return (
    <div className="App bg-dark text-white">
       <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <Header />
            <main className="container mt-4">
              <div className="row">
                {movies.length > 0 ? (
                movies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))
              ) : (
                'Loading...'
              )}
              </div>
              
            </main>
          }
        />
        <Route path="/movie/:id" element={<MovieDetails movies={movies} />} />
      </Routes>
    </Router>
    </div>
   
  );
}

export default App;
