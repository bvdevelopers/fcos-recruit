// src/Login.js
import React, { useState } from "react";
import { useNavigate  } from "react-router-dom";
import logo from './img/logo.ico'

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate  = useNavigate ();

  const handleLogin = (e) => {
    e.preventDefault();
    // Example: Check credentials (you would normally call an API here)
    if (username === "user" && password === "password") {
      const authToken = "yourAuthToken"; // Get this from your API response
      
      if (rememberMe) {
        localStorage.setItem("authToken", authToken); // Save token for long-term
      } else {
        sessionStorage.setItem("authToken", authToken); // Save token for session
      }
      
      navigate("/home"); // Redirect to dashboard
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
    <div className="card shadow p-4" style={{ width: '25rem' }}>
      <div className="text-center mb-4">
        <img src={logo} alt="Company Logo" style={{ height: '80px' }} />
      </div>
      <form onSubmit={handleLogin}>
        <div className="form-group mb-3">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </div>
        <div>
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <label>Remember Me</label>
        </div>
        <button type="submit" className="btn btn-primary w-100">Login</button>
      </form>
    </div>
  </div>
  );
}

export default Login;
