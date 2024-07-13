// components/ui/submit-button.tsx
// Updated Code with Additional Safeguards and Logging

import React from 'react'
import { Button } from './button'
import { useFormStatus } from 'react-dom'
import { Loader } from './loader'

// Defining the props for the SubmitButton component.
interface SubmitButtonProps {
  title: string
}

// Defining the SubmitButton component.
function SubmitButton({ title }: SubmitButtonProps) {
  // Using the useFormStatus hook to get the form status.
  const { pending } = useFormStatus()

  // Logging the form status for debugging purposes.
  console.log('Form status:', { pending })

  // Returning the Button component with conditional rendering based on the form status.
  return (
    <Button
      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      type="submit"
    >
      {pending ? <Loader /> : title}
    </Button>
  )
}

// Exporting the SubmitButton component for use in other parts of the application.
export default SubmitButton
