import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import BlogPost from '@/models/BlogPost';

/**
 * Handles GET requests to fetch all blog posts.
 */
export async function GET() {
  await connectDB();
  try {
    const posts = await BlogPost.find({})
      .select('_id title slug publishedAt') // Select only necessary fields for the list
      .sort({ publishedAt: -1 })
      .lean();
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch posts' }, { status: 500 });
  }
}

/**
 * Handles POST requests to create a new blog post.
 */
export async function POST(request: Request) {
  await connectDB();
  try {
    const body = await request.json();
    const { title, slug, metaTitle, metaDescription, content } = body;

    // Basic validation
    if (!title || !slug || !content) {
      return NextResponse.json({ message: 'Title, slug, and content are required' }, { status: 400 });
    }

    const newPost = new BlogPost({
      title,
      slug,
      metaTitle,
      metaDescription,
      content,
      publishedAt: new Date(),
    });

    await newPost.save();
    return NextResponse.json(newPost, { status: 201 });
  } catch (error: any) {
    // Handle potential duplicate key error for slug
    if (error.code === 11000) {
      return NextResponse.json({ message: 'A post with this slug already exists.' }, { status: 409 });
    }
    return NextResponse.json({ message: 'Failed to create post', error: error.message }, { status: 500 });
  }
}