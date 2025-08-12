'use client';

import { useActionState } from 'react';
import { createBlogPostAction } from '@/app/actions/blogActions';
import SubmitButton from '@/components/SubmitButton';

const initialState = { message: '', error: '' };

export default function NewBlogPostPage() {
  const [state, formAction] = useActionState(createBlogPostAction, initialState);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Add New Blog Post</h1>
      <form action={formAction} className="space-y-6 bg-white p-8 rounded-lg shadow-md">
        {state?.error && <p className="bg-red-100 text-red-700 p-3 rounded-md">{state.error}</p>}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
                {/* Main Content */}
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                    <input type="text" name="title" id="title" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                </div>
                <div>
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content (Markdown supported)</label>
                    <textarea name="content" id="content" rows={15} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm font-mono"></textarea>
                </div>
                 <div>
                    <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700">Excerpt (Short summary)</label>
                    <textarea name="excerpt" id="excerpt" rows={3} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></textarea>
                </div>
            </div>
            <div className="space-y-6 bg-gray-50 p-6 rounded-lg border">
                 <div>
                    <label htmlFor="featuredImage" className="block text-sm font-medium text-gray-700">Featured Image</label>
                    <input type="file" name="featuredImage" id="featuredImage" required accept="image/*" className="mt-1 block w-full text-sm" />
                </div>
                <div>
                    <label htmlFor="metaTitle" className="block text-sm font-medium text-gray-700">Meta Title</label>
                    <input type="text" name="metaTitle" id="metaTitle" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                </div>
                <div>
                    <label htmlFor="metaDescription" className="block text-sm font-medium text-gray-700">Meta Description</label>
                    <textarea name="metaDescription" id="metaDescription" rows={3} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></textarea>
                </div>
                <div>
                    <label htmlFor="tags" className="block text-sm font-medium text-gray-700">Tags (comma-separated)</label>
                    <input type="text" name="tags" id="tags" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                </div>
                 <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                    <input type="text" name="category" id="category" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                </div>
                 <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                    <select name="status" id="status" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                    </select>
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