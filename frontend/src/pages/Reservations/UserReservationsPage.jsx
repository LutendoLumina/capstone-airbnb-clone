import { useState, useEffect } from "react";
import "./UserReservationsPage.css";

export default function UserReservationsPage() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchReservations = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/api/reservations/user", {
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
      setError("Network error loading reservations.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const handleDelete = async (id) => {
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
        setReservations((prev) => prev.filter((res) => res._id !== id));
      } else {
        alert(result.message || "Failed to cancel reservation");
      }
    } catch (err) {
      alert("Error contacting the server.");
    }
  };

  if (loading) return <div className="loader">Loading your reservations...</div>;

  return (
    <div className="user-reservations-page">
      <h2>My Reservations</h2>

      {error && <p className="error-banner">{error}</p>}

      {reservations.length === 0 ? (
        <div className="empty-state">
          <p>You have no reservations yet.</p>
        </div>
      ) : (
        <table className="reservations-table">
          <thead>
            <tr>
              <th>Property</th>
              <th>Location</th>
              <th>Check In</th>
              <th>Check Out</th>
              <th>Total Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((res) => (
              <tr key={res._id}>
                <td>{res.listing_id?.title || "Property"}</td>
                <td>{res.listing_id?.location || "—"}</td>
                <td>{new Date(res.start_date).toLocaleDateString()}</td>
                <td>{new Date(res.end_date).toLocaleDateString()}</td>
                <td>R{res.total_price}</td>
                <td>
                  <span className={`status-badge ${res.status}`}>
                    {res.status}
                  </span>
                </td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(res._id)}
                  >
                    Cancel
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