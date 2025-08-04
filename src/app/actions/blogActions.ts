'use server';

import connectDB from '@/lib/mongodb';
import BlogPost from '@/models/BlogPost';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary (ensure your .env.local is set up)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// --- CREATE BLOG POST ---
export async function createBlogPostAction(formData: FormData) {
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const imageFile = formData.get('image') as File;

  if (!imageFile || imageFile.size === 0) {
    return { message: 'Featured image is required.' };
  }

  // Create a URL-friendly slug from the title
  const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

  // Upload image to Cloudinary
  const bytes = await imageFile.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const uploadResult = await new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream({ folder: 'keep_rolling_media_blog' }, (error, result) => {
      if (error) reject(error);
      resolve(result);
    }).end(buffer);
  });

  await connectDB();

  const newPost = {
    title,
    slug,
    content,
    featuredImageUrl: (uploadResult as any).secure_url,
  };

  try {
    await new BlogPost(newPost).save();
  } catch (error) {
    console.error('Failed to create blog post:', error);
    return { message: 'Failed to create blog post. The slug might already exist.' };
  }

  revalidatePath('/blog');
  revalidatePath('/admin/dashboard/blog');
  redirect('/admin/dashboard/blog');
}

// --- UPDATE BLOG POST ---
export async function updateBlogPostAction(postId: string, formData: FormData) {
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const imageFile = formData.get('image') as File;

  const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
  let featuredImageUrl;

  if (imageFile && imageFile.size > 0) {
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({ folder: 'keep_rolling_media_blog' }, (error, result) => {
        if (error) reject(error);
        resolve(result);
      }).end(buffer);
    });
    featuredImageUrl = (uploadResult as any).secure_url;
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
    return { message: 'Failed to update blog post.' };
  }

  revalidatePath('/blog');
  revalidatePath(`/blog/${slug}`); // Revalidate specific blog post page
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
    return { message: 'Failed to delete blog post.' };
  }

  revalidatePath('/blog');
  revalidatePath('/admin/dashboard/blog');
}