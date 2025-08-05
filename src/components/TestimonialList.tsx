import connectDB from '@/lib/mongodb';
import Testimonial from '@/models/Testimonial';
import DeleteTestimonialButton from './DeleteTestimonialButton';
import Image from 'next/image';

// Define a type for the plain testimonial object
type TestimonialType = {
  _id: string;
  name: string;
  position: string;
  review: string;
  imageUrl: string;
};

export default async function TestimonialList() {
  await connectDB();
  const testimonials = await Testimonial.find({}).sort({ createdAt: -1 });

  return (
    <div className="space-y-4">
      {JSON.parse(JSON.stringify(testimonials)).map((testimonial: TestimonialType) => (
        <div key={testimonial._id} className="bg-gray-50 p-4 rounded-md border flex items-start gap-4">
          <Image
            src={testimonial.imageUrl}
            alt={testimonial.name}
            width={60}
            height={60}
            className="rounded-full object-cover"
          />
          <div className="flex-1">
            <p className="font-bold">{testimonial.name}</p>
            <p className="text-sm text-gray-600">{testimonial.position}</p>
            <blockquote className="mt-2 text-gray-800 italic">{`"${testimonial.review}"`}</blockquote>
          </div>
          <DeleteTestimonialButton testimonialId={testimonial._id} />
        </div>
      ))}
    </div>
  );
}