'use client';

import { useFormState } from 'react-dom';
import { createProjectAction } from '@/app/actions/portfolioActions';
import SubmitButton from '@/components/SubmitButton';

const initialState = {
  message: '',
};

export default function NewPortfolioProjectPage() {
  const [state, formAction] = useFormState(createProjectAction, initialState);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Add New Portfolio Project</h1>
      <form action={formAction} className="space-y-6 bg-white p-8 rounded-lg shadow-md">
        {state?.message && <p className="text-red-500">{state.message}</p>}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Project Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            required
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
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
          ></textarea>
        </div>
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">
            Project Image
          </label>
          <input
            type="file"
            name="image"
            id="image"
            required
            accept="image/*"
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
          />
        </div>
        <div>
  <label htmlFor="vehiclesBranded" className="block text-sm font-medium text-gray-700">
    Vehicles Branded (e.g., "200 Taxis")
  </label>
  <input
    type="text"
    name="vehiclesBranded"
    id="vehiclesBranded"
    required
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
    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
  />
</div>
        <div>
          <SubmitButton>Create Project</SubmitButton>
        </div>
      </form>
    </div>
  );
}