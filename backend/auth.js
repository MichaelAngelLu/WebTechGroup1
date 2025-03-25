const express = require("express");
const passport = require("passport");
const session = require("express-session");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config();

const app = express();

const users = {}; // Temporary storage (Replace with DB later)

// Session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Configure Passport Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => {
      if (!users[profile.id]) {
        users[profile.id] = {
          id: profile.id,
          displayName: profile.displayName,
          email: profile.emails[0].value,
          role: profile.emails[0].value.endsWith("@admin.com") ? "admin" : "applicant",
        };
      }
      return done(null, users[profile.id]);
    }
  )
);

// Serialize and Deserialize user
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => done(null, users[id]));

// Middleware for Role-Based Access Control (RBAC)
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/google");
};

const isAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.role === "admin") return next();
  res.status(403).send("Access Denied: Admins Only");
};

const isApplicant = (req, res, next) => {
  if (req.isAuthenticated() && req.user.role === "applicant") return next();
  res.status(403).send("Access Denied: Applicants Only");
};

// Routes
app.get("/", (req, res) => res.send("Welcome to our site!"));

// Google OAuth login
app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// OAuth callback
app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("/dashboard");
  }
);

// General dashboard (requires login)
app.get("/dashboard", isAuthenticated, (req, res) => {
  res.send(`Hello, ${req.user.displayName}. Your role is ${req.user.role}.`);
});

// Admin-only route
app.get("/admin", isAdmin, (req, res) => {
  res.send("Welcome, Admin! Here are the admin controls.");
});

// Applicant-only route
app.get("/applicant", isApplicant, (req, res) => {
  res.send("Welcome, Applicant! Here are your job listings.");
});

// Logout
app.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
});

app.listen(3000, () => console.log("Server running on port 3000"));
