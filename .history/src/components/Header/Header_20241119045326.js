import React from "react";

const Header = () => {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container-fluid">
        <a href="/" className="navbar-brand">
          🎥 Moviq
        </a>
        <div>
          <button className="btn btn-outline-light me-2">Sign In</button>
          <button className="btn btn-outline-light me-2">Sign Up</button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
