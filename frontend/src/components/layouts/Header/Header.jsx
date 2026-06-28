import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import airbnbLogo from "../../../assets/airbnb-logo.svg";
import { FaSearch } from "react-icons/fa";
import { IoMenuOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import "./Header.css";

export default function Header({ user, onLogout }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(0);
  const [locations, setLocations] = useState([]);
  const navigate = useNavigate();

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const closeDropdown = () => setIsDropdownOpen(false);

  // Fetch unique locations from backend
  useEffect(() => {
    fetch("http://localhost:3000/api/listings/public")
      .then((res) => res.json())
      .then((data) => {
        console.log("Listings data:", data);
        if (data.success) {
          const unique = [
            "All Locations",
            ...new Set(data.data.map((l) => l.location)),
          ];
          console.log("Locations:", unique);
          setLocations(unique);
        }
      })
      .catch((err) => console.log("Fetch error:", err));
  }, []);

  const handleSearch = () => {
    if (!location || location === "All Locations") {
      navigate("/location");
    } else {
      navigate(`/location?location=${encodeURIComponent(location)}`);
    }
  };

  return (
    <div className="navbar">
      {/* Logo */}
      <div className="logo">
        <Link to="/">
          <img src={airbnbLogo} alt="Airbnb" />
        </Link>
      </div>

      {/* Search Bar */}
      <div className="search_bar">
        <div className="search_field">
          <label className="search_label">Locations</label>
          <select
            className="search_select"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="">Select a location</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>

        <div className="search_divider" />

        <div className="search_field">
          <label className="search_label">Check in date</label>
          <input
            type="date"
            className="search_date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
          />
        </div>

        <div className="search_divider" />

        <div className="search_field">
          <label className="search_label">Checkout date</label>
          <input
            type="date"
            className="search_date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
          />
        </div>

        <div className="search_divider" />

        <div className="search_field">
          <label className="search_label">Guests</label>
          <input
            type="number"
            className="search_guests"
            min="0"
            value={guests}
            placeholder="0 guests"
            onChange={(e) => setGuests(parseInt(e.target.value))}
          />
        </div>

        <button className="search_icon_btn" onClick={handleSearch}>
          <FaSearch />
        </button>
      </div>

      {/* Right Menu */}
      <div className="menu">
        <a href="#" className="become_host_link">Become a host</a>

        <div className="profile_menu_container">
          <button className="menu_dropdown_toggle" onClick={toggleDropdown}>
            <IoMenuOutline className="menu_icon" />
            {user ? (
              <div className="avatar_placeholder">
                {user.username.charAt(0).toUpperCase()}
              </div>
            ) : (
              <CgProfile className="profile_icon" />
            )}
          </button>

          {isDropdownOpen && (
            <div className="dropdown_menu">
              {!user && (
                <>
                  <Link to="/login" className="dropdown_item" onClick={closeDropdown}>Log In</Link>
                  <Link to="/signup" className="dropdown_item" onClick={closeDropdown}>Sign Up</Link>
                </>
              )}
              {user?.type === "admin" && (
                <>
                  <Link to="/listings" className="dropdown_item" onClick={closeDropdown}>View Listings</Link>
                  <Link to="/reservations" className="dropdown_item" onClick={closeDropdown}>View Reservations</Link>
                  <Link to="/create-listing" className="dropdown_item" onClick={closeDropdown}>Create Listing</Link>
                  <hr />
                  <button className="dropdown_item logout_btn" onClick={() => { onLogout(); closeDropdown(); navigate("/"); }}>
                    Log Out
                  </button>
                </>
              )}
              {user?.type === "user" && (
                <>
                  <Link to="/my-reservations" className="dropdown_item" onClick={closeDropdown}>View Reservations</Link>
                  <hr />
                  <button className="dropdown_item logout_btn" onClick={() => { onLogout(); closeDropdown(); navigate("/"); }}>
                    Log Out
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}