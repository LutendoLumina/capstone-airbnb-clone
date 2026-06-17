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


# Airbnb Admin Dashboard — (Backend Server Layer) Phase

## Features & Progress Completed
* **Unified Database Architecture:** Designed a single-collection Mongoose schema to manage user permissions (`type: "admin"` vs `"customer"`) and verification states under a streamlined structure.
* **Property Blueprint Schema:** Created a flat database model mapping input fields captured by listing creation forms (pricing, parameters, and amenities arrays).
* **Object-Oriented Server Framework:** Structured `server.ts` into a clean, modular `Server` class managing isolated cycles for initialization, routing gates, and global exception intercepts.
* **Lightweight Application Bootstrapper:** Built a simple `index.ts` entry file acting as the baseline process listener executing on local port environments.
* **Operational Health Gateway:** Wired an initial `/api/health` API testing checkpoint to successfully verify server compiles and routes incoming traffic cleanly.


## Tech Stack Used
* **Frontend:** React.js (Vite Tooling)
* **Routing Library:** `react-router-dom` (v6+)
* **Icon Packs:** `react-icons` (FontAwesome, Ionicons)
* **Styling approach:** Pure Vanilla CSS

* **Backend Object Modeling:** Mongoose / MongoDB
* **Backend Runtime:** Node.js with TypeScript support
* **API Development Partner:** Postman Client Agent