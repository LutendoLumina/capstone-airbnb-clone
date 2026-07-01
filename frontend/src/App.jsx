import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/layouts/Header/Header";
import Footer from "./components/layouts/Footer/Footer";
import CreateListing from "./pages/Listings/CreateListing";
import ViewListings from "./pages/Listings/ViewListings";
import LoginPage from "./pages/Login/LoginPage";
import ReservationsPage from "./pages/Reservations/ReservationsPage";
import UserReservationsPage from "./pages/Reservations/UserReservationsPage";
import HomePage from "./pages/Home/HomePage";
import LocationPage from "./pages/Location/LocationPage";
import LocationDetailsPage from "./pages/Location/LocationDetailsPage";

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
          <Route path="/" element={<HomePage />} />

          <Route
            path="/login"
            element={
              currentUser ? (
                currentUser.type === "admin" ? (
                  <Navigate to="/listings" replace />
                ) : (
                  <Navigate to="/" replace />
                )
              ) : (
                <LoginPage onLoginSuccess={handleLoginSuccess} />
              )
            }
          />

          {/* Protected Admin Panels */}
          <Route
            path="/listings"
            element={
              currentUser ? <ViewListings /> : <Navigate to="/" replace />
            }
          />
          <Route
            path="/create-listing"
            element={
              currentUser ? <CreateListing /> : <Navigate to="/" replace />
            }
          />
          <Route
            path="/reservations"
            element={
              currentUser ? <ReservationsPage /> : <Navigate to="/" replace />
            }
          />
          <Route
            path="/my-reservations"
            element={
              currentUser ? (
                <UserReservationsPage />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route path="/location" element={<LocationPage />} />
          <Route path="/listings/:id" element={<LocationDetailsPage />} />

          {/* Fallback - redirects unknown paths back to Home  */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
