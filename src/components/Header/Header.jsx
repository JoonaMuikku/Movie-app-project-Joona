import React, { useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import SideBarMenu from "./SideBarMenu";
import { useAuth } from "../../context/AuthContext"; // Import AuthContext
import "./Header.css";

export default function HeaderView() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, logout } = useAuth(); // Access user and logout from AuthContext

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
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
                className="btn btn-orange-transparent fs-6 rounded-0 px-4 px-3"
                onClick={logout}
              >
                Logout
              </button>
            </div>
          ) : (
            <button className="btn btn-orange-transparent fs-6 rounded-0 px-4 px-3">
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