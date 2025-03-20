// Import Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase configuration (YOUR EXISTING CONFIG)
const firebaseConfig = {
  apiKey: "AIzaSyBjeQN7aNhPaeN4GYV2xssLkW249Zy7OeA",
  authDomain: "juanjobsph-ab14f.firebaseapp.com",
  projectId: "juanjobsph-ab14f",
  storageBucket: "juanjobsph-ab14f.appspot.com", // Fixed incorrect storage URL
  messagingSenderId: "502541625824",
  appId: "1:502541625824:web:4e50f1b096865937766385",
  measurementId: "G-MKY96ED0B6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Services
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
const storage = getStorage(app);

// Export Firebase modules for use in your app
export { app, auth, provider, db, storage };
