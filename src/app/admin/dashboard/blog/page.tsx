import Link from 'next/link';
import connectDB from '@/lib/mongodb';
import BlogPost, { IBlogPost } from '@/models/BlogPost'; // Import the IBlogPost type
import BlogListClient from '@/components/BlogListClient';
import { Suspense } from 'react';

export default async function AdminBlogListPage() {
  await connectDB();
  const posts: IBlogPost[] = await BlogPost.find({}).sort({ createdAt: -1 });

  // **THE FIX IS HERE:**
  // We create a clean array with only the properties needed by the client component.
  // This ensures the object is properly typed and avoids 'unknown' type errors.
  const plainPosts = posts.map(post => {
    const plainObject = post.toObject();
    return {
      _id: plainObject._id.toString(),
      title: plainObject.title,
      slug: plainObject.slug,
      status: plainObject.status,
      publishedAt: plainObject.publishedAt?.toISOString() || null,
    };
  });

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Manage Blog</h1>
        <Link
          href="/admin/dashboard/blog/new"
          className="inline-block px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          + Add New Post
        </Link>
      </div>
      <Suspense fallback={<p>Loading posts...</p>}>
        <BlogListClient posts={plainPosts} />
      </Suspense>
    </div>
  );
}