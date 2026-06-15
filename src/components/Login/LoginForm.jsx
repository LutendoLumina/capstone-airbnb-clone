import React, { useState } from "react";
import "./LoginForm.css";

export default function LoginForm({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // 1. Front-end Validation Checks
    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    // 2. The Trick: Use "fake" data to simulate a successful login
    if (email === "admin@airbnb.com" && password === "password123") {
      // Pass fake user data up to App.jsx to change the Header state
      onLoginSuccess({ username: "Lutendo" });
    } else {
      setError("Invalid email or password. Use admin@airbnb.com / password123");
    }
  };

  return (
    <div className="login_container">
      <div className="login_card">
        <h2>Log In</h2>
        
        {error && <p className="error_msg">{error}</p>}
        
        <form onSubmit={handleSubmit}>
          <div className="form_group">
            <label>Email Address</label>
            <input 
              type="email" 
              placeholder="name@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form_group">
            <label>Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="login_submit_btn">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}