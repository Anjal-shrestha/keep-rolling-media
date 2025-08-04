'use server';

import connectDB from '@/lib/mongodb';
import Project from '@/models/Project';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Define a type for our form state
interface FormState {
  message: string;
}

// Define a type for the Cloudinary upload result
type CloudinaryUploadResult = UploadApiResponse | undefined;


// --- CREATE PROJECT ---
export async function createProjectAction(prevState: FormState, formData: FormData): Promise<FormState> {
  const title = formData.get('title') as string;
  const clientName = formData.get('clientName') as string;
  const description = formData.get('description') as string;
  const imageFile = formData.get('image') as File;

  if (!imageFile || imageFile.size === 0) {
    return { message: 'Image is required.' };
  }

  const bytes = await imageFile.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadResult = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
    cloudinary.uploader.upload_stream({ folder: 'keep_rolling_media' }, (error, result) => {
      if (error) reject(error);
      resolve(result);
    }).end(buffer);
  });

  if (!uploadResult) {
    return { message: 'Image upload failed.' };
  }
  
  await connectDB();

  const newProject = {
    title,
    clientName,
    description,
    imageUrl: uploadResult.secure_url,
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


// --- UPDATE PROJECT ---
export async function updateProjectAction(prevState: FormState, formData: FormData): Promise<FormState> {
  const projectId = formData.get('projectId') as string;
  const title = formData.get('title') as string;
  const clientName = formData.get('clientName') as string;
  const description = formData.get('description') as string;
  const imageFile = formData.get('image') as File;

  let imageUrl;

  if (imageFile && imageFile.size > 0) {
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadResult = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
      cloudinary.uploader.upload_stream({ folder: 'keep_rolling_media' }, (error, result) => {
        if (error) reject(error);
        resolve(result);
      }).end(buffer);
    });
    
    if (uploadResult) {
      imageUrl = uploadResult.secure_url;
    }
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


// --- DELETE PROJECT ---
export async function deleteProjectAction(projectId: string) {
  await connectDB();

  try {
    await Project.findByIdAndDelete(projectId);
  } catch (error) {
    console.error('Failed to delete project:', error);
    // You can optionally return an error message if you adapt the delete button to handle it
  }

  revalidatePath('/our-work');
  revalidatePath('/admin/dashboard/portfolio');
}