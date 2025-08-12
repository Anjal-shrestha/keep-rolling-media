'use server';

import connectDB from '@/lib/mongodb';
import BlogPost from '@/models/BlogPost';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface FormState {
  message: string;
  error?: string;
}
type CloudinaryUploadResult = UploadApiResponse | undefined;

// --- CREATE BLOG POST ---
// The signature MUST accept prevState and formData
export async function createBlogPostAction(prevState: FormState, formData: FormData): Promise<FormState> {
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const imageFile = formData.get('image') as File;

  if (!imageFile || imageFile.size === 0) {
    return { message: '', error: 'Featured image is required.' };
  }

  // Create a URL-friendly slug from the title
  const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

  // Upload image to Cloudinary
  const bytes = await imageFile.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const uploadResult = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
    cloudinary.uploader.upload_stream({ folder: 'keep_rolling_media_blog' }, (error, result) => {
      if (error) reject(error);
      resolve(result);
    }).end(buffer);
  });
  
  if (!uploadResult) {
      return { message: '', error: 'Image upload failed.' };
  }

  await connectDB();

  const newPost = {
    title,
    slug,
    content,
    featuredImageUrl: uploadResult.secure_url,
  };

  try {
    await new BlogPost(newPost).save();
  } catch (error) {
    console.error('Failed to create blog post:', error);
    return { message: '', error: 'Failed to create blog post. The slug might already exist.' };
  }

  revalidatePath('/blog');
  revalidatePath('/admin/dashboard/blog');
  redirect('/admin/dashboard/blog');
}

// --- UPDATE BLOG POST ---
export async function updateBlogPostAction(prevState: FormState, formData: FormData): Promise<FormState> {
  const postId = formData.get('postId') as string;
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const imageFile = formData.get('image') as File;

  const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
  let featuredImageUrl;

  if (imageFile && imageFile.size > 0) {
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const uploadResult = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
      cloudinary.uploader.upload_stream({ folder: 'keep_rolling_media_blog' }, (error, result) => {
        if (error) reject(error);
        resolve(result);
      }).end(buffer);
    });
    if (uploadResult) {
      featuredImageUrl = uploadResult.secure_url;
    }
  }

  const updatedFields: { title: string; slug: string; content: string; featuredImageUrl?: string } = {
    title,
    slug,
    content,
  };

  if (featuredImageUrl) {
    updatedFields.featuredImageUrl = featuredImageUrl;
  }

  await connectDB();

  try {
    await BlogPost.findByIdAndUpdate(postId, updatedFields);
  } catch (error) {
    console.error('Failed to update blog post:', error);
    return { message: '', error: 'Failed to update blog post.' };
  }

  revalidatePath('/blog');
  revalidatePath(`/blog/${slug}`);
  revalidatePath('/admin/dashboard/blog');
  redirect('/admin/dashboard/blog');
}


// --- DELETE BLOG POST ---
export async function deleteBlogPostAction(postId: string) {
  await connectDB();

  try {
    await BlogPost.findByIdAndDelete(postId);
  } catch (error) {
    console.error('Failed to delete blog post:', error);
  }

  revalidatePath('/blog');
  revalidatePath('/admin/dashboard/blog');
}