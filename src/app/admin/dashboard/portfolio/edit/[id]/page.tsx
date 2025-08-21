import connectDB from '@/lib/mongodb';
import Project from '@/models/Project';
import EditProjectForm from '@/components/EditProjectForm';
import { notFound } from 'next/navigation';

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

// Main page This now correctly handles the props type for Next.js 15
export default async function EditPortfolioProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // Await the params promise to get the id
  return <EditPortfolioLoader projectId={id} />;
}