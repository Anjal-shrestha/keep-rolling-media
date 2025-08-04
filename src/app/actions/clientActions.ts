'use server';

import connectDB from '@/lib/mongodb';
import Client from '@/models/Client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// --- CREATE CLIENT ---
export async function createClientAction(formData: FormData) {
  const name = formData.get('name') as string;
  const logoFile = formData.get('logo') as File;

  if (!logoFile || logoFile.size === 0) {
    return { message: 'Logo image is required.' };
  }

  const bytes = await logoFile.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const uploadResult = await new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream({ folder: 'keep_rolling_media_clients' }, (error, result) => {
      if (error) reject(error);
      resolve(result);
    }).end(buffer);
  });

  await connectDB();

  const newClient = {
    name,
    logoUrl: (uploadResult as any).secure_url,
  };

  await new Client(newClient).save();

  revalidatePath('/'); // Revalidate homepage
  revalidatePath('/admin/dashboard/clients');
  redirect('/admin/dashboard/clients');
}

// --- DELETE CLIENT ---
export async function deleteClientAction(clientId: string) {
  await connectDB();
  await Client.findByIdAndDelete(clientId);
  revalidatePath('/'); // Revalidate homepage
  revalidatePath('/admin/dashboard/clients');
}