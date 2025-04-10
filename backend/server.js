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

// Initialize dotenv
dotenv.config();

// Initialize Express app
const app = express();

// Middleware setup
app.use(helmet());
app.use(
  cors({
    origin: 'http://localhost:8080',
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

// Catch-all for undefined routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found!' });
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
