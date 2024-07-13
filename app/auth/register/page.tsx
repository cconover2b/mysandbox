// app/auth/register/page.tsx

// Import necessary modules and components
import React from 'react';
import Link from 'next/link';
import RegistrationForm from './registrationForm'; // Custom registration form component
import { getServerSession } from 'next-auth'; // Function to get the current server session
import { redirect } from 'next/navigation'; // Function to handle redirection

// Async function to handle the signup page
async function Signup() {
    // Get the current server session
    const session = await getServerSession();

    // If the user is already logged in, redirect to the dashboard
    if (session) redirect('/dashboard');

    // Return the signup page JSX
    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                {/* Render the registration form component */}
                <RegistrationForm />
                <p className="mt-10 text-center text-sm text-gray-500">
                    Already a member?{' '}
                    <Link href="/auth/signin" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                        Signin
                    </Link>
                </p>
            </div>
        </div>
    );
}

// Export the Signup component as the default export
export default Signup;
