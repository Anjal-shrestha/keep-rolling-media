import connectDB from '@/lib/mongodb';
import GalleryImage, { IGalleryImage } from '@/models/GalleryImage';
import DeleteGalleryImageButton from '@/components/DeleteGalleryImageButton';
import Image from 'next/image';

export default async function GalleryImageList() {
  await connectDB();
  const images: IGalleryImage[] = await GalleryImage.find({}).sort({ createdAt: -1 });

  // Create a clean, properly-typed array to prevent 'unknown' type errors.
  const plainImages = images.map(img => {
    const plainObject = img.toObject();
    return {
      _id: plainObject._id.toString(),
      imageUrl: plainObject.imageUrl,
    };
  });

  if (plainImages.length === 0) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-md border text-center">
        <p className="text-gray-500">No images uploaded yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {plainImages.map((image, index) => (
          <div key={image._id} className="group relative aspect-square border rounded-md overflow-hidden">
            {/* **THE FIX IS HERE:** Using the exact same props as the working public gallery page. */}
            <Image
              src={image.imageUrl}
              alt={`Uploaded gallery image ${index + 1}`}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 flex items-start justify-end p-2">
              <DeleteGalleryImageButton imageId={image._id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}