import React, { useState } from "react";
import Header from "../src/components/layouts/Header";
import LoginForm from "../src/components/Login/LoginForm";

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <div>
      {/* Header updates dynamically based on currentUser state */}
      <Header user={currentUser} onLogout={() => setCurrentUser(null)} />
      
      <main style={{ padding: "20px" }}>
        {currentUser ? (
          <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Welcome back, {currentUser.username}!</h1>
            <p>Use the Header dropdown menu to log out and test the form again.</p>
          </div>
        ) : (
          <LoginForm onLoginSuccess={(userData) => setCurrentUser(userData)} />
        )}
      </main>
    </div>
  );
}