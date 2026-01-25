
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PHYSIO_SERVICES } from '../../constants';

export default function PhysioDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const service = PHYSIO_SERVICES.find(s => s.id === id);
  const [homeVisit, setHomeVisit] = useState(service?.homeVisitAvailable);
  const [selectedPlan, setSelectedPlan] = useState(service?.plans ? service.plans[0] : null);

  if (!service) return <div className="p-8 text-center">Service not found</div>;

  const basePrice = selectedPlan ? selectedPlan.price : service.price;
  const totalPrice = homeVisit ? basePrice + (service.homeVisitFee || 0) : basePrice;

  const handleBook = () => {
      navigate('/home-care/booking', { 
          state: { 
              service, 
              plan: selectedPlan, 
              isHomeVisit: homeVisit 
          } 
      });
  };

  return (
    <div className="bg-bg-light dark:bg-bg-dark text-slate-900 dark:text-white font-sans min-h-screen relative flex flex-col">
      <header className="sticky top-0 z-30 flex items-center bg-white/95 dark:bg-gray-900/95 backdrop-blur-md p-4 pb-3 justify-between shadow-sm border-b border-gray-100 dark:border-gray-800">
        <button onClick={() => navigate(-1)} className="flex size-12 shrink-0 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <span className="material-symbols-outlined text-2xl">arrow_back</span>
        </button>
        <h2 className="text-xl font-bold leading-tight flex-1 text-center pr-12">Therapy Details</h2>
      </header>

      <main className="flex-1 overflow-y-auto pb-24">
        {/* Hero Image */}
        <div className="px-4 py-4">
          <div className="w-full relative h-[240px] rounded-[2rem] overflow-hidden shadow-lg bg-gray-200">
            <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: `url("${service.image}")`}}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="inline-flex items-center gap-1 bg-secondary text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-2 border border-white/20">
                {service.category}
              </span>
              <div className="flex items-center gap-2 mt-1">
                 <div className="size-8 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                    <span className="material-symbols-outlined text-sm">schedule</span>
                 </div>
                 <span className="text-sm font-bold">{service.visitDuration} Session</span>
              </div>
            </div>
          </div>
        </div>

        {/* Title & Rating */}
        <div className="px-4 pb-2">
          <h1 className="text-2xl font-black leading-tight mb-2">{service.title}</h1>
          <div className="flex items-center gap-2 text-sm">
            <div className="flex items-center text-amber-500 font-bold">
               <span className="material-symbols-outlined filled text-lg mr-1">star</span>
               {service.rating}
            </div>
            <span className="text-gray-400">•</span>
            <span className="text-gray-500 dark:text-gray-400 font-medium">{service.reviews} Reviews</span>
            <span className="text-gray-400">•</span>
            <span className="text-primary font-bold">{service.staffQualification}</span>
          </div>
        </div>

        {/* About Section */}
        <div className="px-4 py-4">
          <div className="bg-white dark:bg-gray-800 p-5 rounded-[2rem] shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="text-lg font-bold mb-3">About the Therapy</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed font-medium">
              {service.description}
            </p>
            {service.equipmentRequired && (
               <div className="mt-4 flex items-center gap-2 text-xs font-bold text-slate-500 bg-slate-100 dark:bg-slate-700/50 p-3 rounded-xl">
                  <span className="material-symbols-outlined text-lg">medical_services</span>
                  Equipment provided by Therapist
               </div>
            )}
          </div>
        </div>

        {/* Plans Selection */}
        {service.plans && (
          <div className="px-4 pb-6">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4 ml-1">Select Package</h3>
            <div className="grid grid-cols-2 gap-3">
              {service.plans.map((plan) => (
                <div 
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan)}
                  className={`relative p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                    selectedPlan?.id === plan.id 
                    ? 'border-primary bg-blue-50 dark:bg-blue-900/20 shadow-md' 
                    : 'border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800'
                  }`}
                >
                  {plan.label && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-500 text-white text-[9px] font-black px-3 py-1 rounded-full uppercase whitespace-nowrap shadow-sm tracking-wide">
                      {plan.label}
                    </span>
                  )}
                  <div className="mb-4 mt-2">
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white leading-tight">{plan.title}</h4>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mt-1">{plan.duration}</p>
                  </div>
                  <div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-black text-xl text-slate-900 dark:text-white tracking-tighter">₹{plan.price}</span>
                      {plan.originalPrice > plan.price && (
                        <span className="text-xs text-gray-400 line-through font-bold">₹{plan.originalPrice}</span>
                      )}
                    </div>
                    {plan.savings && (
                      <p className="text-[10px] font-bold text-green-600 mt-1">Save ₹{plan.savings}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Conditions */}
        <div className="px-4 pb-6">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-1">Conditions Treated</h3>
          <div className="flex flex-wrap gap-2">
            {service.conditions.map(c => (
              <span key={c} className="bg-white dark:bg-gray-800 text-slate-600 dark:text-slate-300 px-4 py-2 rounded-xl text-xs font-bold border border-gray-100 dark:border-gray-700 shadow-sm">{c}</span>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="px-4 pb-6">
           <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-1">Key Features</h3>
           <div className="bg-white dark:bg-gray-800 p-5 rounded-[2rem] border border-gray-100 dark:border-gray-700 shadow-sm">
              <ul className="space-y-3">
                 {service.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-3">
                       <div className="size-6 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-primary">
                          <span className="material-symbols-outlined text-xs font-bold">check</span>
                       </div>
                       <span className="text-sm font-bold text-slate-700 dark:text-gray-300">{f}</span>
                    </li>
                 ))}
              </ul>
           </div>
        </div>

        {/* Toggle Home Visit */}
        {service.homeVisitAvailable && (
          <div className="px-4 pb-8">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">home_health</span>
                </div>
                <div>
                  <p className="font-bold text-sm">Home Visit</p>
                  <p className="text-xs text-gray-500 font-bold">+ ₹{service.homeVisitFee} travel fee</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={homeVisit} onChange={(e) => setHomeVisit(e.target.checked)} className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 w-full max-w-md bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 p-4 pb-6 z-40 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        <div className="flex items-center justify-between mb-3 gap-6">
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Pay</span>
            <span className="text-2xl font-black tracking-tighter">₹{totalPrice}<span className="text-xs font-bold text-slate-400 ml-1 tracking-normal">{selectedPlan ? '' : '/ session'}</span></span>
          </div>
          <button 
            onClick={handleBook}
            className="flex-1 bg-primary hover:bg-blue-600 text-white font-black text-sm uppercase tracking-widest h-12 rounded-xl shadow-lg shadow-primary/30 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <span>Book Slot</span>
            <span className="material-symbols-outlined text-lg">arrow_forward</span>
          </button>
        </div>
      </footer>
    </div>
  );
}
