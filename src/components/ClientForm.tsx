'use client';

import { useActionState } from 'react';
import { createClientAction } from '@/app/actions/clientActions';
import SubmitButton from '@/components/SubmitButton';

const initialState = { message: '', error: '' };

export default function ClientForm() {
  const [state, formAction] = useActionState(createClientAction, initialState);

  return (
    <form action={formAction} className="space-y-6 bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold">Add New Client</h2>
      {state?.error && <p className="text-red-500">{state.error}</p>}
      {state?.message && <p className="text-green-600">{state.message}</p>}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Client Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>
      <div>
        <label htmlFor="logo" className="block text-sm font-medium text-gray-700">
          Client Logo
        </label>
        <input
          type="file"
          name="logo"
          id="logo"
          required
          accept="image/*"
          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
        />
      </div>
      <div>
        <SubmitButton>Add Client</SubmitButton>
      </div>
    </form>
  );
}