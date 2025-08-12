import connectDB from '@/lib/mongodb';
import Client from '@/models/Client';
import Image from 'next/image';
import DeleteClientButton from '@/components/DeleteClientButton';
import ClientForm from '@/components/ClientForm'; // 1. Import the new form component
import { Suspense } from 'react';

// A type for our client data
type ClientType = { _id: string; logoUrl: string; name: string; };

// This component will fetch and display the list of clients
async function ClientList() {
  await connectDB();
  const clients = await Client.find({}).sort({ createdAt: -1 });
  const plainClients = JSON.parse(JSON.stringify(clients));

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {plainClients.map((client: ClientType) => (
          <div key={client._id} className="relative p-4 border rounded-md flex flex-col items-center justify-center gap-2">
             <Image
                src={client.logoUrl}
                alt={client.name}
                width={100}
                height={60}
                style={{ objectFit: 'contain' }}
              />
            <p className="text-center text-sm font-medium">{client.name}</p>
            <div className="absolute top-1 right-1">
               <DeleteClientButton clientId={client._id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// The main page component
export default function ClientsAdminPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Form Section */}
      <div className="lg:col-span-1">
        <h1 className="text-3xl font-bold mb-6">Manage Clients</h1>
        <ClientForm /> {/* 2. Use the new ClientForm component */}
      </div>

      {/* List Section */}
      <div className="lg:col-span-2">
         <h2 className="text-2xl font-bold mb-6">Current Clients</h2>
         <Suspense fallback={<p>Loading clients...</p>}>
            <ClientList />
         </Suspense>
      </div>
    </div>
  );
}