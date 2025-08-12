import connectDB from '@/lib/mongodb';
import BlogPost from '@/models/BlogPost';
import Link from 'next/link';

export default async function BlogPage() {
  await connectDB();
  const posts = await BlogPost.find({}).sort({ publishedAt: -1 }).lean();

  return (
    <main className="container mx-auto py-8">
      <h1 className="text-4xl mb-8 font-bold">Blog</h1>
      <ul>
        {posts.map(post => (
          <li key={String(post._id)}>
            <Link href={`/blog/${post.slug}`} className="text-xl text-blue-600 hover:underline">
              {post.title}
            </Link>
            <p>{post.metaDescription || post.content.slice(0, 150) + '...'}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
