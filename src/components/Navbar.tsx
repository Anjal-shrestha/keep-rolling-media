'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg' : 'bg-white shadow-md'}`}
    >
      <nav className="container mx-auto px-6 flex justify-between items-center transition-all duration-300" style={{ height: isScrolled ? '60px' : '80px' }}>
        {/* Logo container */}
        <Link href="/" className="h-full flex items-center">
          <Image 
            src="/logo.png" 
            alt="Keep Rolling Media" 
            width={180} // Slightly adjusted width for better proportion
            height={45} 
            style={{ objectFit: 'contain' }}
            priority // Prioritize loading the logo
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/" className="text-gray-700 font-medium hover:text-red-600 transition-colors duration-300">Home</Link>
          <Link href="/about" className="text-gray-700 font-medium hover:text-red-600 transition-colors duration-300">About Us</Link>
          <Link href="/our-work" className="text-gray-700 font-medium hover:text-red-600 transition-colors duration-300">Our Work</Link>
          <Link href="/blog" className="text-gray-700 font-medium hover:text-red-600 transition-colors duration-300">Blog</Link>
          <Link href="/contact" className="bg-red-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-red-700 transition-transform duration-300 hover:scale-105">Contact Us</Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-800 focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} bg-white shadow-lg`}>
        <div className="px-2 pt-2 pb-4 space-y-2">
          <Link href="/" className="block px-4 py-2 text-gray-700 font-medium hover:bg-gray-100 rounded">Home</Link>
          <Link href="/about" className="block px-4 py-2 text-gray-700 font-medium hover:bg-gray-100 rounded">About Us</Link>
          <Link href="/our-work" className="block px-4 py-2 text-gray-700 font-medium hover:bg-gray-100 rounded">Our Work</Link>
          <Link href="/blog" className="block px-4 py-2 text-gray-700 font-medium hover:bg-gray-100 rounded">Blog</Link>
          <Link href="/contact" className="block px-4 py-2 text-gray-700 font-medium hover:bg-gray-100 rounded">Contact Us</Link>
        </div>
      </div>
    </header>
  );
}