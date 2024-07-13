// app/api/ticket/bulk/route.ts

// Import necessary modules and functions
import { connectToDB } from "@/lib/db"; // Function to connect to the database
import { storageRef } from "@/lib/firebase"; // Firebase storage reference
import { TicketModel } from "@/schemas/ticket"; // Ticket model schema
import { Ticket } from "@/types"; // Ticket type definition
import { deleteObject } from "firebase/storage"; // Function to delete an object from Firebase storage
import { ObjectId } from "mongodb"; // ObjectId type from MongoDB

// PATCH function to handle bulk update requests
export async function PATCH(
    req: Request
) {
    try {
        // Connect to the database
        await connectToDB();

        // Parse the request body to get the updated data
        const body = await req.json();
        const { tickets, status } = body;

        // Update the status of multiple tickets based on their IDs
        await TicketModel.updateMany({
            _id: tickets.map((t: ObjectId) => t) // Map ticket IDs to ObjectId
        }, {
            status: status // Set the new status
        });

        // Return a success response
        return Response.json("Tickets updated");

    } catch (error) {
        // Log any errors that occur during the process
        console.log(error);
        // Return an error response
        return Response.json("Failed to update tickets");
    }
}

// DELETE function to handle bulk delete requests
export async function DELETE(
    req: Request
) {
    try {
        // Parse the request body to get the ticket IDs to delete
        const body = await req.json();
        const { tickets } = body;

        // Find the tickets to delete based on their IDs
        const ticketsToDelete = await TicketModel.find<Ticket>({
            _id: tickets.map((t: ObjectId) => t) // Map ticket IDs to ObjectId
        });

        // Delete the tickets from the database
        await TicketModel.deleteMany({
            _id: tickets.map((t: ObjectId) => t) // Map ticket IDs to ObjectId
        });

        // If there are tickets with associated photos, delete the photos from Firebase storage
        if (ticketsToDelete.length > 0) {
            for (const ticket of ticketsToDelete) {
                if (ticket.photo) {
                    const ref = storageRef(ticket.photo);
                    await deleteObject(ref);
                }
            }
        }

        // Return a success response
        return Response.json("Tickets deleted");
    } catch (error) {
        // Log any errors that occur during the process
        console.log(error);
        // Return an error response
        return Response.json("Failed to delete tickets");
    }
}
