import React from 'react';
import { motion } from 'framer-motion';
import { LabTest } from '@/types';

export const LabTestCard = ({ test, onClick, className = '' }: { test: LabTest, onClick?: () => void, className?: string }) => {
  return (
    <motion.div
      className={`group relative overflow-hidden rounded-3xl bg-white dark:bg-surface-900 border border-slate-100 dark:border-surface-800 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col h-full ${className}`}
      onClick={onClick}
      whileHover={{ y: -4 }}
    >
      {/* Dynamic Background Gradient */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-100/40 to-transparent dark:from-primary-900/20 rounded-bl-[100px] -mr-8 -mt-8 transition-transform duration-500 group-hover:scale-150" />

      <div className="relative z-10 p-5 flex flex-col h-full">
        {/* Header: Icon & Discount */}
        <div className="flex justify-between items-start mb-4">
          <div className="size-12 rounded-2xl bg-surface-50 dark:bg-surface-800 text-primary-600 flex items-center justify-center shadow-inner group-hover:bg-primary-50 dark:group-hover:bg-primary-900/30 transition-colors">
            <span className="material-symbols-outlined text-2xl">science</span>
          </div>
          {test.discountPercent && test.discountPercent > 0 && (
            <span className="bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-lg shadow-sm shadow-green-200 dark:shadow-none">
              {test.discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Content */}
        <div className="mb-4 flex-1">
          <h3 className="font-bold text-lg text-slate-900 dark:text-white leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {test.name}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
            {test.description || test.shortDescription}
          </p>
        </div>

        {/* Stats Row */}
        <div className="flex flex-wrap gap-2 mb-4">
          {test.turnaroundTime && (
            <div className="flex items-center gap-1 text-[10px] font-bold text-blue-600 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded-lg">
              <span className="material-symbols-outlined text-[10px]">avg_time</span>
              {test.turnaroundTime}
            </div>
          )}
          <div className="flex items-center gap-1 text-[10px] font-bold text-slate-500 bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded-lg">
            <span className="material-symbols-outlined text-[10px]">verified_user</span>
            NABL
          </div>
        </div>

        {/* Footer: Price & Action */}
        <div className="mt-auto pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 line-through font-bold">₹{test.marketPrice}</span>
            <span className="text-xl font-black text-slate-900 dark:text-white">₹{test.finalPrice}</span>
          </div>
          <button className="h-10 px-5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold shadow-lg shadow-slate-200 dark:shadow-none hover:scale-105 active:scale-95 transition-all">
            Book
          </button>
        </div>
      </div>
    </motion.div>
  );
};