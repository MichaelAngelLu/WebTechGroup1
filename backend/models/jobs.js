const mongoose = require('mongoose');

// Define the job schema
const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  company: { type: String, required: true },
  postedDate: { type: Date, default: Date.now },
});

// Create a model for jobs
const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
