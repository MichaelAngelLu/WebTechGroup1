const express = require('express');
const { upload } = require('../middlewares/upload');
const router = express.Router();

router.post('/', upload.fields([{ name: 'resume' }, { name: 'otherDocs' }]), async (req, res) => {
  try {
    const { name, email, phone, position, coverLetter } = req.body;
    const resume = req.files?.resume?.[0];
    const otherDocs = req.files?.otherDocs?.[0];

    // Simulate saving to the database
    console.log({ name, email, phone, position, coverLetter, resume, otherDocs });

    res.status(201).json({ message: 'Application submitted successfully!' });
  } catch (err) {
    console.error('Error handling application:', err);
    res.status(500).json({ message: 'Failed to submit application.' });
  }
});

module.exports = router;
