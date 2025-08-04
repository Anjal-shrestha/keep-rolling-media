'use client';

import { deleteClientAction } from '@/app/actions/clientActions';

interface DeleteClientButtonProps {
  clientId: string;
}

export default function DeleteClientButton({ clientId }: DeleteClientButtonProps) {
  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this client?')) {
      await deleteClientAction(clientId);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="text-xs bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
    >
      Delete
    </button>
  );
}