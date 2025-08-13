import connectDB from '@/lib/mongodb';
import Project from '@/models/Project';
import EditProjectForm from '@/components/EditProjectForm';
import { notFound } from 'next/navigation';

// Define a type for the page's props, including params
type Props = {
  params: {
    id: string;
  };
};

// Loader component handles DB connection + fetching project
async function EditPortfolioLoader({ projectId }: { projectId: string }) {
  await connectDB();
  const project = await Project.findById(projectId);

  if (!project) {
    notFound();
  }

  // Prepare a clean object for the client component
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

// Main page component using the new Props type
export default async function EditPortfolioProjectPage({ params }: Props) {
  return <EditPortfolioLoader projectId={params.id} />;
}