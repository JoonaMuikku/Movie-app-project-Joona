import React, { useState } from "react";
import "./UserProfile.css";
import { useAuth } from "../../context/AuthContext";
import { updateProfile } from "../../api/authApi";
import { toast } from "react-toastify";

export default function UserProfile({ user, onClose }) {
    const { logoutUser, deleteUserAccount, setUser } = useAuth(); // Assuming setUser is available in AuthContext
    const [isEditing, setIsEditing] = useState(false);
    const [firstName, setFirstName] = useState(user.first_name);
    const [lastName, setLastName] = useState(user.last_name);
    const [loading, setLoading] = useState(false);

    const handleLogout = async () => {
        await logoutUser();
        toast.success("Logged out successfully!");
        onClose(); // Close the profile prompt
    };

    const handleDeleteAccount = async () => {
        if (window.confirm("Are you sure you want to delete your account? This action is irreversible.")) {
            try {
                await deleteUserAccount();
                toast.success("Account deleted successfully!");
                logoutUser(); // Log the user out after deletion
                onClose(); // Close the profile prompt
            } catch (error) {
                toast.error("Failed to delete account. Please try again.");
            }
        }
    };

    const handleSaveChanges = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token"); // Get the auth token from localStorage
            const updatedData = { first_name: firstName, last_name: lastName };

            const updatedUser = await updateProfile(token, updatedData);
            console.log("Updated User:", updatedUser);

            // Update the local user state with the new details
            setUser(updatedUser.user);

            toast.success("Profile updated successfully!");
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating profile:", error.response?.data || error.message);
            toast.error("Failed to update profile. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="user-profile-side-menu">
            <button className="close-button" onClick={onClose}>
                &times;
            </button>

            {/* Main Content */}
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
                    <h3>Favorite Movies</h3>
                    <div className="favorite-movies">
                        {/* Placeholder for favorite movies */}
                        <p>will add favorites here.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
