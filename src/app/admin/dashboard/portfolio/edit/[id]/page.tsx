'use client';

import { useActionState } from 'react';
import { updateProjectAction } from '@/app/actions/portfolioActions';
import SubmitButton from '@/components/SubmitButton';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { IProject } from '@/models/Project';

const initialState = {
  message: '',
};

export default function EditPortfolioProjectPage({ params }: { params: { id: string } }) {
  const [project, setProject] = useState<IProject | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      const response = await fetch(`/api/projects/${params.id}`);
      if (response.ok) {
        const data = await response.json();
        setProject(data);
      }
    };
    fetchProject();
  }, [params.id]);

  const [state, formAction] = useActionState(updateProjectAction, initialState);

  if (!project) {
    return <div className="container mx-auto p-8">Loading project data...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Edit Portfolio Project</h1>
      <form action={formAction} className="space-y-6 bg-white p-8 rounded-lg shadow-md">
        <input type="hidden" name="projectId" value={project._id} />
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
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
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
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
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
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          ></textarea>
        </div>

        {/* CORRECTED FIELDS BELOW */}
        <div>
          <label htmlFor="vehiclesBranded" className="block text-sm font-medium text-gray-700">
            Vehicles Branded (e.g., "200 Taxis")
          </label>
          <input
            type="text"
            name="vehiclesBranded"
            id="vehiclesBranded"
            required
            defaultValue={project.vehiclesBranded}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
        <div>
          <label htmlFor="campaignFocus" className="block text-sm font-medium text-gray-700">
            Campaign Focus
          </label>
          <input
            type="text"
            name="campaignFocus"
            id="campaignFocus"
            required
            defaultValue={project.campaignFocus}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
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
          <SubmitButton>Update Project</SubmitButton>
        </div>
      </form>
    </div>
  );
}