// components/ui/card.tsx

// Import necessary modules and components
import * as React from "react" // Importing React for building the component
import { cn } from "@/lib/utils" // Utility function for conditional class names

// Card component definition using React.forwardRef
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref} // Forwarding the ref to the underlying DOM element
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm", // Base styles for the card
      className // Additional class names passed as props
    )}
    {...props} // Spreading the remaining props
  />
))
Card.displayName = "Card" // Setting the display name for debugging purposes

// CardHeader component definition using React.forwardRef
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref} // Forwarding the ref to the underlying DOM element
    className={cn("flex flex-col space-y-1.5 p-6", className)} // Base styles for the card header
    {...props} // Spreading the remaining props
  />
))
CardHeader.displayName = "CardHeader" // Setting the display name for debugging purposes

// CardTitle component definition using React.forwardRef
const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref} // Forwarding the ref to the underlying DOM element
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight", // Base styles for the card title
      className // Additional class names passed as props
    )}
    {...props} // Spreading the remaining props
  />
))
CardTitle.displayName = "CardTitle" // Setting the display name for debugging purposes

// CardDescription component definition using React.forwardRef
const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref} // Forwarding the ref to the underlying DOM element
    className={cn("text-sm text-muted-foreground", className)} // Base styles for the card description
    {...props} // Spreading the remaining props
  />
))
CardDescription.displayName = "CardDescription" // Setting the display name for debugging purposes

// CardContent component definition using React.forwardRef
const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} /> // Base styles for the card content
))
CardContent.displayName = "CardContent" // Setting the display name for debugging purposes

// CardFooter component definition using React.forwardRef
const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref} // Forwarding the ref to the underlying DOM element
    className={cn("flex items-center p-6 pt-0", className)} // Base styles for the card footer
    {...props} // Spreading the remaining props
  />
))
CardFooter.displayName = "CardFooter" // Setting the display name for debugging purposes

// Exporting the Card components for use in other parts of the application
export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
