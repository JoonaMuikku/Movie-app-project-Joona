import React, { useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import SideBarMenu from "./SideBarMenu";
import "./Header.css";

export default function HeaderView() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
};

  return (
    <div className="sticky-top py-3 _navigation">
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          

          <div>
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
          <SearchBar />

          <button className="btn btn-orange-transparent fs-6 rounded-0 px-4 px-3">
            <Link to="sign-in">
              SignIn
            </Link>
          </button>

        </div>
      </nav>

      {/* Sidebar Menu */}
      <SideBarMenu isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </div>
  );
}
