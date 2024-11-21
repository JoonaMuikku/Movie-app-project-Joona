import React from "react";
import { Link } from "react-router-dom";
import "./Header.css"; // Custom styles for buttons and search bar

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        {/* Hamburger Menu Icon */}
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

        {/* App Name */}
        <Link to="/" className="navbar-brand fw-bold fs-3">
          Moviq
        </Link>

        {/* Collapsible Links and Search Bar */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/movies" className="nav-link">
                Movies
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/groups" className="nav-link">
                Groups
              </Link>
            </li>
          </ul>

          {/* Search Bar */}
          <form className="d-flex me-3" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-orange" type="submit">
              Search
            </button>
          </form>

          {/* Sign Up and Sign In Buttons */}
          <div className="d-flex">
            <button className="btn btn-outline-light me-2">Sign Up</button>
            <button className="btn btn-orange">Sign In</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
