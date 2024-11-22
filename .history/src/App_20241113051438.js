
import './App.css';
import { useEffect } from 'react';
import axios from 'axios';

function App() {

  const getMovies = async() =>{
try {
const data = await axios.get('https://movies=app. ')
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
      This is my Movie App
    </div>
  );
}

export default App;
