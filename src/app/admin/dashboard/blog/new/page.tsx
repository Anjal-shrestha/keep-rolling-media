'use client';

import { useActionState } from 'react';
import { createBlogPostAction } from '@/app/actions/blogActions';
import SubmitButton from '@/components/SubmitButton';
import { useState, useRef } from 'react';

const initialState = { message: '', error: '' };
const MAX_FILE_SIZE_MB = 10;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

export default function NewBlogPostPage() {
  const [state, formAction] = useActionState(createBlogPostAction, initialState);
  const [fileError, setFileError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.size > MAX_FILE_SIZE_BYTES) {
      setFileError(
        `Image is too large. Max size is ${MAX_FILE_SIZE_MB} MB. Your file is ~${(
          file.size / 1024 / 1024
        ).toFixed(1)} MB.`
      );
    } else {
      setFileError('');
    }
  };

  const handleSubmit = (formData: FormData) => {
    const file = fileInputRef.current?.files?.[0];
    if (file && file.size > MAX_FILE_SIZE_BYTES) {
      setFileError(
        `Image is too large. Please select a file smaller than ${MAX_FILE_SIZE_MB} MB.`
      );
      return;
    }
    setFileError('');
    formAction(formData);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Add New Blog Post</h1>
      <form action={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-md">
        {state?.error && <p className="bg-red-100 text-red-700 p-3 rounded-md">{state.error}</p>}
        {fileError && <p className="bg-red-100 text-red-700 p-3 rounded-md">{fileError}</p>}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                    <input type="text" name="title" id="title" required placeholder="e.g., The Future of Mobile Advertising" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                </div>
                <div>
                    {/* --- LINTING FIX IS HERE --- */}
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content (Markdown is supported)</label>
                    <p className="text-xs text-gray-500 mb-1">Use &apos;#&apos; for headings, &apos;-&apos; for bullet points.</p>
                    <textarea name="content" id="content" rows={15} required placeholder="Write your amazing blog post here..." className="mt-1 block w-full rounded-md border-gray-300 shadow-sm font-mono"></textarea>
                </div>
                 <div>
                    <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700">Excerpt (A short summary for previews)</label>
                    <textarea name="excerpt" id="excerpt" rows={3} placeholder="A brief, catchy summary of the post..." className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></textarea>
                </div>
            </div>
            <div className="space-y-6 bg-gray-50 p-6 rounded-lg border">
                 <div>
                    <label htmlFor="featuredImage" className="block text-sm font-medium text-gray-700">Featured Image</label>
                    <p className="text-xs text-gray-500 mb-1">Required. Max file size: {MAX_FILE_SIZE_MB} MB.</p>
                    <input 
                      type="file" 
                      name="featuredImage" 
                      id="featuredImage" 
                      required 
                      accept="image/*" 
                      className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-200 hover:file:bg-gray-300"
                      ref={fileInputRef}
                      onChange={handleFileChange} 
                    />
                </div>
                <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                    <input type="text" name="category" id="category" placeholder="e.g., Marketing Tips" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                </div>
                <div className="border-t pt-4">
                  <h3 className="text-sm font-semibold text-gray-600 mb-2">Optional SEO Fields</h3>
                  <div>
                      <label htmlFor="metaTitle" className="block text-sm font-medium text-gray-700">Meta Title</label>
                      <input type="text" name="metaTitle" id="metaTitle" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                  </div>
                  <div className="mt-4">
                      <label htmlFor="metaDescription" className="block text-sm font-medium text-gray-700">Meta Description</label>
                      <textarea name="metaDescription" id="metaDescription" rows={3} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></textarea>
                  </div>
                  <div className="mt-4">
                      <label htmlFor="tags" className="block text-sm font-medium text-gray-700">Tags (comma-separated)</label>
                      <input type="text" name="tags" id="tags" placeholder="marketing, nepal, ads" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                  </div>
                </div>
            </div>
        </div>
        <div className="pt-6">
            <SubmitButton>Create Post</SubmitButton>
        </div>
      </form>
    </div>
  );
}