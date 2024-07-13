// lib/db.ts

// Importing the mongoose library for MongoDB interactions
import mongoose from "mongoose";

// A flag to track the connection status to the database
let isConnected = false;

// Function to connect to the MongoDB database
export const connectToDB = async () => {
    // Retrieving the MongoDB URI from environment variables
    const uri: string | undefined = process.env.MONGODB_URI;

    // If already connected, return early to avoid reconnecting
    if (isConnected) {
        return;
    }

    try {
        // Attempting to connect to the MongoDB database using mongoose
        await mongoose.connect(uri as string);
        // Setting the connection flag to true upon successful connection
        isConnected = true;
        // Logging a success message to the console
        console.log("db connected OK");
    } catch (error) {
        // Logging any errors that occur during the connection attempt
        console.log(error);
    }
}
