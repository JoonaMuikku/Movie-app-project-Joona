import React, { useState } from "react";
import SearchBar from "./SearchBar";
import SideBarMenu from "./SideBarMenu";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Header.css";
import UserProfile from "../userProfile/UserProfile";

export default function HeaderView() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const { user, logoutUser } = useAuth();

    const toggleSidebar = () => {
        setIsSidebarOpen((prev) => !prev);
    };

    const handleLogout = async () => {
        await logoutUser();
        toast.success("You have been logged out!");
    };

    // Extract initials from user's name
    const getUserInitials = (firstName, lastName) => {
        if (!firstName || !lastName) return "U";
        return `${firstName[0].toUpperCase()}${lastName[0].toUpperCase()}`;
    };

    return (
        <div className="sticky-top py-3 _navigation">
            <nav className="navbar navbar-dark bg-dark">
                <div className="container-fluid">
                    <div>
                        {/* Sidebar Toggle Button */}
                        <button
                            className="navbar-toggler me-3"
                            type="button"
                            onClick={toggleSidebar}
                            aria-label="Toggle navigation"
                        >
                            <i className="bi bi-list"></i>
                        </button>

                        {/* App Name */}
                        <a href="/" className="navbar-brand fw-bold fs-3">
                            Moviq
                        </a>
                    </div>

                    {/* Search Bar */}
                    <SearchBar />

                    {/* User Options */}
                    {user ? (
                        <div className="d-flex align-items-center">
                            {/* Profile Button */}
                            <button
                                className="user-profile-square text-decoration-none me-3"
                                onClick={() => setIsProfileOpen(true)} // Open the profile prompt
                            >
                                <i className="bi bi-person-circle profile-icon"></i>
                                <span className="profile-initials">
                                    {getUserInitials(user.first_name, user.last_name)}
                                </span>
                            </button>
                            <button
                                className="btn logout-button"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <button className="btn sign-in-button">
                            <a href="/sign-in" className="text-white text-decoration-none">
                                Sign In
                            </a>
                        </button>
                    )}
                </div>
            </nav>

            {/* Sidebar Menu */}
            <SideBarMenu isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            {/* User Profile Prompt */}
            {isProfileOpen && (
                <UserProfile
                    user={user}
                    onClose={() => setIsProfileOpen(false)} // Close the profile prompt
                />
            )}
        </div>
    );
}
