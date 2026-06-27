import { useState } from "react";
import "./CostCalculator.css";

function CostCalculator({ accommodation }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  const {
    price,
    cleaningFee,
    serviceFee,
    occupancyTaxes,
    weeklyDiscount,
    rating,
    reviews,
  } = accommodation;

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diff = (end - start) / (1000 * 60 * 60 * 24);
    return diff > 0 ? diff : 0;
  };

  const nights = calculateNights();
  const baseTotal = price * nights;
  const discount = nights >= 7 ? weeklyDiscount : 0;
  const total = baseTotal - discount + cleaningFee + serviceFee + occupancyTaxes;

  return (
    <div className="cost-calculator">
      <div className="calculator-header">
        <div className="calculator-price">
          <span className="calc-price">${price}</span>
          <span className="calc-per-night"> /night</span>
        </div>
        <div className="calc-rating">
          ⭐ {rating} · <span className="calc-reviews">{reviews} reviews</span>
        </div>
      </div>

      {/* Date Pickers */}
      <div className="date-pickers">
        <div className="date-field">
          <label>CHECK-IN</label>
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
          />
        </div>
        <div className="date-field">
          <label>CHECKOUT</label>
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
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

      <button className="reserve-btn">Reserve</button>
      <p className="no-charge-note">You won't be charged yet</p>

      {/* Cost Breakdown */}
      {nights > 0 && (
        <div className="cost-breakdown">
          <div className="cost-row">
            <span>${price} x {nights} nights</span>
            <span>${baseTotal}</span>
          </div>
          {discount > 0 && (
            <div className="cost-row discount">
              <span>Weekly discount</span>
              <span>-${discount}</span>
            </div>
          )}
          <div className="cost-row">
            <span>Cleaning fee</span>
            <span>${cleaningFee}</span>
          </div>
          <div className="cost-row">
            <span>Service fee</span>
            <span>${serviceFee}</span>
          </div>
          <div className="cost-row">
            <span>Occupancy taxes and fees</span>
            <span>${occupancyTaxes}</span>
          </div>
          <hr className="calc-divider" />
          <div className="cost-row total">
            <span>Total</span>
            <span>${total}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default CostCalculator;