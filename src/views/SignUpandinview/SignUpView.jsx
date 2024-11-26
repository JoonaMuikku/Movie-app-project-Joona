import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import "./SignUpView.css";

function SignUpView() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/api/users/signup", {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
      });
      login(response.data.user); // Save user data in AuthContext
      navigate("/"); // Redirect to the home page
    } catch (err) {
      if (err.response && err.response.status === 409) {
        setError("Email already exists. Please use a different email.");
      } else {
        setError("Error signing up. Please try again.");
      }
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2 className="text-center mb-4" style={{ color: "#000" }}>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label" style={{ color: "#000" }}>
              First Name
            </label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              placeholder="Enter First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="lastName" className="form-label" style={{ color: "#000" }}>
              Last Name
            </label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              placeholder="Enter Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-danger">{error}</p>}
          <button type="submit" className="btn btn-orange w-100">
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