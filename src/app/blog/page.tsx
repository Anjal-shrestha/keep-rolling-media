import connectDB from '@/lib/mongodb';
import BlogPost, { IBlogPost } from '@/models/BlogPost';
import Link from 'next/link';
import Image from 'next/image';
import LocalDate from '@/components/LocalDate';

export default async function BlogListPage() {
  await connectDB();
  const posts: IBlogPost[] = await BlogPost.find({}).sort({ createdAt: -1 });

  // **THE FIX:** Create a clean, properly-typed array of posts first.
  const plainPosts = posts.map(post => {
    const plainObject = post.toObject();
    return {
      ...plainObject,
      _id: plainObject._id.toString(),
      createdAt: plainObject.createdAt.toISOString(), // Ensure date is a serializable string
    };
  });

  return (
    <div className="container mx-auto px-6 py-16">
      <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-12">Our Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Now we map over our clean, pre-prepared array */}
        {plainPosts.map((post) => (
          <Link key={post._id} href={`/blog/${post.slug}`}>
            <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
              <div className="relative h-56 w-full">
                <Image
                  src={post.featuredImageUrl}
                  alt={post.title}
                  layout="fill"
                  objectFit="cover"
                  className="bg-gray-200"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800">{post.title}</h3>
                <p className="text-gray-500 mt-2 text-sm">
                  <LocalDate dateString={post.createdAt} options={{ year: 'numeric', month: 'long', day: 'numeric' }} />
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}