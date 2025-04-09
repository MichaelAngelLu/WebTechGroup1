const mongoose = require('mongoose');

// Define the JobApplication schema
const jobApplicationSchema = new mongoose.Schema({
  jobTitle: { type: String, required: true },
  applicantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, default: 'pending' },
});

// Create a JobApplication model
const JobApplication = mongoose.model('JobApplication', jobApplicationSchema);

module.exports = JobApplication;
