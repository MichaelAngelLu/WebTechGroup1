const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const connectDB = require('../db/mongoClient');
const bcrypt = require('bcrypt');
const router = express.Router();

// Google Login Route (using Passport)
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Create JWT token with user details
    const token = jwt.sign(
      { email: req.user.email, role: req.user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Redirect to frontend with token and role
    res.redirect(`http://localhost:5173/google-success?token=${token}&role=${req.user.role}`);
  }
);

// Traditional Login (Email/Password)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Check if email or password is missing
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    const db = await connectDB();
    const user = await db.collection('users').findOne({ email });

    // Handle invalid credentials
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    // Handle incorrect password
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create JWT token with user details
    const token = jwt.sign(
      { email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Respond with success message, token, and user info
    res.status(200).json({
      message: 'Login successful',
      token: token,
      user: { email: user.email, role: user.role },
    });

  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
