import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import BlogPost from '@/models/BlogPost';

// GET request handler
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await connectDB();
  const post = await BlogPost.findById(id);
  if (!post) {
    return NextResponse.json({ message: 'Not found' }, { status: 404 });
  }
  return NextResponse.json(post);
}

// PUT request handler - Unused parameters are now completely removed
export async function PUT() {
  return NextResponse.json(
    { message: 'Use server actions to update blog posts.' },
    { status: 405 }
  );
}

// DELETE request handler - Unused 'req' parameter is removed
export async function DELETE(
  _req: NextRequest, // Keeping req in case of future auth needs, but unused for now
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await connectDB();
  try {
    await BlogPost.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Deleted' });
  } catch (e) {
    console.error('Failed to delete blog post:', e);
    return NextResponse.json({ message: 'Failed to delete' }, { status: 500 });
  }
}