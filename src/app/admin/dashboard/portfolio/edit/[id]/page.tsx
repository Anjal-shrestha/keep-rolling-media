import connectDB from '@/lib/mongodb';
import Project from '@/models/Project';
import EditProjectForm from '@/components/EditProjectForm';
import { notFound } from 'next/navigation';

interface EditPortfolioProjectPageProps {
  params: {
    id: string;
  };
}

export default async function EditPortfolioProjectPage({ params }: EditPortfolioProjectPageProps) {
  await connectDB();
  const project = await Project.findById(params.id);

  if (!project) {
    notFound(); // <-- preferred way to handle missing data
  }

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
