// app/dashboard/ticket-table.tsx

// Importing necessary utilities, types, and components
import { buildUrl } from '@/lib/utils'; // Utility function for building URLs
import { Ticket } from '@/types'; // Type definition for Ticket
import React from 'react'; // React library
import { DataTable } from './data-table'; // DataTable component
import { columns } from './columns'; // Column definitions for the DataTable

// Async function component to fetch and display tickets in a table
async function TicketTable() {

    // Fetching ticket data from the backend
    const tickets = await fetch(buildUrl('ticket'), {
        cache: 'no-cache' // Ensuring fresh data is fetched
    });

    // Parsing the JSON response into an array of Ticket objects
    const ticketsJson: Ticket[] = await tickets.json();

    // Logging the fetched tickets to the console for debugging purposes
    console.log(ticketsJson);

    return (
        // Rendering the DataTable component with the fetched data and column definitions
        <DataTable
            columns={columns}
            data={ticketsJson}
        />
    );
}

// Exporting the component as the default export
export default TicketTable;
