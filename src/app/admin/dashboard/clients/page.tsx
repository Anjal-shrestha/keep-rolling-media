import connectDB from '@/lib/mongodb';
import Client from '@/models/Client';
import { createClientAction } from '@/app/actions/clientActions';
import Image from 'next/image';
import DeleteClientButton from '@/components/DeleteClientButton';

export default async function ClientsAdminPage() {
  await connectDB();
  const clients = await Client.find({}).sort({ createdAt: -1 });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Form Section */}
      <div className="lg:col-span-1">
        <h1 className="text-3xl font-bold mb-6">Manage Clients</h1>
        <form action={createClientAction} encType="multipart/form-data" className="space-y-6 bg-white p-8 rounded-lg shadow-md">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Client Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="logo" className="block text-sm font-medium text-gray-700">
              Client Logo
            </label>
            <input
              type="file"
              name="logo"
              id="logo"
              required
              accept="image/*"
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Add Client
            </button>
          </div>
        </form>
      </div>

      {/* List Section */}
      <div className="lg:col-span-2">
         <h2 className="text-2xl font-bold mb-6">Current Clients</h2>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {JSON.parse(JSON.stringify(clients)).map((client: any) => (
              <div key={client._id} className="relative p-4 border rounded-md flex flex-col items-center justify-center gap-2">
                 <Image
                    src={client.logoUrl}
                    alt={client.name}
                    width={100}
                    height={60}
                    objectFit="contain"
                  />
                <p className="text-center text-sm font-medium">{client.name}</p>
                <div className="absolute top-1 right-1">
                   <DeleteClientButton clientId={client._id} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}