import Link from 'next/link';
import Image from 'next/image';

const SocialIcon = ({ children, href }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-gray-500 hover:text-red-600 transition-colors duration-300 p-2 rounded-full hover:bg-gray-100"
  >
    {children}
  </a>
);

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-6 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

          {/* Column 1: Logo and Company Info */}
          <div className="flex flex-col items-center md:items-start">
            <Link href="/" className="mb-4">
              <div className="relative h-12 w-48">
                <Image 
                  src="/logo.png" 
                  alt="Keep Rolling Media" 
                  fill
                  className="object-contain object-left h-46"
                />
              </div>
            </Link>
            <p className="mt-2 text-gray-600 text-sm leading-relaxed">
              Nepal's Premier Vehicle Branding Experts. Taking brands to places since 2015.
            </p>
            <div className="flex space-x-2 mt-6">
              <SocialIcon href="https://www.facebook.com/keeprollingmedia">
                <svg className="w-8 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </SocialIcon>
              <SocialIcon href="https://www.instagram.com/keeprollingmedia/">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </SocialIcon>
            </div>
          </div>

          {/* Column 2: Contact Details */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-gray-500 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-gray-600">Tinkune, Kathmandu</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-gray-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-gray-600">01-4111974</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-gray-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-gray-600">marketing@keeprollmedia.com.np</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-red-600 transition-colors duration-300 flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-600 hover:text-red-600 transition-colors duration-300 flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Services
                </Link>
              </li>
              <li>
                <Link href="/our-work" className="text-gray-600 hover:text-red-600 transition-colors duration-300 flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  Our Work
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-red-600 transition-colors duration-300 flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Google Map */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Our Location</h3>
            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-sm border border-gray-200">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3533.0091338408943!2d85.34329957535708!3d27.68611257619466!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19dabb902011%3A0xbf5cf79599640b74!2sKeep%20Rolling%20Media!5e0!3m2!1sen!2snp!4v1754980798757!5m2!1sen!2snp"
                width="100%"
                height="100%"
                style={{ minHeight: '200px' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="border-0"
              ></iframe>
            </div>
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
              className="font-medium text-green-600 hover:text-red-600 transition-colors duration-300"
            >
              Gecko Works Nepal
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}