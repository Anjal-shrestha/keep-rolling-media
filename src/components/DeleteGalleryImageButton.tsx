'use client';

import { deleteGalleryImageAction } from '@/app/actions/galleryActions';
import toast from 'react-hot-toast';

export default function DeleteGalleryImageButton({ imageId }: { imageId: string }) {
  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this image?')) {
      await toast.promise(
        deleteGalleryImageAction(imageId),
        {
          loading: 'Deleting...',
          success: 'Image deleted!',
          error: 'Failed to delete.',
        }
      );
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="p-1.5 bg-red-600 text-white rounded-full hover:bg-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
      aria-label="Delete image"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
    </button>
  );
}