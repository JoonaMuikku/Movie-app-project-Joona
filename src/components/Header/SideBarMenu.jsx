import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // Import AuthContext

export default function SideBarMenu({ isOpen, toggleSidebar }) {
  const { user, logout, deleteUserAccount } = useAuth(); // Access user, logout, and deleteAccount from AuthContext
  const [hovered, setHovered] = useState(null); // Track hovered button

  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure you want to delete your account? This action is irreversible.")) {
      try {
        await deleteUserAccount(); // Call delete account
        alert("Your account has been deleted.");
        toggleSidebar(); // Close sidebar after deletion
      } catch (error) {
        alert("Failed to delete account: " + error.message);
      }
    }
  };

  return (
    <>
      <div
        className={`d-flex flex-column bg-dark text-white position-fixed top-0 start-0 h-100 p-3 ${isOpen ? "" : "d-none"}`}
        style={{ width: "250px", zIndex: 1050 }}
      >
        {/* App Name */}
        <Link to="/" className="navbar-brand fw-bold fs-3 mb-3 mb-md-5">
          Moviq
        </Link>

        <ul className="nav nav-pills flex-column">
          {/* User-specific links */}
          {user ? (
            <>
              <li className="nav-item mb-2">
                <span className="nav-link text-white rounded-0 elem-hover">
                  <i className="bi bi-person me-2"></i> {user.first_name}
                </span>
              </li>
              <li className="nav-item">
                <button
                  className="btn nav-link text-white rounded-0 elem-hover"
                  onClick={() => {
                    logout();
                    toggleSidebar();
                  }}
                  onMouseEnter={() => setHovered("logout")}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    backgroundColor: hovered === "logout" ? "#ff5733" : "transparent",
                    color: hovered === "logout" ? "#ffffff" : "#ffffff",
                    borderRadius: hovered === "logout" ? "4px" : "0",
                    padding: "0.5rem 1rem",
                    textAlign: "left", 
                    width: "100%", 
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                >
                  <i className="bi bi-box-arrow-right me-2"></i> Logout
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="btn nav-link text-danger rounded-0 elem-hover"
                  onClick={handleDeleteAccount}
                  onMouseEnter={() => setHovered("delete")}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    backgroundColor: hovered === "delete" ? "#721c24" : "transparent",
                    color: hovered === "delete" ? "#ffffff" : "#dc3545",
                    borderRadius: hovered === "delete" ? "4px" : "0",
                    padding: "0.5rem 1rem",
                    textAlign: "left", 
                    width: "100%", 
                    cursor: "pointer", 
                    transition: "all 0.3s ease",
                  }}
                >
                  <i className="bi bi-trash me-2"></i> Delete Account
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item mb-2">
                <Link
                  to="sign-in"
                  className="nav-link text-white rounded-0 elem-hover"
                  onClick={toggleSidebar}
                >
                  <i className="bi bi-pencil-square me-2"></i> Sign In
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link
                  to="sign-up"
                  className="nav-link text-white rounded-0 elem-hover"
                  onClick={toggleSidebar}
                >
                  <i className="bi bi-person-plus me-2"></i> Sign Up
                </Link>
              </li>
            </>
          )}

          {/* Common links */}
          <li className="nav-item mb-2">
            <Link
              to="movies"
              className="nav-link d-block text-white rounded-0 elem-hover"
              onClick={toggleSidebar}
            >
              <i className="bi bi-archive me-2"></i> Movies
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="groups"
              className="nav-link text-white rounded-0 elem-hover"
              onClick={toggleSidebar}
            >
              <i className="bi bi-people me-2"></i> Groups
            </Link>
          </li>
        </ul>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
          style={{ zIndex: 1049 }}
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
}