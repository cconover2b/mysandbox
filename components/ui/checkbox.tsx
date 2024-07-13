// components/ui/checkbox.tsx

// 'use client' directive to ensure this component is rendered on the client side
'use client'

// Import necessary modules and components
import * as React from "react" // Importing React for building the component
import * as CheckboxPrimitive from "@radix-ui/react-checkbox" // Importing Radix UI's Checkbox primitive for accessible checkbox components
import { Check } from "lucide-react" // Importing the Check icon from lucide-react for the checkbox indicator

import { cn } from "@/lib/utils" // Utility function for conditional class names

// Checkbox component definition using React.forwardRef
const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>, // Type for the ref, indicating it will be a Radix UI Checkbox Root element
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> // Type for the props, extending the props of Radix UI Checkbox Root
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref} // Forwarding the ref to the underlying Radix UI Checkbox Root element
    className={cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground", // Base styles for the checkbox
      className // Additional class names passed as props
    )}
    {...props} // Spreading the remaining props
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current")} // Styles for the checkbox indicator
    >
      <Check className="h-4 w-4" /> 
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName // Setting the display name for debugging purposes

// Exporting the Checkbox component for use in other parts of the application
export { Checkbox }
