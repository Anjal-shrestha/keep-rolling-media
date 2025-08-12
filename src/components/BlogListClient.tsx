'use client';


import { deleteBlogPostAction } from '@/app/actions/blogActions';
import toast from 'react-hot-toast';

type PostType = {
  _id: string;
  title: string;
  slug: string;
  publishedAt?: string | null;
  // status removed
};

export default function BlogListClient({ posts }: { posts: PostType[] }) {
  const handleDelete = async (postId: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      await toast.promise(
        deleteBlogPostAction(postId),
        {
          loading: 'Deleting...',
          success: 'Post deleted!',
          error: 'Failed to delete.',
        }
      );
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md border overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="p-3 text-left font-semibold text-gray-600">Title</th>
            <th className="p-3 text-left font-semibold text-gray-600">Slug</th>
            {/* Status column removed */}
            <th className="p-3 text-center font-semibold text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {posts.map(post => (
            <tr key={post._id} className="hover:bg-gray-50">
              <td className="p-3">{post.title}</td>
              <td className="p-3 font-mono text-sm text-gray-500">{post.slug}</td>
              {/* Status cell removed */}
              <td className="p-3 text-center space-x-4">
                {/* Edit button removed */}
                <button
                  onClick={() => handleDelete(post._id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
