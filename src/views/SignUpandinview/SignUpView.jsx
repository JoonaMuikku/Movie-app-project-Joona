import React from "react";
import { useNavigate } from "react-router-dom";
import "./SignUpView.css";
function SignUpView() {
  const navigate = useNavigate();

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2 className="text-center mb-4" style={{ color: "#000" }}>Sign Up</h2>
        <form>
        <div className="mb-3">
            <label htmlFor="firstName" className="form-label" style={{ color: "#000" }}>
              First Name
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Enter First Name"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="lastName" className="form-label" style={{ color: "#000" }}>
              Last Name
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Enter Last Name"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label" style={{ color: "#000" }}>
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter email"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label" style={{ color: "#000" }}>
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter password"
            />
          </div>
          <button type="submit" className="btn btn-orange w-100" >
            Sign Up
          </button>
        </form>
        <p className="text-center mt-3" style={{ color: "#000" }}>
          Already have an account?{" "}
          <span
            className="text-primary"
            role="button"
            style={{ textDecoration: "underline", cursor: "pointer" }}
            onClick={() => navigate("/sign-in")}
          >
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
}

export default SignUpView;
