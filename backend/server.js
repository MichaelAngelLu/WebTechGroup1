require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require("helmet");
const session = require("express-session");
const passport = require("./config/passport"); // Passport configuration
const authRoutes = require("./routes/authRoutes");  // Auth-related routes (make sure routes are named correctly)
const jobRoutes = require("./routes/jobRoutes");    // Job-related routes
const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middlewares/errorHandler"); // Global error handler

const app = express();

// Middleware setup
app.use(helmet()); // Adds security-related HTTP headers
app.use(cors({ 
  origin: 'http://localhost:8080', // Allow only frontend URL to access API
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
})); // Enable cross-origin resource sharing with specific options
app.use(express.json()); // Middleware to parse JSON requests

// Session Middleware for Passport.js (important for maintaining session)
app.use(
  session({
    secret: process.env.SESSION_SECRET, // Ensure this is defined in .env
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session()); // Initialize session handling

// Route Handling
app.use('/api', authRoutes); // Auth-related routes
app.use('/api', jobRoutes);  // Job-related routes
app.use('/api', userRoutes);  // Job-related routes

// Home Route (testing endpoint)
app.get("/", (req, res) => {
  res.send("Welcome to the Google OAuth App!");
});

// Global Error Handling Middleware
app.use(errorHandler);

// Catch-all for undefined routes and return 404
app.use((req, res) => {
  res.status(404).send("Route not found");
});

// Start the server
app.listen(3000, () => {
  console.log("✅ Server running on http://localhost:3000");
});