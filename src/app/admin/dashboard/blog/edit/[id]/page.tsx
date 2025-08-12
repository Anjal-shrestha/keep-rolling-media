'use client';

import React, { useEffect, useState } from 'react';
import { updateBlogPostAction } from '@/app/actions/blogActions';

interface BlogPost {
  _id: string;
  title: string;
  metaTitle?: string;
  metaDescription?: string;
  content: string;
}

export default function EditBlogPostPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [initialData, setInitialData] = useState<BlogPost | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`/api/admin/blog/${id}`)
      .then(res => res.json())
      .then(data => setInitialData(data))
      .catch(() => setError('Failed to load post'));
  }, [id]);

  async function handleSubmit(formData: FormData) {
    formData.set('id', id);
    const result = await updateBlogPostAction(formData);
    if (result?.error) {
      setError(result.error);
    }
  }

  if (!initialData) return <p>Loading...</p>;

  return (
    <>
      {error && <p className="text-red-600">{error}</p>}
      <form action={handleSubmit} className="max-w-xl mx-auto p-6 space-y-4" noValidate>
        <input type="hidden" name="id" value={id} />
        <input
          name="title"
          defaultValue={initialData.title}
          placeholder="Title"
          required
          className="w-full p-2 border rounded"
          maxLength={120}
        />
        <input
          name="metaTitle"
          defaultValue={initialData.metaTitle}
          placeholder="Meta Title (optional)"
          className="w-full p-2 border rounded"
          maxLength={160}
        />
        <input
          name="metaDescription"
          defaultValue={initialData.metaDescription}
          placeholder="Meta Description (optional)"
          className="w-full p-2 border rounded"
          maxLength={300}
        />
        <input type="file" name="featuredImage" accept="image/*" />
        <textarea
          name="content"
          defaultValue={initialData.content}
          placeholder="Write your post content in markdown"
          required
          rows={12}
          className="w-full p-2 border rounded font-mono"
        />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Update Post
        </button>
      </form>
    </>
  );
}
