
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { VACCINATION_SCHEDULE } from '../../constants';

export default function VaccinationTracker() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#fffafa] dark:bg-bg-dark text-slate-900 dark:text-white pb-32 font-sans">
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-2xl border-b border-rose-100 dark:border-gray-800">
        <div className="flex items-center gap-3 p-4">
          <button onClick={() => navigate(-1)} className="size-10 flex items-center justify-center rounded-full bg-rose-50 dark:bg-gray-800 text-rose-500 transition-transform active:scale-90">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <div className="flex flex-col">
            <h1 className="text-xl font-black tracking-tight text-rose-600 dark:text-rose-400 uppercase leading-none">Vaccination Tracker</h1>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Life-Saving Reminders</p>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4 flex flex-col gap-6">
         {/* Stats Card */}
         <div className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] shadow-sm border border-rose-50 dark:border-slate-800 flex justify-between items-center">
            <div className="flex flex-col gap-1">
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Immunization Status</span>
               <h3 className="text-2xl font-black text-emerald-500 tracking-tighter">4/12 Completed</h3>
               <div className="h-1.5 w-32 bg-slate-100 dark:bg-slate-800 rounded-full mt-2 overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[33%]"></div>
               </div>
            </div>
            <button className="size-12 rounded-2xl bg-rose-500 text-white flex items-center justify-center shadow-lg shadow-rose-200">
               <span className="material-symbols-outlined">notifications_active</span>
            </button>
         </div>

         {/* Timeline */}
         <section className="flex flex-col gap-4">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-2 px-1">Upcoming & Past</h3>
            {VACCINATION_SCHEDULE.map((v, i) => (
               <div 
                 key={v.id}
                 className={`flex gap-4 p-5 rounded-[2rem] border-2 transition-all ${
                   v.status === 'completed' 
                   ? 'bg-slate-50/50 dark:bg-slate-800/30 border-transparent grayscale-[0.5] opacity-60' 
                   : 'bg-white dark:bg-gray-800 border-rose-50 dark:border-slate-700 shadow-sm'
                 }`}
               >
                  <div className="flex flex-col items-center gap-2">
                     <div className={`size-10 rounded-2xl flex items-center justify-center ${v.status === 'completed' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                        <span className="material-symbols-outlined text-xl">{v.status === 'completed' ? 'check' : 'pending'}</span>
                     </div>
                     <div className="w-px h-full bg-slate-200 dark:bg-slate-700"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                     <div className="flex justify-between items-start mb-1">
                        <span className="text-[10px] font-black text-rose-400 uppercase tracking-widest">{v.age}</span>
                        {v.dueDate && <span className="text-[9px] font-black text-red-500 uppercase bg-red-50 dark:bg-red-900/20 px-2 py-0.5 rounded-full">Due: {v.dueDate}</span>}
                     </div>
                     <h4 className="text-base font-black text-slate-900 dark:text-white leading-tight">{v.vaccine}</h4>
                     <p className="text-[11px] font-bold text-slate-400 uppercase mt-1">Protects: {v.protectsAgainst}</p>
                     
                     {v.status === 'pending' && (
                        <div className="flex gap-2 mt-4">
                           <button className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[10px] font-black uppercase px-4 py-2 rounded-xl active:scale-95 transition-all">Book Clinic</button>
                           <button className="bg-rose-50 dark:bg-slate-700 text-rose-500 dark:text-rose-400 text-[10px] font-black uppercase px-4 py-2 rounded-xl active:scale-95 transition-all">At Home</button>
                        </div>
                     )}
                  </div>
               </div>
            ))}
         </section>

         <div className="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-[2.5rem] border border-indigo-100 dark:border-indigo-900/30 text-center">
            <span className="material-symbols-outlined text-indigo-500 text-4xl mb-2">emergency</span>
            <p className="text-xs font-bold text-indigo-900 dark:text-indigo-200 uppercase tracking-widest">Forgot a shot?</p>
            <p className="text-[10px] text-indigo-700 dark:text-indigo-400 font-medium mt-1">Don't worry. Our pediatric care managers can help you design a catch-up schedule.</p>
            <button className="mt-4 text-indigo-600 dark:text-indigo-400 font-black text-xs uppercase tracking-widest underline">Talk to Expert</button>
         </div>
      </main>
    </div>
  );
}
