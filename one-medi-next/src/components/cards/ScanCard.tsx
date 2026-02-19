import React from 'react';
import { motion } from 'framer-motion';
import { Scan } from '@/types';

export const ScanCard = ({ scan, onClick, className = '' }: { scan: Scan, onClick?: () => void, className?: string }) => {
  return (
    <motion.div
      className={`group relative overflow-hidden rounded-3xl bg-white dark:bg-surface-900 border border-slate-100 dark:border-surface-800 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col h-full ${className}`}
      onClick={onClick}
      whileHover={{ y: -4 }}
    >
      {/* Hero Image / Icon Area */}
      <div className="relative h-32 w-full overflow-hidden bg-slate-100 dark:bg-surface-800">
        {scan.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={scan.image} alt={scan.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-300">
            <span className="material-symbols-outlined text-4xl">radiology</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-2 left-3 right-3 flex justify-between items-end">
          <span className="bg-white/20 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-lg border border-white/10">
            {scan.category || 'Diagnostic'}
          </span>
          {scan.discountPercent && scan.discountPercent > 0 && (
            <span className="bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-lg shadow-sm">
              {scan.discountPercent}% OFF
            </span>
          )}
        </div>
      </div>

      <div className="relative z-10 p-4 flex flex-col h-full flex-1">
        {/* Content */}
        <div className="mb-4 flex-1">
          <h3 className="font-bold text-base text-slate-900 dark:text-white leading-tight mb-1 group-hover:text-primary transition-colors line-clamp-2">
            {scan.name}
          </h3>
          {scan.bodyPart && (
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-2">{scan.bodyPart}</p>
          )}
        </div>

        {/* Footer: Price & Action */}
        <div className="mt-auto pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 line-through font-bold">₹{scan.mrp}</span>
            <span className="text-lg font-black text-slate-900 dark:text-white">₹{scan.price}</span>
          </div>
          <button className="flex items-center justify-center size-9 rounded-xl bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 hover:bg-primary hover:text-white transition-all">
            <span className="material-symbols-outlined text-xl">arrow_forward</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};