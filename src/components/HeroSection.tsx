'use client';

import Link from 'next/link';

export default function HeroSection() {
  return (
    <section
      className="relative bg-gradient-to-br from-white via-red-50 to-white overflow-hidden"
      aria-labelledby="hero-title"
    >
      {/* Subtle background dot pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d92626' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 container mx-auto px-6 pt-10 pb-20 md:pt-12 md:pb-24">

        <div className="max-w-4xl mx-auto text-center">
          {/* Main Heading */}
          <h1
            id="hero-title"
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight mb-6 animate-fade-in-down"
          >
            <span className="block text-gray-900">
              Think Outside the Bus!
            </span>
            <span className="block bg-gradient-to-r from-red-600 to-gray-800 bg-clip-text text-transparent mt-3">
              Nepal’s Premier Vehicle Branding Experts
            </span>
          </h1>

          {/* Subheadline */}
          <p
            className="mt-4 text-lg md:text-xl max-w-3xl mx-auto text-gray-600 leading-relaxed animate-fade-in-down"
            style={{ animationDelay: '0.3s' }}
          >
            Make your brand move, stand out, and stay remembered — on wheels, on streets, and in minds.
          </p>

          {/* CTA Button */}
          <div
            className="mt-10 animate-fade-in-up"
            style={{ animationDelay: '0.6s' }}
          >
             <Link
            href="/contact"
            className="bg-gray-900 text-white px-8 py-4 rounded-full text-lg font-semibold border-2 border-transparent hover:bg-white hover:text-gray-900 hover:border-gray-900 transition-all duration-300 transform hover:scale-105"
          >
            🚌 Start Your Campaign
          </Link>
          </div>

          {/* Stats / Social Proof */}
          <div
            className="mt-16 flex flex-wrap justify-center gap-x-8 gap-y-4 text-gray-600 text-base animate-fade-in-up"
            style={{ animationDelay: '0.8s' }}
          >
            <span className="font-medium">✅ 70+ Successful Campaigns</span>
            <span className="flex items-center">
              🚍 <span className="ml-1"><strong>500+</strong> Vehicles  Branded</span>
            </span>
            <span className="font-medium">💼 Trusted by top brands & startups</span>
          </div>
        </div>
      </div>
    </section>
  );
}
