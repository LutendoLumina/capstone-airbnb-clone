import React, { useState } from "react";
import airbnbLogo from "../../assets/airbnb-logo.svg";
import { FaSearch } from "react-icons/fa";
import { IoMenuOutline } from "react-icons/io5";
import "./Header.css";

export default function Header({ user, onLogout }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="navbar">
      {/* Logo Section */}
      <div className="logo">
        <img src={airbnbLogo} alt="Airbnb" />
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
                <a
                  href="#listings"
                  className="dropdown_item"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  View Listings
                </a>
                <a
                  href="#reservations"
                  className="dropdown_item"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  View Reservations
                </a>
                <a
                  href="#create_listing"
                  className="dropdown_item"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Create Listing
                </a>
                <hr />
                <button
                  className="dropdown_item logout_btn"
                  onClick={() => {
                    onLogout();
                    setIsDropdownOpen(false);
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
            <a href="#login" className="login_btn">
              Log In
            </a>
          </div>
        )}
      </div>
    </div>
  );
}