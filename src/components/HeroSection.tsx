'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

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
              Nepal's Premier Vehicle Branding Experts
            </span>
          </h1>

          {/* Subheadline */}
          <p
            className="mt-4 text-lg md:text-xl max-w-3xl mx-auto text-gray-600 leading-relaxed animate-fade-in-down"
            style={{ animationDelay: '0.3s' }}
          >
            Make your brand move, stand out, and stay remembered — on wheels, on streets, and in minds.
          </p>

          {/* CTA Button with Sticker Effect */}
          <div
            className="mt-10 animate-fade-in-up relative inline-block"
            style={{ animationDelay: '0.6s' }}
          >
            <motion.div
              className="relative"
              whileHover={{ 
                rotate: [0, -2, 2, -2, 0],
                y: [0, -5, 0],
                transition: { duration: 0.5 }
              }}
            >
              {/* Sticker main body */}
              <Link
                href="/contact"
                className="relative z-10 inline-block bg-gray-900 text-white px-8 py-4 rounded-full text-lg font-semibold border-2 border-transparent hover:bg-white hover:text-gray-900 hover:border-gray-900 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                🚌 Start Your Campaign
              </Link>
              
              {/* Peeling corner effect */}
              <div className="absolute -top-2 -right-2 z-0 w-12 h-12">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <path 
                    d="M0,0 L100,0 L100,100 Z" 
                    fill="rgba(0,0,0,0.1)" 
                    className="transition-all duration-300 group-hover:opacity-70"
                  />
                </svg>
              </div>
              
              {/* Fold shadow */}
              <div className="absolute -top-1 -right-1 z-0 w-8 h-8 bg-gradient-to-br from-transparent to-gray-700 opacity-20 rounded-tr-full"></div>
            </motion.div>
          </div>

          {/* Stats with Sticker-like Tags */}
          <div
            className="mt-16 flex flex-wrap justify-center gap-x-8 gap-y-4 animate-fade-in-up"
            style={{ animationDelay: '0.8s' }}
          >
            {/* Sticker-like stat items */}
            <motion.div 
              className="relative bg-white px-4 py-2 rounded-md shadow-sm border border-gray-200"
              whileHover={{ y: -3 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <span className="font-medium text-gray-700">✅ 70+ Successful Campaigns</span>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full opacity-80"></div>
            </motion.div>
            
            <motion.div 
              className="relative bg-white px-4 py-2 rounded-md shadow-sm border border-gray-200"
              whileHover={{ y: -3 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <span className="flex items-center text-gray-700">
                🚍 <span className="ml-1"><strong>500+</strong> Vehicles Branded</span>
              </span>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full opacity-80"></div>
            </motion.div>
            
            <motion.div 
              className="relative bg-white px-4 py-2 rounded-md shadow-sm border border-gray-200"
              whileHover={{ y: -3 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <span className="font-medium text-gray-700">💼 Trusted by top brands & startups</span>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full opacity-80"></div>
            </motion.div>
          </div>

          <div className="absolute -left-20 top-1/4 w-40 h-40 opacity-10 rotate-12 hidden md:block">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path fill="#FF0066" d="M45.7,-59.2C58.4,-48.6,67.1,-32.9,69.1,-16.4C71.1,0.2,66.4,17.6,55.6,30.3C44.8,43,27.9,51.1,9.9,57.3C-8.1,63.5,-27.2,67.8,-40.9,59.5C-54.6,51.2,-62.9,30.3,-65.2,9.3C-67.5,-11.7,-63.8,-32.8,-52.2,-45.2C-40.6,-57.6,-21.3,-61.3,-2.3,-59.5C16.7,-57.7,33.3,-50.4,45.7,-59.2Z" transform="translate(100 100)" />
            </svg>
          </div>
          <div className="absolute -right-20 bottom-1/4 w-40 h-40 opacity-10 -rotate-12 hidden md:block">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path fill="#00CC88" d="M49.9,-56.2C63.3,-45.8,71.5,-28.9,72.9,-11.8C74.3,5.3,68.8,22.6,57.2,35.3C45.6,48,27.8,56.1,9.4,62.2C-9,68.3,-27.9,72.4,-41.3,64.7C-54.7,57,-62.5,37.5,-65.2,17.8C-67.9,-1.9,-65.5,-21.8,-55.2,-35.1C-44.9,-48.3,-26.7,-54.9,-7.6,-50.1C11.5,-45.3,23,-29.1,49.9,-56.2Z" transform="translate(100 100)" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}