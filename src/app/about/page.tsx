import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Header Section */}
      <div className="relative h-72 bg-gray-800 flex items-center justify-center">
        <Image
          src="/hero-background.jpg" // Replace with a relevant, high-quality image
          alt="Bus advertising campaign"
          layout="fill"
          objectFit="cover"
          className="opacity-20"
        />
        <div className="relative z-10 text-center">
          <h1 className="text-5xl font-extrabold text-white">About Us</h1>
          <p className="text-xl text-gray-300 mt-2">The Story Behind the Movement</p>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Our Mission */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Our mission is simple: to provide the most effective and visually stunning mobile advertising solutions in Nepal. We aim to be more than just a vendor; we strive to be a strategic partner in your brand's growth. By placing your message directly in the public eye, we create widespread brand recognition and drive tangible results, ensuring your marketing budget is an investment, not an expense.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mb-4 mt-12">Our Values</h2>
            <div className="space-y-4">
              <p><strong>Quality First:</strong> From premium, weather-resistant materials to meticulous installation, we never compromise on quality.</p>
              <p><strong>Client Partnership:</strong> Your success is our success. We work closely with you from concept to completion to ensure your vision comes to life.</p>
              <p><strong>Innovation:</strong> We stay ahead of industry trends to offer creative solutions that make your brand stand out from the crowd.</p>
            </div>
          </div>

          {/* Key Stats */}
          <div className="bg-gray-50 p-8 rounded-lg">
            <h3 className="text-2xl font-bold mb-6 text-center">By the Numbers</h3>
            <div className="space-y-6 text-center">
              <div>
                <p className="text-4xl font-extrabold text-red-600">9+</p>
                <p className="text-gray-700 font-medium">Years in Business</p>
              </div>
              <div>
                <p className="text-4xl font-extrabold text-red-600">500+</p>
                <p className="text-gray-700 font-medium">Buses Wrapped</p>
              </div>
              <div>
                <p className="text-4xl font-extrabold text-red-600">100+</p>
                <p className="text-gray-700 font-medium">Happy Clients</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}