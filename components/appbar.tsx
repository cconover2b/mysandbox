// components/appbar.tsx

// 'use client' directive is used in Next.js to indicate that this component should be rendered on the client side
'use client'

// Importing necessary hooks and functions from 'next-auth/react' for authentication
import { signOut, useSession } from 'next-auth/react'

// Importing React library to use JSX and React components
import React from 'react'

// Importing a custom Button component from the 'ui' directory
import { Button } from './ui/button'

// Defining the Appbar functional component
function Appbar() {
  // Using the useSession hook to get the current session data
  // The session object contains information about the authenticated user
  const { data: session } = useSession()

  return (
    // A flex container to layout the app bar elements
    <div className='flex justify-between'>
      {/* Title of the dashboard */}
      <h1 className='text-4xl tracking-tight text-gray-500'>Dashboard</h1>

      {/* A flex container for the user greeting and logout button */}
      <div className="flex justify-center align-middle p-2">
        {/* Displaying a greeting message with the user's email */}
        <div className="font-semibold">
          Hello, {session?.user?.email}
        </div>

        {/* Logout button that triggers the signOut function from 'next-auth/react' */}
        <Button
          onClick={() => signOut({ callbackUrl: '/' })} // Redirecting to the home page after sign out
          className='ml-2'
        >
          Logout
        </Button>
      </div>
    </div>
  )
}

// Exporting the Appbar component as the default export
// This allows other parts of the application to import and use this component
export default Appbar
