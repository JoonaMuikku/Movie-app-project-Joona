import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {

  return (
    <nav className="navbar navbar-expand-xl navbar-dark bg-dark">
      <div className="container-fluid">

        {/* App Name */}
        <div>
          <Link to="/" className="navbar-brand fw-bold fs-3">
            Moviq
          </Link>
        </div>



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
          <i className="bi bi-list"></i>
        </button>


        {/* Collapsible Links and Search Bar */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* Dropdown Menu */}
            <li className="nav-item dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="navbarDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="bi bi-list"></i>
              </button>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <Link to='sign-in' className="dropdown-item">
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link to='sign-up' className="dropdown-item">
                    Sign Up
                  </Link>
                </li>
                <li>
                  <Link to='movies' className="dropdown-item">
                    Movies
                  </Link>
                </li>
                <li>
                  <Link to='groups' className="dropdown-item">
                    Groups
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        
        {/* Search Bar */}
        <div>
          <form className="search-bar mx-auto d-flex align-items-center">
            <input
              className="form-control search-input"
              type="text"
              placeholder="Enter keywords"
              aria-label="Search"
            />
            <button className="btn btn-orange search-btn" type="submit">
              <i className="bi bi-search"></i>
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}
