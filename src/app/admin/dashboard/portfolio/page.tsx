import Link from 'next/link';
import connectDB from '@/lib/mongodb';
import Project from '@/models/Project';
import DeleteProjectButton from '@/components/DeleteProjectButton';
import { IProject } from '@/models/Project';

export default async function PortfolioAdminPage() {
  await connectDB();
  const projects: IProject[] = await Project.find({}).sort({ createdAt: -1 });

  // **THE FIX IS HERE:**
  // Create a new, clean array where we explicitly make sure _id is a string.
  // This is the most reliable way to handle data from MongoDB for client-side props.
  const plainProjects = projects.map(project => {
    const plainObject = project.toObject();
    return {
      ...plainObject,
      _id: plainObject._id.toString(),
    };
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Portfolio</h1>
        <Link
          href="/admin/dashboard/portfolio/new"
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
        >
          + Add New Project
        </Link>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md">
        {/* Now we map over our clean, pre-prepared array */}
        {plainProjects.map((project) => (
          <div
            key={project._id}
            className="border-b last:border-b-0 py-3 flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold text-lg">{project.title}</h3>
              <p className="text-sm text-gray-500">{project.clientName}</p>
            </div>
            <div className="flex gap-2">
              <Link 
                href={`/admin/dashboard/portfolio/edit/${project._id}`}
                className="text-sm bg-gray-200 px-3 py-1 rounded-md hover:bg-gray-300"
              >
                Edit
              </Link>
              <DeleteProjectButton projectId={project._id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}