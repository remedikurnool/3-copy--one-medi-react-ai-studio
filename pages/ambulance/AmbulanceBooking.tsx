
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AMBULANCE_SERVICES } from '../../constants';

export default function AmbulanceBooking() {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState('BLS');
  
  const selectedService = AMBULANCE_SERVICES.find(s => s.type === selectedType) || AMBULANCE_SERVICES[0];

  const handleBook = () => {
      // Simulate booking process
      if (confirm(`Confirm booking for ${selectedService.type} Ambulance? Estimated Charges: ₹${selectedService.baseCharge}`)) {
          alert('Ambulance Request Sent! Driver details will be shared via SMS shortly.');
          navigate('/');
      }
  };

  return (
    <div className="flex flex-col h-screen bg-bg-light dark:bg-bg-dark pb-20 relative">
      {/* Map Background (Mock) */}
      <div className="absolute inset-0 z-0 bg-gray-200">
        <div 
          className="w-full h-full bg-cover bg-center grayscale-[0.2]" 
          style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB2tLgg7HY6ysMKXQhyjM2Z5OVWAuN-1zgK7XR5J9o-GeWKoQ4pAT4oHC2NMOzDCJT-TNH56nSU2Zn0QXiiQxopURs4rsmeTEcZslaxLi3ap_UDVGuNP8mH92dR9poV7KECHUouGQizbOsWaLg-30V6x7gs32kvi0L7I6qHkl_V0blbXXCGZk1IMuf3CJLaki_tbWQOFP1zPTeWSSmDhrk5tKMgQjP9lRPx_-kHTUQqAF1GpSXYPSsbkYLGTWknrIhHYyPC0yM0zAc")'}}
        ></div>
        
        {/* Overlays */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
           <div className="size-4 bg-primary rounded-full ring-4 ring-primary/30 animate-pulse"></div>
        </div>
      </div>

      {/* Top Bar */}
      <div className="absolute top-0 w-full z-10 p-4">
         <button onClick={() => navigate('/')} className="size-12 rounded-full bg-white dark:bg-gray-800 shadow-md flex items-center justify-center text-slate-900 dark:text-white hover:bg-gray-100 transition-colors">
            <span className="material-symbols-outlined text-2xl">arrow_back</span>
         </button>
      </div>

      {/* Bottom Sheet */}
      <div className="absolute bottom-0 w-full z-10 bg-white dark:bg-gray-900 rounded-t-[2.5rem] shadow-2xl p-6 pb-8 max-h-[70vh] overflow-y-auto animate-slide-up">
         <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-700 rounded-full mx-auto mb-6"></div>
         
         <h2 className="text-xl font-black text-slate-900 dark:text-white mb-4">Select Ambulance</h2>
         
         <div className="flex flex-col gap-3 mb-6">
            {AMBULANCE_SERVICES.map((srv) => (
                <div 
                  key={srv.id}
                  onClick={() => setSelectedType(srv.type)}
                  className={`flex flex-col p-4 rounded-2xl border-2 cursor-pointer transition-all ${selectedType === srv.type ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : 'border-gray-100 dark:border-gray-800'}`}
                >
                   <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                            <div className="size-10 bg-white dark:bg-gray-700 rounded-xl flex items-center justify-center text-2xl shadow-sm">
                                {srv.type === 'ALS' ? '🚨' : '🚑'}
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 dark:text-white">{srv.type === 'ALS' ? 'ICU Ambulance (ALS)' : 'Basic Support (BLS)'}</h3>
                                <p className="text-xs text-gray-500">Arrives in {srv.responseTime}</p>
                            </div>
                        </div>
                        <span className="font-black text-lg">₹{srv.baseCharge}</span>
                   </div>
                   
                   {/* Equipment List (Visible only if selected) */}
                   {selectedType === srv.type && (
                       <div className="mt-2 pt-2 border-t border-red-200 dark:border-red-900/50">
                           <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest mb-1">Equipped With:</p>
                           <div className="flex flex-wrap gap-1">
                               {srv.equipment.map((eq, i) => (
                                   <span key={i} className="text-[10px] bg-white dark:bg-gray-800 px-2 py-0.5 rounded border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300">{eq}</span>
                               ))}
                           </div>
                       </div>
                   )}
                </div>
            ))}
         </div>

         <div className="flex items-center gap-4">
            <div className="flex-1">
               <p className="text-xs text-gray-500 uppercase font-bold tracking-widest mb-1">Pickup Location</p>
               <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-red-500 text-lg">my_location</span>
                  <p className="text-sm font-bold truncate">N.R. Peta, Kurnool (Current)</p>
               </div>
            </div>
            <button 
                onClick={handleBook}
                className="flex-[2] h-14 bg-red-600 hover:bg-red-700 text-white rounded-xl font-black text-lg shadow-lg shadow-red-500/30 flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
               <span>Book Now</span>
               <span className="material-symbols-outlined text-xl">arrow_forward</span>
            </button>
         </div>
      </div>
    </div>
  );
}
