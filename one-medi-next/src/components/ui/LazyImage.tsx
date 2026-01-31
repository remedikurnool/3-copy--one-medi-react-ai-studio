'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  wrapperClassName?: string;
}

export const LazyImage: React.FC<LazyImageProps> = ({ src, alt, className, wrapperClassName, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden ${wrapperClassName}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse z-10" />
      )}
      <Image
        src={src || ''}
        alt={alt || ''}
        fill
        unoptimized
        onLoadingComplete={() => setIsLoaded(true)}
        className={`transition-opacity duration-500 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
        {...props as any}
      />
    </div>
  );
};
