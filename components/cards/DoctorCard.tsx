import React from 'react';
import { Doctor } from '../../types';

interface DoctorCardProps {
  doctor: Doctor;
  onClick: () => void;
}

export const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, onClick }) => {
  return (
    <div 
      onClick={onClick} 
      className="group relative min-w-[290px] bg-white dark:bg-slate-900 rounded-[2.25rem] p-5 shadow-glass border border-white dark:border-slate-800/80 cursor-pointer transition-all duration-500 hover:shadow-float active:scale-[0.99] flex gap-5 items-center snap-start"
    >
       {/* 3D Profile Section */}
       <div className="relative shrink-0">
          {/* Breathing Aura Indicator */}
          <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping scale-110 opacity-70"></div>
          
          <div 
            className="relative size-20 rounded-[1.75rem] bg-slate-200 dark:bg-slate-800 bg-cover bg-center border-2 border-white dark:border-slate-700 shadow-xl z-10 group-hover:scale-105 transition-transform duration-500" 
            style={{backgroundImage: `url('${doctor.image}')`}}
          ></div>
          
          {/* Rating Floating Tag */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white dark:bg-slate-800 px-2 py-0.5 rounded-full shadow-lg border border-slate-100 dark:border-slate-700 z-20 flex items-center gap-1">
             <span className="text-[10px] font-black text-slate-900 dark:text-white">{doctor.rating}</span>
             <span className="material-symbols-outlined text-[10px] filled text-amber-500">star</span>
          </div>
       </div>
       
       <div className="flex-1 min-w-0 flex flex-col gap-0.5">
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="size-1.5 rounded-full bg-green-500"></span>
            <span className="text-[9px] font-black text-green-600 dark:text-green-400 uppercase tracking-widest">Available Now</span>
          </div>
          
          <h3 className="font-black text-lg text-slate-900 dark:text-white truncate tracking-tight group-hover:text-primary transition-colors leading-tight">
            {doctor.name}
          </h3>
          
          <p className="text-[11px] text-primary font-black uppercase tracking-wider truncate mb-1">
            {doctor.specialty}
          </p>
          
          <p className="text-[10px] text-slate-400 font-bold truncate">
            {doctor.qualification} • {doctor.experience} Exp
          </p>
          
          <div className="flex items-center justify-between mt-3">
             <div className="flex flex-col leading-none">
                <span className="text-[8px] text-slate-400 font-black uppercase tracking-tighter mb-0.5">Fee</span>
                <span className="text-base font-black text-slate-900 dark:text-white tracking-tighter">₹{doctor.fee}</span>
             </div>
             <button className="h-9 px-4 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-primary dark:text-blue-400 font-black text-[10px] uppercase tracking-widest hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-all shadow-sm">
                Book Visit
             </button>
          </div>
       </div>
    </div>
  );
};