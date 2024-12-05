import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_USERS_API_BASE_URL;

// Sign Up
export const signup = async (userData) => {
    const response = await axios.post(`${API_BASE_URL}/signup`, userData);
    return response.data;
};

// Login
export const login = async (credentials) => {
    const response = await axios.post(`${API_BASE_URL}/login`, credentials);
    return response.data;
};

// Logout
export const logout = async (token) => {
    const response = await axios.post(`${API_BASE_URL}/logout`,{}, // No body needed
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    );
    return response.data;
};

// Delete Account
export const deleteAccount = async (token) => {
    // console.log("Sending Token:", token); // Debugging
    const response = await axios.delete(`${API_BASE_URL}/delete`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};