
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

  return (
    <div className="bg-bg-light dark:bg-bg-dark text-slate-900 dark:text-white font-sans min-h-screen relative flex flex-col">
      <header className="sticky top-0 z-30 flex items-center bg-white/95 dark:bg-gray-900/95 backdrop-blur-md p-4 pb-3 justify-between shadow-sm border-b border-gray-100 dark:border-gray-800">
        <button onClick={() => navigate(-1)} className="flex size-12 shrink-0 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <span className="material-symbols-outlined text-2xl">arrow_back</span>
        </button>
        <h2 className="text-xl font-bold leading-tight flex-1 text-center pr-12">Service Details</h2>
      </header>

      <main className="flex-1 overflow-y-auto pb-24">
        {/* Hero Image */}
        <div className="px-4 py-4">
          <div className="w-full relative h-[240px] rounded-2xl overflow-hidden shadow-lg bg-gray-200">
            <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: `url("${service.image}")`}}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="inline-flex items-center gap-1 bg-secondary text-white text-xs font-bold px-2 py-1 rounded-md mb-2">
                <span className="material-symbols-outlined text-[14px] filled">verified</span> Verified Specialist
              </span>
            </div>
          </div>
        </div>

        {/* Title & Rating */}
        <div className="px-4 pb-2">
          <h1 className="text-3xl font-extrabold leading-tight mb-2">{service.title}</h1>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined filled text-yellow-500 text-xl">star</span>
            <span className="text-lg font-bold">{service.rating}</span>
            <span className="text-gray-500 dark:text-gray-400 text-sm">({service.reviews} Reviews) • Kurnool</span>
          </div>
        </div>

        {/* About Section */}
        <div className="px-4 py-4">
          <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="text-lg font-bold mb-3">About the Therapy</h3>
            <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
              {service.description} Expert care using manual therapy and exercises to help you recover from injury, reduce pain, and improve mobility.
            </p>
          </div>
        </div>

        {/* Plans Selection */}
        {service.plans && (
          <div className="px-4 pb-6">
            <h3 className="text-lg font-bold mb-3 px-1">Select Package</h3>
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
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase whitespace-nowrap shadow-sm">
                      {plan.label}
                    </span>
                  )}
                  <div className="mb-2">
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">{plan.title}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{plan.duration}</p>
                  </div>
                  <div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-bold text-lg text-primary">₹{plan.price}</span>
                      {plan.originalPrice > plan.price && (
                        <span className="text-xs text-gray-400 line-through">₹{plan.originalPrice}</span>
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
          <h3 className="text-lg font-bold mb-3 px-1">Conditions Treated</h3>
          <div className="flex flex-wrap gap-2">
            {service.conditions.map(c => (
              <span key={c} className="bg-blue-50 dark:bg-blue-900/30 text-primary dark:text-blue-300 px-4 py-2 rounded-full text-sm font-semibold border border-blue-100 dark:border-blue-800">{c}</span>
            ))}
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
                  <p className="font-bold text-lg">Home Visit</p>
                  <p className="text-sm text-gray-500">Add ₹{service.homeVisitFee} travel fee</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={homeVisit} onChange={(e) => setHomeVisit(e.target.checked)} className="sr-only peer" />
                <div className="w-14 h-8 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
        )}

        <div className="h-px bg-gray-200 dark:bg-gray-800 mx-4 mb-8"></div>

        {/* Booking Form Mockup */}
        <div className="px-4 pb-8">
          <h2 className="text-2xl font-bold mb-6">Patient Details</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Select Date</label>
            <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
              <div className="min-w-[80px] flex-shrink-0 bg-primary text-white rounded-xl p-3 flex flex-col items-center justify-center border-2 border-primary cursor-pointer shadow-md">
                <span className="text-xs font-medium opacity-90">Today</span>
                <span className="text-2xl font-bold">14</span>
                <span className="text-xs font-medium">Oct</span>
              </div>
              <div className="min-w-[80px] flex-shrink-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-3 flex flex-col items-center justify-center cursor-pointer">
                <span className="text-xs font-medium text-gray-400">Tomorrow</span>
                <span className="text-2xl font-bold">15</span>
                <span className="text-xs font-medium">Oct</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 w-full max-w-md bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 p-4 pb-6 z-40 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        <div className="flex items-center justify-between mb-3">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 font-medium">Total to Pay</span>
            <span className="text-2xl font-extrabold">₹{totalPrice}<span className="text-sm font-normal text-gray-400 ml-1">{selectedPlan ? '' : '/ session'}</span></span>
          </div>
          <button 
            onClick={() => navigate('/bookings')}
            className="flex-1 ml-6 bg-primary hover:bg-blue-600 text-white font-bold text-lg py-3.5 px-6 rounded-xl shadow-lg shadow-primary/30 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <span>Book Now</span>
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </footer>
    </div>
  );
}
