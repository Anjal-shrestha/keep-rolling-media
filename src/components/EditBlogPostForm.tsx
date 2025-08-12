'use client';

import { useActionState } from 'react';
import { updateBlogPostAction } from '@/app/actions/blogActions';
import SubmitButton from '@/components/SubmitButton';
import Image from 'next/image';

// Define a type for the plain post object that the form receives
type PlainPostType = {
  _id: string;
  title: string;
  featuredImageUrl: string;
  introParagraph: string;
  subheading: string;
  bulletPoints: string[];
  conclusion: string;
};

const initialState = { message: '', error: '' };

export default function EditBlogPostForm({ post }: { post: PlainPostType }) {
  const [state, formAction] = useActionState(updateBlogPostAction, initialState);

  return (
    <form action={formAction} className="space-y-6 bg-white p-8 rounded-lg shadow-md">
      {state?.error && <p className="text-red-500 bg-red-50 p-3 rounded-md">{state.error}</p>}
      
      <input type="hidden" name="postId" value={post._id} />
      
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Main Title</label>
        <input type="text" name="title" id="title" required defaultValue={post.title} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
      </div>
      
      <div>
        <label htmlFor="featuredImage" className="block text-sm font-medium text-gray-700 mb-2">Change Featured Image (Optional)</label>
        <Image src={post.featuredImageUrl} alt="Current image" width={120} height={70} className="rounded-md object-cover bg-gray-100" />
        <input type="file" name="featuredImage" id="featuredImage" accept="image/*" className="mt-2 block w-full text-sm text-gray-500" />
      </div>
      
      <div>
        <label htmlFor="introParagraph" className="block text-sm font-medium text-gray-700">Introduction Paragraph</label>
        <textarea name="introParagraph" id="introParagraph" rows={4} required defaultValue={post.introParagraph} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></textarea>
      </div>

      <div>
        <label htmlFor="subheading" className="block text-sm font-medium text-gray-700">Subheading</label>
        <input type="text" name="subheading" id="subheading" required defaultValue={post.subheading} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
      </div>

      <div>
        <label htmlFor="bulletPoints" className="block text-sm font-medium text-gray-700">Bullet Points (one point per line)</label>
        {/* **A SMALLER FIX HERE:** We ensure `post.bulletPoints` is an array before calling join */}
        <textarea name="bulletPoints" id="bulletPoints" rows={5} defaultValue={(post.bulletPoints || []).join('\n')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></textarea>
      </div>

      <div>
        <label htmlFor="conclusion" className="block text-sm font-medium text-gray-700">Conclusion Paragraph</label>
        <textarea name="conclusion" id="conclusion" rows={3} required defaultValue={post.conclusion} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></textarea>
      </div>
      
      <div>
        <SubmitButton>Update Post</SubmitButton>
      </div>
    </form>
  );
}