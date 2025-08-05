'use client';

import { useActionState } from 'react';
import { createTestimonialAction } from '@/app/actions/testimonialActions';
import SubmitButton from '@/components/SubmitButton';

export default function TestimonialForm() {
  const initialState = { message: '' };
  const [state, formAction] = useActionState(createTestimonialAction, initialState);

  return (
    <form action={formAction} className="space-y-6 bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold">Add New Testimonial</h2>
      {state?.message && <p className="text-red-500">{state.message}</p>}
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
  <label htmlFor="image" className="block text-sm font-medium text-gray-700">
    Client Headshot/Logo
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
        <label htmlFor="position" className="block text-sm font-medium text-gray-700">
          Position / Company
        </label>
        <input
          type="text"
          name="position"
          id="position"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>
      <div>
        <label htmlFor="review" className="block text-sm font-medium text-gray-700">
          Review
        </label>
        <textarea
          name="review"
          id="review"
          rows={5}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        ></textarea>
      </div>
      <div>
        <SubmitButton>Add Testimonial</SubmitButton>
      </div>
    </form>
  );
}