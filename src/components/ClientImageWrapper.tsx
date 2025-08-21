'use client';

import { useState } from 'react';
import Image from 'next/image';

type ClientImageWrapperProps = {
  src: string;
  alt: string;
  index: number;
};

export default function ClientImageWrapper({ src, alt, index }: ClientImageWrapperProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative w-full h-full bg-gray-100 rounded-md overflow-hidden">
      <Image
        src={imgSrc}
        alt={alt}
        fill
        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        className={`object-cover transition-opacity duration-300 group-hover:scale-110 ${
          loading ? 'opacity-0' : 'opacity-100'
        }`}
        // **THE FIX IS HERE:** Replaced 'onLoadingComplete' with 'onLoad'
        onLoad={() => setLoading(false)}
        onError={() => {
          // If the image fails to load, switch to a fallback
          setImgSrc('/fallback.jpg'); 
          setLoading(false);
        }}
        priority={index < 8}
      />
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          {/* Simple loading spinner */}
          <div className="w-6 h-6 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}