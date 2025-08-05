'use client';

import { useEffect, useState } from 'react';

export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);

  // Trigger animations after mount
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section
      className="relative bg-gradient-to-br from-white via-red-50 to-white overflow-hidden"
      aria-labelledby="hero-title"
    >
      {/* Optional subtle background pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d92626' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Floating decoration (optional) */}
      <div className="absolute top-1/4 right-10 w-24 h-24 bg-red-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-1/4 left-10 w-32 h-32 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-25 animate-pulse delay-1000"></div>

      <div className="container mx-auto px-6 py-24 md:py-32 relative z-10">
        <div
          className={`text-center transform transition-all duration-1000 ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          {/* Main Title with Split Animation */}
          <h1
            id="hero-title"
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight mb-6"
          >
            <span className="block">
              We Don't Just Wrap Buses.
            </span>
            <span className="bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
              We Mobilize Brands.
            </span>
          </h1>

          {/* Tagline */}
          <p
            className="mt-6 text-lg md:text-xl max-w-2xl mx-auto text-gray-600 leading-relaxed animate-fade-in-up"
            style={{ animationDelay: '0.5s' }}
          >
            Taking brands on the move for over 9 years. High-impact, mobile advertising that captures attention and delivers real results — wherever the road leads.
          </p>

          {/* CTA Buttons */}
          <div
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in-up"
            style={{ animationDelay: '0.8s' }}
          >
            <a
              href="/contact"
              className="group bg-red-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-red-700 focus:ring-4 focus:ring-red-300 transition-all duration-300 hover:scale-105 hover:shadow-xl transform focus:outline-none focus:ring-offset-2"
            >
              Get a Free Quote
              <span className="ml-2 group-hover:translate-x-1 inline-block transition-transform">
                →
              </span>
            </a>

            <a
              href="/portfolio"
              className="px-8 py-4 rounded-full text-lg font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 focus:ring-4 focus:ring-gray-200 transition-all duration-300 hover:shadow-md"
            >
              View Our Work
            </a>
          </div>

          {/* Trust Badge or Stats */}
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm md:text-base text-gray-500">
            <span className="flex items-center">
              🚍 <span className="ml-1"><strong>500+</strong> Buses Wrapped</span>
            </span>
            <span className="flex items-center">
              🌆 <span className="ml-1"><strong>15+</strong> Cities Covered</span>
            </span>
            <span className="flex items-center">
              ⭐ <span className="ml-1"><strong>9-Year</strong> Track Record</span>
            </span>
          </div>
        </div>
      </div>

     
    </section>
  );
}