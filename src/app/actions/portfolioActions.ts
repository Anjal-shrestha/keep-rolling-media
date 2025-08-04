'use server';
import { v2 as cloudinary } from 'cloudinary';
import connectDB from '@/lib/mongodb';
import Project from '@/models/Project';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function createProjectAction(formData: FormData) {
  const title = formData.get('title') as string;
  const clientName = formData.get('clientName') as string;
  const description = formData.get('description') as string;
  const imageFile = formData.get('image') as File;

  if (!imageFile || imageFile.size === 0) {
    return { message: 'Image is required.' };
  }

  // Convert image to buffer
  const bytes = await imageFile.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Upload to Cloudinary
  const uploadResult = await new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream({ folder: 'keep_rolling_media' }, (error, result) => {
      if (error) reject(error);
      resolve(result);
    }).end(buffer);
  });

  await connectDB();

  const newProject = {
    title,
    clientName,
    description,
    imageUrl: (uploadResult as any).secure_url, // Get secure URL from Cloudinary
  };

  try {
    await new Project(newProject).save();
  } catch (error) {
    console.error('Failed to create project:', error);
    return { message: 'Failed to create project.' };
  }

  revalidatePath('/our-work');
  redirect('/admin/dashboard/portfolio');
}
export async function deleteProjectAction(projectId: string) {
  await connectDB();

  try {
    await Project.findByIdAndDelete(projectId);
  } catch (error) {
    console.error('Failed to delete project:', error);
    return { message: 'Failed to delete project.' };
  }

  // Revalidate paths to update the UI
  revalidatePath('/our-work');
  revalidatePath('/admin/dashboard/portfolio');
}
export async function updateProjectAction(projectId: string, formData: FormData) {
  
  const title = formData.get('title') as string;
  const clientName = formData.get('clientName') as string;
  const description = formData.get('description') as string;
  const imageFile = formData.get('image') as File;

  let imageUrl;

  // Check if a new image was uploaded
  if (imageFile && imageFile.size > 0) {
    // Convert image to buffer
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({ folder: 'keep_rolling_media' }, (error, result) => {
        if (error) reject(error);
        resolve(result);
      }).end(buffer);
    });

    imageUrl = (uploadResult as any).secure_url;
  }

  const updatedFields: { title: string; clientName: string; description: string; imageUrl?: string } = {
    title,
    clientName,
    description,
  };

  if (imageUrl) {
    updatedFields.imageUrl = imageUrl;
  }

  await connectDB();

  try {
    await Project.findByIdAndUpdate(projectId, updatedFields);
  } catch (error) {
    console.error('Failed to update project:', error);
    return { message: 'Failed to update project.' };
  }

  revalidatePath('/our-work');
  revalidatePath('/admin/dashboard/portfolio');
  redirect('/admin/dashboard/portfolio');
}