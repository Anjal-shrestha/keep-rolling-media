import connectDB from '@/lib/mongodb';
import BlogPost from '@/models/BlogPost';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import LocalDate from '@/components/LocalDate';

export default async function SingleBlogPostPage({ params }: { params: { slug: string } }) {
  await connectDB();
  const post = await BlogPost.findOne({ slug: params.slug });

  if (!post) {
    notFound();
  }

  return (
    <article className="bg-white py-16">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Post Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            {post.title}
          </h1>
          <p className="mt-4 text-gray-500">
            Posted on <LocalDate dateString={post.createdAt.toISOString()} options={{ year: 'numeric', month: 'long', day: 'numeric' }} />
          </p>
        </header>

        {/* Featured Image */}
        <div className="relative h-96 w-full mb-12 rounded-lg overflow-hidden shadow-lg">
          <Image
            src={post.featuredImageUrl}
            alt={post.title}
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>

        {/* Post Content */}
        <div
          className="prose prose-lg lg:prose-xl max-w-none prose-headings:text-gray-800 prose-p:text-gray-700 prose-a:text-red-600 prose-strong:text-gray-800"
          dangerouslySetInnerHTML={{ __html: post.content }}
        ></div>
      </div>
    </article>
  );
}