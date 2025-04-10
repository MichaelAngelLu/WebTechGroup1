import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import session from 'express-session';
import passport from './config/passport.js';
import authRoutes from './routes/authRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import userRoutes from './routes/userRoutes.js';
import fileRoutes from './routes/fileRoutes.js';
import applicationRoutes from './routes/applicationRoutes.js'; // Import application routes
import dotenv from 'dotenv';
import errorHandler from './middlewares/errorHandler.js';

import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Initialize dotenv
dotenv.config();

// Initialize Express app
const app = express();

// Serve frontend static files
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Middleware setup
app.use(helmet());
app.use(
  cors({
    origin: 'https://juanjobsph.onrender.com',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/users', userRoutes);
app.use('/api/files', (req, res, next) => {
  console.log(`Request received at: ${req.url}`);
  next();
}, fileRoutes);
app.use('/api/applications', applicationRoutes); // Register the route

// Home Route
app.get('/', (req, res) => {
  res.send('Welcome to JuanJobsPH Server!');
});

// Error Handling
app.use(errorHandler);
app.get('/api/test-error', (req, res, next) => {
  const error = new Error('This is a test error');
  error.status = 400; // Set a custom status code
  next(error); // Pass the error to the errorHandler middleware
});

//Security Headers
app.use((req, res, next) => {
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

// Catch-all for undefined routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found!' });
});

// Catch-all: send index.html (for Vue routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});

// Export app for testing purposes
