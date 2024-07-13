// schemas/ticket.ts

// Importing necessary types and functions from external libraries
// The Ticket and TicketStatus types define the structure and status of a ticket object, ensuring type safety.
import { Ticket, TicketStatus } from "@/types";
import mongoose, { Schema, model, models } from "mongoose";

// Defining the schema for the Ticket model
// A schema in Mongoose is a blueprint for the structure of documents within a collection.
const TicketSchema = new Schema<Ticket>({
    submitterName: String, // Name of the person who submitted the ticket
    submitterPhone: String, // Phone number of the submitter
    submitterEmail: String, // Email address of the submitter
    assignedInspector: {
        type: mongoose.Types.ObjectId, // Reference to a User object
        ref: 'User', // The 'User' model is referenced here
        default: null // Default value is null, meaning no inspector is assigned initially
    },
    dateOfRequest: {
        type: Date, // Date when the ticket was submitted
        default: Date.now // Default value is the current date and time
    },
    resolvedDate: Date, // Date when the ticket was resolved
    status: {
        type: String, // Status of the ticket
        default: TicketStatus.NEW, // Default status is 'NEW'
        get: (v: any) => `${v}` // Getter function to ensure the status is a string
    },
    notes: String, // Additional notes related to the ticket
    photo: String, // URL or path to a photo related to the ticket
    latlong: {
        type: { type: String, default: "Point" }, // GeoJSON type for location data
        coordinates: [Number] // Array of numbers representing latitude and longitude
    }
}, {
    toJSON: { getters: true } // Ensure getters are applied when converting to JSON
});

// Exporting the Ticket model
// If the model already exists, use it; otherwise, create a new model
// This approach prevents model recompilation issues in a development environment.
export const TicketModel = models.Ticket || model('Ticket', TicketSchema);

// Inspirational Note:
// Every ticket represents a problem waiting to be solved. Your code is the key to unlocking solutions.
// Strive for clarity, maintainability, and efficiency in your code. Happy coding!