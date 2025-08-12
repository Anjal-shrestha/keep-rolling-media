import TestimonialCarousel from '@/components/TestimonialCarousel';
import TestimonialsSection from '@/components/TestimonialsSection';
import connectDB from '@/lib/mongodb';
import Project from '@/models/Project';
import Image from 'next/image';

export default async function OurWorkPage() {
  await connectDB();
  const projects = await Project.find({}).sort({ createdAt: -1 });

  return (
    <div className="bg-white py-2">
      {/* Header Section */}
      <section className="bg-gray-50 py-5 text-center">
        <div className="container mx-auto px-6 animate-fade-in-down">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">Clients & Projects</h1>
          <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            We’ve proudly partnered with leading brands across Nepal to help them hit the streets with powerful mobile advertising campaigns.
          </p>
        </div>
      </section>

      {/* Accomplishments Section */}
      <section className="py-4">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white p-6 rounded-lg shadow-md border">
              <p className="text-4xl font-extrabold text-red-600">70+</p>
              <p className="mt-2 font-semibold text-gray-700">Campaigns Launched</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border">
              <p className="text-4xl font-extrabold text-red-600">500+</p>
              <p className="mt-2 font-semibold text-gray-700">Vehicles Branded</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border">
              <p className="text-4xl font-extrabold text-red-600">15+</p>
              <p className="mt-2 font-semibold text-gray-700">Cities Covered</p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Table Section */}
      <section className="bg-gray-50 py-8">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">Some of Our Projects</h2>
            <p className="mt-2 text-lg text-gray-600">Bringing brands to the streets — and into the spotlight.</p>
          </div>
          <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicles Branded</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaign Focus</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {JSON.parse(JSON.stringify(projects)).map((project: any) => (
                  <tr key={project._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <Image className="h-10 w-10 rounded-full object-cover" src={project.imageUrl} alt={project.clientName} width={40} height={40} />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{project.clientName}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{project.vehiclesBranded}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{project.campaignFocus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <TestimonialsSection />
    </div>
  );
}