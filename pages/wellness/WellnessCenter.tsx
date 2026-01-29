import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useWellnessPlans, ServiceMaster } from '../../hooks';

export default function WellnessCenter() {
   const navigate = useNavigate();

   const { data: wellnessPlans, loading, error } = useWellnessPlans();

   return (
      <div className="min-h-screen bg-[#f8fafc] dark:bg-bg-dark font-sans text-slate-900 dark:text-white pb-24">
         <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-lime-100 dark:border-gray-800 p-4 flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="size-10 rounded-full hover:bg-lime-50 dark:hover:bg-gray-800 flex items-center justify-center transition-colors text-lime-700 dark:text-lime-400">
               <span className="material-symbols-outlined text-2xl">arrow_back</span>
            </button>
            <div>
               <h1 className="text-xl font-black text-lime-700 dark:text-lime-400 uppercase tracking-tight">Wellness Center</h1>
            </div>
         </header>

         <main className="p-4 flex flex-col gap-6">
            {/* Loading State */}
            {loading && (
               <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-10 w-10 border-2 border-lime-500 border-t-transparent"></div>
               </div>
            )}

            {/* Error State */}
            {error && (
               <div className="text-center py-8 text-red-500">
                  <span className="material-symbols-outlined text-4xl mb-2">error</span>
                  <p className="text-sm font-medium">Failed to load wellness plans</p>
               </div>
            )}

            {/* Wellness Plans Grid */}
            {!loading && (
               <div className="grid grid-cols-2 gap-4">
                  {(wellnessPlans || []).map((plan: ServiceMaster) => (
                     <div key={plan.id} className="bg-white dark:bg-gray-800 p-4 rounded-[2rem] shadow-sm border border-lime-50 dark:border-gray-700 flex flex-col h-full">
                        <div className="h-32 rounded-2xl bg-gradient-to-br from-lime-100 to-green-100 dark:from-lime-900/30 dark:to-green-900/30 overflow-hidden mb-3 flex items-center justify-center">
                           <span className="material-symbols-outlined text-5xl text-lime-500/50">spa</span>
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-lime-600 mb-1">{plan.category}</span>
                        <h3 className="text-sm font-bold leading-tight mb-1 line-clamp-2">{plan.name}</h3>
                        <p className="text-xs text-gray-500 mb-3">{plan.description || 'Expert wellness program'}</p>

                        <div className="mt-auto space-y-2 mb-3">
                           {plan.duration_minutes && (
                              <div className="flex items-center gap-2">
                                 <span className="material-symbols-outlined text-sm text-lime-600">calendar_month</span>
                                 <span className="text-[10px] font-bold text-gray-600 dark:text-gray-300">{plan.duration_minutes} min sessions</span>
                              </div>
                           )}
                           <div className="flex items-center gap-2">
                              <span className="material-symbols-outlined text-sm text-lime-600">video_camera_front</span>
                              <span className="text-[10px] font-bold text-gray-600 dark:text-gray-300">Online Consultations</span>
                           </div>
                           {plan.is_home_service && (
                              <div className="flex items-center gap-2">
                                 <span className="material-symbols-outlined text-sm text-lime-600">home_health</span>
                                 <span className="text-[10px] font-bold text-gray-600 dark:text-gray-300">Home Service Available</span>
                              </div>
                           )}
                        </div>

                        <div className="pt-3 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
                           <span className="font-black text-base">Contact Us</span>
                           <button
                              onClick={() => navigate(`/wellness/${plan.id}`)}
                              className="size-8 rounded-full bg-lime-500 text-white flex items-center justify-center shadow-lg active:scale-90 transition-transform"
                           >
                              <span className="material-symbols-outlined text-lg">add</span>
                           </button>
                        </div>
                     </div>
                  ))}
               </div>
            )}

            {/* Empty State */}
            {!loading && (!wellnessPlans || wellnessPlans.length === 0) && (
               <div className="text-center py-12 flex flex-col items-center gap-4">
                  <div className="size-20 rounded-full bg-lime-100 dark:bg-lime-900/30 flex items-center justify-center text-lime-400">
                     <span className="material-symbols-outlined text-4xl">spa</span>
                  </div>
                  <p className="text-gray-500 font-medium">No wellness plans available yet.</p>
                  <p className="text-xs text-gray-400">Check back soon for our wellness programs!</p>
               </div>
            )}
         </main>
      </div>
   );
}
