const express = require("express");
const router = express.Router();

// Middleware to check authentication
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/auth/google");
};

// Profile Route
router.get("/profile", isAuthenticated, (req, res) => {
  res.json({
    name: req.user.displayName,
    email: req.user.emails[0].value,
  });
});

module.exports = router;
