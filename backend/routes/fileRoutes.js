// const express = require('express');
// const { getStorage, ref, getDownloadURL } = require('firebase/storage');
// const router = express.Router();
// const { storage } = require('./firebase/initFirebase'); // Import Firebase storage instance

// router.get('/files/:filename', async (req, res) => {
//     const filename = req.params.filename;

//     try {
//         // Create a reference to the file in Firebase Storage
//         const fileRef = ref(storage, `files/${filename}`);

//         // Get the file's download URL
//         const url = await getDownloadURL(fileRef);

//         // Return the URL to the client
//         res.status(200).json({ downloadUrl: url });
//     } catch (error) {
//         console.error('Error retrieving file:', error);
//         res.status(404).json({ error: 'File not found in Firebase Storage!' });
//     }
// });

// module.exports = router;

import express from 'express';
import multer from 'multer';
import { uploadFile, getFile } from '../controllers/fileController.js'; // Adjust path if necessary

const router = express.Router();

// Configure Multer to use memory storage for Firebase uploads
const upload = multer({ storage: multer.memoryStorage() });

// Route to upload a file
router.post('/upload', upload.single('file'), uploadFile);

// Route to retrieve a file by its filename
router.get('/files/:filename', getFile);

export default router; // Use `export default` for ES Modules
