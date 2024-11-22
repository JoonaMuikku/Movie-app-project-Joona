import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { MovieCard } from './components/MovieCard/MovieCard';

function App() {

  const [movies, setMovies] = useState([]);

  const getMovies = async() =>{
try {
const {data} = await axios.get('https://api.themoviedb.org/3/movie/550?api_key=51def6820408da94d7df01a357112de5')
setMovies(data)
}catch(error){
  console.log(error)
  }}

useEffect(()=>{
  getMovies()
},[])
console.log(movies)

  return (
    <div className="App">
      <h1>Movies</h1>
      <main className='main'>
      {
        movies && movies.length>0 && movies.map(movie => <MovieCard />)
      }
      </main>
    </div>
  );
}

export default App;
