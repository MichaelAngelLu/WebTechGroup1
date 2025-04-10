import express from 'express';
import multer from 'multer';
import { uploadFile, getFile } from '../controllers/fileController.js'; // Adjust path if necessary

const router = express.Router();

// Configure Multer to use memory storage for AWS S3 uploads
const upload = multer({ storage: multer.memoryStorage() }); // Store files in memory temporarily

// Route to upload a file
router.post('/upload', upload.single('file'), uploadFile); // Uses Multer to handle file upload

// Route to retrieve a file by its filename
router.get('/:filename', getFile); // Generate signed URL for file retrieval

export default router; // Use `export default` for ES Modules