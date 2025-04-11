const express = require('express');
const { ObjectId } = require('mongodb');  // Import ObjectId to handle MongoDB document IDs
const router = express.Router();
const connectDB = require('../db/mongoClient');  // Assuming you've already set up the connection with MongoClient
const validateToken = require('../middlewares/validateToken');  // Assuming you have a token validation middleware
const isAdmin = require('../middlewares/isAdmin');  // Admin authorization middleware

// Post a job (admin only)
router.post('/jobs', validateToken, isAdmin, async (req, res) => {
    const { title, description, location, company, status: jobStatus } = req.body;
  
    try {
      // Check if required fields are provided
      if (!title || !description || !location || !company) {
        return res.status(400).json({ message: 'Missing required fields.' });
      }
  
      // Log the data received in the request
      console.log('Received job data:', { title, description, location, company });
  
      // Connect to the database and get the jobs collection
      const db = await connectDB();
      const jobsCollection = db.collection('jobs');
  
      // Create the new job document
      const newJob = { title, description, location, company, status: jobStatus || 'Open', postedDate: new Date() };
  
      // Insert the job into the collection
      const result = await jobsCollection.insertOne(newJob);
  
      // Check if the insertion was successful
      if (result.acknowledged) {
        console.log('Job inserted successfully:', result);
        return res.status(201).json({ message: 'Job posted successfully', job: newJob });
      } else {
        console.error('Job insertion failed:', result);
        return res.status(500).json({ message: 'Job insertion failed, but data may be partially saved.' });
      }
    } catch (error) {
      console.error('Error while posting job:', error);
      return res.status(500).json({
        message: 'Error while posting job',
        error: error.message,
        stack: error.stack
      });
    }
  });
  
// Get all job postings
router.get('/jobs', async (req, res) => {
  try {
    const db = await connectDB();
    const jobCollection = db.collection('jobs');
    const jobs = await jobCollection.find().toArray(); // Fetch all job postings
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching job postings', error: err });
  }
});

// Update a job posting (Admin)
router.put('/jobs/:id', validateToken, async (req, res) => {
  const { id } = req.params;
  const { title, description, location, company } = req.body;
  
  try {
    const db = await connectDB();
    const jobCollection = db.collection('jobs');
    
    const updatedJob = {
      title,
      description,
      location,
      company,
      status: jobStatus || 'Open',
      postedDate: new Date(),
    };

    const result = await jobCollection.updateOne(
      { _id: new ObjectId(id) },  // Use ObjectId to find the document
      { $set: updatedJob }
    );
    
    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.status(200).json(updatedJob);
  } catch (err) {
    res.status(500).json({ message: 'Error updating job posting', error: err });
  }
});

// Delete a job posting (Admin)
router.delete('/jobs/:id', validateToken, async (req, res) => {
  const { id } = req.params;

  try {
    const db = await connectDB();
    const jobCollection = db.collection('jobs');
    
    const result = await jobCollection.deleteOne({ _id: new ObjectId(id) });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.status(204).send();  // No content response on successful delete
  } catch (err) {
    res.status(500).json({ message: 'Error deleting job posting', error: err });
  }
});

module.exports = router;
