'use client'

// components/ui/sheet.tsx
// Updated Code with Additional Safeguards and Logging

import * as React from "react"
import * as SheetPrimitive from "@radix-ui/react-dialog"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

// Defining the main Sheet component using the Root component from @radix-ui/react-dialog.
const Sheet = SheetPrimitive.Root

// Defining the SheetTrigger component using the Trigger component from @radix-ui/react-dialog.
const SheetTrigger = SheetPrimitive.Trigger

// Defining the SheetClose component using the Close component from @radix-ui/react-dialog.
const SheetClose = SheetPrimitive.Close

// Defining the SheetPortal component using the Portal component from @radix-ui/react-dialog.
const SheetPortal = SheetPrimitive.Portal

// Defining the SheetOverlay component using React.forwardRef to pass refs to the overlay element.
const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => {
  console.log('SheetOverlay props:', props) // Log props for debugging
  return (
    <SheetPrimitive.Overlay
      className={cn(
        "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className
      )}
      {...props}
      ref={ref}
    />
  )
})
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName

// Defining variants for the Sheet component using class-variance-authority.
const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
)

// Defining the props for the SheetContent component.
interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {}

// Defining the SheetContent component using React.forwardRef to pass refs to the content element.
const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(({ side = "right", className, children, ...props }, ref) => {
  console.log('SheetContent props:', props) // Log props for debugging
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        ref={ref}
        className={cn(sheetVariants({ side }), className)}
        {...props}
      >
        {children}
        <SheetPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPortal>
  )
})
SheetContent.displayName = SheetPrimitive.Content.displayName

// Defining the SheetHeader component.
const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  console.log('SheetHeader props:', props) // Log props for debugging
  return (
    <div
      className={cn(
        "flex flex-col space-y-2 text-center sm:text-left",
        className
      )}
      {...props}
    />
  )
}
SheetHeader.displayName = "SheetHeader"

// Defining the SheetFooter component.
const SheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  console.log('SheetFooter props:', props) // Log props for debugging
  return (
    <div
      className={cn(
        "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
        className
      )}
      {...props}
    />
  )
}
SheetFooter.displayName = "SheetFooter"

// Defining the SheetTitle component using React.forwardRef to pass refs to the title element.
const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => {
  console.log('SheetTitle props:', props) // Log props for debugging
  return (
    <SheetPrimitive.Title
      ref={ref}
      className={cn("text-lg font-semibold text-foreground", className)}
      {...props}
    />
  )
})
SheetTitle.displayName = SheetPrimitive.Title.displayName

// Defining the SheetDescription component using React.forwardRef to pass refs to the description element.
const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => {
  console.log('SheetDescription props:', props) // Log props for debugging
  return (
    <SheetPrimitive.Description
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
})
SheetDescription.displayName = SheetPrimitive.Description.displayName

// Exporting all the defined components for use in other parts of the application.
export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}
