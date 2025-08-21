import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Header Section */}
      <section className="relative py-20 md:py-28 bg-gray-900 text-white text-center">
        <div className="absolute inset-0">
          <Image
            src="/about_usbg.png" // Make sure you have this image in /public
            alt="Bus advertising campaign in motion"
            layout="fill"
            objectFit="cover"
            className="opacity-20"
            priority
          />
        </div>
        <div className="container mx-auto px-6 relative z-10 animate-fade-in-down">
          <h1 className="text-4xl md:text-6xl font-extrabold">Keep Rolling Media Pvt. Ltd.</h1>
          <p className="mt-4 text-xl md:text-2xl text-gray-300">Where Brands Keep Moving</p>
        </div>
      </section>

      {/* Main Content Section */}
       <section className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Nepal&apos;s First Dedicated Vehicle Branding Agency</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            We’re Nepal&apos;s first dedicated vehicle branding agency, transforming public transport into powerful mobile billboards. From city buses to auto-rickshaws and even boats, we help your message go further and get seen by thousands every day.
          </p>
          <div className="mt-8 text-xl font-medium text-gray-700 border-l-4 border-red-600 pl-6 italic">
            “We’re not just a media company-we’re creative enablers on wheels.”
          </div>
        </div>
      </section>

      {/* What Drives Us Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">What Drives Us</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Founded in Kathmandu, we started with a simple belief: advertising shouldn’t stand still. We blend creativity, local insight, and bold execution to make sure your brand stays in motion - and top of mind.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 text-center">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-4xl font-extrabold text-red-600">70+</p>
                <p className="mt-2 font-semibold text-gray-700">Campaigns Launched</p>
              </div>
               <div className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-4xl font-extrabold text-red-600">500+</p>
                <p className="mt-2 font-semibold text-gray-700">Vehicles Branded</p>
              </div>
               <div className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-4xl font-extrabold text-red-600">15+</p>
                <p className="mt-2 font-semibold text-gray-700">Cities Covered</p>
              </div>
               <div className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-4xl font-extrabold text-red-600">9+</p>
                <p className="mt-2 font-semibold text-gray-700">Years of Experience</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}