import Link from 'next/link';
import Image from 'next/image';

const FacebookIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.012-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.345 2.525c.636-.247 1.363-.416 2.427-.465C9.792 2.013 10.146 2 12.573 2h.001zm-.001 2.163c-2.403 0-2.73.01-3.685.052-1.258.056-2.01.248-2.72.524-.784.302-1.447.72-2.07 1.344s-.972 1.25-1.344 2.07c-.276.71-.468 1.462-.524 2.72-.042 1.023-.052 1.32-.052 3.685s.01 2.662.052 3.685c.056 1.258.248 2.01.524 2.72.302.784.72 1.447 1.344 2.07s1.25.972 2.07 1.344c.71.276 1.462.468 2.72.524 1.023.042 1.32.052 3.685.052s2.662-.01 3.685-.052c1.258-.056 2.01-.248 2.72-.524.784-.302 1.447-.72 2.07-1.344s.972-1.25 1.344-2.07c.276-.71.468-1.462.524-2.72.042-1.023.052-1.32.052-3.685s-.01-2.662-.052-3.685c-.056-1.258-.248-2.01-.524-2.72-.302-.784-.72-1.447-1.344-2.07s-1.25-.972-2.07-1.344c-.71-.276-1.462-.468-2.72-.524C15.334 4.173 15.037 4.163 12.573 4.163zm0 1.562a4.402 4.402 0 100 8.804 4.402 4.402 0 000-8.804zm0 6.441a2.039 2.039 0 110-4.078 2.039 2.039 0 010 4.078z" clipRule="evenodd" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-6 pt-12 pb-3">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Column 1: Logo and Company Info */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Link href="/">
              <Image src="/logo.png" alt="Keep Rolling Media" width={180} height={45} />
            </Link>
            <p className="mt-4 text-gray-600 text-sm">
              Nepal’s Premier Vehicle Branding Experts. Taking brands to places since 2015.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="https://www.facebook.com/keeprollingmedia" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-red-600 transition-colors">
                <FacebookIcon />
              </a>
              <a href="https://www.instagram.com/keeprollingmedia/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-red-600 transition-colors">
                <InstagramIcon />
              </a>
            </div>
          </div>

          {/* Column 2: Contact Details */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Get in Touch</h3>
            <p className="mb-2 text-gray-700"><strong>📍 Location:</strong> Tinkune, Kathmandu</p>
            <p className="mb-2 text-gray-700"><strong>📞 Phone:</strong> 01-4111974</p>
            <p className="text-gray-700"><strong>📧 Email:</strong> marketing@keeprollmedia.com.np</p>
          </div>

          {/* Column 3: Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul>
              <li className="mb-2"><Link href="/about" className="text-gray-700 hover:text-red-600">About Us</Link></li>
              <li className="mb-2"><Link href="/services" className="text-gray-700 hover:text-red-600">Services</Link></li>
              <li className="mb-2"><Link href="/our-work" className="text-gray-700 hover:text-red-600">Our Work</Link></li>
              <li className="mb-2"><Link href="/contact" className="text-gray-700 hover:text-red-600">Contact</Link></li>
            </ul>
          </div>

          {/* Column 4: Google Map */}
          <div>
             <h3 className="text-lg font-semibold text-gray-900 mb-4">Our Location</h3>
            <div className="overflow-hidden rounded-lg shadow-md h-48">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.789129528242!2d85.3411217150529!3d27.69290898279815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb199a06c47941%3A0x3569abb11a2f3a3c!2sTinkune%2C%20Kathmandu%2044600%2C%20Nepal!5e0!3m2!1sen!2sus!4v1628784153585!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Copyright and Credit */}
        <div className="mt-4 border-t border-gray-200 pt-4 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Keep Rolling Media Pvt. Ltd. All Rights Reserved.</p>
          <p className="mt-2">
            Powered by <a href="https://geckoworks.com.np" target="_blank" rel="noopener noreferrer" className="font-semibold" style={{ color: '#39ff14' }}>Gecko Works Nepal</a>
          </p>
        </div>
      </div>
    </footer>
  );
}