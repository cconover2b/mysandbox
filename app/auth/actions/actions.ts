'use server';
// app/auth/actions/actions.ts

// Import necessary modules and functions
import { hashPassword } from '@/lib/utils'; // Function to hash passwords
import { UserModel } from '@/schemas/user'; // User model schema
import { redirect } from 'next/navigation'; // Function to handle redirection
import { connectToDB } from '@/lib/db'; // Function to connect to the database
import * as yup from 'yup'; // Library for schema validation

// Define a Yup schema for user validation
const User = yup.object({
    firstname: yup.string().required('firstname is required').min(1), // Firstname validation
    lastname: yup.string().required('lastname is required').min(1), // Lastname validation
    email: yup.string().required('email is required').email(), // Email validation
    password: yup.string().required('password is required').min(6), // Password validation
});

// Function to register a new user
export async function registerUser(prevState: any, formData: FormData) {
    try {
        // Extract form data
        const firstname = formData.get('firstname');
        const lastname = formData.get('lastname');
        const email = formData.get('email');
        const password = formData.get('password');

        // Validate the extracted data against the Yup schema
        await User.validate({
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password
        }, {
            abortEarly: false // Validate all fields and return all errors
        });

        // Hash the password
        const hash = await hashPassword(password?.toString() || '');

        // Connect to the database
        await connectToDB();

        // Create a new user in the database
        await UserModel.create({
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: hash
        });

    } catch (error) {
        // Log any errors that occur during the process
        console.log(error);
        const e = error as any;
        // Return an error message
        return {
            message: e.errors || 'Failed to register user'
        };
    }

    // Redirect to the sign-in page after successful registration
    redirect('/auth/signin');
}