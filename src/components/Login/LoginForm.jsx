import React, { useState } from 'react';
import './LoginForm.css';

export default function LoginForm({ onLoginSuccess }) {
  // Controlled form input states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Validation error feedback states
  const [errors, setErrors] = useState({});

  const handleValidation = () => {
    let localErrors = {};
    let isValid = true;

    if (!email) {
      localErrors.email = "Email address is required.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      localErrors.email = "Please enter a valid email format (e.g., name@domain.com).";
      isValid = false;
    }

    if (!password) {
      localErrors.password = "Password field cannot be empty.";
      isValid = false;
    } else if (password.length < 6) {
      localErrors.password = "Password must be at least 6 characters long.";
      isValid = false;
    }

    setErrors(localErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Clear old validation flags
    setErrors({});

    if (handleValidation()) {
      // Hardcoded Fake Authentication Trick for testing UI routing
      if (email === "admin@airbnb.com" && password === "password123") {
        // Trigger simulated success callback to update main app state
        onLoginSuccess({
          username: "John Doe",
          email: email
        });
      } else {
        setErrors({
          form: "Invalid credentials. Try admin@airbnb.com / password123"
        });
      }
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-card">
        <h2>Log In to Admin Dashboard</h2>
        
        {errors.form && <div className="error-banner global-error">{errors.form}</div>}

        <form onSubmit={handleSubmit} noValidate>
          {/* Email Input Field Group */}
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              className={errors.email ? "input-error" : ""}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="enter admin@airbnb.com"
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          {/* Password Input Field Group */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className={errors.password ? "input-error" : ""}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="enter password123"
            />
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>

          <button type="submit" className="submit-login-btn">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}