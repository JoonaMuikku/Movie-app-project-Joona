import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        {/* Dropdown Menu */}
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

        {/* Logo Placeholder */}
        <div className="d-flex align-items-center me-auto">
          <div className="rounded-circle border border-light text-center text-white" style={{ width: "50px", height: "50px", lineHeight: "50px" }}>
            Logo
          </div>
        </div>

        {/* Links */}
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
        <div >
          <button className="btn btn-outline-light mb-2">Sign Up</button>
          <button className="btn btn-primary">Sign In</button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
