import Image from 'next/image';
import Link from 'next/link';

const services = [
  {
    name: 'Big Public Buses',
    description: 'Ideal for city-wide campaigns and maximum visibility on major roads, urban routes, and highways.',
    image: '/service-bus.jpg', // Replace with your image
  },
  {
    name: 'Small Public Buses',
    description: 'Perfect for local branding with high route repetition in neighborhoods and market areas.',
    image: '/service-small-bus.jpg', // Replace with your image
  },
  {
    name: 'Taxis',
    description: 'Excellent for high-frequency urban visibility in downtown streets and business hubs.',
    image: '/service-taxi.jpg', // Replace with your image
  },
  {
    name: 'Auto Rickshaws',
    description: 'Great for street-level promotions in densely populated inner-city localities.',
    image: '/service-tempo.jpg', // Replace with your image
  },
   {
    name: 'Boats',
    description: 'Unique opportunities for tourism and event-based branding in lakes and waterfront spots.',
    image: '/service-boat.jpg', // Replace with your image
  },
];

export default function ServicesPage() {
  return (
    <div className="bg-white">
      {/* Header Section */}
      <section className="relative py-20 md:py-28 bg-gray-900 text-white text-center">
         <div className="absolute inset-0">
            <Image
                src="/hero-background.jpg"
                alt="Vehicle branding collage"
                layout="fill"
                objectFit="cover"
                className="opacity-20"
            />
        </div>
        <div className="container mx-auto px-6 relative z-10 animate-fade-in-down">
          <h1 className="text-4xl md:text-6xl font-extrabold">Our Services</h1>
          <p className="mt-4 text-xl md:text-2xl text-gray-300">Vehicle Branding Solutions Tailored to Nepal’s Streets</p>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.name} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
              <div className="relative h-64 w-full">
                <Image
                  src={service.image}
                  alt={service.name}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800">{service.name}</h3>
                <p className="text-gray-600 mt-4">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-16 text-center">
          <div className="container mx-auto px-6">
              <h2 className="text-3xl font-bold text-gray-800">Ready to Move Your Brand?</h2>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                Let’s take your message off the screen and into the streets. Contact us today to start your custom vehicle branding campaign.
              </p>
              <div className="mt-8">
                  <Link href="/contact" className="bg-red-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-red-700 transition-transform duration-300 hover:scale-105">
                      Contact Us Today
                  </Link>
              </div>
          </div>
      </section>
    </div>
  );
}