require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobRoutes');


const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api', jobRoutes);

app.listen(3000, () => {
  console.log('✅ Server running on http://localhost:3000');
});