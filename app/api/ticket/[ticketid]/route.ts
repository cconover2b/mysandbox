// app/api/ticket/[ticketid]/route.ts

// Import necessary modules and functions
import { connectToDB } from "@/lib/db"; // Function to connect to the database
import { storageRef } from "@/lib/firebase"; // Firebase storage reference
import { TicketModel } from "@/schemas/ticket"; // Ticket model schema
import { TicketStatus } from "@/types"; // Ticket status types
import { deleteObject } from "firebase/storage"; // Function to delete an object from Firebase storage
import { NextResponse } from "next/server"; // Next.js response object

// DELETE function to handle DELETE requests
export async function DELETE(
    req: Request,
    { params }: { params: { ticketid: string } }
) {
    try {
        // Connect to the database
        await connectToDB();

        const ticketId = params.ticketid;

        // Check if ticketId is provided
        if (!ticketId) {
            return new NextResponse("Ticketid is required", { status: 400 });
        }

        // Find and delete the ticket by its ID
        let ticket = await TicketModel.findByIdAndDelete(ticketId);

        if (ticket) {
            // If there is a photo associated with the ticket, remove it from Firebase storage
            if (ticket.photo) {
                const ref = storageRef(ticket.photo);
                await deleteObject(ref);
            }

            // Return a success response with the deleted ticket
            return NextResponse.json({
                ticket: ticket,
                message: "Ticket deleted"
            });
        } else {
            // Return a response indicating that the ticket was not found
            return NextResponse.json({
                message: "Ticket not found"
            });
        }

    } catch (error) {
        // Log any errors that occur during the process
        console.log(error);
        // Return an internal error response
        return new NextResponse("Internal error", { status: 500 });
    }
}

// PATCH function to handle PATCH requests
export async function PATCH(
    req: Request,
    { params }: { params: { ticketid: string } }
) {
    // Connect to the database
    await connectToDB();

    // Parse the request body to get the updated data
    const body = await req.json();

    const { inspector, status } = body;
    const ticketId = params.ticketid;

    // Check if ticketId is provided
    if (!ticketId) {
        return new NextResponse("Ticketid is required", { status: 400 });
    }

    // Find the ticket by its ID
    const ticket = await TicketModel.findById(ticketId);
    if (!ticket) {
        // Return a response indicating that the ticket was not found
        return new NextResponse("Invalid ticket", { status: 404 });
    }

    // Update the ticket's assigned inspector and status based on the provided data
    if (status === TicketStatus.UNASSIGNED) {
        ticket.assignedInspector = null;
    } else {
        ticket.assignedInspector = inspector || ticket.assignedInspector;
    }

    ticket.status = status || ticket.status;

    // Save the updated ticket to the database
    await ticket.save();

    // Return a success response with the updated ticket
    return NextResponse.json({
        ticket: ticket,
        message: "Ticket updated"
    });
}
