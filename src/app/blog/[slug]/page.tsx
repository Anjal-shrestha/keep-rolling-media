import connectDB from '@/lib/mongodb';
import BlogPost from '@/models/BlogPost';
import { notFound } from 'next/navigation';
import Head from 'next/head';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';

type Params = {
  params: {
    slug: string;
  };
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

  const posts = await BlogPost.find({})
    .select('slug')
    .lean();

  const typedPosts = posts as unknown as Array<{ slug: string }>;

  return typedPosts.map(post => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: Params) {
  await connectDB();

  const post = (await BlogPost.findOne({ slug: params.slug }).lean()) as unknown as BlogPostType | null;

  if (!post) {
    notFound();
  }

  return (
    <>
      <Head>
        <title>{post.metaTitle || post.title}</title>
        <meta name="description" content={post.metaDescription || post.content.slice(0, 150)} />
        <meta property="og:title" content={post.metaTitle || post.title} />
        {post.featuredImageUrl && <meta property="og:image" content={post.featuredImageUrl} />}
      </Head>

      <article className="prose mx-auto py-10 max-w-3xl">
        <h1>{post.title}</h1>
        {post.featuredImageUrl && (
          <Image
            src={post.featuredImageUrl}
            alt={post.title}
            width={800}
            height={450}
            className="rounded mb-6"
            priority
          />
        )}
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </article>
    </>
  );
}

export const revalidate = 60;
