// app/api/user/route.ts

// Import necessary modules and functions
import { connectToDB } from "@/lib/db"; // Function to connect to the database
import { UserModel } from "@/schemas/user"; // User model schema

// GET function to handle fetching all users
export async function GET() {
    try {
        // Connect to the database
        await connectToDB();

        // Fetch all users from the database
        const users = await UserModel.find({});

        // Return the fetched users as a JSON response
        return Response.json(users);
    } catch (error) {
        // Log any errors that occur during the process
        console.log(error);
        // Return an error response
        return Response.json({
            message: "Failed to get users"
        });
    }
}
