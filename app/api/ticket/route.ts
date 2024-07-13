// app/api/ticket/route.ts

// Import necessary modules and functions
import { connectToDB } from "@/lib/db"; // Function to connect to the database
import { TicketModel } from "@/schemas/ticket"; // Ticket model schema

// GET function to handle fetching all tickets
export async function GET() {
    try {
        // Connect to the database
        await connectToDB();

        // Fetch all tickets from the database and populate the 'assignedInspector' field
        const tickets = await TicketModel.find({}).populate('assignedInspector');

        // Return the fetched tickets as a JSON response
        return Response.json(tickets);
    } catch (error) {
        // Log any errors that occur during the process
        console.log(error);
        // Return an error response
        return Response.json({ message: "Failed to get tickets" });
    }
}
