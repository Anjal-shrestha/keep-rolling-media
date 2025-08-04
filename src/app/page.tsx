import connectDB from '@/lib/mongodb';
import Client from '@/models/Client';
import Image from 'next/image';
import Link from 'next/link'; // Use Link instead of a

export default async function HomePage() {
  await connectDB();
  const clients = await Client.find({}).sort({ createdAt: 'desc' }).limit(12);

  return (
    <>
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-16 text-center">
        <h1 className="text-5xl font-extrabold text-gray-900">
          Keep Rolling Media
        </h1>
        <p className="mt-4 text-xl text-gray-600">
          Taking brands to places
        </p>
        <div className="mt-8">
          <Link href="/contact" className="bg-red-600 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-red-700">
            Get a Quote
          </Link>
        </div>
      </div>

      {/* Clients Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
            Trusted By
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
            {JSON.parse(JSON.stringify(clients)).map((client: any) => (
              <div key={client._id} className="flex justify-center">
                <Image
                  src={client.logoUrl}
                  alt={client.name}
                  title={client.name} // Adds a tooltip on hover
                  width={150}
                  height={80}
                  objectFit="contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}