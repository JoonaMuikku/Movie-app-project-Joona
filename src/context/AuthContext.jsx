import React, { createContext, useState, useContext } from 'react';
import { signup, login, deleteAccount, logout } from '../api/authApi';

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
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
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
    const logoutUser = async () => {
        if (!token) return; // No token, just clear the local state
        try {
            await logout(token); // Call the backend logout endpoint
        } catch (error) {
            console.error('Error during logout:', error);
        }
        // Clear user state and localStorage
        setUser(null);
        setToken(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    };

    // Delete Account
    const deleteUserAccount = async () => {
        if (!user || !token) throw new Error('User not authenticated.');
        await deleteAccount(token); // Token is passed here
        logoutUser(); // Log out after successful deletion
    };

    return (
        <AuthContext.Provider
            value={{ user, token, loginUser, signupUser, logoutUser, deleteUserAccount, 
                setUser // to update the user-info
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);