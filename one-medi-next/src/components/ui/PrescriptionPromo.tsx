'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

interface PrescriptionPromoProps {
  compact?: boolean;
  className?: string;
}

export const PrescriptionPromo: React.FC<PrescriptionPromoProps> = ({ compact = false, className = '' }) => {
  const router = useRouter();

  return (
    <div className={`relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-teal-500 via-teal-600 to-blue-600 shadow-xl shadow-teal-500/20 text-white group cursor-pointer active:scale-[0.99] transition-all duration-300 ${compact ? 'p-4' : 'p-6'} ${className}`}>
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
      <div className="absolute top-0 right-0 -mr-16 -mt-16 size-64 rounded-full bg-white/10 blur-3xl group-hover:bg-white/20 transition-colors duration-700"></div>
      <div className="absolute bottom-0 left-0 -ml-16 -mb-16 size-48 rounded-full bg-blue-500/30 blur-3xl"></div>

      <div className="relative z-10 flex items-center justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <div className="flex size-8 items-center justify-center rounded-lg bg-white/20 backdrop-blur-sm">
              <span className="material-symbols-outlined text-xl">description</span>
            </div>
            <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full">Easy Order</span>
          </div>
          <h3 className={`font-bold leading-tight ${compact ? 'text-lg' : 'text-xl'}`}>
            Have a Prescription?
          </h3>
          <p className="text-blue-50 text-xs mt-1 font-medium max-w-[250px]">
            Upload your Rx, and our pharmacists will pack the medicines for you.
          </p>
        </div>

        <div className="shrink-0">
          <button
            onClick={() => router.push('/upload-rx')}
            className="flex flex-col items-center justify-center bg-white text-teal-600 rounded-xl px-4 py-2 shadow-md hover:bg-blue-50 active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-2xl mb-0.5">upload_file</span>
            <span className="text-[10px] font-bold uppercase">Upload Now</span>
          </button>
        </div>
      </div>
    </div>
  );
};
