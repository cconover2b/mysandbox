'use client' // 'use client' directive to ensure this component is rendered on the client side
// components/ui/combobox.tsx

// Import necessary modules and components
import * as React from "react" // Importing React for building the component
import { Check, ChevronsUpDown } from "lucide-react" // Importing icons from lucide-react

import { buildUrl, cn } from "@/lib/utils" // Utility functions for building URLs and conditional class names
import { Button } from "@/components/ui/button" // Button component
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command" // Command components for building the combobox
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover" // Popover components for dropdown functionality
import { User } from "@/types" // Type definition for User

// Combobox component definition
export function Combobox({
    onValueSelect
}: {
    onValueSelect: (value: User) => void // Prop type for the onValueSelect callback function
}) {
  // State variables
  const [open, setOpen] = React.useState(false) // State to manage the open/close state of the popover
  const [value, setValue] = React.useState<User | undefined>() // State to manage the selected user
  const [users, setUsers] = React.useState<User[]>([]) // State to manage the list of users
  const [loading, setLoading] = React.useState(true) // State to manage the loading state

  // useEffect hook to fetch users when the component mounts
  React.useEffect(() => {
    const getUsers = async () => {
      try {
        setLoading(true) // Set loading state to true before fetching data
        const result = await fetch(buildUrl('user'), {
          cache: 'no-cache' // Disable caching for the fetch request
        })

        if (!result.ok) {
          throw new Error('Failed to fetch users') // Throw an error if the fetch request fails
        }

        const fetchedUsers = await result.json() // Parse the JSON response
        console.log('Fetched users:', fetchedUsers) // Log fetched data

        if (Array.isArray(fetchedUsers)) {
          setUsers(fetchedUsers) // Set the users state if the fetched data is an array
        } else {
          console.error('Fetched data is not an array:', fetchedUsers) // Log an error if the fetched data is not an array
          setUsers([]) // Set users to an empty array
        }
      } catch (error) {
        console.error('Error fetching users:', error) // Log any errors that occur during the fetch
        setUsers([]) // Set users to an empty array in case of an error
      } finally {
        setLoading(false) // Set loading state to false after fetching data
      }
    }

    getUsers() // Call the getUsers function
  }, []); // Empty dependency array to run the effect only once when the component mounts

  // Function to handle the selection of a user
  const handleSelect = (currentValue: string) => {
    const user = users.find(u => u.fullName.toLowerCase() === currentValue.toLowerCase()) // Find the user by full name
    if (user) {
      onValueSelect(user) // Call the onValueSelect callback with the selected user
      setValue(user) // Set the selected user in the state
      setOpen(false) // Close the popover
    }
  }

  // Safeguard against undefined users
  const safeUsers = users || []

  return (
    <Popover open={open} onOpenChange={setOpen}> {/* Popover component to manage the dropdown */}
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between"
        >
          {value
            ? value.fullName // Display the selected user's full name
            : "Select user..."} {/* Placeholder text when no user is selected */}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" /> {/* Icon for the dropdown */}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search user..." /> {/* Input field for searching users */}
          <CommandEmpty>No user found.</CommandEmpty> {/* Message when no user is found */}
          <CommandGroup>
            {loading ? (
              <CommandItem>Loading...</CommandItem> // Display loading message while fetching users
            ) : safeUsers.length === 0 ? (
              <CommandItem>No users available</CommandItem> // Display message when no users are available
            ) : (
              safeUsers.map((user) => (
                <CommandItem
                  key={user.id}
                  onSelect={() => handleSelect(user.fullName)} // Handle user selection
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value?.id === user.id ? "opacity-100" : "opacity-0" // Conditionally render the check icon
                    )}
                  />
                  {user.fullName} {/* Display the user's full name */}
                </CommandItem>
              ))
            )}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
