// src/middleware/errorHandler.js

const errorHandler = (err, req, res, next) => {
    console.error(err);
  
    // Check if the error has a status and message, else use generic message
    const statusCode = err.status || 500;
    const message = err.message || 'Something went wrong. Please try again later.';
  
    res.status(statusCode).json({ message });
  };
  
  module.exports = errorHandler;
  