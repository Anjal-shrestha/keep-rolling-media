'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
}

export default function AdminBlogListPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    fetch('/api/admin/blog') // We'll create this API route below
      .then(res => res.json())
      .then(data => setPosts(data.posts))
      .catch(console.error);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Blogs</h1>
      <Link href="/admin/dashboard/blog/new" className="text-blue-600 hover:underline mb-4 inline-block">
        + Add New Post
      </Link>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2 text-left">Title</th>
            <th className="border p-2 text-left">Slug</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map(post => (
            <tr key={post._id}>
              <td className="border p-2">{post.title}</td>
              <td className="border p-2">{post.slug}</td>
              <td className="border p-2 space-x-2">
                <Link href={`/admin/dashboard/blog/edit/${post._id}`} className="text-blue-600 hover:underline">
                  Edit
                </Link>
                <button
                  className="text-red-600 hover:underline"
                  onClick={async () => {
                    if (confirm('Are you sure you want to delete this post?')) {
                      await fetch(`/api/admin/blog/${post._id}`, { method: 'DELETE' });
                      setPosts(posts.filter(p => p._id !== post._id));
                    }
                  }}
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
