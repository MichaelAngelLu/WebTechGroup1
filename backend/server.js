// const http = require('http');

// // Create the server
// const server = http.createServer((req, res) => {
//   // Set the response headers
//   res.writeHead(200, { 'Content-Type': 'text/plain' });
//   // Send a response to the client
//   res.end('Welcome to JuanJobsPH Server');
// });

// // Start the server and listen on port 3000
// server.listen(3000, () => {
//   console.log('Server is running on http://localhost:3000');
// });

// Import required modules using ES module syntax
import express from 'express';
import cors from 'cors';
import fileRoutes from './routes/fileRoutes.js'; // Make sure to add `.js` to the import
import dotenv from 'dotenv';

// Initialize dotenv
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test Route
app.get('/', (req, res) => {
  res.send('Welcome to JuanJobsPH Server!');
});

// File Routes
app.use('/api', fileRoutes);

// Handle 404 Errors
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found!' });
});

// Start the Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
