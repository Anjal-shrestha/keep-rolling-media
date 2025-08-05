'use client';

import { deleteTestimonialAction } from '@/app/actions/testimonialActions';
import toast from 'react-hot-toast';

export default function DeleteTestimonialButton({ testimonialId }: { testimonialId: string }) {
  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this testimonial?')) {
      await toast.promise(
        deleteTestimonialAction(testimonialId),
        {
          loading: 'Deleting...',
          success: 'Testimonial deleted!',
          error: 'Failed to delete.',
        }
      );
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