# Airbnb Admin Dashboard Clone — Frontend Phase

This project is an Admin Dashboard for an Airbnb clone built using React and organized into clean development features.

## Features Completed
* **Top Header Navigation Feature:** Includes the logo, an interactive search button placeholder, and a dynamic profile menu toggle that shifts options depending on user states.
* **Log In Feature:** Handles client-side validation checks (proper email structure and password length threshold) before routing to the workspace panel via dummy credentials (`admin@airbnb.com` / `password123`).
* **Create Listing Feature:** A comprehensive property form panel containing inputs capturing titles, prices, descriptions, metrics (bedrooms, bathrooms, max guests), separate extra pricing lines (cleaning fees, service fees, occupancy taxes, weekly discounts), and checked amenities options.
* **View Listings Feature:** Displays created properties in a clean, responsive card layout grid complete with administrative action control buttons to simulate updating or deleting specific listings.
* **Client-Side Routing Engine:** Integrated `react-router-dom` to manage multi-page browser states cleanly (`/`, `/listings`, `/create-listing`) without causing browser hard re-loads.

# Database Layer Phase

This project is an Admin Dashboard for an Airbnb clone built using React for the frontend and Node/TypeScript for the backend data schemas.

## Features & Progress Completed
* **Unified Database Architecture:** Designed a unified MongoDB schema structure using Mongoose to manage authentication roles (`type: "admin"` vs `"customer"`), status logs, and verification fields seamlessly under a single collection.
* **Property Blueprint Schema:** Formulated a clean database model mapping all inputs captured by the listing creation forms (pricing metrics, room configurations, and checkable amenities arrays).
* **Fully Formatted TypeScript Types:** Structured data layers with robust Node/TypeScript compiler tracking parameters.
* **Client-Side Routing Engine:** Integrated `react-router-dom` to manage multi-page browser states cleanly (`/`, `/listings`, `/create-listing`).


## Tech Stack Installed
* **Frontend Framework:** React.js (Vite Tooling)
* **Routing Library:** `react-router-dom` (v6+)
* **Icon Packs:** `react-icons` (FontAwesome, Ionicons)
* **Styling approach:** Pure Vanilla CSS

* **Frontend Framework:** React.js (Vite Tooling)
* **Backend Object Modeling:** Mongoose / MongoDB
* **Language Runtime:** Node.js with TypeScript support