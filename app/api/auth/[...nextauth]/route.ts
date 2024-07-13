// app/api/auth/[...nextauth]/route.ts

// Import necessary modules and functions
import { connectToDB } from "@/lib/db"; // Function to connect to the database
import { comparePassword } from "@/lib/utils"; // Utility function to compare passwords
import { UserModel } from "@/schemas/user"; // User model schema
import nextAuth from "next-auth"; // NextAuth.js for authentication
import Credentials from "next-auth/providers/credentials"; // Credentials provider for NextAuth.js

// Define the NextAuth.js handler
const handler = nextAuth({
    // Secret used to encrypt session tokens
    secret: process.env.NEXTAUTH_SECRET,
    // Custom pages for authentication
    pages: {
        signIn: '/auth/signin' // Custom sign-in page
    },
    // Define authentication providers
    providers: [
        // Credentials provider for username/password authentication
        Credentials({
            name: "credentials", // Name of the provider
            credentials: {
                email: {}, // Email field
                password: {} // Password field
            },
            // Function to authorize users
            authorize: async (credentials, req) => {
                try {
                    // Connect to the database
                    await connectToDB();

                    // Find the user by email
                    const user = await UserModel.findOne({
                        email: credentials?.email
                    });

                    // If user is found, compare the provided password with the stored password
                    if (user) {
                        const passwordMatch = await comparePassword(
                            credentials?.password || '', // Provided password
                            user.password // Stored password
                        );

                        // If passwords match, return the user object
                        if (passwordMatch) {
                            return user;
                        }
                    }

                    // If user is not found or passwords do not match, return null
                    return null;
                } catch (error) {
                    // Log any errors that occur during the authorization process
                    console.log(error);
                }
            }
        })
    ]
});

// Export the handler for GET and POST requests
export {
    handler as GET,
    handler as POST
};
