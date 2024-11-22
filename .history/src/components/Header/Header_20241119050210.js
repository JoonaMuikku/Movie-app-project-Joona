import React, { useState } from "react";
import "./Header.css"; // Add custom styles for the sidebar

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          {/* Hamburger Menu Icon */}
          <button className="btn btn-outline-light" onClick={toggleSidebar}>
            <i className="bi bi-list"></i> {/* Bootstrap hamburger icon */}
          </button>

          {/* App Name */}
          <span className="navbar-brand fw-bold fs-3 ms-3">
            Moviq
          </span>
        </div>
      </nav>

      {/* Sidebar */}
      <div className={`sidebar bg-dark ${sidebarOpen ? "open" : ""}`}>
        <button className="btn-close text-reset ms-auto" onClick={toggleSidebar}></button>
      </div>
    </>
  );
};

export default Header;
