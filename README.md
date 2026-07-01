**An Airbnb Clone**

A full-stack application of an Airbnb Clone build in MERN stack architecture. The application serves two distinct user roles: Administrators (who manage listings and property operations) and Customers (who search for locations, view property details, and manage reservations).

**Live Deployment**

**Heroku Live Link:** [https://morning-cliffs-41967-82d70048a754.herokuapp.com]

---

**Project Structure**

```
CAPSTONE-PROJECT/  
└── airbnb-clone/  
├── backend/  
│ ├── dist/ # Compiled JavaScript server code (via tsc)  
│ ├── node_modules/ # Backend dependencies  
│ ├── public/ # Production React frontend assets (Vite bundle)  
│ ├── src/ # TypeScript source files (Controllers, Middleware, Models, Routes)  
│ ├── .env # Environment configuration (ignored by git)  
│ ├── package-lock.json  
│ ├── package.json  
│ ├── Procfile # Heroku deployment configuration  
│ └── tsconfig.json # TypeScript configuration  
├── frontend/  
│ ├── dist/ # Local frontend production build  
│ ├── node_modules/ # Frontend dependencies  
│ ├── public/ # Static public assets  
│ ├── src/ # React source code (Components, Pages, Hooks, Styles)  
│ ├── eslint.config.js  
│ ├── index.html  
│ ├── package-lock.json  
│ ├── package.json  
│ └── vite.config.js # Vite bundler configuration  
├── .gitignore  
└── README.md
```

---

**System Architecture & Data Flow**

Data flows seamlessly across the three tiers of the application:

Frontend (React/Vite) ↔ Backend API (Node/TypeScript) ↔ Database Layer (MongoDB Atlas)

---

**Features & Progress Completed**

**1\. Frontend Phase (React & Vite UI)**

- **Top Header Navigation & Dynamic Menu:** Features a responsive layout with branding, location search dropdown, and a role-aware profile action toggle that displays tailored navigation options (e.g., Log In/Sign Up for guests vs View Listings/Create Listing for admins) based on active session states.
- **Authentication UI Gate:** Client-side form handling and validation covering correct email formats and password bounds before routing users via mock or live server handshakes.
- **Create & Edit Listing Modules:** Detailed property entry capturing baseline metrics (titles, configurations, max guests), variable fee metrics (cleaning/service fees, weekly discounts), checkable feature arrays, and binary multipart streams via HTML5 FormData for real-time filesystem image uploads.
- **View Listings & Interactive Inventory Cards:** Dynamic, responsive card layouts that map properties into JSX blocks using unique MongoDB trackers (key={listing.\_id}) and display sanitized image paths served directly from active host environments.
- **Location Page & Accommodation Finder:** Features filter chips (Free cancellation, Price, Instant Book) and a city-based location selection dropdown populated dynamically by pulling distinct values from the public listings API.
- **Location Details View:** Implements a rich image gallery grid (1 large main photo + 4 stacked smaller thumbnails), an amenities checklist grid, category-specific breakdown reviews (cleanliness, communication, etc.), and a sticky cost calculator that dynamically updates totals in real time based on selected calendar dates and guest counts.
- **User Reservations Portal:** Dedicated protected panel (/my-reservations) rendering an interactive tabular layout of a user's bookings with structural color-coded status badges (confirmed, pending, cancelled) and instant cancellation triggers.
- **Client-Side Routing & Session Persistence:** Integrated react-router-dom (v6+) handling history, declarative path protection guards, and immediate startup recovery from localStorage to safeguard active user sessions against data loss during hard page refreshes.

---

**2\. Backend Server Layer (Node.js & TypeScript)**

- **Object-Oriented Lifecycle:** Modular Server class framework handling separate app configurations, endpoint routing, and global exception interceptors.
- **Operational Health Checks:** Live /api/health testing path tracking clean backend runtime execution.
- **Dynamic Environment Injection:** Fixed module loading race conditions by transitioning plain configuration objects into executable Arrow Functions to defer variable lookups until after the application bootstrapper loads root .env values.
- **DNS Resolution Override:** Bypassed local network ISP firewalls and SRV lookup drop failures (querySrv ECONNREFUSED) by coupling Node's native dns module with Google Public `DNS (8.8.8.8 / 8.8.4.4)` at application boot-up.
- **Secure Authentication Pipeline:**  
   \- Generates secure un-brute-forceable JWT signing using 32-byte hexadecimal random keys via Node's native crypto module.  
   \- Asynchronous password hashing and mathematical comparisons using bcrypt.  
   \- Structured token generation pipeline assigning role scopes (admin vs user) with automated error catching via express-validator and GlobalMiddleware role guards.
- **Advanced Multipart Accommodation Listing Engine:** Deploys local multer.diskStorage stream pipelines to handle multi-file uploads with timestamped hash file naming into static folders (src/uploads/images), coupled with custom inline middleware to decode raw text layout brackets back into native string arrays before verification.
- **RESTful CRUD Operations:** Handles public listing streams with chronological sorting (-1), admin deletion routes via Mongoose context handlers (findByIdAndDelete), and flexible partial update paths (PUT) via state spread layers and .optional() schema filters to allow overwriting standalone attributes without destroying existing values.
- **Multi-Channel Reservation Tracking Engine:** Manages automated validation checkpoints (ReservationValidator) enforcing precise ISO 8601 timeline checks and cross-collection verification sweeps before processing bookings. Provides dual-channel optimization: a Guest Stream filtering specific user tokens and a Host Dashboard View tracking multi-user check-ins.

---

**3\. Database & Schema Layer (Mongoose & MongoDB Atlas)**

- **Unified Identity Architecture:** Single-collection Mongoose data schema mapping authentication privileges (admin vs customer), tracking login parameters, and enforcing distinct user validation properties.
- **Property Blueprint Schema:** Flattened database model mapping parameters directly to incoming form payloads (pricing arrays, configuration metrics, amenities fields).
- **Strict Interface Compilation:** Integrated comprehensive Node/TypeScript interface abstractions guarding compile-time data validity across all properties and schemas.
- **Relational Reference Mapping:** Implements structural document tracking linking unique occupant profiles (users) directly to active properties (Accommodation references) while managing strict temporal fields (start_date, end_date) and total price metrics.
- **Dual User Seeding:** Extended automated database seed scripts (seedUser.ts) to easily provision both an administrator account (<admin@airbnb.com>) and a regular customer account (<user@airbnb.com>) with pre-hashed passwords inside cloud clusters.

---

**Administrative Authentication & Seeding**

To safeguard administrative privileges, accounts are pre-seeded directly into the MongoDB Atlas cluster rather than exposing public registration pipelines.

**1\. Database Configuration**

Ensure your local backend/.env file is active and configured correctly. Note: This file is explicitly blocked by .gitignore to prevent credential exposure:

```bash
PORT=3000  
DEV_DB_URI=mongodb+srv://&lt;username&gt;:&lt;password&gt;@cluster.mongodb.net/airbnb  
JWT_SECRET=your_cryptographic_secret_key_here
```

**2\. Seeding the Administrator & User Accounts**

To instantly instantiate both the administrator and regular user profiles with securely hashed passwords inside your cloud cluster, execute the standalone database seed runner:

\# Navigate to the backend directory  
```bash
cd backend  
<br/>\# Execute the TypeScript seeder script  
npx ts-node src/seedUser.ts
```

**3\. Credentials for Testing**

**Admin Account**:  
\- Email: <admin@airbnb.com>  
\- Password: password123  
\- Redirects to: /listings (Admin Dashboard)

**Regular User Account:**
\- Email: <user@airbnb.com>  
\- Password: password123  
\- Redirects to: / (Home Page)

---

**Heroku Deployment Architecture**

The application uses a monorepo-style embedded compilation approach to serve both the React frontend and the Express/TypeScript API together from a single Heroku Web Dyno container.

**1\. Embedded Architecture Overview**

When deploying, the React frontend is compiled locally into optimized static assets. These production-ready bundles are integrated into the backend's public/ directory so Express can act as a web server layer routing static web pages alongside dynamic API tracks.

```bash
backend/  
├── dist/ <-- Compiled JavaScript Server Code (via tsc)  
├── public/ <-- Production React Frontend Assets (Vite Bundle)  
│ ├── index.html  
│ └── assets/  
├── src/  
└── package.json
```

**2\. Heroku Core Environment Configurations**

Heroku handles server instantiation using dynamic parameters. Ensure your target app is provisioned with the production environment values matching your backend logic names:

```bash
heroku config:set PROD_DB_URI=your_production_mongodb_connection_string --app your-app-name  
heroku config:set PROD_JWT_ACCESS_TOKEN_SECRET_KEY=your_production_jwt_secret_key --app your-app-name
```

**3\. Build & Deployment Lifecycle**

Because the deployment pipelines use a Git Subtree wrapper to keep the deployment container light, deployment requires bundling the frontend compilation before pushing changes.

- Compile Frontend: Navigate to the frontend directory and build the production distribution folder:

```bash
cd frontend  
npm run build
```

- Synchronize Build: Move the generated dist/ contents directly into your backend/public/ directory.
- Deploy Subtree: Commit all modifications from your root repository root folder and push the isolated backend folder directly up to Heroku:

```bash
git add .  
git commit -m "deploy: bundle production frontend into backend heroku tracking"  
git subtree push --prefix backend heroku main
```

---

**Tech Stack**

- Frontend UI Engine: React.js via Vite compilation
- Browser State Controller: react-router-dom (v6+)
- Icon UI Packs: react-icons (FontAwesome, Ionicons)
- Design Implementation: Pure Vanilla CSS
- Database Object Modeling: Mongoose ORM / MongoDB Atlas
- Server Runtime: Node.js + TypeScript Compilation
- Authentication Utilities: bcrypt, jsonwebtoken, express-validator
- API Validation Agent: Postman Client Testing Suite
- Multipart File Handling: Multer Storage Middleware

---

## 📧 Contact & Support

**Author:** Lutendo Matshidze  
**GitHub:** [@LutendoLumina](https://github.com/LutendoLumina)