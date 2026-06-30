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
      const response = await fetch(
        "http://localhost:3000/api/reservations/host",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

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
    if (!window.confirm("Are you sure you want to cancel this reservation?"))
      return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:3000/api/reservations/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

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

  if (loading)
    return <div className="loader-container">Loading reservations...</div>;

  return (
    <div className="reservations-page">
      <h2>My Reservations</h2>
      {error && <p className="error-banner">{error}</p>}

      {reservations.length === 0 ? (
        <div className="empty-state">
          <p>No active property bookings found.</p>
        </div>
      ) : (
        <table className="reservations-table">
          <thead>
            <tr>
              <th>Booked by</th>
              <th>Property</th>
              <th>Checkin</th>
              <th>Checkout</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((res) => (
              <tr key={res._id}>
                <td>{res.user_id?.username || "Guest"}</td>
                <td>{res.listing_id?.title || "Property"}</td>
                <td>{new Date(res.start_date).toLocaleDateString()}</td>
                <td>{new Date(res.end_date).toLocaleDateString()}</td>
                <td>
                  <button
                    onClick={() => handleCancelBooking(res._id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
