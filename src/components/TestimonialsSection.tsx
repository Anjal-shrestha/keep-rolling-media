import connectDB from '@/lib/mongodb';
import Testimonial from '@/models/Testimonial';
import Image from 'next/image';

export default async function TestimonialsSection() {
  await connectDB();
  const testimonials = await Testimonial.find({}).sort({ createdAt: -1 }).limit(3);

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section className="bg-red-50 py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
          What Our Clients Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {JSON.parse(JSON.stringify(testimonials)).map((testimonial: any) => (
            <div key={testimonial._id} className="bg-white p-8 rounded-lg shadow-lg text-center">
              {/* Add this check to ensure imageUrl exists */}
              {testimonial.imageUrl && (
                <Image
                  src={testimonial.imageUrl}
                  alt={testimonial.name}
                  width={80}
                  height={80}
                  className="rounded-full object-cover mx-auto -mt-16 border-4 border-white"
                />
              )}
              <blockquote className="text-gray-600 italic mt-6">
                "{testimonial.review}"
              </blockquote>
              <p className="mt-6 font-bold text-gray-900">{testimonial.name}</p>
              <p className="text-sm text-red-600 font-medium">{testimonial.position}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}