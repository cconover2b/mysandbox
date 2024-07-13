// 'use client' directive ensures this file is treated as a client-side component
'use client'

// app/page.tsx

import { useEffect } from "react"; // Importing useEffect hook from React
import { signIn } from 'next-auth/react'; // Importing signIn function from next-auth for authentication

// Default export of the Home component
export default function Home() {

  // useEffect hook to perform side effects in function components
  useEffect(() => {
    // Define an asynchronous function to handle sign-in
    const signin = async () => {
      // Await the signIn function to initiate the authentication process
      await signIn();
    };

    // Immediately invoke the signin function when the component mounts
    signin();
  }, []); // Empty dependency array ensures this effect runs only once, similar to componentDidMount

  // Return statement of the component
  // Currently, it returns an empty fragment, meaning no visible UI is rendered
  return (
    <>
    </>
  );
}