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

### 4. Secure Authentication Pipeline (Admin Login Backend)
* **Cryptographic Secret Key Utility:** Custom random key generation utility using Node's native `crypto` module to output 32-byte hexadecimal random keys (`crypto.randomBytes(32).toString('hex')`) ensuring un-brute-forceable JWT signing.
* **Bcrypt Hashing Integration:** Implemented asynchronous password protection via `bcrypt` to securely handle mathematical validation checks (`bcrypt.compare`) during the login handshake without storing or transmitting credentials in plaintext.
* **Server-Side Validation Gates:** Built an automated request interceptor using `express-validator` to scrub incoming request bodies, enforce strict email structures, validate password bounds, and query database contexts before allowing controller access.
* **Robust Role-Based Middleware:** Integrated a `GlobalMiddleware` layer featuring automated Express error catchers (`validationResult`) and strict role guard checks (`adminRole`) to gracefully reject unauthorized sessions or unparsed request objects with clean HTTP status codes.
* **Stateful JWT Session Tokens:** Engineered a token generation pipeline using `jsonwebtoken` to stamp out signed authentication tickets (`Jwt.jwtSign`) loaded with user permissions, alongside structural camelCase time-tracking maps (`createdAt` / `updatedAt`) fed smoothly to the client dashboard.

### 5. Frontend to Backend Integration Bridge
The client-side React authentication view establishes a direct HTTP network handshake with the Express API service using the native browser `fetch` stream handler. 

* **State Initialization:** Manages isolated reactive states for tracking form payload targets (`email`, `password`), interactive submission processing triggers (`loading`), and descriptive API constraint handling (`error`).
* **Session Persistence Layer:** Upon encountering a verified matching payload layout, the interface extracts the signed JSON Web Token (JWT) string and the associated `user` object data context from the response stream, preserving them securely inside the browser's persistent storage engine (`localStorage`).
* **Route Re-direction Lifecycle:** Once permission states are confirmed, the component accesses browser context through the `react-router-dom` utility hook (`useNavigate`) to smoothly transfer view control straight into the administration portal array.

---

## 🔐 Administrative Authentication & Seeding

To safeguard administrative privileges, accounts are pre-seeded directly into the MongoDB Atlas cluster rather than exposing public registration pipelines.

### 1. Database Configuration
Ensure your local `backend/.env` file is active and configured correctly. **Note:** This file is explicitly blocked by `.gitignore` to prevent credential exposure:

```env
PORT=3000
DEV_DB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/airbnb
JWT_SECRET=your_cryptographic_secret_key_here
```

### 2. Seeding the Administrator Account
To instantly instantiate the primary administrator profile (Jane Doe) with a securely hashed password inside your cloud cluster, execute the standalone database seed runner:

```
# Navigate to the backend directory
cd backend

# Execute the TypeScript seeder script
npx ts-node src/seedAdmin.ts
```


### 3. Administrative Credentials for Testing
Once the database logs show a successful seeding handshake, use the following body payload parameters inside Postman or your Frontend Login Form to authenticate:

* **HTTP Method:** POST

* **Endpoint:** http://localhost:3000/api/users/login

* **Headers:** Content-Type: application/json

* **JSON Body Payload:**

JSON
{
  "email": "admin@airbnb.com",
  "password": "password123"
}


### 4. API Response Structure
Upon approval by the validation and role middlewares, the endpoint returns a 200 OK response payload containing the user's details and the signed JWT token:

JSON
{
  "success": true,
  "message": "User logged in successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5c...",
  "user": {
    "username": "Jane Doe",
    "email": "admin@airbnb.com",
    "type": "admin",
    "status": "active",
    "created_at": "2026-06-19T00:15:30.000Z",
    "updated_at": "2026-06-19T00:15:30.000Z"
  }
}

---

## 💻 Tech Stack
* **Frontend UI Engine:** React.js via Vite compilation
* **Browser State Controller:** `react-router-dom` (v6+)
* **Icon UI Packs:** `react-icons` (FontAwesome, Ionicons)
* **Design Implementation:** Pure Vanilla CSS
* **Database Object Modeling:** Mongoose ORM / MongoDB Atlas
* **Server Runtime:** Node.js + TypeScript Compilation
* **Authentication Utilities:** bcrypt, jsonwebtoken, express-validator
* **API Validation Agent:** Postman Client Testing Suite