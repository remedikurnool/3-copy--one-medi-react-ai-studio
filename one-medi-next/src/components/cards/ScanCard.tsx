'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export const ScanCard = ({ scan, onClick }: { scan: any, onClick?: () => void }) => {
  return (
    <motion.div
      className="group relative bg-white dark:bg-slate-800 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-card-hover w-[280px] cursor-pointer"
      whileHover={{ y: -2 }}
      onClick={onClick}
    >
      {/* Top Image Section */}
      <div className="relative h-32 w-full bg-indigo-100">
        <Image
          src={scan.image || 'https://images.unsplash.com/photo-1516549882906-589db74c94f7?auto=format&fit=crop&q=80&w=400'}
          alt={scan.test_name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        <div className="absolute bottom-3 left-4 text-white">
          <span className="inline-block px-1.5 py-0.5 rounded-md bg-white/20 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider mb-1 border border-white/20">
            Radiology
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-base text-slate-900 dark:text-white leading-tight mb-1 group-hover:text-indigo-600 transition-colors">
          {scan.test_name}
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 line-clamp-1">
          {scan.category || 'Advanced Imaging'}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 line-through">₹{Number(scan.price) * 1.2}</span>
            <span className="text-base font-black text-slate-900 dark:text-white">₹{scan.price}</span>
          </div>

          <button className="text-indigo-600 bg-indigo-50 dark:bg-indigo-900/30 hover:bg-indigo-600 hover:text-white p-2 rounded-xl transition-all">
            <span className="material-symbols-outlined text-xl">event_available</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};