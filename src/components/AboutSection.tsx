import Image from 'next/image';
import Link from 'next/link';

export default function AboutSection() {
  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Image Section */}
         

          {/* Text Content Section */}
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
              9 Years of Taking Brands to Places
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Founded with a passion for dynamic advertising, Keep Rolling Media has been the driving force behind hundreds of successful mobile campaigns. We believe that a brand in motion creates an unforgettable impression. Our mission is to transform everyday transit into a powerful and cost-effective marketing platform for your business.
            </p>
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