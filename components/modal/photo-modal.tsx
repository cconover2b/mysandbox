// components/modal/photo-modal.tsx

// Import necessary modules and components
import React from 'react';
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter
} from '../ui/alert-dialog'; // Importing custom AlertDialog components
import Image from 'next/image'; // Importing Image component from Next.js

// PhotoModal component definition
// The component takes three props: open, onClose, and url
function PhotoModal({
    open, // Boolean to control the dialog's open state
    onClose, // Function to handle closing the dialog
    url // URL of the image to be displayed
}: {
    open: boolean, // Type definition for open prop
    onClose: () => void, // Type definition for onClose prop
    url: string // Type definition for url prop
}) {
    return (
        // AlertDialog component with open state and onOpenChange handler
        <AlertDialog open={open} onOpenChange={onClose}>
            {/* AlertDialogContent with custom styling */}
            <AlertDialogContent className='p-4'>
                {
                    // Conditionally render the Image component if the URL is provided
                    url &&
                    <Image
                        width={800}
                        height={800}
                        src={url}
                        alt="pet photo" // Alt text for the image
                    />
                }
                <AlertDialogFooter>
                    {/* Button to close the dialog */}
                    <AlertDialogCancel
                        className='w-full bg-black text-white'
                    >
                        Close
                    </AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

// Export the PhotoModal component as the default export
export default PhotoModal;
