import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "../src/components/layouts/Header";
import LoginForm from "../src/components/Login/LoginForm";
import CreateListing from "./pages/Listings/CreateListing";
import ViewListings from "./pages/Listings/ViewListings";

export default function App() {

  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const handleLoginSuccess = (userData) => {
    setCurrentUser(userData);
  };

  const handleLogout = () => {
    localStorage.clear();
    setCurrentUser(null);
  };

  return (
    <BrowserRouter>
      <Header user={currentUser} onLogout={handleLogout} />

      <main style={{ padding: "10px" }}>
        <Routes>
          <Route
            path="/"
            element={
              currentUser ? (
                <Navigate to="/listings" replace/>
              ) : (
                <LoginForm onLoginSuccess={handleLoginSuccess} />
              )
            }
          />
          <Route
            path="/listings"
            element={currentUser ? <ViewListings /> : <Navigate to="/" replace />}
          />
          <Route
            path="/create-listing"
            element={currentUser ? <CreateListing /> : <Navigate to="/" replace />}
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
