import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify"; // Import toast
import "react-toastify/dist/ReactToastify.css"; // Import toastify styles
import "./SignUpView.css";

function SignUpView() {
  const { signupUser } = useAuth(); // Use signupUser from AuthContext
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Use the AuthContext's signupUser function
      await signupUser({
        first_name: firstName,
        last_name: lastName,
        email,
        password,
      });
      toast.success("Signup successful! You are now logged in."); // Show success toast
      navigate("/"); // Redirect to the home page
    } catch (err) {
      // Handle error messages from the backend
      if (err.response && err.response.status === 409) {
        toast.error("Email already exists. Please use a different email."); // Show error toast for duplicate email
      } else {
        toast.error("Error signing up. Please try again."); // Show generic error toast
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