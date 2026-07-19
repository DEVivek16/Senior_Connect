// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Added this to connect to the database!

// Your web app's Firebase configuration from your screenshot
const firebaseConfig = {
  apiKey: "AIzaSyCnaPE8yneWgqYGuZV5Iky1tRWPOewWawQE",
  authDomain: "student-directory-f1074.firebaseapp.com",
  projectId: "student-directory-f1074",
  storageBucket: "student-directory-f1074.firebasestorage.app",
  messagingSenderId: "1073552937024",
  appId: "1:1073552937024:web:ed1484a210fc6eb5020fa5",
  measurementId: "G-T9GKMTT5DQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore Database and export it so page.js can use it
export const db = getFirestore(app);