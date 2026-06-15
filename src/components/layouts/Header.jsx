import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import airbnbLogo from "../../assets/airbnb-logo.svg";
import { FaSearch } from "react-icons/fa";
import { IoMenuOutline } from "react-icons/io5";
import "./Header.css";

export default function Header({ user, onLogout }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="navbar">
      {/* Logo Section */}
      <div className="logo">
        <Link to={user ? "/listings" : "/"}>
          <img src={airbnbLogo} alt="Airbnb" />
        </Link>
      </div>

      {/* Search section*/}
      <div className="search">
        <button className="search_btn">
          Start your search <FaSearch className="search_icon" />
        </button>
      </div>

      {/* Profile Menu Section */}
      <div className="menu">
        {user ? (
          // Logged In State (Admin View)
          <div className="profile_menu_container">
            <span className="user_greeting">Hello, {user.username}</span>
            <button className="menu_dropdown_toggle" onClick={toggleDropdown}>
              <IoMenuOutline />
              <div className="avatar_placeholder">
                {user.username.charAt(0).toUpperCase()}
              </div>
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="dropdown_menu">
                <Link
                  to="/listings"
                  className="dropdown_item"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  View Listings
                </Link>
                <Link
                  to="/reservations"
                  className="dropdown_item"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  View Reservations
                </Link>
                <Link
                  to="/create-listing"
                  className="dropdown_item"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Create Listing
                </Link>
                <hr />
                <button
                  className="dropdown_item logout_btn"
                  onClick={() => {
                    onLogout();
                    setIsDropdownOpen(false);
                    navigate("/");
                  }}
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
        ) : (
          // Logged Out State (Guest View)
          <div className="logged_out">
            <a href="#become_host" className="become_host_link">
              Become a host
            </a>
            <Link to="/" className="login_btn">
              Log In
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
