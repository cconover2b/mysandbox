'use client'
// app/dashboard/columns.tsx

// Importing necessary components and types
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // Avatar components for displaying user photos
import { Button } from "@/components/ui/button"; // Button component for UI interactions
import { Ticket, User } from "@/types"; // Type definitions for Ticket and User
import { ColumnDef } from "@tanstack/react-table"; // Column definition type from react-table library
import { CiImageOff } from 'react-icons/ci'; // Icon for image fallback
import { AiOutlineArrowUp } from 'react-icons/ai'; // Icon for sorting indicator
import { Badge } from "@/components/ui/badge"; // Badge component for status display
import { RowActions } from "./row-actions"; // Row actions component for additional row-specific actions
import { Checkbox } from "@/components/ui/checkbox"; // Checkbox component for row selection

// Define the columns for the table, specifying the type as an array of ColumnDef<Ticket>
export const columns: ColumnDef<Ticket>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="select row"
            />
        ),
        enableSorting: false // Disable sorting for the selection column
    },
    {
        accessorKey: 'photo',
        header: "Photo",
        cell: ({ row, table }) => (
            <Avatar>
                <AvatarImage
                    className="cursor-pointer"
                    src={`${row.getValue('photo')}`}
                    onClick={() => table.options.meta?.photoThumbClicked(row.id)}
                />
                <AvatarFallback><CiImageOff /></AvatarFallback>
            </Avatar>
        )
    },
    {
        accessorKey: "submitterName",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Name
                    <AiOutlineArrowUp className='ml-2 h-4 w-4' />
                </Button>
            )
        }
    },
    {
        accessorKey: "submitterPhone",
        header: "Phone"
    },
    {
        accessorKey: 'assignedInspector',
        header: "Assigned to",
        cell: ({ row }) => (row.getValue('assignedInspector') as User)?.fullName || ''
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            let color = 'bg-green-300'

            const status: string = row.getValue('status')

            switch (status) {
                case 'new':
                    color = 'bg-orange-300'
                    break;
                case 'assigned':
                    color = 'bg-purple-300'
                    break;
                case 'unassigned':
                    color = 'bg-red-300'
                    break;
            }

            return <Badge className={`${color}`}>{status}</Badge>
        }
    },
    {
        id: 'actions',
        cell: ({ row }) => <RowActions row={row} />
    }
]