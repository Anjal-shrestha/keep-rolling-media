import GalleryForm from '@/components/GalleryForm';
import GalleryImageList from '@/components/GalleryImageList';
import { Suspense } from 'react';

export default function ManageGalleryPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Manage Gallery</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <GalleryForm />
        </div>
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Uploaded Images</h2>
          <Suspense fallback={<p>Loading images...</p>}>
            <GalleryImageList />
          </Suspense>
        </div>
      </div>
    </div>
  );
}