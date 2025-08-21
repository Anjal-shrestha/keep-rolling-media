import connectDB from '@/lib/mongodb';
import GalleryImage from '@/models/GalleryImage';
import Image from 'next/image';
import Link from 'next/link';

// --- FIX IS HERE: Define a type for our plain image object ---
interface FeaturedImageType {
  _id: {
    toString(): string;
  };
  imageUrl: string;
}

export default async function FeaturedGallery() {
  await connectDB();
  
  // Tell TypeScript what kind of data to expect from the query
  const featuredImages = await GalleryImage.find({})
    .sort({ createdAt: -1 })
    .limit(4)
    .lean<FeaturedImageType[]>(); // Use the new type here

  if (featuredImages.length === 0) {
    return null;
  }

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
          Fresh Off the Streets
        </h2>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          A glimpse of our latest vehicle branding projects in action across Nepal.
        </p>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {featuredImages.map((image, index) => (
            <div
              // Now TypeScript knows image._id is safe to use
              key={image._id.toString()}
              className="group relative h-72 rounded-lg overflow-hidden shadow-lg transform hover:-translate-y-2 transition-transform duration-300"
            >
              <Image
                src={image.imageUrl}
                alt={`Featured gallery image ${index + 1}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <Link
            href="/gallery"
            className="group bg-red-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-red-700 transition-transform duration-300 hover:scale-105"
          >
            View Full Gallery
          </Link>
        </div>
      </div>
    </section>
  );
}