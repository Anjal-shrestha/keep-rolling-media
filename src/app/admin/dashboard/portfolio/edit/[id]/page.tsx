import connectDB from '@/lib/mongodb';
import Project from '@/models/Project';
import EditProjectForm from '@/components/EditProjectForm';
import { notFound } from 'next/navigation';

// This is a new child component that will contain all the logic.
// This pattern is more robust for Next.js production builds.
async function EditPortfolioLoader({ projectId }: { projectId: string }) {
  await connectDB();
  const project = await Project.findById(projectId);

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


// The main page component is now very simple.
// Its only job is to get the ID from the params and pass it to the loader component.
export default function EditPortfolioProjectPage({ params }: { params: { id: string } }) {
  return <EditPortfolioLoader projectId={params.id} />;
}