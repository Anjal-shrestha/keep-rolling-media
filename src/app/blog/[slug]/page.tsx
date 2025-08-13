import connectDB from '@/lib/mongodb';
import BlogPost from '@/models/BlogPost';
import { notFound } from 'next/navigation';
import Head from 'next/head';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

type BlogPostType = {
  title: string;
  metaTitle?: string;
  metaDescription?: string;
  featuredImageUrl?: string;
  content: string;
};

export async function generateStaticParams() {
  await connectDB();
  const posts = await BlogPost.find({}).select('slug').lean();
  const typedPosts = posts as unknown as Array<{ slug: string }>;
  return typedPosts.map(post => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params; // Await the promise
  await connectDB();
  const post = (await BlogPost.findOne({ slug: slug }).lean()) as BlogPostType | null;

  if (!post) {
    notFound();
  }

  return (
    <>
      <Head>
        <title>{post.metaTitle || post.title}</title>
        <meta
          name="description"
          content={post.metaDescription || post.content.slice(0, 150)}
        />
        <meta property="og:title" content={post.metaTitle || post.title} />
        {post.featuredImageUrl && (
          <meta property="og:image" content={post.featuredImageUrl} />
        )}
      </Head>

      <article className="max-w-3xl mx-auto py-16 px-4 sm:px-6 lg:px-8 prose prose-red prose-lg sm:prose-xl">
        <h1 className="text-5xl font-extrabold mb-8">{post.title}</h1>
        {post.featuredImageUrl && (
          <div className="mb-12 rounded overflow-hidden shadow-lg">
            <Image
              src={post.featuredImageUrl}
              alt={post.title}
              width={900}
              height={500}
              className="object-cover w-full"
              priority
              placeholder="blur"
              blurDataURL="/placeholder.png" // optional placeholder
            />
          </div>
        )}
        <ReactMarkdown
          components={{
            h2: (props) => (
              <h2 className="text-3xl font-semibold mt-14 mb-6" {...props} />
            ),
            h3: (props) => (
              <h3 className="text-2xl font-semibold mt-10 mb-5" {...props} />
            ),
            p: (props) => (
              <p className="leading-relaxed mb-6 text-gray-800" {...props} />
            ),
            a: (props) => (
              <a
                {...props}
                className="text-[#d90429] hover:text-[#9f1239] underline transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
              />
            ),
            ul: (props) => <ul className="list-disc list-inside mb-6" {...props} />,
            blockquote: (props) => (
              <blockquote
                className="border-l-4 border-red-500 pl-4 italic text-gray-600 my-8"
                {...props}
              />
            ),
            code: (props) => (
              <code
                className="bg-gray-100 rounded px-1 py-0.5 font-mono text-sm"
                {...props}
              />
            ),
          }}
        >
          {post.content}
        </ReactMarkdown>
      </article>
    </>
  );
}

export const revalidate = 60;