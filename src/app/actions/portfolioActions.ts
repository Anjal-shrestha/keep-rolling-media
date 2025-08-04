'use server';

import connectDB from '@/lib/mongodb';
import Project from '@/models/Project';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createProjectAction(formData: FormData) {
  await connectDB();

  const newProject = {
    title: formData.get('title'),
    clientName: formData.get('clientName'),
    description: formData.get('description'),
    imageUrl: '/placeholder.jpg', // We'll handle real image uploads next
  };

  try {
    await new Project(newProject).save();
  } catch (error) {
    console.error('Failed to create project:', error);
    // Handle error appropriately
    return { message: 'Failed to create project.' };
  }

  // Revalidate the path to show the new project on the public site
  revalidatePath('/our-work');

  // Redirect the admin back to their portfolio management page
  redirect('/admin/dashboard/portfolio');
}