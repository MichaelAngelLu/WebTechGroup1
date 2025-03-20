const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const connectDB = require('../db/mongoClient');

// CREATE (Register Account)
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
      role: 'applicant'
    });

    res.status(201).json({ message: 'Account created successfully' });
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

// UPDATE (Update a User by ID)
router.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email } = req.body;
  try {
    const db = await connectDB();
    const usersCollection = db.collection('users');

    const result = await usersCollection.updateOne(
      { _id: new (require('mongodb')).ObjectId(id) },
      { $set: { firstName, lastName, email } }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE (Remove a User by ID)
router.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const db = await connectDB();
    const usersCollection = db.collection('users');

    const result = await usersCollection.deleteOne({ _id: new (require('mongodb')).ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});


// Already defined in your previous authRoutes.js
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
      const db = await connectDB();
      const usersCollection = db.collection('users');
  
      const user = await usersCollection.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      res.status(200).json({ message: 'Login successful', user: { email: user.email, role: user.role } });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  router.use((req, res) => {
    res.status(404).json({ message: 'API route not found' });
  });
  
  module.exports = router;
