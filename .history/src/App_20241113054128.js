
import './App.css';
import { useEffect } from 'react';
import axios from 'axios';
import { MovieCard } from './components/MovieCard/MovieCard';

function App() {

  const getMovies = async() =>{
try {
const data = await axios.get('51def6820408da94d7df01a357112de5') 
console.log(data)

}
catch(error){
  console.log(error)
  }}



useEffect(()=>{
  getMovies()
},[])



  return (
    <div className="App">
      <h1></h1>>
    </div>
  );
}

export default App;
