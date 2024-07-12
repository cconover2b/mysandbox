'use client'

// app/dashboard/row-actions.tsx
import { Pin } from "@/types"; // Import Pin type
import { Button } from '@/components/ui/button'
import { Ticket, TicketStatus, User } from '@/types'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Row } from '@tanstack/react-table'
import { useRouter } from 'next/navigation'
import React, { useReducer, useState } from 'react'
import { MdMoreVert } from 'react-icons/md'
import { AiOutlineUserAdd, AiOutlineUserDelete, AiOutlineCheck } from 'react-icons/ai'
import { BsFillMapFill, BsFillTrashFill } from 'react-icons/bs'
import AlertModal from '@/components/modal/alert-modal'
import { buildUrl } from '@/lib/utils'
import { toast } from 'react-toastify'
import InspectorList from './inspector-list'
import MapDialog from '@/components/dialog/map-dialog'

// Enum for alert dialog reasons
enum AlertDialogReasonEnum {
    NONE = "",
    MARK_COMPLETE = 'complete',
    DELETE = 'delete'
}

// Interface for the state managed by the reducer
interface RowActionReducerProps {
    alertDialog?: boolean,
    alertDialogReason?: AlertDialogReasonEnum,
    mapDialog?: boolean
}

// Component for row actions
export function RowActions({
    row
}: {
    row: Row<Ticket>
}) {

    const ticket = row.original
    const router = useRouter()
    const [progress, setProgress] = useState(false)
    const [open, setOpen] = useState(false)

    // Using reducer to manage state
    const [state, setState] = useReducer((prevstate: RowActionReducerProps, params: RowActionReducerProps) => {
        return { ...prevstate, ...params }
    }, {
        alertDialog: false,
        alertDialogReason: AlertDialogReasonEnum.NONE,
        mapDialog: false,
    })

    // Handle delete action
    const handleDelete = () => {
        setState({
            alertDialog: true,
            alertDialogReason: AlertDialogReasonEnum.DELETE
        })
    }

    // Handle mark complete action
    const handleMarkComplete = () => {
        setState({
            alertDialog: true,
            alertDialogReason: AlertDialogReasonEnum.MARK_COMPLETE
        })
    }

    // Handle confirm action in alert dialog
    const handleConfirm = async () => {
        if (state.alertDialogReason === AlertDialogReasonEnum.DELETE) {
            setProgress(true)
            await fetch(buildUrl(`ticket/${ticket.id}`), {
                method: "DELETE"
            })
            setProgress(false)
            toast.success('Ticket deleted')
            router.refresh()
        } else if (state.alertDialogReason === AlertDialogReasonEnum.MARK_COMPLETE) {
            setProgress(true)
            await fetch(buildUrl(`ticket/${ticket.id}`), {
                method: 'PATCH',
                body: JSON.stringify({
                    status: TicketStatus.COMPLETED
                })
            })
            setProgress(false)
            toast.success('Ticket status updated')
            router.refresh()
        }
    }

    // Handle inspector assignment
    const handleInspectorAssign = async (inspector: User) => {
        try {
            setProgress(true)
            await fetch(buildUrl(`ticket/${ticket.id}`), {
                method: 'PATCH',
                body: JSON.stringify({
                    inspector: inspector.id,
                    status: TicketStatus.ASSIGNED
                })
            })
            setProgress(false)
            toast.success(`Ticket assigned to ${inspector.fullName}`)
            router.refresh()
        } catch (error) {
            setProgress(false)
            console.log(error)
        }
    }

    // Handle unassign action
    const handleUnassign = async () => {
        try {
            setProgress(true);
            const result = await fetch(buildUrl(`ticket/${ticket.id}`), {
                method: 'PATCH',
                body: JSON.stringify({
                    status: TicketStatus.UNASSIGNED
                })
            });
            const { status } = result;
            setProgress(false);
            if (status === 200) {
                toast.success(`Ticket marked as unassigned`);
                router.refresh();
            } else {
                toast.error("Failed to update ticket")
            }
        } catch (error) {
            setProgress(true);
            toast.error("Server error")
            console.log(error);
        }
    }

    // Handle map view action
    const handleMapview = () => {
        setState({
            mapDialog: true
        })
    }

    // Handle pin update action
    const handleUpdatePin = async (pinInfo: Pin) => {
        try {
            setProgress(true)
            await fetch(buildUrl(`ticket/${ticket.id}`), {
                method: 'PATCH',
                body: JSON.stringify({
                    pinInfo
                })
            })
            setProgress(false)
            toast.success('Pin information updated')
            router.refresh()
        } catch (error) {
            setProgress(false)
            console.log(error)
        }
    }

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        className='flex h-8 w-8 p-0 data-[state=open]:bg:muted'
                    >
                        <span className='sr-only'>Open Menu</span>
                        <MdMoreVert />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => setOpen(true)}>
                        <AiOutlineUserAdd className="mr-2 h-4 w-4" />
                        Assign
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleUnassign}>
                        <AiOutlineUserDelete className="mr-2 h-4 w-4" />
                        UnAssign
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleMapview}>
                        <BsFillMapFill className="mr-2 h-4 w-4" />
                        Map View
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-green-600" onClick={handleMarkComplete}>
                        <AiOutlineCheck className="mr-2 h-4 w-4" />
                        Mark complete
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleDelete}>
                        <BsFillTrashFill className="mr-2 h-4 w-4" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {state.alertDialog && (
                <AlertModal
                    open={state.alertDialog} // Changed from isOpen to open
                    onClose={() => setState({ alertDialog: false })}
                    onConfirm={handleConfirm}
                />
            )}

            {state.mapDialog && (
                <MapDialog
                    open={state.mapDialog} // Changed from isOpen to open
                    onClose={() => setState({ mapDialog: false })}
                    onUpdatePin={handleUpdatePin} // Ensure MapDialog accepts this prop
                    latlong={ticket.latlong} // Pass latlong prop
                />
            )}

            {open && (
                <InspectorList
                    open={open} // Changed from isOpen to open
                    setOpen={setOpen} // Added this line
                    onInspectorAssign={handleInspectorAssign} // Changed from onAssign to onInspectorAssign
                    onUpdatePin={handleUpdatePin} // Added this line
                />
            )}
        </>
    )
}