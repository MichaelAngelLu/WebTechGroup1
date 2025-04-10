import AWS from "aws-sdk";

// Configure AWS S3
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID, // AWS Access Key from .env
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // AWS Secret Key from .env
  region: process.env.AWS_REGION, // Region of your S3 bucket
});

// Handle file upload
export const uploadFile = async (req, res) => {
  try {
    // Check if a file was uploaded
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded!" });
    }

    console.log("File detected:", req.file); // Log the file object

    // Prepare S3 upload parameters
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME, // Replace with your bucket name
      Key: `files/${req.file.originalname}`, // File path in the bucket
      Body: req.file.buffer, // File content
      ContentType: req.file.mimetype, // File type
    };

    // Upload the file to AWS S3
    const data = await s3.upload(params).promise();
    console.log("File uploaded to S3:", data.Location);

    res.status(200).json({
      message: "File uploaded successfully!",
      downloadUrl: data.Location, // Public URL for the file
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ error: "Failed to upload file!", details: error.message });
  }
};

// Handle file retrieval
export const getFile = async (req, res) => {
  try {
    const filename = req.params.filename;

    // Generate a signed URL for file retrieval
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME, // Replace with your bucket name
      Key: `files/${filename}`, // File path in the bucket
      Expires: 60 * 5, // URL expiration time in seconds (5 minutes)
    };

    const signedUrl = s3.getSignedUrl("getObject", params);
    console.log("Generated signed URL:", signedUrl);

    res.status(200).json({
      message: "File retrieved successfully!",
      downloadUrl: signedUrl,
    });
  } catch (error) {
    console.error("Error retrieving file:", error);
    res.status(404).json({ error: "File not found in S3!" });
  }
};