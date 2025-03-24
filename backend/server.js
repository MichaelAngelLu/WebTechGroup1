const express = require("express");
const session = require("express-session");
const passport = require("./config/passport"); // Load Passport Config
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

require("dotenv").config();

const app = express();

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

app.get("/", (req, res) => {
  res.send("Welcome to the Google OAuth App!");
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
