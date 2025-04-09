const express = require("express");
const session = require("express-session");
const passport = require("./config/passport"); // Load Passport Config
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middleware/errorHandler"); // Import the error handler

require("dotenv").config();

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Session Middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Use Routes
app.use(authRoutes);
app.use(userRoutes);

// Home Route
app.get("/", (req, res) => {
  res.send("Welcome to the Google OAuth App!");
});

// Global Error Handling Middleware
app.use(errorHandler);

// Catch all undefined routes and return 404
app.use((req, res) => {
  res.status(404).send("Route not found");
});

// Start server
app.listen(3000, () => console.log("Server running on http://localhost:3000"));

