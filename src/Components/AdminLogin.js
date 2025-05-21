import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = ({ setIsAdmin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const validUsername = "admin";
  const validPassword = "admin123";

  const handleLogin = () => {
    if (username === validUsername && password === validPassword) {
      setIsAdmin(true);
      navigate("/admin-dashboard");
    } else {
      alert("Invalid username or password!");
    }
  };

  // Floating paw effect
  useEffect(() => {
    const createPaw = () => {
      const paw = document.createElement("div");
      paw.innerHTML = "🐾";
      paw.style.position = "absolute";
      paw.style.fontSize = `${Math.random() * 20 + 10}px`;
      paw.style.opacity = Math.random() * 0.5 + 0.3;
      paw.style.left = `${Math.random() * 100}vw`;
      paw.style.top = `${Math.random() * 100}vh`;
      paw.style.animation = `float ${Math.random() * 10 + 5}s linear infinite`;
      document.body.appendChild(paw);

      setTimeout(() => {
        paw.remove();
      }, 10000);
    };

    const interval = setInterval(createPaw, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100"
      style={{
        background: "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)",
        backgroundSize: "400% 400%",
        animation: "gradient 15s ease infinite",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Floating paws (rendered via useEffect) */}
      <style>
        {`
          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          @keyframes float {
            0% { transform: translateY(0) rotate(0deg); }
            100% { transform: translateY(-100vh) rotate(360deg); }
          }
        `}
      </style>

      {/* Dog illustration (right side) */}
      <div
        style={{
          position: "absolute",
          right: "5%",
          bottom: "10%",
          width: "200px",
          height: "200px",
          backgroundImage: "url('https://img.icons8.com/plasticine/200/dog.png')",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          opacity: 0.8,
          filter: "drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))",
          transition: "all 0.5s ease",
          transform: isHovered ? "rotate(10deg) scale(1.1)" : "none",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />

      {/* Login card */}
      <div
        className="col-md-5 col-lg-4 p-5 rounded-5 shadow-lg"
        style={{
          background: "rgba(255, 255, 255, 0.15)",
          borderRadius: "16px",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow: "0 8px 32px rgba(31, 38, 135, 0.37)",
          zIndex: 10,
          transition: "transform 0.3s ease",
          transform: isHovered ? "scale(1.02)" : "none",
        }}
      >
        <div className="text-center mb-4">
          <div
            style={{
              width: "80px",
              height: "80px",
              backgroundColor: "rgba(255, 255, 255, 0.3)",
              borderRadius: "50%",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "20px",
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
              transition: "all 0.3s ease",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              fill="#fff"
              viewBox="0 0 16 16"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
            </svg>
          </div>
          <h2 className="fw-bold mb-2" style={{ color: "#fff", textShadow: "0 2px 4px rgba(0,0,0,0.2)" }}>
            Admin Portal
          </h2>
          <p style={{ color: "#f0f0f0", fontSize: "0.9rem", textShadow: "0 1px 2px rgba(0,0,0,0.1)" }}>
            🐶 Manage pet adoption system with admin privileges
          </p>
        </div>

        <div className="form-group mb-4">
          <label
            htmlFor="username"
            className="form-label"
            style={{ color: "#fff", fontWeight: "500" }}
          >
            Username
          </label>
          <input
            id="username"
            type="text"
            className="form-control py-2"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              border: "1px solid rgba(255, 255, 255, 0.3)",
              borderRadius: "10px",
              transition: "all 0.3s",
              outline: "none",
              boxShadow: "inset 0 0 8px rgba(0,0,0,0.1)",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              color: "#fff",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#fff";
              e.target.style.boxShadow = "0 0 0 2px rgba(255, 255, 255, 0.3)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "rgba(255, 255, 255, 0.3)";
              e.target.style.boxShadow = "inset 0 0 8px rgba(0,0,0,0.1)";
            }}
          />
        </div>

        <div className="form-group mb-4">
          <label
            htmlFor="password"
            className="form-label"
            style={{ color: "#fff", fontWeight: "500" }}
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            className="form-control py-2"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              border: "1px solid rgba(255, 255, 255, 0.3)",
              borderRadius: "10px",
              transition: "all 0.3s",
              outline: "none",
              boxShadow: "inset 0 0 8px rgba(0,0,0,0.1)",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              color: "#fff",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#fff";
              e.target.style.boxShadow = "0 0 0 2px rgba(255, 255, 255, 0.3)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "rgba(255, 255, 255, 0.3)";
              e.target.style.boxShadow = "inset 0 0 8px rgba(0,0,0,0.1)";
            }}
          />
        </div>

        <div className="d-flex justify-content-between mb-4">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="rememberMe"
              style={{ borderColor: "rgba(255, 255, 255, 0.5)" }}
            />
            <label
              className="form-check-label"
              htmlFor="rememberMe"
              style={{ color: "#f0f0f0", fontSize: "0.9rem" }}
            >
              Remember me
            </label>
          </div>
          <a
            href="/forgot-password"
            style={{
              color: "#dcd6f7",
              fontSize: "0.9rem",
              textDecoration: "none",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => (e.target.style.textDecoration = "underline")}
            onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
          >
            Forgot password?
          </a>
        </div>

        <button
          className="btn w-100 py-2 mb-3"
          onClick={handleLogin}
          style={{
            background: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
            color: "white",
            borderRadius: "10px",
            fontWeight: "600",
            border: "none",
            transition: "all 0.3s ease-in-out",
            transform: "translateY(0)",
            boxShadow: "0 4px 15px rgba(67, 233, 123, 0.4)",
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "translateY(-3px)";
            e.target.style.boxShadow = "0 6px 20px rgba(67, 233, 123, 0.6)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "0 4px 15px rgba(67, 233, 123, 0.4)";
          }}
          onMouseDown={(e) => (e.target.style.transform = "translateY(1px)")}
          onMouseUp={(e) => (e.target.style.transform = "translateY(-3px)")}
        >
          Login
        </button>

        <div className="text-center mt-4">
          <p style={{ color: "#eee", fontSize: "0.9rem" }}>
            Need help?{" "}
            <a
              href="/contact-support"
              style={{
                color: "#e0c3fc",
                textDecoration: "none",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => (e.target.style.textDecoration = "underline")}
              onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
            >
              Contact support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;