const multer = require('multer');
const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');
const storage = require('./firebase/initFirebase');

const uploadToFirebase = async (file) => {
    const fileRef = ref(storage, `uploads/${file.originalname}`);
    const fileBuffer = Buffer.from(file.buffer);

    //Upload file
    await uploadBytes(fileRef, fileBuffer);
    return await getDownloadURL(fileRef); // Retrieve the URL
};

// Define storage configuration
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/'); // Directory to store files
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + '-' + file.originalname); // Unique file name
//   },
// });

// Validation for file size and type
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error('Invalid file type. Only JPG, PNG, and PDF are allowed!'), false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
  fileFilter: fileFilter,
});

module.exports = upload;
