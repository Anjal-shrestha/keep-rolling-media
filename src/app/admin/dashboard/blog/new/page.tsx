'use client';

import { useActionState } from 'react';
import { createBlogPostAction } from '@/app/actions/blogActions';
import SubmitButton from '@/components/SubmitButton';
import TiptapEditor from '@/components/TiptapEditor'; // 1. Correct the import name

const initialState = { message: '' };

export default function NewBlogPostPage() {
  const [state, formAction] = useActionState(createBlogPostAction, initialState);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Add New Blog Post</h1>
      <form action={formAction} className="space-y-6 bg-white p-8 rounded-lg shadow-md">
        {state?.message && <p className="text-red-500">{state.message}</p>}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Post Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">
            Featured Image
          </label>
          <input
            type="file"
            name="image"
            id="image"
            required
            accept="image/*"
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
            Content
          </label>
          {/* 2. Use the correct component name here */}
          <TiptapEditor name="content" />
        </div>
        <div>
          <SubmitButton>Create Post</SubmitButton>
        </div>
      </form>
    </div>
  );
}