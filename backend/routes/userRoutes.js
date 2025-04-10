const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');
const admin = require('firebase-admin');
const connectDB = require('../db/mongoClient');
const validateToken = require('../middlewares/validateToken');  // Import the validateToken middleware
const isAdmin = require('../middlewares/isAdmin');  // Import the isAdmin middleware to check for admin role

// Initialize Firebase Admin SDK using the service account credentials
const serviceAccount = require('../config/serviceAccountKey.json');  // Adjust path as needed

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),  // Initialize with the service account
});

router.get('/admin', validateToken, isAdmin, async (req, res) => {
  res.status(200).json({ message: 'Welcome to the Admin Page' });
});

router.get('/applicant', validateToken, async (req, res) => {
  if (req.user.role === 'applicant') {
    res.status(200).json({ message: 'Welcome to the Applicant Page' });
  } else {
    res.status(403).json({ message: 'Forbidden. Applicants only.' });
  }
});

// ✅ REGISTER APPLICANT
router.post('/register', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const db = await connectDB();
    const applicantsCollection = db.collection('users');

    const existingUser = await applicantsCollection.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await applicantsCollection.insertOne({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: 'applicant',
    });

    res.status(201).json({ message: 'Applicant account created successfully' });
  } catch (err) {
    console.error('Error during applicant registration:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ CREATE USERS (Admin & Staff)
router.post('/users', async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;
  try {
    const db = await connectDB();
    const usersCollection = db.collection('users');

    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await usersCollection.insertOne({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role // ✅ will come from frontend (admin/staff)
    });

    res.status(201).json({ message: 'User added successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});


// READ (Get All Users)
router.get('/users', async (req, res) => {
  try {
    const db = await connectDB();
    const usersCollection = db.collection('users');
    const users = await usersCollection.find().toArray();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ UPDATE (Update a User by ID)
router.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, role } = req.body;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid User ID' });
  }

  try {
    const db = await connectDB();
    const usersCollection = db.collection('users');

    const result = await usersCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { firstName, lastName, email, role } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User updated successfully' });
  } catch (err) {
    console.error('Update error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ DELETE (Remove a User by ID)
router.delete('/users/:id', async (req, res) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid User ID' });
  }

  try {
    const db = await connectDB();
    const usersCollection = db.collection('users');

    const result = await usersCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

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




/*router.post('/login/google', async (req, res) => {
  const { tokenId } = req.body;
  
  try {
    // Verify Firebase ID token
    const decodedToken = await admin.auth().verifyIdToken(tokenId);
    const email = decodedToken.email;
    const fullName = decodedToken.name || "Unknown User"; // Firebase provides full name
    
    // Split the full name into first name and last name (this is a simple split, it might need improvement for cases like multiple last names)
    const nameParts = fullName.split(" ");
    const firstName = nameParts[0];  // The first part is considered the first name
    const lastName = nameParts.slice(1).join(" "); // The rest is considered the last name

    // Connect to the database
    const db = await connectDB();

    // Check if the user exists in the 'users' collection
    let user = await db.collection('users').findOne({ email });

    // If the user does not exist, create a new user
    if (!user) {
      // Insert the user with their data, including role if necessary
      user = {
        email: decodedToken.email,
        firstName: firstName,  // Store first name
        lastName: lastName,    // Store last name
        role: 'applicant',     // Default role for new users
      };
      await db.collection('users').insertOne(user);
    }

    // Generate a JWT token for the user
    const jwtToken = jwt.sign(
      { email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Send the response with the generated token and user details
    res.status(200).json({
      message: 'Google login successful',
      token: jwtToken,
      user,
    });
  } catch (err) {
    console.error('Error during Google login:', err);
    res.status(400).json({ message: 'Invalid Google token' });
  }
});


// ✅ Traditional Login (Email/Password)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Connect to database
    const db = await connectDB();
    const usersCollection = db.collection('users');
    const applicantsCollection = db.collection('applicants');

    let user = await usersCollection.findOne({ email });
    let role;

    // Check if user exists in 'users' collection or 'applicants' collection
    if (!user) {
      user = await applicantsCollection.findOne({ email });
      role = 'applicant';
    } else {
      role = user.role; // 'admin', 'staff', etc.
    }

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare password for traditional login
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token for traditional login
    const jwtToken = jwt.sign(
      { email: user.email, role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: 'Login successful',
      token: jwtToken,
      user: { email: user.email, role },
    });
  } catch (err) {
    console.error('Server error during login:', err);
    res.status(500).json({ message: 'Server error' });
  }
});*/
