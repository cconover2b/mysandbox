// components/ui/popover.tsx

// 'use client' directive is used in Next.js to specify that this file should be treated as a client-side component.
// This is important for components that rely on client-side libraries or hooks like useState, useEffect, etc.
'use client'

// Importing React and necessary components from the @radix-ui/react-popover library.
import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"

// Importing a utility function 'cn' from a local utils file.
// The 'cn' function is typically used to conditionally combine class names.
import { cn } from "@/lib/utils"

// Defining the Popover component using the Root component from @radix-ui/react-popover.
// This serves as the main container for the popover.
const Popover = PopoverPrimitive.Root

// Defining the PopoverTrigger component using the Trigger component from @radix-ui/react-popover.
// This component will be used to trigger the display of the popover.
const PopoverTrigger = PopoverPrimitive.Trigger

// Defining the PopoverContent component using React.forwardRef to pass refs to the content element.
// This component will render the content of the popover.
const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  // Using the Portal component from @radix-ui/react-popover to render the popover content in a different part of the DOM.
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref} // Forwarding the ref to the content element.
      align={align} // Setting the alignment of the popover content.
      sideOffset={sideOffset} // Setting the offset of the popover content from the trigger element.
      className={cn(
        // Combining multiple class names using the 'cn' utility function.
        // These class names include default styles and any additional class names passed via props.
        "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props} // Spreading any additional props onto the content element.
    />
  </PopoverPrimitive.Portal>
))
// Setting a display name for the PopoverContent component, useful for debugging and React DevTools.
PopoverContent.displayName = PopoverPrimitive.Content.displayName

// Exporting the Popover, PopoverTrigger, and PopoverContent components for use in other parts of the application.
export { Popover, PopoverTrigger, PopoverContent }
