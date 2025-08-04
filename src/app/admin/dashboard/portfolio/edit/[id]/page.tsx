import { updateProjectAction } from '@/app/actions/portfolioActions';
import connectDB from '@/lib/mongodb';
import Project from '@/models/Project';
import Image from 'next/image';

export default async function EditPortfolioProjectPage({ params }: { params: { id: string } }) {
  await connectDB();
  const project = JSON.parse(JSON.stringify(await Project.findById(params.id)));

  if (!project) {
    return <div>Project not found.</div>;
  }

  const updateActionWithId = updateProjectAction.bind(null, project._id.toString());

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Edit Portfolio Project</h1>
      {/* The encType attribute was added here */}
      <form action={updateActionWithId} className="space-y-6 bg-white p-8 rounded-lg shadow-md">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Project Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            required
            defaultValue={project.title}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="clientName" className="block text-sm font-medium text-gray-700">
            Client Name
          </label>
          <input
            type="text"
            name="clientName"
            id="clientName"
            required
            defaultValue={project.clientName}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            rows={4}
            required
            defaultValue={project.description}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
          ></textarea>
        </div>
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">
            Change Project Image (Optional)
          </label>
          <div className="mt-2 flex items-center gap-4">
            <Image src={project.imageUrl} alt="Current image" width={80} height={80} className="rounded-md object-cover bg-gray-100" />
            <input
              type="file"
              name="image"
              id="image"
              accept="image/*"
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Update Project
          </button>
        </div>
      </form>
    </div>
  );
}