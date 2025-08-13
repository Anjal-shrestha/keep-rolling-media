import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Project from '@/models/Project';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  const project = await Project.findById(params.id);
  return NextResponse.json(project);
}