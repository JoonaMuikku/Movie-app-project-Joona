import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css"; // Add custom styles for the sidebar

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          {/* Hamburger Menu Icon */}
          <button className="btn btn-outline-light me-3" onClick={toggleSidebar}>
            <i className="bi bi-list"></i> {/* Bootstrap hamburger icon */}
          </button>

          {/* App Name */}
          <Link to="/" className="navbar-brand fw-bold fs-3">
            Moviq
          </Link>

          {/* Navbar Links */}
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Movies
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/groups" className="nav-link">
                  Groups
                </Link>
              </li>
            </ul>
          </div>

          {/* Sign Up and Sign In Buttons */}
          <div className="d-flex flex-column">
            <button className="btn btn-outline-light mb-2">Sign Up</button>
            <button className="btn btn-primary">Sign In</button>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <div className={`sidebar bg-dark text-white ${sidebarOpen ? "open" : ""}`}>
        <button className="btn-close text-reset ms-auto" onClick={toggleSidebar}></button>
        <ul className="list-unstyled mt-4">
          <li>
            <Link to="/" className="text-white text-decoration-none">
              Movies
            </Link>
          </li>
          <li>
            <Link to="/showtimes" className="text-white text-decoration-none">
              Showtimes
            </Link>
          </li>
          <li>
            <Link to="/communities" className="text-white text-decoration-none">
              Communities
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Header;
