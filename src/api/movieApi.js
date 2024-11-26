import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';


// Fetch movies with optional filters
export const fetchMovies = async (filters) => {
    console.log('Filters sent to API:', filters); // Debug log
    const response = await axios.get(`${API_BASE_URL}/movies`, { params: filters });
    console.log('Response from API:', response.data); // Debug log
    return response.data;
};
// Fetch genres
export const fetchGenres = async () => {
    const response = await axios.get(`${API_BASE_URL}/genres`);
    return response.data;
};

// Fetch movie details
export const fetchMovieDetails = async (id) => {
    const response = await axios.get(`${API_BASE_URL}/movies/details/${id}`);
    return response.data;
};