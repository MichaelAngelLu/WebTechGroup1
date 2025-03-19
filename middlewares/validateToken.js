const jwt = require('jsonwebtoken');
require('dotenv').config();


function validateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];


  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }


  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user data to request object
    next(); // Pass control to the next middleware or route handler
  } catch (error) {
    res.status(403).json({ message: 'Invalid or expired token.' });
  }
}


module.exports = validateToken;

