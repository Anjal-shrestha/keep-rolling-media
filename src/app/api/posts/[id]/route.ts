import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import BlogPost from '@/models/BlogPost';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const post = await BlogPost.findById(params.id);
  return NextResponse.json(post);
}