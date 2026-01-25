
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MEDICAL_SCANS } from '../../constants';

export default function PregnancyScans() {
  const navigate = useNavigate();
  const [trimester, setTrimester] = useState<1 | 2 | 3>(1);

  // Filter scans based on trimester logic (using mock data IDs/Keywords)
  const filteredScans = MEDICAL_SCANS.filter(s => {
      if (trimester === 1) return s.name.includes('NT') || s.name.includes('Dating');
      if (trimester === 2) return s.name.includes('TIFFA') || s.name.includes('Anomaly');
      if (trimester === 3) return s.name.includes('Growth') || s.name.includes('Doppler');
      return false;
  });

  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark text-slate-900 dark:text-white pb-24 font-sans">
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-rose-100 dark:border-gray-800 p-4 flex items-center gap-3">
         <button onClick={() => navigate(-1)} className="size-10 rounded-full hover:bg-rose-50 dark:hover:bg-gray-800 flex items-center justify-center transition-colors text-rose-500">
            <span className="material-symbols-outlined text-2xl">arrow_back</span>
         </button>
         <h1 className="text-xl font-bold text-rose-600 dark:text-rose-400">Pregnancy Scans</h1>
      </header>

      <main className="p-4 flex flex-col gap-6">
         {/* Trimester Selector */}
         <div className="bg-white dark:bg-gray-800 p-6 rounded-[2rem] shadow-sm border border-rose-50 dark:border-slate-800 text-center">
             <h2 className="text-lg font-black mb-4">Which Trimester are you in?</h2>
             <div className="flex gap-3 justify-center">
                 {[1, 2, 3].map(t => (
                     <button 
                        key={t}
                        onClick={() => setTrimester(t as any)}
                        className={`size-16 rounded-2xl font-black text-xl flex flex-col items-center justify-center transition-all ${trimester === t ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30 scale-110' : 'bg-rose-50 dark:bg-gray-700 text-rose-400 dark:text-gray-400'}`}
                     >
                         {t}
                         <span className="text-[8px] uppercase tracking-widest font-bold opacity-80">Trim</span>
                     </button>
                 ))}
             </div>
             <p className="mt-4 text-xs font-medium text-gray-500">
                 {trimester === 1 && "Weeks 1 - 12: Vital for dating and chromosomal checks."}
                 {trimester === 2 && "Weeks 13 - 26: Detailed anomaly scan (TIFFA)."}
                 {trimester === 3 && "Weeks 27 - 40: Growth monitoring and fluid checks."}
             </p>
         </div>

         {/* Scans List */}
         <div>
             <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4 ml-1">Recommended Scans</h3>
             <div className="flex flex-col gap-4">
                 {filteredScans.length > 0 ? filteredScans.map(scan => (
                     <div key={scan.id} onClick={() => navigate('/scans/detail', { state: { scanId: scan.id } })} className="bg-white dark:bg-gray-800 p-5 rounded-3xl shadow-sm border border-rose-50 dark:border-gray-700 cursor-pointer active:scale-[0.99] transition-all flex gap-4">
                         <div className="size-20 rounded-2xl bg-rose-50 dark:bg-gray-700 flex items-center justify-center shrink-0">
                             <img src={scan.image} className="size-12 object-contain" alt="" />
                         </div>
                         <div className="flex-1">
                             <h4 className="font-bold text-lg leading-tight mb-1">{scan.name}</h4>
                             <p className="text-xs text-gray-500 line-clamp-2 mb-3">{scan.description}</p>
                             <div className="flex justify-between items-center">
                                 <span className="font-black text-lg">₹{scan.price}</span>
                                 <button className="bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-300 px-4 py-1.5 rounded-xl text-xs font-bold">Book</button>
                             </div>
                         </div>
                     </div>
                 )) : (
                     <div className="text-center py-10 text-gray-400">
                         <p>No specific scans found for this trimester in our list.</p>
                     </div>
                 )}
             </div>
         </div>
      </main>
    </div>
  );
}
