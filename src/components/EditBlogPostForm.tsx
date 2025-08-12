'use client';

import { useActionState } from 'react';
import { updateBlogPostAction } from '@/app/actions/blogActions';
import SubmitButton from '@/components/SubmitButton';
import TiptapEditor from '@/components/TiptapEditor';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { IBlogPost } from '@/models/BlogPost';

const initialState = { message: '' };

export default function EditBlogPostForm({ postId }: { postId: string }) {
  const [post, setPost] = useState<IBlogPost | null>(null);
  const [state, formAction] = useActionState(updateBlogPostAction, initialState);

  useEffect(() => {
    const fetchPost = async () => {
      // We'll create this simple API route next
      const response = await fetch(`/api/posts/${postId}`);
      if (response.ok) {
        const data = await response.json();
        setPost(data);
      }
    };
    fetchPost();
  }, [postId]);

  if (!post) {
    return <div>Loading editor...</div>;
  }

  return (
    <form action={formAction} className="space-y-6 bg-white p-8 rounded-lg shadow-md">
      <input type="hidden" name="postId" value={post._id} />
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Post Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          required
          defaultValue={post.title}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>
      <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-700">
          Change Featured Image (Optional)
        </label>
        <div className="mt-2 flex items-center gap-4">
          <Image src={post.featuredImageUrl} alt="Current image" width={80} height={80} className="rounded-md object-cover bg-gray-100" />
          <input
            type="file"
            name="image"
            id="image"
            accept="image/*"
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
          />
        </div>
      </div>
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
          Content
        </label>
        <TiptapEditor name="content" defaultValue={post.content} />
      </div>
      <div>
        <SubmitButton>Update Post</SubmitButton>
      </div>
    </form>
  );
}