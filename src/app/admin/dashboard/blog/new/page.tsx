'use client';

import React, { useState } from 'react';
import { createBlogPostAction } from '@/app/actions/blogActions';

export default function NewBlogPostPage() {
  const [error, setError] = useState('');

  async function handleSubmit(formData: FormData) {
    const result = await createBlogPostAction(formData);
    if (result?.error) {
      setError(result.error);
    }
  }

  return (
    <>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form action={handleSubmit}>
        <input name="title" required placeholder="Title" />
        <input name="metaTitle" placeholder="Meta Title (optional)" />
        <input name="metaDescription" placeholder="Meta Description (optional)" />
        <textarea name="content" required placeholder="Content" />
        <input type="file" name="featuredImage" required />
        <button type="submit">Create</button>
      </form>
    </>
  );
}
