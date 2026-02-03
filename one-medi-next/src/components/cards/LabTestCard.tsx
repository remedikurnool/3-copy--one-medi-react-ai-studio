'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export const LabTestCard = ({ test, onClick, className = '' }: { test: any, onClick?: () => void, className?: string }) => {
  return (
    <motion.div
      className={`group relative bg-white dark:bg-slate-800 rounded-[2rem] p-5 shadow-sm hover:shadow-card-hover border border-slate-100 dark:border-slate-700 w-full cursor-pointer overflow-hidden flex flex-col h-full ${className}`}
      whileHover={{ y: -2 }}
      onClick={onClick}
    >
      {/* Decorative gradients */}
      <div className="absolute top-0 right-0 -mr-8 -mt-8 size-32 bg-teal-50 dark:bg-teal-900/10 rounded-full blur-2xl group-hover:bg-teal-100 transition-colors" />

      <div className="relative z-10 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-3">
          <div className="size-12 rounded-2xl bg-teal-50 dark:bg-teal-900/20 text-teal-600 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300">
            <span className="material-symbols-outlined text-2xl">biotech</span>
          </div>
          {test.discount > 0 && (
            <span className="bg-emerald-100 text-emerald-700 text-[10px] font-black px-2 py-1 rounded-lg">
              {test.discount}% OFF
            </span>
          )}
        </div>

        <h3 className="font-black text-lg text-slate-900 dark:text-white leading-tight mb-1 group-hover:text-teal-600 transition-colors line-clamp-2">
          {test.test_name || test.name}
        </h3>

        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-4 line-clamp-2 flex-1">
          {test.description || 'Includes Complete Blood Count, Thyroid Profile & more'}
        </p>

        {/* Feature Tags */}
        <div className="flex gap-2 flex-wrap mb-4">
          {test.reportTime && (
            <span className="text-[9px] font-black text-blue-500 bg-blue-50 px-2 py-0.5 rounded uppercase tracking-wide">
              {test.reportTime} Report
            </span>
          )}
          <span className="text-[9px] font-black text-slate-400 bg-slate-100 px-2 py-0.5 rounded uppercase tracking-wide">
            ISO Certified
          </span>
        </div>

        <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-700 pt-3 mt-auto">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 line-through font-bold">₹{(test.price * 1.2).toFixed(0)}</span>
            <span className="text-xl font-black text-slate-900 dark:text-white tracking-tight">₹{test.price}</span>
          </div>

          <button className="flex items-center gap-1 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[10px] font-black uppercase tracking-widest px-4 py-2.5 rounded-xl hover:opacity-90 transition-colors shadow-lg active:scale-95">
            Book Now
          </button>
        </div>
      </div>
    </motion.div>
  );
};