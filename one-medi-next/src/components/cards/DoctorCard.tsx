'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export const DoctorCard = ({ doctor, onClick }: { doctor: any, onClick?: () => void }) => {
  return (
    <motion.div
      className="group bg-white dark:bg-slate-800 rounded-[1.8rem] p-4 shadow-sm hover:shadow-card-hover border border-slate-100 dark:border-slate-700 w-[280px] cursor-pointer flex gap-4 items-center"
      whileHover={{ y: -2 }}
      onClick={onClick}
    >
      {/* Doctor Image */}
      <div className="relative size-20 rounded-2xl overflow-hidden shrink-0 shadow-sm">
        <Image
          src={doctor.image || 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200'}
          alt={doctor.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-1 right-1 flex items-center gap-0.5 bg-white/90 dark:bg-slate-900/90 backdrop-blur rounded-md px-1 py-0.5">
          <span className="material-symbols-outlined text-[10px] text-yellow-500 filled">star</span>
          <span className="text-[10px] font-bold">{doctor.rating || '4.8'}</span>
        </div>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 py-1">
        <div className="mb-1">
          <span className="inline-block px-2 py-0.5 rounded-md bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wide mb-1">
            {doctor.specialty}
          </span>
          <h3 className="font-bold text-slate-900 dark:text-white text-base truncate group-hover:text-primary transition-colors">
            {doctor.name}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
            {doctor.experience} years exp • {doctor.qualification}
          </p>
        </div>

        <div className="flex items-center justify-between mt-2">
          <button className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold px-3 py-1.5 rounded-lg hover:opacity-90 transition-opacity">
            Book
          </button>

          <div className="text-right">
            <span className="text-[10px] text-slate-400 block -mb-1">Consult</span>
            <span className="text-sm font-black text-slate-900 dark:text-white">₹{doctor.consultation_fee}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};