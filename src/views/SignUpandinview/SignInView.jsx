import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import "./SignInSignUpView.css";

function SignInView() {
  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Use the AuthContext's loginUser function
      await loginUser({ email, password });
      toast.success("Login successful!"); // Show success toast
      navigate("/"); // Redirect to the home page
    } catch (err) {
      toast.error("Invalid email or password."); // Show error toast
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-card">
        <h2>Sign In</h2> {/* Title explicitly set */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-danger">{error}</p>}
          <button type="submit" className="btn btn-orange w-100">Sign In</button>
        </form>
        <p className="text-center mt-3">
          No account?{" "}
          <span className="text-primary" onClick={() => navigate("/sign-up")}>
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}

export default SignInView;