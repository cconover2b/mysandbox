// types/index.ts
export type LatLong = {
    type?: string;
    coordinates: [number, number];
  };
  
  export type Pin = {
    id: string;
    name: string;
    description: string;
    latitude: number;
    longitude: number;
  };
  
  export type User = {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    fullName: string;
  };
  
  export enum TicketStatus {
    ASSIGNED = 'ASSIGNED',
    UNASSIGNED = 'UNASSIGNED',
    COMPLETED = 'COMPLETED',
  }
  
  export type Ticket = {
    id: string;
    title: string;
    description: string;
    status: TicketStatus;
    inspector?: string;
  };