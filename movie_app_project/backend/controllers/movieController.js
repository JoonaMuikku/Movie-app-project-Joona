import { getMovies } from "../models/movieModel";


const getMovies = async () => {
    try {
        const response = await axios.get('http://localhost:3001/movies');
        console.log('Full response object:', response); // Log the entire response object
       
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
};

// Call getMovies in useEffect to fetch movies on component mount
useEffect(() => {
    getMovies();
}, []);