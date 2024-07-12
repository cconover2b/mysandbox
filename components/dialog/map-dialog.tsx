// components/dialog/map-dialog.tsx
import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { LatLong, Pin } from '@/types'; // Import Pin type
import Map from '../map';

interface MapDialogProps {
    open: boolean;
    onClose: () => void;
    latlong: LatLong;
    onUpdatePin: (pinInfo: Pin) => Promise<void>; // Add onUpdatePin prop
}

const MapDialog: React.FC<MapDialogProps> = ({ open, onClose, latlong, onUpdatePin }) => {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>MapView</DialogTitle>
                </DialogHeader>
                <Map coordinates={latlong.coordinates} />
                {/* Add a button or some UI element to trigger onUpdatePin */}
                <button onClick={() => onUpdatePin({ /* pass appropriate pinInfo */ })}>
                    Update Pin
                </button>
            </DialogContent>
        </Dialog>
    );
};

export default MapDialog;