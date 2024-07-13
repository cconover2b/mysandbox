'use client'
// app/auth/register/registrationForm.tsx

// Import necessary modules and components
import React from 'react';
import { useFormState } from 'react-dom'; // Custom hook to manage form state
import { registerUser } from '../actions/actions'; // Function to handle user registration
import { Input } from '@/components/ui/input'; // Custom Input component
import SubmitButton from '@/components/ui/submit-button'; // Custom SubmitButton component

// Initial state for the form
const initialState = {
    message: '' // Message to display errors or success messages
};

// RegistrationForm component
function RegistrationForm() {
    // useFormState hook to manage form state and actions
    // `state` holds the current state of the form
    // `formAction` is the function to handle form submission
    const [state, formAction] = useFormState(registerUser, initialState);

    return (
        <form className='space-y-6 shadow-md p-4' action={formAction}>
            {
                // Conditionally render the error message if it exists in the state
                state.message &&
                <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    <p>{state.message}</p> {/* Display the error message */}
                </div>
            }
            <div>
                <label htmlFor="firstname" className="block text-sm font-medium leading-6 text-gray-900">
                    Firstname
                </label>
                <div className="mt-2">
                    <Input
                        id="firstname"
                        name="firstname"
                        type="text"
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>
            <div>
                <label htmlFor="lastname" className="block text-sm font-medium leading-6 text-gray-900">
                    Lastname
                </label>
                <div className="mt-2">
                    <Input
                        id="lastname"
                        name="lastname"
                        type="text"
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>

            <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Email address
                </label>
                <div className="mt-2">
                    <Input
                        id="email"
                        name='email'
                        type="email"
                        placeholder="Email"
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>

            <div>
                <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                        Password
                    </label>
                </div>
                <div className="mt-2">
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>

            <div>
                <SubmitButton title='Register' /> {/* Custom submit button with title 'Register' */}
            </div>
        </form>
    );
}

// Export the RegistrationForm component as the default export
export default RegistrationForm;