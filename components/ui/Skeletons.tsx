
import React from 'react';

// Basic shimmering block
export const Skeleton = ({ className }: { className?: string }) => (
  <div className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg ${className}`} />
);

// Full Page Loading Skeleton (Splash style)
export const GlobalLoadingSkeleton = () => (
  <div className="min-h-screen bg-bg-light dark:bg-bg-dark flex flex-col pb-24">
    {/* Header Skeleton */}
    <div className="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md p-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
      <div className="flex gap-3 items-center">
        <Skeleton className="size-10 rounded-xl" />
        <div className="flex flex-col gap-1">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-32" />
        </div>
      </div>
      <Skeleton className="size-10 rounded-full" />
    </div>

    <div className="p-4 flex flex-col gap-6 animate-pulse">
      {/* Search Bar */}
      <Skeleton className="h-12 w-full rounded-2xl" />

      {/* Categories */}
      <div className="flex gap-4 overflow-hidden">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex flex-col items-center gap-2 min-w-[72px]">
            <Skeleton className="size-[4.5rem] rounded-2xl" />
            <Skeleton className="h-3 w-12" />
          </div>
        ))}
      </div>

      {/* Banner */}
      <Skeleton className="h-48 w-full rounded-3xl" />

      {/* Grid */}
      <div className="grid grid-cols-2 gap-4">
        <Skeleton className="h-40 rounded-3xl" />
        <Skeleton className="h-40 rounded-3xl" />
      </div>
    </div>
  </div>
);

// Card Skeleton for lists
export const CardSkeleton = () => (
  <div className="min-w-[160px] w-[160px] bg-white dark:bg-gray-800 rounded-2xl p-3 shadow-soft border border-gray-100 dark:border-gray-700 flex flex-col h-full snap-start">
    <Skeleton className="h-32 w-full rounded-xl mb-3" />
    <Skeleton className="h-4 w-3/4 mb-2" />
    <Skeleton className="h-3 w-1/2 mb-auto" />
    <div className="flex justify-between items-end mt-3">
      <div className="flex flex-col gap-1">
        <Skeleton className="h-3 w-8" />
        <Skeleton className="h-4 w-12" />
      </div>
      <Skeleton className="size-8 rounded-full" />
    </div>
  </div>
);
