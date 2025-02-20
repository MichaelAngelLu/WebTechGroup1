require("dotenv").config();
const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_URI;

if (!uri) {
  console.error("❌ MONGO_URI is not defined in .env file!");
  process.exit(1);
}

async function connectDB() {
  try {
    const client = new MongoClient(uri); // ✅ Removed deprecated options
    await client.connect();
    console.log("✅ Successfully connected to MongoDB Atlas!");

    const db = client.db("testDB");
    console.log("📌 Connected to database:", db.databaseName);

    await client.close();
    console.log("🔒 Connection closed.");
  } catch (error) {
    console.error("❌ Connection failed:", error.message);
  }
}

connectDB();
