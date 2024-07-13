// app/dashboard/ticket-table.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { Ticket } from '@/types'; // Import the Ticket type from your types file
import { DataTable } from './data-table'; // Import the DataTable component
import { columns } from './columns'; // Import the columns definition

const TicketTable: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch('/api/ticket');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const text = await response.text();

        if (!text) {
          throw new Error('Response is empty');
        }

        const ticketsJson: Ticket[] = JSON.parse(text);

        setTickets(ticketsJson);
      } catch (error) {
        console.error('Failed to fetch tickets:', error);
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    };

    fetchTickets();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Tickets</h1>
      <DataTable columns={columns} data={tickets} />
    </div>
  );
};

export default TicketTable;