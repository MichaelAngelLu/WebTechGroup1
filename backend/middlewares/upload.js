const multer = require("multer");
const AWS = require("aws-sdk");

// Configure AWS S3
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID, // Load from .env
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // Load from .env
  region: process.env.AWS_REGION, // Load from .env (e.g., "us-east-1")
});

// Function to upload file to AWS S3
const uploadToS3 = async (file) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME, // Load from .env
    Key: `uploads/${file.originalname}`, // File path in S3
    Body: file.buffer, // File content
    ContentType: file.mimetype, // File type
  };

  // Upload file to S3
  const data = await s3.upload(params).promise();
  return data.Location; // Return the file's S3 URL
};

// Validation for file size and type
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error("Invalid file type. Only JPG, PNG, and PDF are allowed!"), false); // Reject the file
  }
};

// Configure Multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(), // Store files in memory temporarily
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB size limit
  fileFilter: fileFilter,
});

module.exports = { upload, uploadToS3 };