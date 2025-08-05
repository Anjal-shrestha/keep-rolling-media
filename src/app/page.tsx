import AboutSection from '@/components/AboutSection';
import HeroSection from '@/components/HeroSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import connectDB from '@/lib/mongodb';
import Client from '@/models/Client';
import Image from 'next/image';


export default async function HomePage() {
  await connectDB();
  const clients = await Client.find({}).sort({ createdAt: 'desc' }).limit(12);

  return (
    <>
      <HeroSection/>

   <section className="bg-white py-12"> {/* Adjusted padding here */}
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
            Trusted By Leading Brands
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
            {JSON.parse(JSON.stringify(clients)).map((client: any) => (
              <div key={client._id} className="flex justify-center grayscale hover:grayscale-0 transition duration-300">
                <Image
                  src={client.logoUrl}
                  alt={client.name}
                  title={client.name}
                  width={140} // Slightly reduced width
                  height={70} // Slightly reduced height
                  style={{ objectFit: 'contain' }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    <AboutSection />
    <TestimonialsSection />
    </>
  );
}