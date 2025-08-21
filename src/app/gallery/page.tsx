import connectDB from '@/lib/mongodb';
import GalleryImage, { IGalleryImage } from '@/models/GalleryImage';
import Image from 'next/image';

export default async function GalleryPage() {
  await connectDB();
  const images: IGalleryImage[] = await GalleryImage.find({}).sort({ createdAt: -1 });

  // **THE FIX IS HERE:**
  // Create a clean, properly-typed array of images first.
  const plainImages = images.map(image => {
    const plainObject = image.toObject();
    return {
      _id: plainObject._id.toString(),
      imageUrl: plainObject.imageUrl,
    };
  });

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

      {/* Image Grid Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* Now we map over our clean, pre-prepared array */}
          {plainImages.map((image, index) => (
            <div key={image._id} className="group relative h-80 rounded-lg overflow-hidden shadow-lg">
              <Image
                src={image.imageUrl}
                alt={`Gallery image ${index + 1}`}
                layout="fill"
                objectFit="cover"
                className="transform group-hover:scale-110 transition-transform duration-500"
                priority={index < 8}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}