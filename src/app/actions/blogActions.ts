'use server';

import connectDB from '@/lib/mongodb';
import BlogPost from '@/models/BlogPost';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface FormState {
  message?: string;
  error?: string;
}
type CloudinaryUploadResult = UploadApiResponse | undefined;

// --- CREATE BLOG POST ---
export async function createBlogPostAction(prevState: FormState, formData: FormData): Promise<FormState> {
    const title = formData.get('title') as string;
    const imageFile = formData.get('featuredImage') as File;
    const introParagraph = formData.get('introParagraph') as string;
    const subheading = formData.get('subheading') as string;
    const conclusion = formData.get('conclusion') as string;
    const bulletPoints = (formData.get('bulletPoints') as string || '')
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0);

    if (!title || !imageFile || imageFile.size === 0 || !introParagraph || !subheading || !conclusion) {
        return { error: 'All fields, including a featured image, are required.' };
    }

    const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
    
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const uploadResult = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
        cloudinary.uploader.upload_stream({ folder: 'keep_rolling_media_blog' }, (error, result) => {
        if (error) reject(error);
        resolve(result);
        }).end(buffer);
    });

    if (!uploadResult) {
        return { error: 'Image upload failed.' };
    }

    await connectDB();
    
    const newPost = {
        title,
        slug,
        featuredImageUrl: uploadResult.secure_url,
        introParagraph,
        subheading,
        bulletPoints,
        conclusion,
    };

    try {
        await new BlogPost(newPost).save();
    } catch (error) {
        console.error('Failed to create post:', error);
        return { error: 'Failed to create post. The title might already be in use.' };
    }

    revalidatePath('/blog');
    redirect('/admin/dashboard/blog');
}

// --- UPDATE BLOG POST ---
export async function updateBlogPostAction(prevState: FormState, formData: FormData): Promise<FormState> {
    const postId = formData.get('postId') as string;
    const title = formData.get('title') as string;
    const imageFile = formData.get('featuredImage') as File;
    const introParagraph = formData.get('introParagraph') as string;
    const subheading = formData.get('subheading') as string;
    const conclusion = formData.get('conclusion') as string;
    const bulletPoints = (formData.get('bulletPoints') as string || '')
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0);

    if (!postId || !title || !introParagraph || !subheading || !conclusion) {
        return { error: "All text fields are required." };
    }
 
    const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
    let featuredImageUrl;
 
    if (imageFile && imageFile.size > 0) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const uploadResult = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
        cloudinary.uploader.upload_stream({ folder: 'blog_featured_images' }, (err, res) => {
          if (err) reject(err);
          resolve(res);
        }).end(buffer);
      });
      if (uploadResult) {
        featuredImageUrl = uploadResult.secure_url;
      }
    }
 
    // **FIX IS HERE:** Changed 'any' to a more specific type
    const updatedFields: { [key: string]: string | string[] | undefined } = {
        title,
        slug,
        introParagraph,
        subheading,
        bulletPoints,
        conclusion,
    };
 
    if (featuredImageUrl) {
      updatedFields.featuredImageUrl = featuredImageUrl;
    }
 
    await connectDB();
 
    try {
      await BlogPost.findByIdAndUpdate(postId, updatedFields);
    } catch (error) {
      // **FIX IS HERE:** Use the 'error' variable
      console.error('Failed to update post:', error);
      return { error: 'Failed to update post in the database.' };
    }
 
    revalidatePath('/blog');
    revalidatePath(`/blog/${slug}`);
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