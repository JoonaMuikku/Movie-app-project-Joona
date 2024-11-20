
import './App.css';
import { useEffect } from 'react';
import axios from 'axios';

function App() {

  const getMovies = async() =>{
try {
const data = await axios.get('https://api.themoviedb.org/3/movie/550?api_key=1f4b3b3b3b3  ')


}
catch(error){
  console.log(error)
  }}

useEffect(()=>{
  getMovies()
},[])

  return (
    <div className="App">
      This is my Movie App
    </div>
  );
}

export default App;
