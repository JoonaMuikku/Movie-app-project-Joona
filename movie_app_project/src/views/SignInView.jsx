import React from "react";
import { useNavigate } from "react-router-dom";

function SignInView() {
  const navigate = useNavigate();

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
            <form>
              <div className="mb-3">
                <label htmlFor="email" className="form-label" style={{ color: "#000" }}>
                  Email address
                </label>
                <input type="email" className="form-control" id="email" />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label" style={{ color: "#000" }}>
                  Password
                </label>
                <input type="password" className="form-control" id="password" />
              </div>
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
