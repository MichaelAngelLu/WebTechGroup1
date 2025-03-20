const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const connectDB = require('../db/mongoClient');
const { ObjectId } = require('mongodb');

// ✅ REGISTER APPLICANT
router.post('/register', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const db = await connectDB();
    const applicantsCollection = db.collection('applicants');

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
      role: 'applicant'
    });

    res.status(201).json({ message: 'Applicant account created successfully' });
  } catch (err) {
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


router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const db = await connectDB();
    const usersCollection = db.collection('users');
    const applicantsCollection = db.collection('applicants');

    let user = await usersCollection.findOne({ email });
    let role;

    if (user) {
      role = user.role; // will be 'admin' or 'staff'
    } else {
      user = await applicantsCollection.findOne({ email });
      role = 'applicant';
    }

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({
      message: 'Login successful',
      user: { email: user.email, role }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

  module.exports = router;
