import connectDB from '@/lib/mongodb';
import Project from '@/models/Project';
import EditProjectForm from '@/components/EditProjectForm';
import { notFound } from 'next/navigation';

// The fix is to use a simpler, inline type for the props
export default async function EditPortfolioProjectPage({ params }: { params: { id: string } }) {
  await connectDB();
  const project = await Project.findById(params.id);

  if (!project) {
    notFound();
  }

  // Prepare a clean, plain object to pass to the client component
  const plainProject = {
    ...project.toObject(),
    _id: project._id.toString(),
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Edit Portfolio Project</h1>
      <EditProjectForm project={plainProject} />
    </div>
  );
}