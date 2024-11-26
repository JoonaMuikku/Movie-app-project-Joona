import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";



function SignInView() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/api/users/login", {
        email,
        password,
      });
      login(response.data.user); // Save user data in AuthContext
      navigate("/"); // Redirect to the home page
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div
      className="modal show d-block"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" style={{ color: "#000" }}>Sign In</h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => navigate("/")}
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label" style={{ color: "#000" }}>
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error && <p className="text-danger">{error}</p>}
              <button type="submit" className="btn btn-orange w-100">
                Sign In
              </button>
            </form>
            <p className="text-center mt-3" style={{ color: "#000" }}>
              No account?{" "}
              <span
                className="text-primary"
                role="button"
                style={{ textDecoration: "underline", cursor: "pointer", color: "#007bff" }}
                onClick={() => navigate("/sign-up")}
              >
                Sign up
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignInView;