'use client';

import { useActionState } from 'react';
import { createGalleryImageAction } from '@/app/actions/galleryActions';
import SubmitButton from '@/components/SubmitButton';

const initialState = { message: '', error: '' };

export default function GalleryForm() {
  const [state, formAction] = useActionState(createGalleryImageAction, initialState);

  return (
    <form action={formAction} className="space-y-6 bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold">Upload New Image</h2>
      {state?.error && <p className="text-red-500 bg-red-50 p-3 rounded-md">{state.error}</p>}
      
      <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image File</label>
        <input
          type="file"
          name="image"
          id="image"
          required
          accept="image/*"
          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-200"
        />
      </div>
      
      <div>
        <SubmitButton>Upload Image</SubmitButton>
      </div>
    </form>
  );
}