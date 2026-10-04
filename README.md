# Airbnb Clone

A full-stack Airbnb-inspired web application built using the **MERN stack**. The application supports two user roles: **Administrators**, who manage property listings, and **Customers**, who browse accommodations, view property details, and manage reservations.

## Live Demo

**Live Application:** https://capstone-airbnb-clone.onrender.com/

---

## Project Overview

This project is a full-stack accommodation booking platform designed to demonstrate the development of a modern web application from frontend to backend and database.

The application provides:

- User authentication and authorization
- Role-based access for administrators and customers
- Property listing management
- Property search and filtering
- Property image uploads
- Detailed accommodation pages
- Reservation management
- MongoDB data persistence
- RESTful API integration

---

# Demo Login Credentials

The application does not provide a public registration page. Demo accounts are pre-seeded in the MongoDB database so that the application can be tested immediately.

### Administrator

```text
Email: admin@airbnb.com
Password: password123
```

**Access:**
- Administrator dashboard
- View listings
- Create listings
- Edit listings
- Delete listings
- Manage property information
- View reservations

### Customer

```text
Email: user@airbnb.com
Password: password123
```

**Access:**
- Browse listings
- Search and filter accommodations
- View property details
- Make reservations
- View reservations
- Cancel reservations

> **Note:** These credentials are provided specifically for testing the live demo and do not contain any real user information.

---

## System Architecture

The application follows a three-tier architecture:

```text
React / Vite Frontend
        ↕
Node.js / Express REST API
        ↕
MongoDB Atlas Database
```

The React frontend communicates with the Express backend through REST APIs, while the backend handles authentication, business logic, file uploads, reservations, and database operations.

---

## Project Structure

```text
capstone-airbnb-clone/
│
├── backend/
│   ├── dist/              # Compiled TypeScript
│   ├── public/            # Production React frontend
│   ├── src/
│   │   ├── controllers/
│   │   ├── enviroments/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routers/
│   │   ├── utils/
│   │   ├── validators/
│   │   └── server.ts
│   ├── package.json
│   ├── package-lock.json
│   └── tsconfig.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   └── styles/
│   ├── package.json
│   ├── package-lock.json
│   ├── index.html
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

---

# Features

## 1. User Authentication & Authorization

- User login
- JWT-based authentication
- Password hashing using bcrypt
- Persistent user sessions using local storage
- Role-based authorization for administrators and customers
- Protected routes and API endpoints
- Automatic redirection based on user roles

---

## 2. Property Listings

Administrators can manage accommodation listings, including:

- Creating new listings
- Editing existing listings
- Deleting listings
- Uploading multiple property images
- Property descriptions
- Guest capacity
- Property configuration
- Pricing information
- Cleaning and service fees
- Weekly discounts
- Amenities

---

## 3. Property Search & Filtering

Customers can:

- Browse available properties
- Search by location
- View property details
- Filter properties
- View available amenities
- View property images
- Compare accommodation options

Available filtering options include:

- Free cancellation
- Price
- Instant booking
- Location

---

## 4. Property Details

Each accommodation has a dedicated details page containing:

- Image gallery
- Property information
- Amenities
- Guest capacity
- Pricing
- Reviews and ratings
- Booking date selection
- Guest selection
- Dynamic reservation cost calculation

---

## 5. Reservation Management

Customers can:

- Create reservations
- View their reservations
- View reservation details
- Cancel reservations
- Track reservation status

Administrators can view reservation information associated with their properties.

---

## 6. RESTful Backend API

The backend is built using **Node.js, Express and TypeScript**.

It provides API endpoints for:

- Authentication
- Users
- Property listings
- Reservations
- File uploads
- Health checks

The backend follows a modular structure with separate controllers, routers, middleware, models and validators.

---

## Security & Validation

The application includes several security and validation mechanisms:

- JWT authentication
- Password hashing with bcrypt
- Role-based authorization
- Protected API routes
- Request validation
- Environment variables for sensitive configuration
- `.env` excluded from version control
- Global error handling
- Multipart file validation

---

# Database

The application uses **MongoDB Atlas** with **Mongoose** for database management.

### Main data models

```text
User
 ├── Authentication information
 ├── Role
 └── Account information

Accommodation
 ├── Property information
 ├── Pricing
 ├── Amenities
 └── Images

Reservation
 ├── User
 ├── Accommodation
 ├── Start date
 ├── End date
 └── Total price
```

Relationships between users, accommodations and reservations are handled through MongoDB document references.

---

# API Testing

The REST API was tested using **Postman**.

Testing covered areas such as:

- Authentication
- User operations
- Listing CRUD operations
- Reservation operations
- Validation
- Protected endpoints
- Error handling

---

# Environment Configuration

The backend uses environment variables for configuration.

Create a `.env` file inside the `backend` directory:

```env
PORT=3000

DEV_DB_URI=your_mongodb_connection_string
DEV_JWT_ACCESS_TOKEN_SECRET_KEY=your_jwt_secret

PROD_DB_URI=your_production_mongodb_connection_string
PROD_JWT_ACCESS_TOKEN_SECRET_KEY=your_production_jwt_secret
```

> **Note:** Never commit your `.env` file or expose database credentials and JWT secrets publicly.

---

# Running the Project Locally

## Backend

Navigate to the backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build the TypeScript backend:

```bash
npm run build
```

Start the compiled backend:

```bash
npm start
```

---

## Frontend

Open another terminal and navigate to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

The frontend can then be accessed through the local Vite development URL shown in the terminal.

---

# 🌐 Deployment

The application is currently deployed using **Render**.

### Production Architecture

```text
                    Render
                      │
          ┌───────────┴───────────┐
          │                       │
     React Frontend          Express API
          │                       │
          └───────────┬───────────┘
                      │
                MongoDB Atlas
```

The production React frontend is served through the Express backend.

### Production Build

The backend is compiled from TypeScript:

```bash
npm run build
```

Render installs the required development dependencies during the build process:

```bash
npm install --include=dev
```

The compiled application is then started using:

```bash
npm start
```

---

# Tech Stack

### Frontend

- React.js
- Vite
- JavaScript
- React Router
- Vanilla CSS
- React Icons

### Backend

- Node.js
- Express.js
- TypeScript
- REST APIs
- JWT
- bcrypt
- express-validator
- Multer

### Database

- MongoDB
- MongoDB Atlas
- Mongoose

### Development & Testing

- Git
- GitHub
- Postman
- VS Code
- npm

### Deployment

- Render
- MongoDB Atlas

---

# 📚 What I Learned

Through this project, I gained practical experience with:

- Building a full-stack MERN application
- Designing RESTful APIs
- Connecting a React frontend to a backend API
- Working with MongoDB and Mongoose
- Implementing JWT authentication
- Implementing role-based authorization
- Handling file uploads with Multer
- Validating API requests
- Managing environment variables
- Structuring a TypeScript backend
- Testing APIs using Postman
- Deploying a full-stack application to the cloud
- Debugging production deployment issues

---

# Author

**Lutendo Matshidze**

GitHub: [@LutendoLumina](https://github.com/LutendoLumina)

---

## Project

If you found this project useful or interesting, feel free to explore the repository and the live application.
