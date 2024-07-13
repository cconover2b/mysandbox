'use client'
// components/ui/avatar.tsx

// Import necessary modules and components
import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar" // Importing Avatar components from Radix UI

import { cn } from "@/lib/utils" // Utility function for conditional class names

// Avatar component definition using React.forwardRef
const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>, // Type for the ref
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> // Type for the props
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref} // Forwarding the ref to the underlying DOM element
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", // Default styles for the Avatar
      className // Additional class names passed as props
    )}
    {...props} // Spreading the remaining props
  />
))
Avatar.displayName = AvatarPrimitive.Root.displayName // Setting the display name for debugging purposes

// AvatarImage component definition using React.forwardRef
const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>, // Type for the ref
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image> // Type for the props
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref} // Forwarding the ref to the underlying DOM element
    className={cn("aspect-square h-full w-full", className)} // Default styles for the AvatarImage
    {...props} // Spreading the remaining props
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName // Setting the display name for debugging purposes

// AvatarFallback component definition using React.forwardRef
const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>, // Type for the ref
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback> // Type for the props
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref} // Forwarding the ref to the underlying DOM element
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted", // Default styles for the AvatarFallback
      className // Additional class names passed as props
    )}
    {...props} // Spreading the remaining props
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName // Setting the display name for debugging purposes

// Exporting all components for use in other parts of the application
export { Avatar, AvatarImage, AvatarFallback }
