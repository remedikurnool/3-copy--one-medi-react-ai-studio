import React from 'react';
import { LabTest } from '../../types';

interface LabTestCardProps {
  test: LabTest;
  onClick: () => void;
}

export const LabTestCard: React.FC<LabTestCardProps> = ({ test, onClick }) => {
  return (
    <div 
      onClick={onClick} 
      className="group relative min-w-[280px] bg-white dark:bg-slate-900 rounded-[2.5rem] p-5 shadow-glass border border-white dark:border-slate-800/80 cursor-pointer transition-all duration-500 hover:shadow-float active:scale-[0.98] overflow-hidden"
    >
       {/* Futuristic Mesh Gradient Background */}
       <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-teal-400/10 to-transparent rounded-full -mr-10 -mt-10 blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
       
       <div className="relative z-10 flex flex-col h-full">
         <div className="flex justify-between items-start mb-4">
            <div className="size-12 rounded-2xl bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900/40 dark:to-teal-800/20 flex items-center justify-center text-teal-600 dark:text-teal-400 shadow-inner border border-teal-100/50 dark:border-teal-700/30">
               <span className="material-symbols-outlined text-2xl">biotech</span>
            </div>
            {test.discount && (
              <span className="text-[10px] font-black text-white bg-secondary/90 backdrop-blur-md px-3 py-1 rounded-full shadow-lg border border-white/20 uppercase tracking-widest">
                {test.discount}
              </span>
            )}
         </div>
         
         <h3 className="font-black text-lg text-slate-900 dark:text-white leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-1">
            {test.name}
         </h3>
         
         <div className="flex flex-wrap gap-2 mb-6">
            <div className="px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-slate-800 text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase border border-slate-100 dark:border-slate-700">
              {test.parameterCount} Tests
            </div>
            <div className="px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase border border-blue-100 dark:border-blue-800">
              {test.reportTime}
            </div>
         </div>
         
         {/* Glassmorphic Footer */}
         <div className="flex items-center justify-between pt-4 mt-auto border-t border-slate-50 dark:border-slate-800">
            <div className="flex flex-col">
               <span className="text-[10px] text-slate-400 font-bold line-through">₹{test.mrp}</span>
               <span className="text-xl font-black text-slate-900 dark:text-white tracking-tighter">₹{test.price}</span>
            </div>
            <button className="h-10 px-6 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black text-xs uppercase tracking-widest shadow-xl shadow-black/10 hover:bg-primary dark:hover:bg-primary dark:hover:text-white transition-all active:scale-90">
               Book
            </button>
         </div>
       </div>
    </div>
  );
};