import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";

export default function LoginForm({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      //  Fire the network request to backend
      const response = await fetch("http://localhost:3000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Captures backend errors like "Email is required"
        throw new Error(data.message || data.errors?.[0] || "Login failed");
      }

      // Success! Save the JWT token and user info to localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      const loggedInUser = {
        username:
          data.user.username || data.user.name || data.user.email.split("@")[0],
        type: data.user.type,
      };
      onLoginSuccess(loggedInUser);

      // Redirect to the admin dashboard
      if(data.user.type === "admin") {
        navigate("/listings");
      } else {
        navigate("/")
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login_container">
      <div className="login_card">
        <h2>Log In</h2>

        {error && <p className="error_msg">{error}</p>}

        <form onSubmit={handleLogin}>
          <div className="form_group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form_group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" disabled={loading} className="login_submit_btn">
            {loading ? "Authenticating..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
