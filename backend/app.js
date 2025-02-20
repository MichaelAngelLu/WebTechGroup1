const express = require('express');
const validateToken = require('./middlewares/validateToken'); // Import the middleware
const app = express();

// Example of applying the middleware to a protected route
app.get('/profile', validateToken, (req, res) => {
  res.send(`Welcome, ${req.user.email}. This is your profile.`);
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
