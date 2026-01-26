
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { WELLNESS_PLANS } from '../../constants';
import { useCartStore } from '../../store/cartStore';

export default function WellnessCenter() {
   const navigate = useNavigate();
   const addToCart = useCartStore((state) => state.addToCart);

   const handleBook = (plan: typeof WELLNESS_PLANS[0]) => {
      addToCart({
         id: `wellness-${plan.id}-${Date.now()}`,
         type: 'wellness',
         name: plan.title,
         price: plan.price,
         mrp: plan.price,
         qty: 1,
         metadata: {
            slot: 'Flexible',
            date: 'Starts Tomorrow',
            centerName: 'OneMedi Wellness',
            patientName: 'Self'
         }
      });
      navigate('/checkout');
   };

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
            <div className="grid grid-cols-2 gap-4">
               {WELLNESS_PLANS.map(plan => (
                  <div key={plan.id} className="bg-white dark:bg-gray-800 p-4 rounded-[2rem] shadow-sm border border-lime-50 dark:border-gray-700 flex flex-col h-full">
                     <div className="h-32 rounded-2xl bg-gray-100 overflow-hidden mb-3">
                        <img src={plan.image} alt={plan.title} className="w-full h-full object-cover" />
                     </div>
                     <span className="text-[10px] font-black uppercase tracking-widest text-lime-600 mb-1">{plan.category}</span>
                     <h3 className="text-sm font-bold leading-tight mb-1 line-clamp-2">{plan.title}</h3>
                     <p className="text-xs text-gray-500 mb-3">by {plan.expert}</p>

                     <div className="mt-auto space-y-2 mb-3">
                        <div className="flex items-center gap-2">
                           <span className="material-symbols-outlined text-sm text-lime-600">calendar_month</span>
                           <span className="text-[10px] font-bold text-gray-600 dark:text-gray-300">{plan.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                           <span className="material-symbols-outlined text-sm text-lime-600">video_camera_front</span>
                           <span className="text-[10px] font-bold text-gray-600 dark:text-gray-300">{plan.consultations} Consultations</span>
                        </div>
                        <div className="flex items-center gap-2">
                           <span className="material-symbols-outlined text-sm text-lime-600">restaurant_menu</span>
                           <span className="text-[10px] font-bold text-gray-600 dark:text-gray-300">{plan.dietChartFrequency} Charts</span>
                        </div>
                     </div>

                     <div className="pt-3 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
                        <span className="font-black text-base">₹{plan.price}</span>
                        <button
                           onClick={() => handleBook(plan)}
                           className="size-8 rounded-full bg-lime-500 text-white flex items-center justify-center shadow-lg active:scale-90 transition-transform"
                        >
                           <span className="material-symbols-outlined text-lg">add</span>
                        </button>
                     </div>
                  </div>
               ))}
            </div>
         </main>
      </div>
   );
}
