// components/dialog/map-dialog.tsx

// Import necessary modules and components
import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"; // Importing custom Dialog components
import { LatLong } from '@/types'; // Importing LatLong type definition
import Map from '../map'; // Importing the Map component

// MapDialog component definition
// The component takes three props: open, onClose, and latlong
// 43.6425662,-79.3870568
function MapDialog({
    open, // Boolean to control the dialog's open state
    onClose, // Function to handle closing the dialog
    latlong // Object containing latitude and longitude coordinates
}: {
    open: boolean, // Type definition for open prop
    onClose: () => void, // Type definition for onClose prop
    latlong: LatLong // Type definition for latlong prop
}) {
    return (
        // Dialog component with open state and onOpenChange handler
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>MapView</DialogTitle> {/* Title of the dialog */}
                </DialogHeader>
                {/* Map component with coordinates passed as a prop */}
                <Map coordinates={latlong.coordinates} />
            </DialogContent>
        </Dialog>
    );
}

// Export the MapDialog component as the default export
export default MapDialog;
