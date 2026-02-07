'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export const ScanCard = ({ scan, onClick }: { scan: any, onClick?: () => void }) => {
  return (
    <motion.div
      className="group relative card-modern overflow-hidden w-[280px] cursor-pointer p-0"
      onClick={onClick}
    >
      {/* Top Image Section */}
      <div className="relative h-36 w-full bg-indigo-50 dark:bg-indigo-900/20">
        <Image
          src={scan.image || 'https://images.unsplash.com/photo-1516549882906-589db74c94f7?auto=format&fit=crop&q=80&w=400'}
          alt={scan.test_name || 'Medical Scan'}
          fill
          sizes="280px"
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <div className="absolute top-3 right-3 text-white z-10 transition-transform group-hover:rotate-12 duration-300">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-2 rounded-xl">
            <span className="material-symbols-outlined text-xl">radiology</span>
          </div>
        </div>

        <div className="absolute bottom-3 left-4 text-white z-10 w-[90%]">
          <span className="inline-block px-2 py-0.5 rounded-md bg-indigo-500/80 backdrop-blur-md text-[9px] font-bold uppercase tracking-wider mb-2 shadow-sm border border-white/10">
            {scan.category || 'Radiology'}
          </span>
          <h3 className="font-bold text-lg text-white leading-tight drop-shadow-sm truncate font-lexend">
            {scan.test_name}
          </h3>
        </div>
      </div>

      <div className="p-4 bg-white dark:bg-slate-800">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 line-through decoration-slate-300">₹{Number(scan.price) * 1.2}</span>
            <span className="text-xl font-black text-slate-900 dark:text-white">₹{scan.price}</span>
          </div>

          <button className="flex items-center gap-2 text-indigo-600 bg-indigo-50 dark:bg-indigo-900/30 hover:bg-indigo-600 hover:text-white px-4 py-2 rounded-xl transition-all duration-300 font-bold text-xs group/btn">
            <span>Book</span>
            <span className="material-symbols-outlined text-base group-hover/btn:translate-x-0.5 transition-transform">arrow_forward</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};