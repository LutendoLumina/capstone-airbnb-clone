# Airbnb Admin Dashboard Clone — Frontend Phase

This project is an Admin Dashboard for an Airbnb clone built using React and organized into clean development features.

## Features Completed
* **Client-Side Routing Engine:** Integrated `react-router-dom` to manage multi-page browser states cleanly without causing sluggish browser hard re-loads.
* **Protected App Access Structures:** Configured conditional router interceptors that force unauthenticated guest views straight back to the login gateway path (`/`) if they attempt to guess admin links.
* **Top Header Navigation Links:** Revamped the profile toggle dropdown selection menus using `<Link>` nodes to shift URL routes dynamically between the property tables (`/listings`) and workspace data collection sheets (`/create-listing`).
* **Inline Validation Forms:** Includes a standalone validation login card (`admin@airbnb.com` / `password123`) and a fully responsive property parameters layout sheet with mock execution listeners.

## Tech Stack Installed
* **Frontend Framework:** React.js (Vite Tooling)
* **Routing Library:** `react-router-dom` (v6+)
* **Icon Packs:** `react-icons` (FontAwesome, Ionicons)
* **Styling approach:** Pure Vanilla CSS