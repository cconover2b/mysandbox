// components/modal/alert-modal.tsx

// Import necessary modules and components
import React from 'react';
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogCancel,
    AlertDialogAction
} from '../ui/alert-dialog'; // Importing custom AlertDialog components

// AlertModal component definition
// The component takes three props: open, onClose, and onConfirm
function AlertModal({
    open, // Boolean to control the dialog's open state
    onClose, // Function to handle closing the dialog
    onConfirm // Function to handle confirming the action
}: {
    open: boolean, // Type definition for open prop
    onClose: () => void, // Type definition for onClose prop
    onConfirm: () => void // Type definition for onConfirm prop
}) {
    return (
        // AlertDialog component with open state and onOpenChange handler
        <AlertDialog open={open} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle> {/* Title of the alert dialog */}
                    <AlertDialogDescription>
                        This action cannot be undone. This will mark the ticket as complete. {/* Description of the alert dialog */}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel> {/* Button to cancel the action */}
                    <AlertDialogAction onClick={onConfirm}>Continue</AlertDialogAction> {/* Button to confirm the action */}
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

// Export the AlertModal component as the default export
export default AlertModal;
