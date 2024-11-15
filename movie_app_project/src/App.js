import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { MovieCard } from './Components/MovieCard/MovieCard';


const  baseurl = 'http://localhost:3001';


function App() {
  const [movies, setMovies] = useState([])
  const [searchTerm, setSearchTerm] = useState('');



  const getMovies = async () => {

    try {
      const response = await axios.get( baseurl + '/movies');
      console.log('Full response object:', response); // Log the entire response object
      setMovies(response.data);  // Set the movies state with the fetched data
      console.log(movies);
    } catch (error) {
      console.error('Error fetching movies:', error);
  }
};  
useEffect(() => {
  const fetchMovies = async () => {
      await getMovies();
  };
  fetchMovies();
}, []);

const filterredMovies = movies.filter(movie => movie.title.toLowerCase().includes(searchTerm.toLowerCase()));


  return (
    <div className="App">
      <header className='header'>  
      <h1 className='heading-1'>Moviq</h1>
         <div className='search/bar/container'>
          <input type="text" placeholder="Search for a movie" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className='search-bar'/>
         </div>
         </header>
   
      <main className='main'>
        {movies.length > 0 ? (
          movies.map(movie => <MovieCard 
            key={movie.id} 
          movie={{
            movie_title: movie.title, 
            movie_rating: movie.rating,
            movie_poster: movie.poster_image
          }}
            />)
          ) : 'Loading...'}
      </main>
    </div>
  );
}

export default App;