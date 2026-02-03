'use client';

import React, { useState } from 'react';
import Image from 'next/image';

import { ImageProps } from 'next/image';

interface LazyImageProps extends Omit<ImageProps, 'onLoad' | 'onError'> {
  wrapperClassName?: string;
  wrapperStyle?: React.CSSProperties;
}

export const LazyImage: React.FC<LazyImageProps> = ({ src, alt, className, wrapperClassName, wrapperStyle, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imgSrc, setImgSrc] = useState(src || '');

  // Handle src updates
  React.useEffect(() => {
    setImgSrc(src || '');
  }, [src]);

  return (
    <div className={`relative overflow-hidden w-full h-full ${wrapperClassName}`} style={wrapperStyle}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-slate-100 dark:bg-slate-700 animate-pulse z-10" />
      )}
      <Image
        src={imgSrc || 'https://placehold.co/600x400/e2e8f0/64748b?text=No+Image'}
        alt={alt || ''}
        onLoad={() => setIsLoaded(true)}
        onError={() => setImgSrc('https://placehold.co/600x400/e2e8f0/64748b?text=Image+Error')}
        className={`transition-opacity duration-500 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
        sizes={props.fill ? (props.sizes || '100vw') : undefined}
        unoptimized={typeof imgSrc === 'string' && imgSrc.includes('placehold.co')}
        {...props}
      />
    </div>
  );
};
