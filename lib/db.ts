import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
    const uri: string | undefined = process.env.MONGODB_URI;

    if (isConnected) {
        return;
    }

    if (!uri) {
        throw new Error("MONGODB_URI is not defined in environment variables");
    }

    try {
        await mongoose.connect(uri);
        isConnected = true;
        console.log("db connected OK");
    } catch (error) {
        console.error("Failed to connect to the database", error);
        throw error;
    }
};