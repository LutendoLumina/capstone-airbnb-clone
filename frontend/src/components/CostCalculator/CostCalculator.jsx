import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./CostCalculator.css";

function CostCalculator({ accommodation }) {
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [guests, setGuests] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const {
    _id,
    base_price,
    cleaning_fee,
    service_fee,
    occupancy_taxes,
    weekly_discount,
    rating,
    reviews,
  } = accommodation;

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    const diff = (checkOut - checkIn) / (1000 * 60 * 60 * 24);
    return diff > 0 ? Math.round(diff) : 0;
  };

  const nights = calculateNights();
  const baseTotal = base_price * nights;
  const discount = nights >= 7 ? weekly_discount : 0;
  const total = baseTotal - discount + cleaning_fee + service_fee + occupancy_taxes;

  const handleReserve = async () => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (!token || !user) {
      navigate("/login");
      return;
    }

    if (!checkIn || !checkOut) {
      setMessage("Please select check-in and check-out dates.");
      return;
    }

    if (nights <= 0) {
      setMessage("Check-out date must be after check-in date.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:3000/api/reservations/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          listing_id: _id,
          start_date: checkIn,
          end_date: checkOut,
          total_price: total,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Reservation failed");
      setMessage("Reservation confirmed! 🎉");
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cost-calculator">
      <div className="calculator-header">
        <div className="calculator-price">
          <span className="calc-price">R{base_price}</span>
          <span className="calc-per-night"> /night</span>
        </div>
        <div className="calc-rating">
          ⭐ {rating || "New"} · <span className="calc-reviews">{reviews || 0} reviews</span>
        </div>
      </div>

      {/* Date Pickers */}
      <div className="date-pickers">
        <div className="date-field">
          <label>CHECK-IN</label>
          <DatePicker
            selected={checkIn}
            onChange={(date) => setCheckIn(date)}
            selectsStart
            startDate={checkIn}
            endDate={checkOut}
            minDate={new Date()}
            placeholderText="mm/dd/yyyy"
            className="date-picker-input"
          />
        </div>
        <div className="date-field">
          <label>CHECKOUT</label>
          <DatePicker
            selected={checkOut}
            onChange={(date) => setCheckOut(date)}
            selectsEnd
            startDate={checkIn}
            endDate={checkOut}
            minDate={checkIn || new Date()}
            placeholderText="mm/dd/yyyy"
            className="date-picker-input"
          />
        </div>
      </div>

      {/* Guests */}
      <div className="guests-field">
        <label>GUESTS</label>
        <input
          type="number"
          min="1"
          max={accommodation.guests}
          value={guests}
          onChange={(e) => setGuests(parseInt(e.target.value))}
        />
      </div>

      <button className="reserve-btn" onClick={handleReserve} disabled={loading}>
        {loading ? "Reserving..." : "Reserve"}
      </button>

      <p className="no-charge-note">You won't be charged yet</p>

      {message && (
        <p className={`reserve-message ${message.includes("confirmed") ? "success" : "error"}`}>
          {message}
        </p>
      )}

      {nights > 0 && (
        <div className="cost-breakdown">
          <div className="cost-row">
            <span>R{base_price} x {nights} nights</span>
            <span>R{baseTotal}</span>
          </div>
          {discount > 0 && (
            <div className="cost-row discount">
              <span>Weekly discount</span>
              <span>-R{discount}</span>
            </div>
          )}
          <div className="cost-row">
            <span>Cleaning fee</span>
            <span>R{cleaning_fee}</span>
          </div>
          <div className="cost-row">
            <span>Service fee</span>
            <span>R{service_fee}</span>
          </div>
          <div className="cost-row">
            <span>Occupancy taxes and fees</span>
            <span>R{occupancy_taxes}</span>
          </div>
          <hr className="calc-divider" />
          <div className="cost-row total">
            <span>Total</span>
            <span>R{total}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default CostCalculator;