'use client'
// app/auth/signin/page.tsx

// Import necessary modules and components
import React, { useState } from 'react';
import { Formik } from 'formik'; // Formik for form state management and validation
import { signIn } from 'next-auth/react'; // signIn function from next-auth for authentication
import { useRouter } from 'next/navigation'; // useRouter hook for navigation
import { Input } from '@/components/ui/input'; // Custom Input component
import { Button } from '@/components/ui/button'; // Custom Button component
import Link from 'next/link'; // Link component for navigation

// Interface for the login form data
interface LoginFormInterface {
  email: string;
  password: string;
}

// SignIn component
function SignIn() {
  // State to manage error display
  const [error, setError] = useState(false);
  // useRouter hook for navigation
  const router = useRouter();

  // Function to handle login
  const handleLogin = async (data: LoginFormInterface, { setSubmitting }: { setSubmitting: (value: boolean) => void }) => {
    // Call signIn function with credentials
    const response = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false, // Prevent automatic redirection
      callbackUrl: '/dashboard' // URL to redirect to on successful login
    });

    // Stop form submission state
    setSubmitting(false);

    // Check if login was successful
    if (!response?.ok) {
      setError(true); // Set error state to true if login failed
    } else {
      router.replace(response.url!); // Redirect to the dashboard on successful login
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm shadow-md">
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          {
            // Conditionally render the error message if login failed
            error &&
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              <p>Invalid Credentials</p> {/* Display the error message */}
            </div>
          }
          <Formik
            initialValues={{
              email: '', password: '' // Initial form values
            }}
            onSubmit={handleLogin} // Function to handle form submission
          >
            {({
              values, // Current form values
              handleSubmit, // Function to handle form submission
              handleChange, // Function to handle input changes
              isSubmitting // Boolean indicating if the form is being submitted
            }) =>
              <form className='space-y-6' onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Email address
                  </label>
                  <div className="mt-2">
                    <Input
                      id='email'
                      name='email'
                      onChange={handleChange} // Handle input change
                      value={values.email} // Set input value from form state
                      type='email'
                      placeholder='Email'
                      className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
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
                      name='password'
                      onChange={handleChange} // Handle input change
                      value={values.password} // Set input value from form state
                      type="password"
                      placeholder="Password"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  <Button
                    disabled={isSubmitting} // Disable button while form is submitting
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Sign in
                  </Button>
                </div>
              </form>
            }
          </Formik>
        </div>
        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{' '}
          <Link href="/auth/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}

// Export the SignIn component as the default export
export default SignIn;
