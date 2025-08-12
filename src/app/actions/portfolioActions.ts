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

interface FormState {
  message: string;
}
type CloudinaryUploadResult = UploadApiResponse | undefined;

// --- CREATE PROJECT ---
export async function createProjectAction(prevState: FormState, formData: FormData): Promise<FormState> {
  const title = formData.get('title') as string;
  const clientName = formData.get('clientName') as string;
  const description = formData.get('description') as string;
  const vehiclesBranded = formData.get('vehiclesBranded') as string; // Get the field
  const campaignFocus = formData.get('campaignFocus') as string;   // Get the field
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

  // **THE FIX IS HERE:** We now include vehiclesBranded and campaignFocus
  const newProject = {
    title,
    clientName,
    description,
    imageUrl: uploadResult.secure_url,
    vehiclesBranded, // This was missing
    campaignFocus,   // This was missing
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
    const vehiclesBranded = formData.get('vehiclesBranded') as string;
    const campaignFocus = formData.get('campaignFocus') as string;
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

    const updatedFields: {
      title: string;
      clientName: string;
      description: string;
      vehiclesBranded: string;
      campaignFocus: string;
      imageUrl?: string;
    } = {
      title,
      clientName,
      description,
      vehiclesBranded,
      campaignFocus,
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
  }
  revalidatePath('/our-work');
  revalidatePath('/admin/dashboard/portfolio');
}