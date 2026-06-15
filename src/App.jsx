import React, { useState } from "react";
import Header from "../src/components/layouts/Header";
import LoginForm from "../src/components/Login/LoginForm"
import CreateListing from "../src/components/Listings/CreateListing";

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <div>
      <Header user={currentUser} onLogout={() => setCurrentUser(null)} />
      
      <main style={{ padding: "10px" }}>
        {currentUser ? (
          <CreateListing />
        ) : (
          <LoginForm onLoginSuccess={(userData) => setCurrentUser(userData)} />
        )}
      </main>
    </div>
  );
}