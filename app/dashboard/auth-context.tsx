// app/dashboard/auth-context.tsx
'use client' // This directive indicates that the code in this file should be executed on the client side.

/**
 * Importing necessary modules and components:
 * - SessionProvider: A component from 'next-auth/react' that provides session management for Next.js applications.
 * - React: The core React library for building user interfaces.
 */
import { SessionProvider } from 'next-auth/react'
import React from 'react'

/**
 * AuthContext Component
 * 
 * This component wraps its children with the SessionProvider from 'next-auth/react'.
 * It ensures that any component nested within AuthContext has access to the authentication context.
 * 
 * @param {Object} props - The properties passed to the component.
 * @param {React.ReactNode} props.children - The child components that will be wrapped by the SessionProvider.
 * 
 * @returns {JSX.Element} The SessionProvider component wrapping the children.
 */
function AuthContext({
    children
}: {
    children: React.ReactNode
}) {
  return (
    <SessionProvider>
        {children}
    </SessionProvider>
  )
}

export default AuthContext