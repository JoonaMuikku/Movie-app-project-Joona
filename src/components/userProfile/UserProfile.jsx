import React, { useState } from "react";
import "./UserProfile.css";
import { useAuth } from "../../context/AuthContext";
import { useFavorites } from "../../context/FavoritesContext";
import { updateProfile } from "../../api/authApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function UserProfile({ user, onClose }) {
    const { logoutUser, deleteUserAccount, setUser } = useAuth();
    const { favorites, removeFromFavorites } = useFavorites();
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [firstName, setFirstName] = useState(user.first_name);
    const [lastName, setLastName] = useState(user.last_name);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const moviesPerPage = 6;

    const handleLogout = async () => {
        await logoutUser();
        toast.success("Logged out successfully!");
        onClose();
    };

    const handleDeleteAccount = async () => {
        if (window.confirm("Are you sure you want to delete your account? This action is irreversible.")) {
            try {
                await deleteUserAccount();
                toast.success("Account deleted successfully!");
                logoutUser();
                onClose();
            } catch (error) {
                toast.error("Failed to delete account. Please try again.");
            }
        }
    };

    const handleSaveChanges = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            const updatedData = { first_name: firstName, last_name: lastName };

            const updatedUser = await updateProfile(token, updatedData);
            setUser(updatedUser.user);

            toast.success("Profile updated successfully!");
            setIsEditing(false);
        } catch (error) {
            toast.error("Failed to update profile. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    const currentMovies = favorites.slice(indexOfFirstMovie, indexOfLastMovie);

    const totalPages = Math.ceil(favorites.length / moviesPerPage);

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    const redirectToMovieDetails = (tmdb_id) => {
        navigate(`/movie/${tmdb_id}`);
    };

    return (
        <div className="user-profile-overlay-container">
            {/* Overlay to disable interaction with home page */}
            <div className="user-profile-overlay" onClick={onClose}></div>
            <div className="user-profile-side-menu">
                <button className="close-button" onClick={onClose}>
                    &times;
                </button>
                <div className="profile-content">
                    {/* Left Section: User Info */}
                    <div className="profile-left">
                        <div className="user-header">
                            <div className="user-profile-circle">
                                {user.first_name[0].toUpperCase()}
                                {user.last_name[0].toUpperCase()}
                            </div>
                            <h3 className="welcome-text">Welcome, {user.first_name}</h3>
                        </div>
                        <hr className="divider" />
                        <div className="user-info-container">
                            <p className="user-info-large"><strong>First Name:</strong> {user.first_name}</p>
                            <p className="user-info-large"><strong>Last Name:</strong> {user.last_name}</p>
                            <p className="user-info-large"><strong>Email:</strong> {user.email}</p>
                        </div>
                        <div className="edit-profile-section">
                            <button
                                className="btn btn-edit"
                                onClick={() => setIsEditing((prev) => !prev)}
                            >
                                Edit Profile
                            </button>
                            {isEditing && (
                                <div className="edit-dropdown">
                                    <input
                                        type="text"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        placeholder="First Name"
                                        className="edit-input"
                                    />
                                    <input
                                        type="text"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        placeholder="Last Name"
                                        className="edit-input"
                                    />
                                    <button
                                        className="btn btn-save"
                                        onClick={handleSaveChanges}
                                        disabled={loading}
                                    >
                                        {loading ? "Saving..." : "Save Changes"}
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className="bottom-buttons">
                            <button className="btn btn-logout" onClick={handleLogout}>
                                Logout
                            </button>
                            <button className="btn btn-delete" onClick={handleDeleteAccount}>
                                Delete Account
                            </button>
                        </div>
                    </div>

                    {/* Right Section: Favorites */}
                    <div className="profile-right">
                        <h3 className="fav-head">Favorite Movies</h3>
                        <div className="favorite-movies-grid">
                            {currentMovies.length > 0 ? (
                                currentMovies.map((favorite) => (
                                    <div key={favorite.tmdb_id} className="favorite-movie-card">
                                        <img
                                            src={favorite.poster_url}
                                            alt={favorite.title || "Movie Poster"}
                                            className="favorite-movie-poster"
                                        />
                                        <h5>{favorite.title}</h5>
                                        <div className="favorite-movie-actions">
                                            <button
                                                className="btn btn-remove"
                                                onClick={() => removeFromFavorites(favorite.tmdb_id)}
                                            >
                                                Remove
                                            </button>
                                            <button
                                                className="btn btn-details"
                                                onClick={() => redirectToMovieDetails(favorite.tmdb_id)}
                                            >
                                                Details
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No favorite movies added yet.</p>
                            )}
                        </div>
                        <div className="pagination-controls">
                            <button className="pagination-btn" onClick={prevPage} disabled={currentPage === 1}>
                                Previous
                            </button>
                            <span className="page-number">{currentPage} / {totalPages}</span>
                            <button
                                className="pagination-btn"
                                onClick={nextPage}
                                disabled={currentPage === totalPages}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
