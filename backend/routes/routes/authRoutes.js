const express = require('express');
const passport = require('passport');
const router = express.Router();
const { login } = require('../controllers/authController'); // Import login function from controller
const errorHandler = require('../middleware/errorHandler'); // Import error handler middleware

// Google OAuth Login Route
router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Google OAuth Callback Route
router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/profile');
  }
);

// Traditional login route (POST)
router.post('/login', login);  // This is where we use the login method from the controller

// Logout Route
router.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
});

// Use the error handling middleware for all routes
router.use(errorHandler);

module.exports = router;
