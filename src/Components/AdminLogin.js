import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = ({ setIsAdmin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const validUsername = "admin"; // 👈 You can fetch this from backend later
  const validPassword = "admin123";

  const handleLogin = () => {
    if (username === validUsername && password === validPassword) {
      setIsAdmin(true);
      navigate("/admin-dashboard");
    } else {
      alert("Invalid username or password!");
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(12,13,52,0.9), rgba(3,165,175,0.9)), url('/images/ship-port.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
      }}
    >
      

        {/* Right side - Login Form */}
        <div
          className="col-md-6 p-4 rounded"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <h2 className="fw-bold mb-3">Welcome!</h2>
          <p className="mb-4" style={{ fontSize: "14px" }}>
            Some people spend an entire lifetime wondering if they made a
            difference in the world, but pet lovers don’t have that problem 🐾
          </p>

          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="form-group mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-check mb-3">
            <input className="form-check-input" type="checkbox" id="rememberMe" />
            <label className="form-check-label" htmlFor="rememberMe">
              Remember me
            </label>
          </div>

          <button className="btn btn-light w-100 mb-3" onClick={handleLogin}>
            Login
          </button>

          <div className="d-flex justify-content-between" style={{ fontSize: "14px" }}>
            <a href="/signup" className="text-white">
              New User? Sign Up
            </a>
            <a href="/forgot-password" className="text-white">
              Forgot Password
            </a>
          </div>
        </div>
      </div>
    
  );
};

export default AdminLogin;
