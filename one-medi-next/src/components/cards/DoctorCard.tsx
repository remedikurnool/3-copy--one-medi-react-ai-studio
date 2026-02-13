import React from 'react';
import { motion } from 'framer-motion';
import { LazyImage } from '../ui/LazyImage';
import { Doctor } from '@/types';

export const DoctorCard = ({ doctor, onClick, className = '' }: { doctor: Doctor, onClick?: () => void, className?: string }) => {
  return (
    <motion.div
      className={`group card-modern p-4 cursor-pointer flex gap-4 items-center relative overflow-hidden ${className || 'w-[280px]'}`}
      onClick={onClick}
    >
      {/* Doctor Image */}
      <div className="relative h-20 w-20 min-h-[5rem] min-w-[5rem] rounded-2xl overflow-hidden shrink-0 shadow-sm bg-surface-100 dark:bg-surface-700">
        <LazyImage
          src={doctor.image || 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200'}
          alt={doctor.name}
          fill
          sizes="80px"
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-1 right-1 flex items-center gap-0.5 bg-white/80 dark:bg-black/60 backdrop-blur-md rounded-lg px-1.5 py-0.5 z-10 border border-white/20">
          <span className="material-symbols-outlined text-[10px] text-yellow-400 filled">star</span>
          <span className="text-[10px] font-bold text-slate-800 dark:text-white">{doctor.rating || '4.8'}</span>
        </div>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 py-1">
        <div className="mb-2">
          <span className="inline-block px-2 py-0.5 rounded-md bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 text-[10px] font-bold uppercase tracking-wide mb-1 border border-primary-100 dark:border-primary-800/30">
            {doctor.specialization}
          </span>
          <h3 className="font-bold text-slate-900 dark:text-white text-base truncate group-hover:text-primary-600 transition-colors font-lexend">
            {doctor.name}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 truncate font-medium">
            {doctor.experienceYears} years exp • {doctor.qualification}
          </p>
        </div>

        <div className="flex items-center justify-between mt-auto">
          <button className="btn-primary py-1.5 px-4 text-xs h-8 rounded-xl shadow-none hover:shadow-lg">
            Book
          </button>

          <div className="text-right">
            <span className="text-[10px] text-slate-400 block -mb-0.5">Consult</span>
            <span className="text-sm font-black text-slate-900 dark:text-white">₹{doctor.consultationFee}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};