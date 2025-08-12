'use server';

import connectDB from '@/lib/mongodb';
import BlogPost from '@/models/BlogPost';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

function generateSlug(title: string) {
  return title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
}

type CloudinaryUploadResult = {
  secure_url: string;
};

// Create
export async function createBlogPostAction(formData: FormData) {
  const title = formData.get('title') as string | null;
  const metaTitle = formData.get('metaTitle') as string | null;
  const metaDescription = formData.get('metaDescription') as string | null;
  const content = formData.get('content') as string | null;
  const imageFile = formData.get('featuredImage') as File | null;

  if (!title || !content || !imageFile) {
    return { error: 'Title, content, and image are required.' };
  }

  const slug = generateSlug(title);

  const bytes = await imageFile.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadResult = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
    cloudinary.uploader.upload_stream({ folder: 'blog' }, (error, result) => {
      if (error) reject(error);
      else resolve(result as CloudinaryUploadResult);
    }).end(buffer);
  });

  await connectDB();

  try {
    await new BlogPost({
      title,
      slug,
      metaTitle: metaTitle || undefined,
      metaDescription: metaDescription || undefined,
      featuredImageUrl: uploadResult.secure_url,
      content,
      publishedAt: new Date(),
    }).save();
  } catch {
    return { error: 'Error saving blog post. Slug might already exist.' };
  }

  revalidatePath('/blog');
  redirect('/blog');
}

// Update
export async function updateBlogPostAction(formData: FormData) {
  const id = formData.get('id') as string | null;
  const title = formData.get('title') as string | null;
  const metaTitle = formData.get('metaTitle') as string | null;
  const metaDescription = formData.get('metaDescription') as string | null;
  const content = formData.get('content') as string | null;
  const imageFile = formData.get('featuredImage') as File | null;

  if (!id || !title || !content) {
    return { error: 'ID, title and content are required.' };
  }

  const slug = generateSlug(title);

  await connectDB();

  let featuredImageUrl: string | null = null;

  if (imageFile && imageFile.size > 0) {
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadResult = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
      cloudinary.uploader.upload_stream({ folder: 'blog' }, (error, result) => {
        if (error) reject(error);
        else resolve(result as CloudinaryUploadResult);
      }).end(buffer);
    });

    featuredImageUrl = uploadResult.secure_url;
  }

  try {
    const post = await BlogPost.findById(id);
    if (!post) {
      return { error: 'Post not found.' };
    }

    post.title = title;
    post.slug = slug;
    post.metaTitle = metaTitle || undefined;
    post.metaDescription = metaDescription || undefined;
    post.content = content;
    if (featuredImageUrl) {
      post.featuredImageUrl = featuredImageUrl;
    }

    await post.save();
  } catch {
    return { error: 'Failed to update post.' };
  }

  revalidatePath('/blog');
  redirect('/admin/dashboard/blog');
}

// Delete
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
