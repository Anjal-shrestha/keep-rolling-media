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
  const clients = await Client.find({}).sort({ createdAt: 'desc' }).limit(12);

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            Proudly Partnered With Leading Brands Across Nepal
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            From mass transit fleets to targeted local runs, our projects span multiple industries and cities - delivering consistent brand visibility and engagement.
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

        {/* Client Logos */}
        {clients.length > 0 && (
          <div className="mt-16">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
              {JSON.parse(JSON.stringify(clients)).map((client: ClientType) => (
                <div 
                  key={client._id} 
                  className="flex justify-center opacity-60 hover:opacity-100 transition-opacity duration-300"
                >
                  <Image
                    src={client.logoUrl}
                    alt={client.name}
                    title={client.name}
                    width={140}
                    height={70}
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}