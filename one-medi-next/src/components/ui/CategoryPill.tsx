'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const CategoryPill = ({ icon, label, onClick, isActive }: any) => (
    <motion.button
        onClick={onClick}
        className="snap-start shrink-0 flex flex-col items-center gap-3 min-w-[80px] lg:min-w-[110px] group"
        whileHover={{ y: -5 }}
        whileTap={{ scale: 0.95 }}
    >
        <div className={`
      size-[4.5rem] lg:size-28 rounded-[2rem] flex items-center justify-center 
      shadow-sm border transition-all duration-300 relative overflow-hidden
      ${isActive
                ? 'bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800 shadow-md scale-105'
                : 'bg-white dark:bg-surface-800 border-surface-100 dark:border-surface-700 group-hover:border-primary-200 dark:group-hover:border-primary-800 group-hover:shadow-lg'
            }
    `}>
            <div className={`
        absolute inset-0 bg-gradient-to-br from-primary-400/20 to-transparent opacity-0 
        group-hover:opacity-100 transition-opacity duration-300
      `} />

            <span className={`
        material-symbols-outlined text-4xl lg:text-5xl transition-colors duration-300 z-10
        ${isActive ? 'text-primary-600 filled' : 'text-slate-400 dark:text-slate-500 group-hover:text-primary-500'}
      `}>
                {icon}
            </span>
        </div>
        <span className={`
      text-xs lg:text-sm font-bold text-center leading-tight transition-colors duration-300
      ${isActive ? 'text-primary-700 dark:text-primary-400' : 'text-slate-600 dark:text-slate-400 group-hover:text-primary-600'}
    `}>
            {label}
        </span>
    </motion.button>
);
