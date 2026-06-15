import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "../src/components/layouts/Header";
import LoginForm from "../src/components/Login/LoginForm";
import CreateListing from "../src/components/Listings/CreateListing";
import ViewListings from "./components/Listings/ViewListings";

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);

  const handleLoginSuccess = (userData) => {
    setCurrentUser(userData);
  };

  return (
    <BrowserRouter>
      <Header user={currentUser} onLogout={() => setCurrentUser(null)} />

      <main style={{ padding: "10px" }}>
        <Routes>
          <Route
            path="/"
            element={
              currentUser ? (
                <Navigate to="/listings" />
              ) : (
                <LoginForm onLoginSuccess={handleLoginSuccess} />
              )
            }
          />
          <Route
            path="/listings"
            element={currentUser ? <ViewListings /> : <Navigate to="/" />}
          />
          <Route
            path="/create-listing"
            element={currentUser ? <CreateListing /> : <Navigate to="/" />}
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
