'use server';

import connectDB from '@/lib/mongodb';
import GalleryImage from '@/models/GalleryImage';
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

// --- CREATE GALLERY IMAGE ---
export async function createGalleryImageAction(prevState: FormState, formData: FormData): Promise<FormState> {
  const imageFile = formData.get('image') as File;

  if (!imageFile || imageFile.size === 0) {
    return { error: 'An image file is required.' };
  }

  const bytes = await imageFile.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const uploadResult = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
    cloudinary.uploader.upload_stream({ folder: 'keep_rolling_gallery' }, (err, res) => {
      if (err) reject(err);
      resolve(res);
    }).end(buffer);
  });

  if (!uploadResult) {
    return { error: 'Image upload failed.' };
  }

  await connectDB();
  
  try {
    await new GalleryImage({
      imageUrl: uploadResult.secure_url,
    }).save();
  } catch (error) {
    // **THE FIX IS HERE:** Use the 'error' variable
    console.error('Database error:', error); 
    return { error: 'Database error. Failed to save image.' };
  }

  revalidatePath('/gallery');
  redirect('/admin/dashboard/gallery');
}

// --- DELETE GALLERY IMAGE ---
export async function deleteGalleryImageAction(imageId: string) {
  await connectDB();
  try {
    await GalleryImage.findByIdAndDelete(imageId);
  } catch (error) {
    console.error('Failed to delete image:', error);
  }
  revalidatePath('/gallery');
  revalidatePath('/admin/dashboard/gallery');
}