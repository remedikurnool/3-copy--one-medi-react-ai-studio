'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  wrapperClassName?: string;
  wrapperStyle?: React.CSSProperties;
}

export const LazyImage: React.FC<LazyImageProps> = ({ src, alt, className, wrapperClassName, wrapperStyle, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imgSrc, setImgSrc] = useState(src || '');

  return (
    <div className={`relative overflow-hidden ${wrapperClassName}`} style={wrapperStyle}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse z-10" />
      )}
      <Image
        src={imgSrc || 'https://placehold.co/600x400/e2e8f0/64748b?text=Image+Not+Found'}
        alt={alt || ''}
        fill
        unoptimized
        onLoad={() => setIsLoaded(true)}
        onError={() => setImgSrc('https://placehold.co/600x400/e2e8f0/64748b?text=Image+Not+Found')}
        className={`transition-opacity duration-500 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
        {...props as any}
      />
    </div>
  );
};
