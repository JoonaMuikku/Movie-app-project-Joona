import React, { createContext, useState, useContext } from 'react';
import { signup, login, deleteAccount } from '../api/authApi';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const [token, setToken] = useState(() => {
        return localStorage.getItem('token') || null;
    });

     // Signup
     const signupUser = async (userData) => {
        const { user, token } = await signup(userData);
        setUser(user);
        setToken(token);
    
        // Save to localStorage
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
    };
    

    // Login
    const loginUser = async (credentials) => {
        const { user, token } = await login(credentials);
        setUser(user);
        setToken(token);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
    };

    // Logout
    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    };

    // Delete Account
    const deleteUserAccount = async () => {
        if (!user || !token) throw new Error("User not authenticated."); // Ensure token and user exist
        await deleteAccount(token); // Token is passed here
        logout(); // Log out after successful deletion
    };
    
    return (
        <AuthContext.Provider value={{ user, loginUser, signupUser, logout, deleteUserAccount }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);