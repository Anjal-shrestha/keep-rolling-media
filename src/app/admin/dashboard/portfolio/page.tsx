import Link from 'next/link';
import connectDB from '@/lib/mongodb';
import Project from '@/models/Project';

export default async function PortfolioAdminPage() {
  await connectDB();
  const projects = await Project.find({}).sort({ createdAt: -1 });

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
        {projects.map((project) => (
          <div
            key={project._id}
            className="border-b last:border-b-0 py-3 flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold text-lg">{project.title}</h3>
              <p className="text-sm text-gray-500">{project.clientName}</p>
            </div>
            <div className="flex gap-2">
              <button className="text-sm bg-gray-200 px-3 py-1 rounded-md">
                Edit
              </button>
              <button className="text-sm bg-red-500 text-white px-3 py-1 rounded-md">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}