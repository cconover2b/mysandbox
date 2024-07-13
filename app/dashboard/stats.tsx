// app/dashboard/stats.tsx

// Importing necessary components and libraries
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // Custom Card components
import { buildUrl } from '@/lib/utils'; // Utility function for building URLs
import React from 'react'; // React library
import {
    MdFiberNew,
    MdOutlineDoneOutline,
    MdOutlineAssignmentTurnedIn,
    MdPersonAddDisabled
} from 'react-icons/md'; // Material Design icons

// Interface for the stats data structure
interface Stats {
    _id: { status: string }, // Status identifier
    count: number // Count of tickets for the given status
}

// Async function component to fetch and display stats
async function Stats() {

    // Fetching data from the backend
    const stats = await fetch(buildUrl('stats'), {
        cache: 'no-cache' // Ensuring fresh data is fetched
    });

    // Parsing the JSON response
    const json: Stats[] = await stats.json();

    // Function to get the count for a specific status
    const statsFor = (token: string) => {
        const filteredStats = json.filter(stats => stats._id.status === token);
        return filteredStats.length > 0 ?
            filteredStats.map(stats => stats.count) : 0;
    };

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* Card for New Tickets */}
            <Card className='bg-orange-300'>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-lg font-medium">
                        New Tickets
                    </CardTitle>
                    <div className="stat-figure text-white">
                        <MdFiberNew size="2em" />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{statsFor('new')}</div>
                </CardContent>
            </Card>

            {/* Card for Completed Tickets */}
            <Card className="bg-green-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-lg font-medium">
                        Completed
                    </CardTitle>
                    <div className="stat-figure text-white">
                        <MdOutlineDoneOutline size="2em" />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{statsFor('completed')}</div>
                </CardContent>
            </Card>

            {/* Card for Assigned Tickets */}
            <Card className="bg-purple-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-lg font-medium">
                        Assigned
                    </CardTitle>
                    <div className="stat-figure text-white">
                        {/* <MdOutlineAssignmentTurnedIn size="2em" /> */}
                        <MdPersonAddDisabled size="2em" />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{statsFor('assigned')}</div>
                </CardContent>
            </Card>

            {/* Card for Unassigned Tickets */}
            <Card className="bg-red-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-lg font-medium">
                        Unassigned
                    </CardTitle>
                    <div className="stat-figure text-white">
                        <MdPersonAddDisabled size="2em" />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{statsFor('unassigned')}</div>
                </CardContent>
            </Card>
        </div>
    );
}

export default Stats; // Exporting the component as the default export
