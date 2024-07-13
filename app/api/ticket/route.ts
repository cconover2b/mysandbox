import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/db';
import { TicketModel } from '@/schemas/ticket';

// Handler for GET requests
export async function GET(req: NextRequest) {
  await connectToDB();

  try {
    const tickets = await TicketModel.find().populate('assignedInspector');
    console.log('Fetched tickets:', tickets); // Add this line to log the fetched tickets
    return NextResponse.json(tickets, { status: 200 });
  } catch (error) {
    console.error('Error fetching tickets:', error); // More detailed error logging
    return NextResponse.json({ message: 'Failed to get tickets' }, { status: 500 });
  }
}

// Handler for POST requests
export async function POST(req: NextRequest) {
  await connectToDB();

  try {
    const body = await req.json();
    const newTicket = new TicketModel(body);
    await newTicket.save();
    return NextResponse.json(newTicket, { status: 201 });
  } catch (error) {
    console.error('Error creating ticket:', error); // More detailed error logging
    return NextResponse.json({ message: 'Failed to create ticket' }, { status: 500 });
  }
}