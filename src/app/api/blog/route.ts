import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import BlogPost from '@/models/BlogPost';
import { v2 as cloudinary } from 'cloudinary';
import type { UploadApiResponse } from 'cloudinary';


export async function GET() {
  await connectDB();
  const posts = await BlogPost.find({}).sort({ createdAt: -1 }).lean();
  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  await connectDB();

  const formData = await request.formData();

  // Get file (assuming the input field name is "file")
  const file = formData.get('file');

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }

  // Convert Blob (file) to Buffer (required for cloudinary upload_stream)
  const arrayBuffer = await (file as Blob).arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  try {
    // Wrap cloudinary uploader in a Promise to get UploadApiResponse
    const uploadResult: UploadApiResponse = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: 'blog_uploads', // optional folder in Cloudinary
          resource_type: 'image',
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result!);
        }
      );

      stream.end(buffer);
    });

    // Create and save new blog post (adjust fields as needed)
    const newPost = new BlogPost({
      title: (formData.get('title') as string) || 'Untitled',
      slug: (formData.get('slug') as string) || '',
      content: (formData.get('content') as string) || '',
      featuredImageUrl: uploadResult.secure_url,
      createdAt: new Date(),
    });

    await newPost.save();

    return NextResponse.json({ message: 'Success', post: newPost });
  } catch (error) {
    console.error('Upload or DB error:', error);
    return NextResponse.json({ error: 'Upload or save failed' }, { status: 500 });
  }
}
