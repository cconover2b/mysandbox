// components/ui/table.tsx

// Importing React library to use JSX and React components
import * as React from 'react';

// Importing a utility function 'cn' from the utils file
// This function is typically used to conditionally join class names together
import { cn } from '@/lib/utils';

// Creating a Table component using React.forwardRef
// React.forwardRef allows you to pass a ref through a component to one of its children
const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  // Wrapping the table in a div to make it scrollable if it overflows
  <div className="relative w-full overflow-auto">
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-sm", className)} // Combining default and passed class names
      {...props} // Spreading the remaining props onto the table element
    />
  </div>
));
Table.displayName = "Table"; // Setting a display name for the component for better debugging

// Creating a TableHeader component using React.forwardRef
const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
));
TableHeader.displayName = "TableHeader";

// Creating a TableBody component using React.forwardRef
const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)} // Removing border for the last row
    {...props}
  />
));
TableBody.displayName = "TableBody";

// Creating a TableFooter component using React.forwardRef
const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0", // Styling for the footer
      className
    )}
    {...props}
  />
));
TableFooter.displayName = "TableFooter";

// Creating a TableRow component using React.forwardRef
const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted", // Adding hover and selected state styles
      className
    )}
    {...props}
  />
));
TableRow.displayName = "TableRow";

// Creating a TableHead component using React.forwardRef
const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0", // Styling for table headers
      className
    )}
    {...props}
  />
));
TableHead.displayName = "TableHead";

// Creating a TableCell component using React.forwardRef
const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)} // Styling for table cells
    {...props}
  />
));
TableCell.displayName = "TableCell";

// Creating a TableCaption component using React.forwardRef
const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-muted-foreground", className)} // Styling for table captions
    {...props}
  />
));
TableCaption.displayName = "TableCaption";

// Exporting all the table-related components
// This allows other parts of the application to import and use these components
export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
