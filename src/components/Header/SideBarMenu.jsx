import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

export default function SideBarMenu({ isOpen, toggleSidebar }) {
    const { user } = useAuth();

    return (
        <>
            <div
                className={`d-flex flex-column bg-dark text-white position-fixed top-0 start-0 h-100 p-3 ${isOpen ? "" : "d-none"}`}
                style={{ width: "280px", zIndex: 1050,
                  fontFamily: "Arial, sans-serif",
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                 }}
            >
                {/* App Name */}
                <Link to="/" className="navbar-brand fw-bold fs-3 mb-3 mb-md-5">
                    Moviq
                </Link>


                <ul className="nav nav-pills flex-column">
                    {user && (
                        <>
                            {/* Welcome Text */}
                            <li className="nav-item mb-2">
                                <span className="nav-link text-white rounded-0">
                                    Welcome, {user.first_name}
                                </span>
                            </li>
                        </>
                    )}

                    {/* Common Links with Hover Effects */}
                    <li className="nav-item mb-2">
                        <Link
                            to="/reviews"
                            className="nav-link text-white rounded-0"
                            style={{ transition: "background-color 0.3s ease",
                              fontFamily: "Arial, sans-serif",
                              fontSize: "1rem",
                              fontWeight: "bold"
                             }}
                            onMouseEnter={(e) => (e.target.style.backgroundColor = "#FF5733")}
                            onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
                            onClick={toggleSidebar}
                        >
                            <i className="bi bi-list-stars me-2"></i> Browse Reviews
                        </Link>
                    </li>
                    <li className="nav-item mb-2">
                        <Link
                            to="/groups"
                            className="nav-link text-white rounded-0"
                            style={{ transition: "background-color 0.3s ease",
                              fontFamily: "Arial, sans-serif",
                              fontSize: "1rem",
                              fontWeight: "bold"
                             }}
                            onMouseEnter={(e) => (e.target.style.backgroundColor = "#FF5733")}
                            onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
                            onClick={toggleSidebar}
                        >
                            <i className="bi bi-people me-2"></i> Groups
                        </Link>
                    </li>
                    <li className="nav-item mb-2">
                        <Link
                            to="/shared/:username"
                            className="nav-link text-white rounded-0"
                            style={{ transition: "background-color 0.3s ease",
                              fontFamily: "Arial, sans-serif",
                              fontSize: "1rem",
                              fontWeight: "bold"
                             }}
                            onMouseEnter={(e) => (e.target.style.backgroundColor = "#FF5733")}
                            onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
                            onClick={toggleSidebar}
                        >
                            <i className="bi bi-people me-2"></i> Shared Favorites
                        </Link>
                    </li>
                    <li className="nav-item mb-2">
                        <Link
                            to="/showtimes"
                            className="nav-link text-white rounded-0"
                            style={{ transition: "background-color 0.3s ease",  
                              fontFamily: "Arial, sans-serif",
                              fontSize: "1rem",
                              fontWeight: "bold" 
                            }}
                            onMouseEnter={(e) => (e.target.style.backgroundColor = "#FF5733")}
                            onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
                            onClick={toggleSidebar}
                        >
                            <i className="bi bi-calendar-event me-2"></i> Showtimes
                        </Link>
                    </li>
                </ul>
            </div>

            {/* Overlay */}
            {isOpen && (
                <div
                    className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
                    style={{ zIndex: 1049 }}
                    onClick={toggleSidebar}
                ></div>
            )}
        </>
    );
}