import TestimonialForm from '@/components/TestimonialForm';
import TestimonialList from '@/components/TestimonialList';
import { Suspense } from 'react';

export default function TestimonialsAdminPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Manage Testimonials</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="lg:col-span-1">
          <TestimonialForm />
        </div>

        {/* List Section */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Current Testimonials</h2>
          <Suspense fallback={<p>Loading testimonials...</p>}>
            <TestimonialList />
          </Suspense>
        </div>
      </div>
    </div>
  );
}