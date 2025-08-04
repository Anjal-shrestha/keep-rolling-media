'use client';

import { deleteProjectAction } from '@/app/actions/portfolioActions';
import toast from 'react-hot-toast';

interface DeleteProjectButtonProps {
  projectId: string;
}

export default function DeleteProjectButton({ projectId }: DeleteProjectButtonProps) {
  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this project?')) {
      // Use toast.promise for loading, success, and error states
      await toast.promise(
        deleteProjectAction(projectId),
        {
          loading: 'Deleting project...',
          success: <b>Project deleted!</b>,
          error: <b>Could not delete.</b>,
        }
      );
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="text-sm bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
    >
      Delete
    </button>
  );
}