import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        {/* App Name */}
        <Link to="/" className="navbar-brand fw-bold fs-3">
          Moviq
        </Link>

        {/* Dropdown Menu for Mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
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
  );
};

export default Header;
