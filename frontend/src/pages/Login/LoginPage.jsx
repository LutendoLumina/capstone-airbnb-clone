import React from "react";
import LoginForm from "../../components/Login/LoginForm";

export default function LoginPage({ onLoginSuccess }) {
  return (
    <div className="login_page_container">
        <LoginForm onLoginSuccess={onLoginSuccess} />
    </div>
  );
}