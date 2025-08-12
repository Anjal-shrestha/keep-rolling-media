import Image from 'next/image';
import Link from 'next/link';

// Expanded service details from your client's documentation
const services = [
  {
    name: 'Big Public Buses',
    idealFor: 'City-wide campaigns and maximum visibility.',
    seenOn: 'Major roads, urban routes, highways.',
    formats: 'Full wrap, side panels, rear branding.',
    image: '/service-buscover.png', // Replace with your image
  },
  {
    name: 'Small Public Buses',
    idealFor: 'Local branding with high route repetition.',
    seenOn: 'Local lanes, neighborhoods, market areas.',
    formats: 'Side branding, rear panels, half wrap.',
    image: '/service-small-bus.png', // Replace with your image
  },
  {
    name: 'Taxis',
    idealFor: 'Urban visibility and brand mobility.',
    seenOn: 'Downtown streets, shopping areas, business hubs.',
    formats: 'Door decals, roof branding, full vehicle wrap.',
    image: '/service-taxi.png', // Replace with your image
  },
  {
    name: 'Auto Rickshaws / Tempos',
    idealFor: 'Street-level visibility and local promotions.',
    seenOn: 'Inner city roads, densely populated localities.',
    formats: 'Back panel branding, side ads.',
    image: '/service-tempo.png', // Replace with your image
  },
  {
    name: 'Boats',
    idealFor: 'Tourism and event-based branding.',
    seenOn: 'Lakes, rivers, and waterfront tourist spots.',
    formats: 'Side panels, canopies, custom wraps.',
    image: '/service-boat.png', // Replace with your image
  },
];

export default function ServicesPage() {
  return (
    <div className="bg-white">
      {/* Header Section */}
      <section className="bg-gray-50 py-10 md:py-16 text-center">
        <div className="container mx-auto px-6 animate-fade-in-down">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900">Our Services</h1>
          <p className=" text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            Vehicle Branding Solutions Tailored to Nepal’s Streets
          </p>
        </div>
      </section>

     

      {/* Detailed Services Section */}
      <section className="bg-gray-50 py-10">
        <div className="container mx-auto px-6 space-y-16">
          {services.map((service, index) => (
            <div key={service.name} className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${index % 2 !== 0 ? 'md:grid-flow-col-dense' : ''}`}>
              {/* Image Column */}
              <div className={`relative h-80 rounded-lg overflow-hidden shadow-xl ${index % 2 !== 0 ? 'md:col-start-2' : ''}`}>
                <Image
                  src={service.image}
                  alt={service.name}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              {/* Text Column */}
              <div className="text-center md:text-left">
                <h3 className="text-3xl font-bold text-gray-800">{service.name}</h3>
                <div className="mt-6 space-y-4 text-gray-700">
                    <p><strong>Ideal for:</strong> {service.idealFor}</p>
                    <p><strong>Seen on:</strong> {service.seenOn}</p>
                    <p><strong>Formats:</strong> {service.formats}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
 {/* Why Choose Us Intro Section */}
      <section className="py-16">
          <div className="container mx-auto px-6 text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Vehicle Branding Still Works</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">
                In today’s hyper-competitive market, vehicle branding remains one of the most effective and affordable ways to increase brand visibility, awareness, and recall.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  <div className="bg-white p-6 rounded-lg shadow-md">
                      <p className="text-3xl">🚊</p>
                      <h3 className="font-bold mt-2">Always on the Move</h3>
                      <p className="text-gray-600 text-sm mt-1">Your brand travels across cities, reaching thousands every day.</p>
                  </div>
                   <div className="bg-white p-6 rounded-lg shadow-md">
                      <p className="text-3xl">📈</p>
                      <h3 className="font-bold mt-2">High Visibility, Low Cost</h3>
                      <p className="text-gray-600 text-sm mt-1">Long-lasting exposure at a fraction of the cost of other media.</p>
                  </div>
                   <div className="bg-white p-6 rounded-lg shadow-md">
                      <p className="text-3xl">🔍</p>
                      <h3 className="font-bold mt-2">Unskippable Attention</h3>
                      <p className="text-gray-600 text-sm mt-1">You can’t scroll past a branded bus. It’s bold and in motion.</p>
                  </div>
                   <div className="bg-white p-6 rounded-lg shadow-md">
                      <p className="text-3xl">🔹</p>
                      <h3 className="font-bold mt-2">Local & Mass Campaigns</h3>
                      <p className="text-gray-600 text-sm mt-1">Perfect for targeting local communities or entire cities.</p>
                  </div>
              </div>
          </div>
      </section>
      {/* CTA Section */}
      <section className="bg-white py-16 text-center">
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