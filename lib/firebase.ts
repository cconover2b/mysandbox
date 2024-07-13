// lib/firebase.ts

// Importing necessary functions from the Firebase SDK
import { getApps, initializeApp } from "firebase/app";
import { getStorage, ref } from "firebase/storage";

// Firebase configuration object containing keys and identifiers for your Firebase project
const firebaseConfig = {
    apiKey: process.env.FIREBASEAPIKEY, // API key for Firebase authentication
    authDomain: process.env.AUTHDOMAIN, // Auth domain for Firebase authentication
    projectId: process.env.PROJECTID, // Project ID for Firebase project
    storageBucket: process.env.BUCKET, // Storage bucket for Firebase storage
    messagingSenderId: "566968385357", // Sender ID for Firebase Cloud Messaging
    appId: "1:566968385357:web:7b009765b93e9bb1fb8104", // App ID for Firebase project
    measurementId: "G-KBZE95VTLK" // Measurement ID for Firebase Analytics
};

// Initialize Firebase app only if it hasn't been initialized already
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Firebase storage with the app instance
const storage = getStorage(app);

// Function to create a reference to a specific location in Firebase storage
// The token parameter is used to specify the path within the storage bucket
export const storageRef = (token: string) => ref(storage, token);
