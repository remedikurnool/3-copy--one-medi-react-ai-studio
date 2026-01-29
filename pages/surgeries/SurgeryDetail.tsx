
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useService } from '../../hooks';

export default function SurgeryDetail() {
   const navigate = useNavigate();
   const { id } = useParams();
   const { data: surgery, loading, error } = useService(id);

   if (loading) {
      return (
         <div className="min-h-screen bg-bg-light dark:bg-bg-dark flex items-center justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-2 border-primary border-t-transparent"></div>
         </div>
      );
   }

   if (error || !surgery) {
      return (
         <div className="min-h-screen bg-bg-light dark:bg-bg-dark flex flex-col items-center justify-center text-center p-6">
            <span className="material-symbols-outlined text-4xl text-gray-300 mb-2">medical_services</span>
            <h2 className="text-xl font-bold text-slate-700 dark:text-gray-300">Surgery Package Not Found</h2>
            <button onClick={() => navigate(-1)} className="mt-4 text-primary font-bold">Go Back</button>
         </div>
      );
   }

   return (
      <div className="min-h-screen bg-bg-light dark:bg-bg-dark font-sans text-slate-900 dark:text-white pb-32">
         {/* Header Image */}
         <div className="relative h-64 w-full bg-slate-900">
            <div className="absolute inset-0 bg-cover bg-center opacity-60" style={{ backgroundImage: `url("https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=800")` }}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-bg-light dark:from-bg-dark via-transparent to-transparent"></div>
            <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-center z-10">
               <button onClick={() => navigate(-1)} className="size-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                  <span className="material-symbols-outlined text-2xl">arrow_back</span>
               </button>
               <button className="size-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                  <span className="material-symbols-outlined text-2xl">share</span>
               </button>
            </div>
            <div className="absolute bottom-4 left-4 right-4 animate-fade-in-up">
               <span className="bg-primary text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest mb-2 inline-block shadow-sm">
                  {surgery.category}
               </span>
               <h1 className="text-3xl font-black leading-tight text-slate-900 dark:text-white drop-shadow-sm">{surgery.name}</h1>
            </div>
         </div>

         <main className="p-4 flex flex-col gap-6 -mt-2 relative z-10">
            {/* Key Stats */}
            <div className="grid grid-cols-3 gap-3">
               <div className="bg-white dark:bg-gray-800 p-3 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 text-center">
                  <span className="material-symbols-outlined text-blue-500 mb-1">apartment</span>
                  <p className="text-[10px] font-bold text-gray-400 uppercase">Hospital</p>
                  <p className="text-xs font-black truncate">12+ Network</p>
               </div>
               <div className="bg-white dark:bg-gray-800 p-3 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 text-center">
                  <span className="material-symbols-outlined text-purple-500 mb-1">bed</span>
                  <p className="text-[10px] font-bold text-gray-400 uppercase">Stay</p>
                  <p className="text-xs font-black">{surgery.duration_minutes ? `${surgery.duration_minutes / 60} hrs` : 'Day Care'}</p>
               </div>
               <div className="bg-white dark:bg-gray-800 p-3 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 text-center">
                  <span className="material-symbols-outlined text-green-500 mb-1">timelapse</span>
                  <p className="text-[10px] font-bold text-gray-400 uppercase">Recovery</p>
                  <p className="text-xs font-black">Varies</p>
               </div>
            </div>

            {/* Description */}
            <div className="bg-white dark:bg-gray-800 p-5 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
               <h3 className="text-lg font-black mb-2">About Procedure</h3>
               <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
                  {surgery.description || "Comprehensive surgical care package including pre-op assessment, procedure, and post-op follow-up."}
               </p>
            </div>

            {/* Package Inclusions (Requirements/Steps) */}
            {surgery.requirements && surgery.requirements.length > 0 && (
               <div className="bg-white dark:bg-gray-800 p-5 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
                  <h3 className="text-lg font-black mb-4">What's Included</h3>
                  <ul className="space-y-3">
                     {surgery.requirements.map((inc, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm font-medium text-slate-700 dark:text-gray-200">
                           <span className="size-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 shrink-0">
                              <span className="material-symbols-outlined text-sm font-bold">check</span>
                           </span>
                           {inc}
                        </li>
                     ))}
                  </ul>
               </div>
            )}

            {/* Surgeon Note Mock */}
            <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-3xl border border-blue-100 dark:border-blue-800 flex gap-4 items-center">
               <div className="size-12 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center text-blue-500 shadow-sm shrink-0">
                  <span className="material-symbols-outlined text-2xl">medical_services</span>
               </div>
               <div>
                  <p className="text-xs font-bold text-blue-800 dark:text-blue-300 uppercase tracking-widest mb-1">Doctor's Note</p>
                  <p className="text-sm font-medium text-slate-700 dark:text-gray-300 leading-tight">
                     "This is a standard procedure with high success rates. We ensure top-tier care from admission to discharge."
                  </p>
               </div>
            </div>
         </main>

         {/* Footer Actions */}
         <div className="fixed bottom-0 left-0 right-0 p-4 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 z-40 pb-6 shadow-[0_-4px_20px_-4px_rgba(0,0,0,0.1)]">
            <div className="max-w-lg mx-auto flex items-center gap-4">
               <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Est. Cost</span>
                  <span className="text-xl font-black text-slate-900 dark:text-white">Contact for Quote</span>
               </div>
               <button
                  onClick={() => navigate('/surgeries/second-opinion', { state: { procedure: surgery.name, category: surgery.category } })}
                  className="flex-1 h-14 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-all"
               >
                  Get Opinion
               </button>
            </div>
         </div>
      </div>
   );
}
