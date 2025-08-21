import connectDB from '@/lib/mongodb';
import GalleryImage from '@/models/GalleryImage';
import Image from 'next/image';

interface PlainImageType {
  _id: { toString(): string };
  imageUrl: string;
}

export default async function GalleryPage() {
  await connectDB();
  // Fetch and prepare the images in a type-safe way
  const images: PlainImageType[] = await GalleryImage.find({})
    .sort({ createdAt: -1 })
    .lean<PlainImageType[]>();

  return (
    <div className="bg-white">
      {/* Header Section */}
      <section className="bg-gray-50 py-16 text-center">
        <div className="container mx-auto px-6 animate-fade-in-down">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">Our Gallery</h1>
          <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            A showcase of our best work and successful campaigns from across Nepal.
          </p>
        </div>
      </section>

      {/* --- CORRECTED AND SIMPLIFIED IMAGE GRID --- */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div key={image._id.toString()} className="group relative aspect-square rounded-lg overflow-hidden shadow-lg">
              <Image
                src={image.imageUrl}
                alt={`Gallery image ${index + 1}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw, 25vw"
                className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                priority={index < 8}
              />
              {/* This overlay is now fully transparent by default and only gets a color on hover */}
              <div className="absolute inset-0 bg-transparent group-hover:bg-black/50 transition-colors duration-300"></div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}