'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

// Defines the shape of a blog post for type safety
interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  metaTitle?: string;
  metaDescription?: string;
  content: string;
}

export default function EditBlogPostPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string; // Get post ID from URL

  // State management for form data, loading, errors, and submission status
  const [formData, setFormData] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Fetch the specific blog post data when the component mounts or ID changes
  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await fetch(`/api/admin/blog/${id}`);
        if (!res.ok) throw new Error('Failed to load post data.');
        const data: BlogPost = await res.json();
        setFormData(data);
      } catch (err: any) {
        setError(err.message || 'An unknown error occurred.');
      } finally {
        setLoading(false);
      }
    }
    if (id) {
      fetchPost();
    }
  }, [id]);

  // Handles changes in form inputs and updates the state
  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    if (!formData) return;
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  // Handles form submission to update the post
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formData) return;

    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch(`/api/admin/blog/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to update post.');
      }
      router.push('/admin/dashboard/blog'); // Redirect to blog list on success
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  // Conditional rendering for loading, error, and no-data states
  if (loading) return <p className="p-6 text-center">Loading post...</p>;
  if (error) return <p className="p-6 text-center text-red-600">Error: {error}</p>;
  if (!formData) return <p className="p-6 text-center">No post found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8 text-red-700">Edit Blog Post</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Display submission error, if any */}
        {error && <p className="text-red-600 bg-red-100 p-3 rounded">{error}</p>}

        {/* Title Input */}
        <div>
          <label htmlFor="title" className="block mb-1 font-semibold">
            Title <span className="text-red-600">*</span>
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            required
            maxLength={120}
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Slug Input */}
        <div>
          <label htmlFor="slug" className="block mb-1 font-semibold">
            Slug (URL-friendly) <span className="text-red-600">*</span>
          </label>
          <input
            id="slug"
            name="slug"
            type="text"
            value={formData.slug}
            onChange={handleChange}
            required
            maxLength={100}
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Meta Title Input */}
        <div>
          <label htmlFor="metaTitle" className="block mb-1 font-semibold">
            Meta Title (optional)
          </label>
          <input
            id="metaTitle"
            name="metaTitle"
            type="text"
            value={formData.metaTitle || ''}
            onChange={handleChange}
            maxLength={160}
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Meta Description Textarea */}
        <div>
          <label htmlFor="metaDescription" className="block mb-1 font-semibold">
            Meta Description (optional)
          </label>
          <textarea
            id="metaDescription"
            name="metaDescription"
            value={formData.metaDescription || ''}
            onChange={handleChange}
            rows={3}
            maxLength={300}
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
          />
        </div>

        {/* Content Textarea */}
        <div>
          <label htmlFor="content" className="block mb-1 font-semibold">
            Content (Markdown) <span className="text-red-600">*</span>
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows={15}
            required
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-red-500 font-mono"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={submitting}
          className="px-6 py-3 bg-red-600 text-white rounded hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
}