import connectDB from '@/lib/mongodb';
import BlogPost, { IBlogPost } from '@/models/BlogPost';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export default async function SingleBlogPostPage({ params }: { params: { slug: string } }) {
  await connectDB();
  const post: IBlogPost | null = await BlogPost.findOne({ slug: params.slug });

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto px-6 py-16 max-w-4xl">
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">{post.title}</h1>
      <p className="text-gray-500 mb-8">
        Posted on {new Date(post.createdAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </p>
      <div className="relative h-96 w-full mb-8 rounded-lg overflow-hidden">
        <Image
          src={post.featuredImageUrl}
          alt={post.title}
          layout="fill"
          objectFit="cover"
          className="bg-gray-200"
        />
      </div>
      <div className="prose lg:prose-xl max-w-none">
        {post.content}
      </div>
    </div>
  );
}