import Image from 'next/image';
import Link from 'next/link';

export default function AboutSection() {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Image Section */}
          <div className="relative w-full h-80 rounded-lg overflow-hidden shadow-lg">
            {/* Make sure you have an image named 'about_usbg.png' in your /public folder */}
            <Image
              src="/about_usbg.png"
              alt="Keep Rolling Media team and branded vehicles"
              layout="fill"
              objectFit="cover"
            />
          </div>

          {/* Text Content Section */}
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
              Keep Rolling Media Pvt. Ltd. – Where Brands Keep Moving
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              We’re Nepal&apos;s first dedicated vehicle branding agency, transforming public transport into powerful mobile billboards. We help your message go further and get seen by thousands every day.
            </p>
            <blockquote className="border-l-4 border-red-600 pl-4 italic text-gray-700 font-medium my-6">
              “We’re not just a media company - we’re creative enablers on wheels.”
            </blockquote>
            <Link
              href="/about"
              className="group text-red-600 font-semibold inline-flex items-center"
            >
              Learn More About Us
              <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}