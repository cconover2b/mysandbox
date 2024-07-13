// app/api/stats/route.ts

// Import necessary modules and functions
import { connectToDB } from "@/lib/db"; // Function to connect to the database
import { TicketModel } from "@/schemas/ticket"; // Ticket model schema

// Define the GET function to handle GET requests
export async function GET() {
    try {
        // Connect to the database
        await connectToDB();

        // Perform an aggregation on the TicketModel to group tickets by their status and count them
        const tickets = await TicketModel.aggregate([
            {
                $group: {
                    _id: { status: '$status' }, // Group by the 'status' field
                    count: { $sum: 1 } // Count the number of tickets in each group
                }
            }
        ]);

        // Return the aggregated ticket data as a JSON response
        return Response.json(tickets);

    } catch (error) {
        // Log any errors that occur during the process
        console.log(error);

        // Return an error message as a JSON response
        return Response.json({
            message: "Failed to get ticket stats"
        });
    }
}
