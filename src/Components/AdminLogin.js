import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = ({ setIsAdmin }) => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const adminPassword = "admin123"; // Change this as needed

  const handleLogin = () => {
    if (password === adminPassword) {
      setIsAdmin(true); // ✅ Update isAdmin state in App.js
      navigate("/admin-dashboard"); // ✅ Redirect after login
    } else {
      alert("Incorrect password! Try again.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Admin Login</h2>
      <input
        type="password"
        placeholder="Enter Admin Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default AdminLogin;
