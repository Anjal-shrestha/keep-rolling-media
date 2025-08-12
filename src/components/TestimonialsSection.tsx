import connectDB from '@/lib/mongodb';
import Testimonial from '@/models/Testimonial';
import TestimonialCarousel from './TestimonialCarousel'; // Import the new client component

export default async function TestimonialsSection() {
  await connectDB();
  // Fetch exactly 3 testimonials for the carousel
  const testimonials = await Testimonial.find({}).sort({ createdAt: -1 }).limit(3);

  if (testimonials.length === 0) {
    return null;
  }

  // Pass the fetched data as a prop to the client component
  const plainTestimonials = JSON.parse(JSON.stringify(testimonials));

  return (
    <section className="bg-white py-6">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          What Our Clients Say
        </h2>
        <TestimonialCarousel testimonials={plainTestimonials} />
      </div>
    </section>
  );
}