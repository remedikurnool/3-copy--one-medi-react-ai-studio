'use client';
import React from 'react';
import Image from 'next/image';
import { MedicalScan } from '../../types';

interface ScanCardProps {
  scan: MedicalScan;
  onClick: () => void;
}

export const ScanCard: React.FC<ScanCardProps> = ({ scan, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="group relative min-w-[150px] w-[150px] bg-white dark:bg-slate-900 rounded-[2rem] p-3 shadow-glass border border-white dark:border-slate-800/80 cursor-pointer transition-all duration-500 hover:shadow-float active:scale-95 overflow-hidden snap-start"
    >
      {/* Translucent Background Text/Icon Effect */}
      <div className="absolute -bottom-2 -right-2 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
        <span className="material-symbols-outlined text-[100px] font-black">{scan.category === 'MRI' ? 'radiology' : 'scanner'}</span>
      </div>

      <div className="h-28 rounded-[1.5rem] bg-slate-50 dark:bg-slate-800/50 flex items-center justify-center relative overflow-hidden mb-3 border border-slate-100/50 dark:border-slate-700/30">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>
        <Image
          src={scan.image}
          alt={scan.name}
          fill
          className="object-contain relative z-10 transition-all duration-700 group-hover:scale-125 group-hover:-rotate-6 drop-shadow-xl p-2"
          unoptimized
        />
      </div>

      <div className="px-1 text-center flex flex-col gap-1">
        <h3 className="text-xs font-black text-slate-800 dark:text-slate-200 line-clamp-2 h-8 leading-tight tracking-tight uppercase">
          {scan.name}
        </h3>
        <div className="mt-1">
          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Starting @</p>
          <p className="text-base font-black text-primary tracking-tighter">₹{scan.price}</p>
        </div>
      </div>
    </div>
  );
};