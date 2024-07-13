// schemas/ticket.ts

// Importing necessary types and functions from external libraries
import { Ticket, TicketStatus } from "@/types";
import mongoose, { Schema, model, models } from "mongoose";

// Defining the schema for the Ticket model
const TicketSchema = new Schema<Ticket>({
    submitterName: String, // Name of the person submitting the ticket
    submitterPhone: String, // Phone number of the submitter
    submitterEmail: String, // Email address of the submitter
    assignedInspector: {
        type: mongoose.Types.ObjectId, // Reference to a User model
        ref: 'User', // The model to which this ObjectId refers
        default: null // Default value is null, meaning no inspector assigned initially
    },
    dateOfRequest: {
        type: Date,
        default: Date.now // Default value is the current date and time
    },
    resolvedDate: Date, // Date when the ticket was resolved
    status: {
        type: String, // Status of the ticket
        default: TicketStatus.NEW, // Default status is 'NEW'
        get: (v: any) => `${v}` // Getter to ensure the status is returned as a string
    },
    notes: String, // Additional notes related to the ticket
    photo: String, // URL or path to a photo related to the ticket
    // GeoJSON object for storing geographical coordinates
    latlong: {
        type: { type: String, default: "Point" }, // Type of GeoJSON object, default is 'Point'
        coordinates: [Number] // Array of numbers representing the coordinates
    }
}, {
    toJSON: { getters: true } // Ensure getters are applied when converting to JSON
});

// Exporting the Ticket model
// If the model already exists, use it; otherwise, create a new model
export const TicketModel = models.Ticket || model('Ticket', TicketSchema);
