// app/dashboard/ticket-table.tsx

"use client"; // Mark this file as a Client Component

// Importing necessary utilities, types, and components
import { buildUrl } from '@/lib/utils'; // Utility function for building URLs
import { Ticket } from '@/types'; // Type definition for Ticket
import React, { useEffect, useState } from 'react'; // React library
import { DataTable } from './data-table'; // DataTable component
import { columns } from './columns'; // Column definitions for the DataTable

// Function component to fetch and display tickets in a table
const TicketTable = () => {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                // Fetching ticket data from the backend
                const response = await fetch(buildUrl('ticket'), {
                    cache: 'no-cache' // Ensuring fresh data is fetched
                });

                // Check if the response is OK (status code 200-299)
                if (!response.ok) {
                    throw new Error(`Failed to fetch tickets: ${response.statusText}`);
                }

                // Parsing the JSON response into an array of Ticket objects
                const ticketsJson: Ticket[] = await response.json();

                // Logging the fetched tickets to the console for debugging purposes
                console.log(ticketsJson);

                // Setting the fetched tickets to the state
                setTickets(ticketsJson);
            } catch (error: any) {
                // Setting the error message to the state
                setError(error.message);
                console.error('Error fetching tickets:', error);
            }
        };

        fetchTickets();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        // Rendering the DataTable component with the fetched data and column definitions
        <DataTable
            columns={columns}
            data={tickets}
        />
    );
};

// Exporting the component as the default export
export default TicketTable;