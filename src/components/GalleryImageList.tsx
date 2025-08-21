import connectDB from '@/lib/mongodb';
import GalleryImage from '@/models/GalleryImage';
import DeleteGalleryImageButton from '@/components/DeleteGalleryImageButton';
import Image from 'next/image';

type PlainImageType = {
  _id: string;
  imageUrl: string;
};

export default async function GalleryImageList() {
  await connectDB();
  const images = await GalleryImage.find({}).sort({ createdAt: -1 });

  const plainImages: PlainImageType[] = images.map(img => ({
    _id: img._id.toString(),
    imageUrl: img.imageUrl,
  }));

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
        {plainImages.map((image) => (
          <div key={image._id} className="group relative aspect-square border rounded-md overflow-hidden">
            <Image
              src={image.imageUrl}
              alt={`Uploaded gallery image ${image._id}`}
              fill
              sizes="(max-width: 768px) 50vw, 33vw, 25vw"
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
            {/* --- FIX IS HERE --- */}
            {/* We only add bg-black on group-hover, so it's fully transparent by default */}
         <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[rgba(0,0,0,0.5)] transition-opacity duration-300 flex items-start justify-end p-2">
        <DeleteGalleryImageButton imageId={image._id} />
      </div>
          </div>
        ))}
      </div>
    </div>
  );
}