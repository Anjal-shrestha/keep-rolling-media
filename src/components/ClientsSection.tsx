import connectDB from '@/lib/mongodb';
import Client from '@/models/Client';
import Image from 'next/image';

type ClientType = {
  _id: string;
  name: string;
  logoUrl: string;
};

export default async function ClientsSection() {
  await connectDB();
 
  const clients: ClientType[] = await Client.find({}).sort({ createdAt: 'desc' }).limit(20);

  if (clients.length === 0) {
    return null;
  }

  const extendedClients = [...clients, ...clients];

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            Proudly Partnered With Leading Brands Across Nepal
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            From mass transit fleets to targeted local runs, our projects span multiple industries and cities — delivering consistent brand visibility and engagement.
          </p>
        </div>

        {/* Key Accomplishments */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="text-4xl font-extrabold text-red-600">70+</p>
            <p className="mt-2 font-semibold text-gray-700">Campaigns Launched</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="text-4xl font-extrabold text-red-600">500+</p>
            <p className="mt-2 font-semibold text-gray-700">Vehicles Branded</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="text-4xl font-extrabold text-red-600">15+</p>
            <p className="mt-2 font-semibold text-gray-700">Cities Covered</p>
          </div>
        </div>

        {/* Infinite Logo Scroller */}
        <div className="mt-16 w-full overflow-hidden">
          <div className="flex w-max animate-scroll-x hover:pause">
            {extendedClients.map((client, index) => (
              <div key={`${client._id}-${index}`} className="flex-shrink-0 w-48 h-24 flex items-center justify-center mx-2">
                <Image
                  src={client.logoUrl}
                  alt={client.name}
                  title={client.name}
                  width={140}
                  height={70}
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}