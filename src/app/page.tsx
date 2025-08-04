export default function HomePage() {
  return (
    <div className="container mx-auto px-6 py-16 text-center">
      <h1 className="text-5xl font-extrabold text-gray-900">
        Keep Rolling Media
      </h1>
      <p className="mt-4 text-xl text-gray-600">
        Taking brands to places
      </p>
      <div className="mt-8">
        <a href="/contact" className="bg-red-600 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-red-700">
          Get a Quote
        </a>
      </div>
    </div>
  );
}