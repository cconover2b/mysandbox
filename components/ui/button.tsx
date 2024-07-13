// components/ui/button.tsx

// Import necessary modules and components
import * as React from "react" // Importing React for building the component
import { Slot } from "@radix-ui/react-slot" // Importing Slot from Radix UI for component composition
import { cva, type VariantProps } from "class-variance-authority" // Importing cva for creating variant-based class names and VariantProps for typing

import { cn } from "@/lib/utils" // Utility function for conditional class names

// Define button variants using cva
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50", // Base styles for the button
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90", // Styles for the default variant
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90", // Styles for the destructive variant
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground", // Styles for the outline variant
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80", // Styles for the secondary variant
        ghost: "hover:bg-accent hover:text-accent-foreground", // Styles for the ghost variant
        link: "text-primary underline-offset-4 hover:underline", // Styles for the link variant
      },
      size: {
        default: "h-10 px-4 py-2", // Styles for the default size
        sm: "h-9 rounded-md px-3", // Styles for the small size
        lg: "h-11 rounded-md px-8", // Styles for the large size
        icon: "h-10 w-10", // Styles for the icon size
      },
    },
    defaultVariants: {
      variant: "default", // Default variant if none is specified
      size: "default", // Default size if none is specified
    },
  }
)

// Define the props interface for the Button component
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, // Extending HTML button attributes
    VariantProps<typeof buttonVariants> { // Extending variant props from cva
  asChild?: boolean // Optional prop to render the button as a child component
}

// Button component definition using React.forwardRef
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button" // Conditionally render as Slot or button element
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))} // Applying variant-based and additional class names
        ref={ref} // Forwarding the ref to the underlying DOM element
        {...props} // Spreading the remaining props
      />
    )
  }
)
Button.displayName = "Button" // Setting the display name for debugging purposes

// Exporting the Button component and buttonVariants for use in other parts of the application
export { Button, buttonVariants }
