# Airbnb Admin Dashboard Clone

This repository contains the full-stack architecture for an Airbnb Admin Dashboard clone, featuring an interactive React frontend and an object-oriented Node.js/TypeScript backend backend server layer backed by MongoDB Atlas.

---

## System Architecture & Data Flow

Data flows seamlessly across the three tiers of the application:
Frontend (React/Vite) ↔ Backend API (Node/TypeScript) ↔ Database Layer (MongoDB Atlas)

---

## Features & Progress Completed

### 1. Frontend Phase (Admin UI)
* **Top Header Navigation:** Features responsive layout branding, placeholder search triggers, and dynamic profile action toggles shifting options based on session state.
* **Authentication UI Gate:** Client-side validation handling proper email formats and password lengths before routing to dashboard panels via mock sessions.
* **Create Listing Module:** Detailed property entry capturing baseline metrics (titles, configurations, max guests), variable fee calculations (cleaning/service metrics, weekly discounts), and checkable feature arrays.
* **View Listings Engine:** Dynamic, responsive card layouts rendering created assets equipped with admin control vectors for editing/deleting simulation.
* **Client-Side Router:** Integrated `react-router-dom` (v6+) for single-page browser history handling without triggering native page updates.

### 2. Database & Schema Layer
* **Unified Identity Architecture:** Single-collection Mongoose data schema mapping authentication privileges (`admin` vs `customer`), logging tracking parameters, and authorization states.
* **Property Blueprint Schema:** Flattened model mapping database entry requirements directly to form parameters (pricing arrays, configurations, amenities fields).
* **Strict Interface Compilation:** Integrated comprehensive Node/TypeScript interface abstractions guarding compile-time validity across properties and schemas.

### 3. Backend Server Layer & Connection Engine
* **Object-Oriented Lifecycle:** Modular `Server` class framework handling separate app configurations, endpoint routing, and global exception interceptors.
* **Operational Health Checks:** Live `/api/health` testing path tracking clean backend runtime execution.
* **Dynamic Environment Injection:** Fixed module loading race conditions by transitioning plain configuration objects into executable Arrow Functions. This defers variable lookups until *after* the application bootstrapper loads root `.env` values.
* **DNS Resolution Override:** Bypassed local network ISP firewalls and SRV lookup drop failures (`querySrv ECONNREFUSED`) by coupling Node's native `dns` module with **Google Public DNS (`8.8.8.8` / `8.8.4.4`)** at the absolute start of the application.

---

## 💻 Tech Stack
* **Frontend UI Engine:** React.js via Vite compilation
* **Browser State Controller:** `react-router-dom` (v6+)
* **Icon UI Packs:** `react-icons` (FontAwesome, Ionicons)
* **Design Implementation:** Pure Vanilla CSS
* **Database Object Modeling:** Mongoose ORM / MongoDB Atlas
* **Server Runtime:** Node.js + TypeScript Compilation
* **API Validation Agent:** Postman Client Testing Suite