import React from 'react';
import { motion } from 'framer-motion';
import { LabTest } from '@/types';

export const LabTestCard = ({ test, onClick, className = '' }: { test: LabTest, onClick?: () => void, className?: string }) => {
  return (
    <motion.div
      className={`group relative card-modern p-5 w-full cursor-pointer overflow-hidden flex flex-col h-full ${className}`}
      onClick={onClick}
    >
      {/* Decorative gradients */}
      <div className="absolute top-0 right-0 -mr-8 -mt-8 size-32 bg-primary-50 dark:bg-primary-900/10 rounded-full blur-2xl group-hover:bg-primary-100 transition-colors" />

      <div className="relative z-10 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-3">
          <div className="size-12 rounded-2xl bg-surface-50 dark:bg-surface-800 text-primary-600 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300 border border-surface-200 dark:border-surface-700">
            <span className="material-symbols-outlined text-2xl">biotech</span>
          </div>
          {test.discountPercent && test.discountPercent > 0 && (
            <div className="absolute top-2 left-2 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
              {test.discountPercent}% OFF
            </div>
          )}
        </div>

        <h3 className="font-black text-lg text-slate-900 dark:text-white leading-tight mb-1 group-hover:text-primary-600 transition-colors line-clamp-2 font-lexend">
          {test.name}
        </h3>

        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-4 line-clamp-2 flex-1">
          {test.description || test.shortDescription}
        </p>

        {/* Feature Tags */}
        <div className="flex gap-2 flex-wrap mb-4">
          {test.turnaroundTime && (
            <span className="text-[9px] font-bold text-blue-600 bg-blue-50 dark:bg-blue-900/20 px-2 py-0.5 rounded uppercase tracking-wide border border-blue-100 dark:border-blue-800">
              ⚡ {test.turnaroundTime} Report
            </span>
          )}
          <span className="text-[9px] font-bold text-slate-500 bg-surface-100 dark:bg-surface-800 px-2 py-0.5 rounded uppercase tracking-wide border border-surface-200 dark:border-surface-700">
            ISO Certified
          </span>
        </div>

        <div className="flex items-center justify-between border-t border-dashed border-slate-200 dark:border-slate-700 pt-3 mt-auto">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 line-through font-bold decoration-slate-300">₹{test.marketPrice}</span>
            <span className="text-xl font-black text-slate-900 dark:text-white tracking-tight">₹{test.finalPrice}</span>
          </div>

          <button className="flex items-center gap-1 btn-primary text-[10px] h-9 px-4 rounded-xl shadow-lg hover:shadow-xl active:scale-95">
            Book Now
          </button>
        </div>
      </div>
    </motion.div>
  );
};