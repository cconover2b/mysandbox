import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { User, Pin } from '@/types';
import { fetchUsers, updatePin, assignUserToPin } from '@/lib/api'; // Assume these functions are defined in your API utility file

interface InspectorListProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onInspectorAssign: (inspector: User) => void;
  onUpdatePin: (pinInfo: Pin) => void; // Added this line
}

const InspectorList: React.FC<InspectorListProps> = ({ open, setOpen, onInspectorAssign, onUpdatePin }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [pinInfo, setPinInfo] = useState<Pin>({ id: '', name: '', description: '' });

  useEffect(() => {
    // Fetch users when the component mounts
    const fetchData = async () => {
      const users = await fetchUsers();
      setUsers(users);
    };
    fetchData();
  }, []);

  const handlePinUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInfo.id) {
      await updatePin(pinInfo);
      onUpdatePin(pinInfo); // Call the onUpdatePin function
      alert('Pin information updated');
    }
  };

  const handleUserAssign = async () => {
    if (selectedUser) {
      await assignUserToPin(pinInfo.id, selectedUser.id);
      onInspectorAssign(selectedUser);
      alert('User assigned to pin');
    }
  };

  return (
    <div className={`inspector-list ${open ? 'open' : ''}`}>
      <h2>Update Pin Information</h2>
      <form onSubmit={handlePinUpdate}>
        <label>
          Pin Name:
          <input
            type="text"
            value={pinInfo.name}
            onChange={(e) => setPinInfo({ ...pinInfo, name: e.target.value })}
          />
        </label>
        <label>
          Description:
          <textarea
            value={pinInfo.description}
            onChange={(e) => setPinInfo({ ...pinInfo, description: e.target.value })}
          />
        </label>
        <Button type="submit">Update Pin</Button>
      </form>

      <h2>Assign User to Pin</h2>
      <select onChange={(e) => setSelectedUser(users.find(user => user.id === e.target.value) || null)}>
        <option value="">Select a user</option>
        {users.map(user => (
          <option key={user.id} value={user.id}>
            {user.fullName}
          </option>
        ))}
      </select>
      <Button onClick={handleUserAssign}>Assign User</Button>

      <Button onClick={() => setOpen(false)}>Close</Button>
    </div>
  );
};

export default InspectorList;