'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  publishedAt?: string;
}

export default function AdminBlogListPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch('/api/admin/blog');
        if (!res.ok) throw new Error('Failed to fetch posts');
        const data: BlogPost[] = await res.json();
        setPosts(data);
      } catch (err: any) {
        setError(err.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this post?')) return;
    try {
      const res = await fetch(`/api/admin/blog/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete post');
      setPosts(posts.filter(p => p._id !== id));
    } catch (err) {
      alert('Error deleting post');
    }
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8 text-red-700">Manage Blogs</h1>

      <Link
        href="/admin/dashboard/blog/new"
        className="inline-block mb-6 px-5 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
      >
        + Add New Post
      </Link>

      {loading && <p>Loading posts...</p>}
      {error && <p className="text-red-600">Error: {error}</p>}

      {!loading && !error && posts.length === 0 && <p>No posts found.</p>}

      {!loading && !error && posts.length > 0 && (
        <table className="w-full border-collapse border border-gray-300 rounded overflow-hidden">
          <thead className="bg-red-100">
            <tr>
              <th className="border border-gray-300 p-3 text-left">Title</th>
              <th className="border border-gray-300 p-3 text-left">Slug</th>
              <th className="border border-gray-300 p-3 text-center">Published</th>
              <th className="border border-gray-300 p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map(post => (
              <tr key={post._id} className="hover:bg-red-50">
                <td className="border border-gray-300 p-3">{post.title}</td>
                <td className="border border-gray-300 p-3">{post.slug}</td>
                <td className="border border-gray-300 p-3 text-center">
                  {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : '—'}
                </td>
                <td className="border border-gray-300 p-3 text-center space-x-4">
                  <Link
                    href={`/admin/dashboard/blog/edit/${post._id}`}
                    className="text-red-600 hover:underline"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="text-red-600 hover:underline"
                    type="button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
