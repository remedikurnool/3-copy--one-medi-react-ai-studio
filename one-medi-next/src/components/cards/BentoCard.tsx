'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const BentoCard = ({ title, subtitle, icon, bgClass, onClick, span = "col-span-1", image, delay = 0, isLarge }: any) => (
    <motion.div
        onClick={onClick}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.5 }}
        className={`
      ${span} relative rounded-[2.5rem] p-6 lg:p-8 overflow-hidden cursor-pointer 
      ${image ? 'shadow-lg hover:shadow-xl' : 'shadow-sm hover:shadow-md border border-slate-100 dark:border-slate-700'}
      group h-full min-h-[160px] lg:min-h-[220px] transition-all duration-500 hover:-translate-y-1
      ${!image ? 'bg-white dark:bg-slate-800' : ''}
    `}
    >
        {image ? (
            <>
                <div className={`absolute inset-0 ${bgClass} opacity-80 z-0`}></div>
                <img src={image} alt="" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 mix-blend-overlay" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 transition-opacity" />
            </>
        ) : (
            <div className={`absolute inset-0 bg-gradient-to-br from-primary-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity dark:from-primary-900/10`} />
        )}

        <div className="relative z-10 h-full flex flex-col justify-between">
            <div className={`
        size-12 lg:size-14 rounded-2xl flex items-center justify-center mb-3 shadow-inner
        ${image
                    ? 'bg-white/20 backdrop-blur-md text-white border border-white/20'
                    : 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 group-hover:scale-110 transition-transform duration-300'
                }
      `}>
                <span className="material-symbols-outlined text-2xl lg:text-3xl">{icon}</span>
            </div>

            <div>
                <h3 className={`
          text-lg lg:text-2xl font-black leading-tight mb-1 font-lexend
          ${image ? 'text-white' : 'text-slate-900 dark:text-white group-hover:text-primary-700 dark:group-hover:text-primary-400'}
        `} dangerouslySetInnerHTML={{ __html: title }}></h3>
                <p className={`
          text-xs lg:text-sm font-bold
          ${image ? 'text-white/80' : 'text-slate-400 group-hover:text-primary-500/80'}
        `}>{subtitle}</p>
            </div>
        </div>

        {/* Decor Icon */}
        <div className={`
      absolute -right-6 -top-6 opacity-[0.05] grayscale rotate-12 group-hover:rotate-0 group-hover:scale-110 transition-all duration-700
      ${!image && 'text-primary-900 dark:text-white'}
    `}>
            <span className="material-symbols-outlined text-[10rem]">{icon}</span>
        </div>

        {/* Shine Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
            <div className="absolute -inset-[100%] bg-gradient-to-r from-transparent via-white/10 to-transparent rotate-45 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
        </div>
    </motion.div>
);
