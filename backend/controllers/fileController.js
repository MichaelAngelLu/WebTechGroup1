import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/initFirebase.js"; // Initialize Firebase Storage

// Handle file upload
export const uploadFile = async (req, res) => {
  try {
    // Check if a file was uploaded
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded!" });
    }

    console.log("File detected:", req.file); // Log the file object

    // Create a reference to the file in Firebase Storage
    const fileRef = ref(storage, `files/${req.file.originalname}`);
    console.log("Created file reference in Firebase Storage.");

    // Upload the file to Firebase Storage
    await uploadBytes(fileRef, req.file.buffer);
    console.log("File uploaded to Firebase Storage.");

    // Get the public download URL for the uploaded file
    const downloadURL = await getDownloadURL(fileRef);
    console.log("Generated download URL:", downloadURL);

    res.status(200).json({
      message: "File uploaded successfully!",
      downloadUrl: downloadURL,
    });
  } catch (error) {
    console.error("Error uploading file:", error.code, error.message, error.customData);
    res.status(500).json({ error: "Failed to upload file!", details: error.message });
  }
};

// Handle file retrieval
export const getFile = async (req, res) => {
  try {
    const filename = req.params.filename;

    // Create a reference to the file in Firebase Storage
    const fileRef = ref(storage, `files/${filename}`);

    // Get the file's public download URL
    const downloadURL = await getDownloadURL(fileRef);

    res.status(200).json({
      message: "File retrieved successfully!",
      downloadUrl: downloadURL,
    });
  } catch (error) {
    console.error("Error retrieving file:", error);
    res.status(404).json({ error: "File not found in Firebase Storage!" });
  }
};
