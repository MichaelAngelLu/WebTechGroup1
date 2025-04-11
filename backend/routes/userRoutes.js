const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { ObjectId } = require('mongodb');
const connectDB = require('../db/mongoClient');
const isAdmin = require('../middlewares/isAdmin');

// ✅ REGISTER APPLICANT (Public)
router.post('/register', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
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
      role: 'applicant',
    });

    res.status(201).json({ message: 'Applicant account created successfully' });
  } catch (err) {
    console.error('Error during registration:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ CREATE USERS (Admin only)
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
      role
    });

    res.status(201).json({ message: 'User added successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ GET ALL USERS (Admin only)
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

// ✅ UPDATE USER (Admin only)
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
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ DELETE USER (Admin only)
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
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
