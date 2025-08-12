'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewBlogPostPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    metaTitle: '',
    metaDescription: '',
    content: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch('/api/admin/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Failed to create post');
      router.push('/admin/dashboard/blog');
    } catch (err: any) {
      setError(err.message || 'Unknown error');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8 text-red-700">Add New Blog Post</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && <p className="text-red-600">{error}</p>}

        <div>
          <label htmlFor="title" className="block mb-1 font-semibold">
            Title <span className="text-red-600">*</span>
          </label>
          <input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            type="text"
            required
            maxLength={120}
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div>
          <label htmlFor="slug" className="block mb-1 font-semibold">
            Slug (URL-friendly) <span className="text-red-600">*</span>
          </label>
          <input
            id="slug"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            type="text"
            required
            maxLength={100}
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div>
          <label htmlFor="metaTitle" className="block mb-1 font-semibold">
            Meta Title (optional)
          </label>
          <input
            id="metaTitle"
            name="metaTitle"
            value={formData.metaTitle}
            onChange={handleChange}
            type="text"
            maxLength={160}
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div>
          <label htmlFor="metaDescription" className="block mb-1 font-semibold">
            Meta Description (optional)
          </label>
          <textarea
            id="metaDescription"
            name="metaDescription"
            value={formData.metaDescription}
            onChange={handleChange}
            rows={3}
            maxLength={300}
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
          />
        </div>

        <div>
          <label htmlFor="content" className="block mb-1 font-semibold">
            Content <span className="text-red-600">*</span>
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows={10}
            required
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-red-500 font-mono"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="px-6 py-3 bg-red-600 text-white rounded hover:bg-red-700 transition disabled:opacity-50"
        >
          {submitting ? 'Creating...' : 'Create Post'}
        </button>
      </form>
    </div>
  );
}
