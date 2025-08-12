'use server';

import connectDB from '@/lib/mongodb';
import Client from '@/models/Client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Define a type for the form state to work with useActionState
interface FormState {
  message: string;
  error?: string;
}

// Define a specific type for the Cloudinary upload result
type CloudinaryUploadResult = UploadApiResponse | undefined;

// --- CREATE CLIENT ---
export async function createClientAction(prevState: FormState, formData: FormData): Promise<FormState> {
  const name = formData.get('name') as string;
  const logoFile = formData.get('logo') as File;

  if (!logoFile || logoFile.size === 0) {
    return { message: '', error: 'Logo image is required.' };
  }

  const bytes = await logoFile.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadResult = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
    cloudinary.uploader.upload_stream({ folder: 'keep_rolling_media_clients' }, (error, result) => {
      if (error) reject(error);
      resolve(result);
    }).end(buffer);
  });

  if (!uploadResult) {
    return { message: '', error: 'Image upload failed.' };
  }

  await connectDB();

  const newClient = {
    name,
    logoUrl: uploadResult.secure_url, // No longer uses 'as any'
  };

  try {
    await new Client(newClient).save();
  } catch (error) {
    console.error('Failed to create client:', error);
    return { message: '', error: 'Failed to save client.' };
  }

  revalidatePath('/');
  revalidatePath('/admin/dashboard/clients');
  redirect('/admin/dashboard/clients');
}

// --- DELETE CLIENT ---
export async function deleteClientAction(clientId: string) {
  await connectDB();
  try {
    await Client.findByIdAndDelete(clientId);
    revalidatePath('/'); // Revalidate homepage
    revalidatePath('/admin/dashboard/clients');
  } catch (error) {
    console.error('Failed to delete client:', error);
  }
}