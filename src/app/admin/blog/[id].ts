import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import BlogPost from '@/models/BlogPost';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await connectDB();
  const post = await BlogPost.findById(id);
  if (!post) return NextResponse.json({ message: 'Not found' }, { status: 404 });
  return NextResponse.json(post);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Logic for PUT can be added here if needed in the future
  return NextResponse.json({ message: 'Use server actions to update blog posts.' }, { status: 405 });
}

export async function DELETE(
  req: NextRequest,
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