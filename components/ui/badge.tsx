// components/ui/badge.tsx

// Import necessary modules and components
import * as React from "react" // Importing React for building the component
import { cva, type VariantProps } from "class-variance-authority" // Importing cva for creating variant-based class names and VariantProps for typing

import { cn } from "@/lib/utils" // Utility function for conditional class names

// Define badge variants using cva
const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", // Base styles for the badge
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80", // Styles for the default variant
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80", // Styles for the secondary variant
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80", // Styles for the destructive variant
        outline: "text-foreground", // Styles for the outline variant
      },
    },
    defaultVariants: {
      variant: "default", // Default variant if none is specified
    },
  }
)

// Define the props interface for the Badge component
export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>, // Extending HTML div attributes
    VariantProps<typeof badgeVariants> {} // Extending variant props from cva

// Badge component definition
function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} /> // Applying variant-based and additional class names, spreading remaining props
  )
}

// Exporting the Badge component and badgeVariants for use in other parts of the application
export { Badge, badgeVariants }
