// app/dashboard/page.tsx

// Importing necessary components and libraries
import React from 'react'; // Importing React library
import Stats from './stats'; // Importing a custom Stats component
import TicketTable from './ticket-table'; // Importing a custom TicketTable component

// Define the DashboardPage component as a functional component
function DashboardPage() {
  return (
    // Main container for the dashboard page
    <div>
      {/* Include the Stats component to display statistical data */}
      <Stats />
      {/* Include the TicketTable component to display a table of tickets */}
      <TicketTable />
    </div>
  );
}

export default DashboardPage; // Export the component as the default export
