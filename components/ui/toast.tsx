// components/ui/toast.tsx

// Importing React library to use JSX and React components
import React from 'react';

// Importing ToastContainer from 'react-toastify' to display toast notifications
import { ToastContainer } from 'react-toastify';

// This functional component wraps the ToastContainer from 'react-toastify'
// It is a good practice to create a wrapper component for third-party libraries
// This allows you to customize and control the behavior of the library in one place
function ToastContainerWrapper() {
  return (
    // ToastContainer is the main component from 'react-toastify' that handles the display of toast notifications
    // autoClose={5000} means each toast will automatically close after 5000 milliseconds (5 seconds)
    // theme='colored' applies a colored theme to the toast notifications
    <ToastContainer autoClose={5000} theme='colored' />
  );
}

// Exporting the ToastContainerWrapper component as the default export
// This allows other parts of the application to import and use this component
export default ToastContainerWrapper;
