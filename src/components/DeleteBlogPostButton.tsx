'use client';

import { deleteBlogPostAction } from '@/app/actions/blogActions';

interface DeleteBlogPostButtonProps {
  postId: string;
}

export default function DeleteBlogPostButton({ postId }: DeleteBlogPostButtonProps) {
  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this blog post?')) {
      await deleteBlogPostAction(postId);
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