// components/modal/loading-modal.tsx

// Import necessary modules and components
import {
    AlertDialog,
    AlertDialogContent,
} from "@/components/ui/alert-dialog"; // Importing custom AlertDialog components
import React from "react"; // Importing React library
import { Loader } from "../ui/loader"; // Importing custom Loader component

// LoadingModal component definition
// The component takes one prop: open
function LoadingModal({
    open // Boolean to control the dialog's open state
}: { open: boolean }) { // Type definition for open prop
    return (
        // AlertDialog component with open state
        <AlertDialog open={open}>
            {/* AlertDialogContent with custom styling */}
            <AlertDialogContent className="flex p-4 align-middle justify-between">
                Please wait... {/* Message displayed in the dialog */}
                <Loader /> {/* Loader component to show a loading spinner */}
            </AlertDialogContent>
        </AlertDialog>
    );
}

// Export the LoadingModal component as the default export
export default LoadingModal;
