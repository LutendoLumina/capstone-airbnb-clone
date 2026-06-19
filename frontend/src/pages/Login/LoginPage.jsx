import React from "react";
import LoginForm from "../../components/Login/LoginForm";
import "./LoginPage.css";

export default function LoginPage({ onLoginSuccess }) {
  return (
    <div className="login_page_container">
      <div className="login_page_hero">
        <div className="hero_overlay_text">
          <h1>Stay Connected.</h1>
          <p>Manage your luxury accommodation listings and dashboard configurations in real-time.</p>
        </div>
      </div>
      
      <div className="login_page_form_panel">
        <LoginForm onLoginSuccess={onLoginSuccess} />
      </div>
    </div>
  );
}