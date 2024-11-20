import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import axios from 'axios';
import { MovieCard } from './Components/MovieCard/MovieCard.jsx';
import MovieDetails from './Components/MovieDetails/MovieDetails.jsx'; // Import the new component
import "bootstrap/dist/css/bootstrap.min.css";
import Header from './Components/Header/Header.jsx'; // Adjust the path as needed


function App() {
  const [movies, setMovies] = useState([]);

  const getMovies = async () => {
    try {
      const { data } = await axios.get(
        'https://api.themoviedb.org/3/movie/popular?api_key=51def6820408da94d7df01a357112de5'
      );
      setMovies(data.results); // Assuming 'results' contains the list of movies
      console.log(movies);
     // testing link
      const {imagedata} = await axios.get( "https://api.themoviedb.org/3/movie/912649/images?api_key=cbf0362bb54624f00a21c2e51270b3a0");
      console.log(imagedata)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);
  return (
    <div className="App bg-dark text-white">
      <Router>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
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