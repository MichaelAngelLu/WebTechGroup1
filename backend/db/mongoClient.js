const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGO_URI; // MongoDB connection string from environment variables
const client = new MongoClient(uri);

let db;

// Async function to connect to the database
async function connectDB() {
  if (!db) {
    try {
      // Establish connection to the database
      await client.connect();
      db = client.db('JuanJobsPH'); // Database name (ensure this matches your actual DB name)
      console.log('Connected to MongoDB');
    } catch (err) {
      console.error('Error connecting to MongoDB:', err);
      throw new Error('Failed to connect to MongoDB');
    }
  }
  return db;
}

// Export the connectDB function
module.exports = connectDB;
