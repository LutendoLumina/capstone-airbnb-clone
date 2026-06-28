import React, { useState, useEffect } from "react";
import "./ReservationsPage.css";

export default function ReservationsPage() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchReservations = async () => {
    try {
      const token = localStorage.getItem("token");
      // Calling our newly completed backend host route to see who booked our properties
      const response = await fetch("http://localhost:3000/api/reservations/host", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      if (result.success) {
        setReservations(result.data);
      } else {
        setError(result.message || "Failed to fetch reservations");
      }
    } catch (err) {
      setError("Network communication error loading data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const handleCancelBooking = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this reservation?")) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3000/api/reservations/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      if (result.success) {
        // Instant UI feedback: remove deleted reservation from view layout state natively
        setReservations((prev) => prev.filter((res) => res._id !== id));
      } else {
        alert(result.message || "Failed to delete reservation");
      }
    } catch (err) {
      alert("Error contacting the server.");
    }
  };

  if (loading) return <div className="loader-container">Loading reservations...</div>;

  return (
    <div className="reservations-page">
      <h2>Manage Bookings & Reservations</h2>
      {error && <p className="error-banner">{error}</p>}

      {reservations.length === 0 ? (
        <div className="empty-state">
          <p>No active property bookings found for your host profile.</p>
        </div>
      ) : (
        <div className="reservations-grid">
          {reservations.map((res) => (
            <div key={res._id} className="reservation-card">
              <div className="res-details">
                <h3>{res.listing_id?.title || "Property Listing"}</h3>
                <p className="res-location">📍 {res.listing_id?.location}</p>
                <hr />
                <p><strong>Guest:</strong> {res.user_id?.username} ({res.user_id?.email})</p>
                <p><strong>Check-In:</strong> {new Date(res.start_date).toLocaleDateString()}</p>
                <p><strong>Check-Out:</strong> {new Date(res.end_date).toLocaleDateString()}</p>
                <p className="res-price"><strong>Total Earnings:</strong> R{res.total_price}</p>
              </div>
              <div className="res-actions">
                <span className={`status-badge ${res.status}`}>{res.status}</span>
                <button 
                  onClick={() => handleCancelBooking(res._id)} 
                  className="cancel-btn"
                >
                  Cancel Booking
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}