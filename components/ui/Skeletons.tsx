
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

// 1. Medicine Card Skeleton (Grid Layout)
export const MedicineCardSkeleton = () => (
  <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-5 shadow-glass border border-white dark:border-slate-800/50 flex gap-5 relative h-40">
    <Skeleton className="size-28 rounded-3xl shrink-0" />
    <div className="flex-1 flex flex-col justify-between py-1">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
      <div className="flex justify-between items-end">
        <div className="flex flex-col gap-1">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-3 w-10" />
        </div>
        <Skeleton className="size-11 rounded-2xl" />
      </div>
    </div>
  </div>
);

// 2. Doctor Card Skeleton (Vertical List)
export const DoctorCardSkeleton = () => (
  <div className="flex flex-col gap-3 rounded-2xl bg-white dark:bg-gray-800 p-4 shadow-sm border border-gray-100 dark:border-gray-700">
    <div className="flex items-start gap-4">
      <Skeleton className="size-20 rounded-xl shrink-0" />
      <div className="flex flex-col flex-1 gap-2">
        <div className="flex justify-between">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-5 w-12 rounded-md" />
        </div>
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-3 w-40" />
      </div>
    </div>
    <div className="h-px bg-gray-100 dark:bg-gray-700 w-full my-1"></div>
    <div className="flex items-center justify-between">
      <div className="flex flex-col gap-1">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-5 w-16" />
      </div>
      <Skeleton className="h-11 w-[180px] rounded-xl" />
    </div>
  </div>
);

// 3. Lab Test/Scan Skeleton (Horizontal Card)
export const ServiceCardSkeleton = () => (
  <div className="bg-white dark:bg-gray-800 rounded-[2rem] p-5 border border-slate-100 dark:border-slate-700 shadow-sm relative h-auto">
    <div className="flex justify-between items-start mb-4">
      <Skeleton className="size-12 rounded-2xl" />
      <Skeleton className="h-6 w-20 rounded-lg" />
    </div>
    <Skeleton className="h-6 w-3/4 mb-2" />
    <Skeleton className="h-3 w-full mb-4" />
    <div className="flex gap-2 mb-5">
      <Skeleton className="h-6 w-24 rounded-lg" />
      <Skeleton className="h-6 w-24 rounded-lg" />
    </div>
    <div className="pt-4 border-t border-slate-50 dark:border-slate-700 flex items-center justify-between">
      <div className="flex flex-col gap-1">
        <Skeleton className="h-3 w-10" />
        <Skeleton className="h-6 w-20" />
      </div>
      <Skeleton className="h-11 w-24 rounded-xl" />
    </div>
  </div>
);

// 4. Scan Center Skeleton
export const ScanCenterSkeleton = () => (
  <div className="bg-white dark:bg-gray-800 rounded-[2.5rem] p-6 shadow-glass border border-gray-100 dark:border-gray-700 flex gap-6">
    <Skeleton className="size-24 rounded-3xl shrink-0" />
    <div className="flex-1 flex flex-col gap-3">
      <div className="flex justify-between">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-5 w-16 rounded-full" />
      </div>
      <div className="h-px bg-slate-50 dark:bg-slate-700/50 w-full my-1"></div>
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <Skeleton className="h-3 w-12" />
          <Skeleton className="h-5 w-20" />
        </div>
        <Skeleton className="h-10 w-24 rounded-2xl" />
      </div>
    </div>
  </div>
);
