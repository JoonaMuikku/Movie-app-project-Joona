
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_MOVIES_API_BASE_URL;

const GENRE_API_BASE_URL = process.env.REACT_APP_GENRE_API_BASE_URL;


// Fetch movies with optional filters
export const fetchMovies = async (filters) => {
    console.log('Filters sent to API:', filters); // Debug log
    const response = await axios.get(`${API_BASE_URL}`, { params: filters });
    console.log('Response from API:', response.data); // Debug log
    return response.data;
};
// Fetch genres
export const fetchGenres = async () => {
    const response = await axios.get(`${GENRE_API_BASE_URL}`);
    return response.data;
};

// Fetch movie details
export const fetchMovieDetails = async (id) => {
    const response = await axios.get(`${API_BASE_URL}/details/${id}`);
    return response.data;
};
