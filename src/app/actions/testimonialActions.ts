'use server';

import connectDB from '@/lib/mongodb';
import Testimonial from '@/models/Testimonial';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface FormState {
  message: string;
}
type CloudinaryUploadResult = UploadApiResponse | undefined;

export async function createTestimonialAction(prevState: FormState, formData: FormData): Promise<FormState> {
  const name = formData.get('name') as string;
  const position = formData.get('position') as string;
  const review = formData.get('review') as string;
  const imageFile = formData.get('image') as File;

  if (!imageFile || imageFile.size === 0) {
    return { message: 'An image is required.' };
  }

  const bytes = await imageFile.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const uploadResult = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
    cloudinary.uploader.upload_stream({ folder: 'keep_rolling_media_testimonials' }, (error, result) => {
      if (error) reject(error);
      resolve(result);
    }).end(buffer);
  });

  if (!uploadResult) {
    return { message: 'Image upload failed.' };
  }

  await connectDB();

  const newTestimonial = {
    name,
    position,
    review,
    imageUrl: uploadResult.secure_url,
  };

  try {
    await new Testimonial(newTestimonial).save();
  } catch (error) {
    console.error('Failed to create testimonial:', error);
    return { message: 'Failed to create testimonial.' };
  }

  revalidatePath('/');
  revalidatePath('/admin/dashboard/testimonials');
  redirect('/admin/dashboard/testimonials');
}

export async function deleteTestimonialAction(testimonialId: string) {
  await connectDB();
  try {
    await Testimonial.findByIdAndDelete(testimonialId);
  } catch (error) {
    console.error('Failed to delete testimonial:', error);
  }
  revalidatePath('/');
  revalidatePath('/admin/dashboard/testimonials');
}