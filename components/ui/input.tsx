// components/ui/input.tsx

// Importing React and necessary utilities
import * as React from "react"

// Importing a utility function 'cn' from a local utils file
import { cn } from "@/lib/utils"

// Defining the interface for InputProps which extends the default HTML input attributes
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

// Creating a functional component 'Input' using React.forwardRef to pass refs to the input element
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      // Returning an input element with various properties and styles
      <input
        type={type} // Setting the type of the input (e.g., text, password, email)
        className={cn(
          // Combining multiple class names using the 'cn' utility function
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className // Adding any additional class names passed via props
        )}
        ref={ref} // Forwarding the ref to the input element
        {...props} // Spreading any additional props onto the input element
      />
    )
  }
)

// Setting a display name for the Input component, useful for debugging and React DevTools
Input.displayName = "Input"

// Exporting the Input component for use in other parts of the application
export { Input }
