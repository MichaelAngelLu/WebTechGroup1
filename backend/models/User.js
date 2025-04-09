const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true, required: true },
  password: String, // Optional, for traditional login
  role: { type: String, default: 'applicant' }, // Default role
});

// Create a model based on the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
