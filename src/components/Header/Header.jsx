import React, { useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import SideBarMenu from "./SideBarMenu";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Header.css";

export default function HeaderView() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { user, logoutUser } = useAuth();
    const [hovered, setHovered] = useState(false); // Hover state for the button

    const toggleSidebar = () => {
        setIsSidebarOpen((prev) => !prev);
    };

    const handleLogout = async () => {
        await logoutUser();
        toast.success("You have been logged out!");
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
                        <Link to="/" className="navbar-brand fw-bold fs-3">
                            Moviq
                        </Link>
                    </div>

                    {/* Search Bar */}
                    <SearchBar />

                    {/* User Options */}
                    {user ? (
                        <div className="d-flex align-items-center">
                            <span className="text-white me-3">Welcome, {user.first_name}</span>
                            <button
                                className="btn fs-6 rounded-0 px-4 px-3"
                                onClick={handleLogout}
                                onMouseEnter={() => setHovered(true)} // Set hover effect
                                onMouseLeave={() => setHovered(false)} // Remove hover effect
                                style={{
                                    backgroundColor: hovered ? "#ff5733" : "transparent",
                                    color: "#ffffff",
                                    border: hovered ? "1px solid #ff5733" : "1px solid transparent",
                                    borderRadius: hovered ? "8px" : "0",
                                    transition: "all 0.3s ease",
                                    cursor: "pointer",
                                }}
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <button
                            className="btn fs-6 rounded-0 px-4 px-3"
                            onMouseEnter={() => setHovered(true)}
                            onMouseLeave={() => setHovered(false)}
                            style={{
                                backgroundColor: hovered ? "#28a745" : "transparent", // Green effect for hover
                                color: "#ffffff",
                                border: hovered ? "1px solid #28a745" : "1px solid transparent",
                                borderRadius: hovered ? "8px" : "0",
                                transition: "all 0.3s ease",
                                cursor: "pointer",
                            }}
                        >
                            <Link to="sign-in" className="text-white text-decoration-none">
                                Sign In
                            </Link>
                        </button>
                    )}
                </div>
            </nav>

            {/* Sidebar Menu */}
            <SideBarMenu isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        </div>
    );
}