import Image from 'next/image';
import Link from 'next/link';

const services = [
  {
    name: 'Public Buses',
    image: '/service-bus.png', // Replace with your actual image path
  },
  {
    name: 'Taxis',
    image: '/service-taxi.png', // Replace with your actual image path
  },
  {
    name: 'Auto Rickshaws',
    image: '/service-tempo.png', // Replace with your actual image path
  },
  {
    name: 'Boats',
    image: '/service-boat.png', // Replace with your actual image path
  },
];

export default function ServicesSection() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            Vehicle Branding Solutions Tailored to Nepal’s Streets
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            From concept to execution, we manage everything in-house-ensuring high-quality, consistent, and striking campaigns.
          </p>
        </div>

        {/* Photo Card Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <div key={service.name} className="group relative rounded-lg overflow-hidden shadow-lg transform hover:-translate-y-2 transition-transform duration-300">
              <Image
                src={service.image}
                alt={`Branding on a ${service.name}`}
                width={400}
                height={500}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-2xl font-bold text-white">{service.name}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Link to Full Services Page */}
        <div className="mt-12 text-center">
          <Link
            href="/services"
            className="group text-red-600 font-semibold inline-flex items-center"
          >
            See All Our Services in Detail
            <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}