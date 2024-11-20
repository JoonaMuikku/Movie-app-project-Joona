
import './App.css';
import { useEffect } from 'react';
import axios from 'axios';

function App() {

  const getMovies = async() =>{
try {
const data = await axios.get('eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MWRlZjY4MjA0MDhkYTk0ZDdkZjAxYTM1NzExMmRlNSIsIm5iZiI6MTczMTQ2ODE2OC4wMDM1NTE3LCJzdWIiOiI2NzMzNzUxMzAyYzQ5MzkyZjFlODFlNDciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.LWsDZWmPFahL_EOMWa04nrkcoVlOe06yexJ7eKsSguk') 
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
