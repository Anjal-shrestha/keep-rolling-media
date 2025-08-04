import connectDB from '@/lib/mongodb';
import BlogPost from '@/models/BlogPost';
import Link from 'next/link';
import Image from 'next/image';
import LocalDate from '@/components/LocalDate'; // Import the new component

export default async function BlogListPage() {
  await connectDB();
  const posts = JSON.parse(JSON.stringify(await BlogPost.find({}).sort({ createdAt: -1 })));

  return (
    <div className="container mx-auto px-6 py-16">
      <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-12">Our Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post: any) => (
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
                  {/* Use the new LocalDate component */}
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