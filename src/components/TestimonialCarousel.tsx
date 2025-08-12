'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

type TestimonialType = {
  _id: string;
  name: string;
  position: string;
  review: string;
  imageUrl: string;
};

const QuoteIcon = () => (
  <svg className="h-12 w-12 text-red-100" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
    <path d="M9.333 22.583c0-3.417 1.333-6.417 4-9V9.5c-3.583 2.167-5.583 5.417-6 9.75.417-1.083.833-2.083 1.25-3h-.917zm10.334 0c0-3.417 1.333-6.417 4-9V9.5c-3.583 2.167-5.583 5.417-6 9.75.417-1.083.833-2.083 1.25-3h-.917z" />
  </svg>
);

export default function TestimonialCarousel({ testimonials }: { testimonials: TestimonialType[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const slideInterval = setInterval(handleNext, 5000); // Auto-play every 5 seconds
    return () => clearInterval(slideInterval);
  }, []);


  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Main container for the slides */}
      <div className="overflow-hidden rounded-lg bg-gray-50 shadow-lg">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {testimonials.map((testimonial) => (
            <div key={testimonial._id} className="flex-shrink-0 w-full p-8 md:p-12">
               <div className="absolute top-0 right-0 -mt-2 -mr-1 z-0">
                <QuoteIcon />
              </div>
              <div className="relative z-10 flex items-center mb-6">
                {testimonial.imageUrl && (
                  <Image
                    src={testimonial.imageUrl}
                    alt={testimonial.name}
                    width={60}
                    height={60}
                    className="rounded-full object-cover"
                  />
                )}
                <div className="ml-4">
                  <p className="font-bold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-red-600 font-medium">{testimonial.position}</p>
                </div>
              </div>
              <blockquote className="relative z-10 text-gray-600 italic">
                {`"${testimonial.review}"`}
              </blockquote>
            </div>
          ))}
        </div>
      </div>

      {/* Previous Button */}
      <button
        onClick={handlePrev}
        className="absolute top-1/2 -left-4 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition"
        aria-label="Previous testimonial"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Next Button */}
      <button
        onClick={handleNext}
        className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition"
        aria-label="Next testimonial"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}