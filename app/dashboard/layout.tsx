// app/dashboard/layout.tsx

// Importing necessary components and libraries
import Appbar from '@/components/appbar'; // Importing a custom Appbar component
import React from 'react'; // Importing React library
import AuthContext from './auth-context'; // Importing AuthContext for authentication context

// Define the DashboardLayout component as a functional component
function DashboardLayout({
  children // Destructure children prop, which will contain nested components
}: {
  children: React.ReactNode // Type annotation for children prop, ensuring it can be any valid React node
}) {
  return (
    // Wrap the layout with AuthContext to provide authentication context to all nested components
    <AuthContext>
      {/* Main container with responsive max-width and padding */}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Include the Appbar component at the top of the layout */}
        <Appbar />
        {/* Section to render the children components passed to DashboardLayout */}
        <section className='px-4'>
          {children} {/* Render the nested components */}
        </section>
      </div>
    </AuthContext>
  );
}

export default DashboardLayout; // Export the component as the default export
