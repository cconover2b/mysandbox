// app/dashboard/data-table.tsx
'use client'; // This directive indicates that the code in this file should be executed on the client side.

/**
 * Importing necessary modules and components:
 * - Button, Input, Table, TableBody, TableCell, TableHead, TableHeader, TableRow: UI components for building the table and its controls.
 * - DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger: Components for creating dropdown menus.
 * - Various hooks and utilities from '@tanstack/react-table' for table functionalities.
 * - useRouter: A hook from 'next/navigation' for navigation purposes.
 * - useState: A React hook for managing state.
 * - BsChevronDown: An icon from 'react-icons/bs'.
 * - Ticket, TicketStatus: Types for ticket data.
 * - buildUrl: A utility function for building URLs.
 * - toast: A library for displaying notifications.
 * - PhotoModal, LoadingModal: Custom modal components.
 */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
    ColumnDef,
    ColumnFiltersState,
    RowData,
    RowSelectionState,
    SortingState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable
} from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BsChevronDown } from 'react-icons/bs';
import { Ticket, TicketStatus } from "@/types";
import { buildUrl } from "@/lib/utils";
import { toast } from 'react-toastify';
import PhotoModal from "@/components/modal/photo-modal";
import LoadingModal from "@/components/modal/loading-modal";

/**
 * Extending the TableMeta interface from '@tanstack/react-table' to include a custom method.
 */
declare module '@tanstack/react-table' {
    interface TableMeta<TData extends RowData> {
        photoThumbClicked: (rowIndex: string) => void;
    }
}

/**
 * DataTableProps Interface
 *
 * @template TData - The type of data for the table rows.
 * @template TValue - The type of value for the table columns.
 *
 * @property {ColumnDef<TData, TValue>[]} columns - The column definitions for the table.
 * @property {TData[]} data - The data to be displayed in the table.
 */
interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

/**
 * DataTable Component
 *
 * This component renders a data table with sorting, filtering, and row selection functionalities.
 * It also includes bulk actions for marking tickets as complete or deleting them.
 *
 * @template TData - The type of data for the table rows.
 * @template TValue - The type of value for the table columns.
 *
 * @param {DataTableProps<TData, TValue>} props - The properties passed to the component.
 *
 * @returns {JSX.Element} The rendered data table component.
 */
export function DataTable<TData extends RowData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [photoModal, setPhotoModal] = useState({
        open: false,
        url: ''
    });

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            rowSelection
        },
        meta: {
            photoThumbClicked(rowIndex) {
                const photo: string =
                    table.getRowModel().rows.at(Number.parseInt(rowIndex))?.getValue('photo') as string;
                setPhotoModal({
                    open: true,
                    url: photo
                });
            }
        }
    });

    /**
     * Handles marking selected tickets as complete.
     *
     * @async
     * @function handleMarkComplete
     */
    const handleMarkComplete = async () => {
        const rowIndex = Object.keys(rowSelection);
        const ticketsToMark: Ticket[] = [];

        try {
            setLoading(true);
            rowIndex.forEach(index => {
                const row = table.getRowModel().rows.at(Number.parseInt(index));
                if (row) {
                    ticketsToMark.push(row.original as Ticket);
                }
            });

            // Fire an HTTP call to update the tickets' status
            await fetch(buildUrl('ticket/bulk'), {
                method: 'PATCH',
                body: JSON.stringify({
                    tickets: ticketsToMark,
                    status: TicketStatus.COMPLETED
                })
            });

            setLoading(false);
            toast.success("Tickets updated");
            setRowSelection({});
            router.refresh();
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    /**
     * Handles deleting selected tickets.
     *
     * @async
     * @function handleDelete
     */
    const handleDelete = async () => {
        const rowIndex = Object.keys(rowSelection);
        const ticketsToDelete: Ticket[] = [];

        try {
            setLoading(true);
            rowIndex.forEach(index => {
                const row = table.getRowModel().rows.at(Number.parseInt(index));
                if (row) {
                    ticketsToDelete.push(row.original as Ticket);
                }
            });

            await fetch('ticket/bulk', {
                method: 'DELETE',
                body: JSON.stringify({
                    tickets: ticketsToDelete
                })
            });

            setLoading(false);
            toast.success("Tickets deleted");
            setRowSelection({});
            router.refresh();
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    return (
        <div>
            {/* Toolbar for bulk actions and filtering */}
            <div className="flex items-center py-4">
                {
                    Object.keys(rowSelection).length > 0 ?
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button>Bulk Action <BsChevronDown className="ml-2" /></Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem className="text-green-600"
                                    onClick={handleMarkComplete}>
                                    Mark Complete
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600"
                                    onClick={handleDelete}
                                >
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        :
                        <Input
                            placeholder="Filter by name..."
                            value={(table.getColumn('submitterName')?.getFilterValue() as string ?? "")}
                            onChange={(event) =>
                                table.getColumn('submitterName')?.setFilterValue(event.target.value)
                            }
                            className="max-w-sm"
                        />
                }
            </div>

            {/* Table rendering */}
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {
                            table.getHeaderGroups().map(hg => (
                                <TableRow key={hg.id}>
                                    {
                                        hg.headers.map(h => {
                                            return (
                                                <TableHead key={h.id}>
                                                    {
                                                        h.isPlaceholder ? null :
                                                            flexRender(
                                                                h.column.columnDef.header,
                                                                h.getContext()
                                                            )
                                                    }
                                                </TableHead>
                                            );
                                        })
                                    }
                                </TableRow>
                            ))
                        }
                    </TableHeader>
                    <TableBody>
                        {
                            table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="h-24 text-center">
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )
                        }
                    </TableBody>
                </Table>
            </div>

            {/* Modals for loading and photo viewing */}
            <LoadingModal open={loading} />
            <PhotoModal open={photoModal.open}
                onClose={() => setPhotoModal({ open: false, url: '' })}
                url={photoModal.url} />
        </div>
    );
}
