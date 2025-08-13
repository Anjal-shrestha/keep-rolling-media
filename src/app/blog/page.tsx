import connectDB from '@/lib/mongodb';
import BlogPost from '@/models/BlogPost';
import Link from 'next/link';
import Image from 'next/image';
export const dynamic = 'force-dynamic';
export default async function BlogPage() {
  await connectDB();
  const posts = await BlogPost.find({}).sort({ publishedAt: -1 }).lean();

  return (
    <main className="container mx-auto px-6 py-12 bg-[#fdfcf2] min-h-screen">
      <h1 className="text-5xl font-extrabold mb-12 text-center text-[#d90429]">Our Blog</h1>

      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {posts.map(post => (
          <article
            key={String(post._id)}
            className="bg-white rounded-xl shadow-lg overflow-hidden border border-red-100 hover:shadow-2xl transition-shadow duration-300"
          >
            {post.featuredImageUrl && (
              <Link href={`/blog/${post.slug}`}>
                <Image
        src={post.featuredImageUrl}
        alt={post.title}
        width={600} // or any appropriate width
        height={320} // or appropriate height matching aspect ratio
        className="cursor-pointer object-cover rounded-t-xl"
        priority={false} // optional: for lazy loading
      />
              </Link>
            )}
            <div className="p-6">
              <Link href={`/blog/${post.slug}`}>
                <h2 className="text-2xl font-bold text-[#d90429] hover:text-[#9f1239] cursor-pointer transition-colors duration-200">
                  {post.title}
                </h2>
              </Link>
              <p className="mt-3 text-gray-700 line-clamp-3">{post.metaDescription || post.content.slice(0, 150) + '...'}</p>
              <Link
                href={`/blog/${post.slug}`}
                className="inline-block mt-5 text-[#d90429] hover:text-[#9f1239] font-semibold"
              >
                Read More &rarr;
              </Link>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
