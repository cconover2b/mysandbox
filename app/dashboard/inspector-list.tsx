'use client'; // This directive indicates that the file is a client-side component in Next.js
// app/dashboard/inspector-list.tsx

import { Button } from '@/components/ui/button'; // Importing a custom Button component
import { Combobox } from '@/components/ui/combobox'; // Importing a custom Combobox component
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet'; // Importing components for a modal-like sheet
import { User } from '@/types'; // Importing the User type definition
import React, { useState } from 'react'; // Importing React and useState hook

// Define the props interface for the InspectorList component
interface InspectorListProps {
    open: boolean; // Indicates if the sheet is open
    setOpen: React.Dispatch<React.SetStateAction<boolean>>; // Function to set the open state
    onInspectorAssign: (value: User) => void; // Callback function when an inspector is assigned
}

// Define the InspectorList component as a functional component
const InspectorList: React.FC<InspectorListProps> = ({ open, setOpen, onInspectorAssign }) => {
    // State to keep track of the selected inspector
    const [inspector, setInspector] = useState<User | undefined>();

    // Function to handle the selection of an inspector from the Combobox
    const handleInspectorSelect = (user: User) => {
        console.log('Selected inspector:', user); // Log selected inspector for debugging
        setInspector(user); // Update the state with the selected inspector
    };

    // Function to handle the closing of the sheet
    const handleOpenChange = () => {
        setOpen(false); // Set the open state to false to close the sheet
    };

    // Function to handle the assignment of the selected inspector
    const handleAssign = () => {
        if (inspector) { // Check if an inspector is selected
            console.log('Assigning inspector:', inspector); // Log inspector being assigned for debugging
            onInspectorAssign(inspector); // Call the callback function with the selected inspector
            setOpen(false); // Close the sheet after assignment
        } else {
            console.error('No inspector selected'); // Log an error if no inspector is selected
        }
    };

    return (
        <Sheet open={open} onOpenChange={handleOpenChange}> {/* Sheet component to display the modal */}
            <SheetContent> {/* Content of the sheet */}
                <SheetHeader> {/* Header of the sheet */}
                    <SheetTitle>Inspector List</SheetTitle> {/* Title of the sheet */}
                </SheetHeader>
                <div className="grid gap-4 py-4"> {/* Container for the Combobox with some styling */}
                    <Combobox onValueSelect={handleInspectorSelect} /> {/* Combobox component to select an inspector */}
                </div>
                <SheetFooter> {/* Footer of the sheet */}
                    <Button onClick={handleOpenChange} variant="outline" type="button">Close</Button> {/* Button to close the sheet */}
                    <Button onClick={handleAssign}>Assign</Button> {/* Button to assign the selected inspector */}
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
};

export default InspectorList; // Export the component as the default export