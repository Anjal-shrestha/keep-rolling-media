import Link from 'next/link';
import Image from 'next/image';
import React from 'react'; // Import React for type definitions

// Define props for the SocialIcon component for type safety
interface SocialIconProps {
  children: React.ReactNode;
  href: string;
}

const SocialIcon = ({ children, href }: SocialIconProps) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-gray-500 hover:text-red-600 transition-colors duration-300"
  >
    {children}
  </a>
);

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 text-center md:text-left">

          {/* Column 1: Logo and Company Info */}
          <div className="flex flex-col items-center md:items-start">
            <Link href="/" className="mb-4">
              <Image 
                src="/logo.png" 
                alt="Keep Rolling Media" 
                width={180}
                height={45}
                className="object-contain"
              />
            </Link>
            <p className="mt-2 text-gray-600 text-sm leading-relaxed">
              {/* Corrected the apostrophe here */}
              Nepal&apos;s Premier Vehicle Branding Experts. Taking brands to places since 2015.
            </p>
            <div className="flex space-x-4 mt-6">
              <SocialIcon href="https://www.facebook.com/keeprollingmedia">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </SocialIcon>
              <SocialIcon href="https://www.instagram.com/keeprollingmedia/">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </SocialIcon>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-gray-600 hover:text-red-600 transition-colors">About Us</Link></li>
              <li><Link href="/services" className="text-gray-600 hover:text-red-600 transition-colors">Services</Link></li>
              <li><Link href="/our-work" className="text-gray-600 hover:text-red-600 transition-colors">Our Work</Link></li>
              <li><Link href="/contact" className="text-gray-600 hover:text-red-600 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact Details */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="mt-1 mr-3 flex-shrink-0">📍</span>
                <span className="text-gray-600">Tinkune, Kathmandu</span>
              </li>
              <li className="flex items-center">
                <span className="mr-3">📞</span>
                <span className="text-gray-600">01-4111974</span>
              </li>
              <li className="flex items-center">
                <span className="mr-3">📧</span>
                <span className="text-gray-600">marketing@keeprollmedia.com.np</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Call to Action */}
          <div className="bg-gray-100 p-6 rounded-lg text-center md:text-left">
            <h3 className="text-lg font-semibold text-gray-900">Have a project in mind?</h3>
            <p className="mt-2 text-gray-600 text-sm">Let’s take your message off the screen and into the streets.</p>
            <Link href="/contact" className="inline-block mt-4 bg-red-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-red-700 transition-transform duration-300 hover:scale-105 text-sm">
              Get a Free Quote
            </Link>
          </div>
        </div>

        {/* Bottom Bar with Copyright and Credit */}
        <div className="mt-12 pt-6 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-2 md:mb-0">
            © {new Date().getFullYear()} Keep Rolling Media Pvt. Ltd. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm">
            Powered by{' '}
            <a 
              href="https://geckoworks.com.np" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="font-medium hover:text-red-600 transition-colors duration-300"
              style={{ color: '#39ff14' }}
            >
              Gecko Works Nepal
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}