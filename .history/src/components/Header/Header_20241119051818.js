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

        {/* Centered Search Bar */}
        <form className="search-bar mx-auto d-flex align-items-center">
          <input
            className="form-control search-input"
            type="text"
            placeholder="Enter keywords"
            aria-label="Search"
          />
          <button className="btn btn-orange search-btn" type="submit">
            <i className="bi bi-search"></i> {/* Bootstrap Search Icon */}
          </button>
        </form>

        {/* Sign Up and Sign In Buttons */}
        <div className="d-flex">
          <button className="btn btn-outline-light me-2">Sign Up</button>
          <button className="btn btn-orange">Sign In</button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
