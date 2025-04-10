const express = require('express');
const passport = require('passport');
const router = express.Router();
const jwt = require('jsonwebtoken');
const connectDB = require('../db/mongoClient');
const bcrypt = require('bcryptjs');

// Google Login Route (using Passport)
router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Google Login Callback Route (Passport will handle the rest)
router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // After successful login, Passport will have stored the user in the session
    const token = jwt.sign(
      { email: req.user.email, role: req.user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: 'Google login successful',
      token: token,
      user: { email: req.user.email, role: req.user.role },
    });
  }
);

// Traditional Login (Email/Password)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const db = await connectDB();
    const user = await db.collection('users').findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

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
