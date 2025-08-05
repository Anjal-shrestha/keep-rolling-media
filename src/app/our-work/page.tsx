import connectDB from '@/lib/mongodb';
import Project, { IProject } from '@/models/Project';
import Image from 'next/image';

export default async function OurWorkPage() {
  await connectDB();
  const projects: IProject[] = await Project.find({}).sort({ displayOrder: 'asc', createdAt: -1 });

  return (
    <div className="container mx-auto px-6 py-16">
      <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-12">Our Work</h1>
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div key={project._id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-56 w-full">
              {/* Add this check */}
              {project.imageUrl && (
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  layout="fill"
                  objectFit="cover"
                  className="bg-gray-200"
                />
              )}
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800">{project.title}</h3>
              <p className="text-md font-semibold text-red-600 mt-1">{project.clientName}</p>
              <p className="text-gray-600 mt-4">{project.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}