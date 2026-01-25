
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { HOME_CARE_SERVICES } from '../../constants';

export default function HomeCareDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const service = HOME_CARE_SERVICES.find(s => s.id === id);
  const [selectedPlan, setSelectedPlan] = useState(service?.plans ? service.plans[0] : null);
  const [requestFemale, setRequestFemale] = useState(false);

  if (!service) return <div className="p-8 text-center font-bold">Service not found</div>;

  const currentPrice = selectedPlan ? selectedPlan.price : service.price;
  const isEquipment = service.category === 'Medical Equipment' || service.category === 'Critical Care';
  const isNursing = service.category === 'Nursing' || service.category === 'Elderly Care';

  const handleBook = () => {
      navigate('/home-care/booking', { 
          state: { 
              service, 
              plan: selectedPlan, 
              isHomeVisit: service.homeVisitAvailable,
              preferences: { requestFemale }
          } 
      });
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-bg-light dark:bg-bg-dark text-slate-900 dark:text-white font-sans">
      <div className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800 px-4 py-3 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          <span className="material-symbols-outlined text-2xl">arrow_back</span>
        </button>
        <h1 className="text-lg font-bold">{isEquipment ? 'Product Details' : 'Service Details'}</h1>
        <button className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          <span className="material-symbols-outlined text-2xl">share</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pb-24">
        <div className="relative h-64 w-full">
          <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: `url("${service.image}")`}}></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-secondary/90 backdrop-blur rounded-full text-xs font-bold uppercase tracking-wide text-white">{service.subCategory || service.category}</span>
              <div className="flex items-center gap-1 bg-yellow-400/90 text-black px-2 py-1 rounded-full text-xs font-bold">
                <span className="material-symbols-outlined text-sm filled">star</span>
                <span>{service.rating}</span>
              </div>
            </div>
            <h2 className="text-3xl font-bold leading-tight mb-1">{service.title}</h2>
            <div className="flex items-center gap-1 text-emerald-400 text-xs font-bold uppercase tracking-widest">
               <span className="material-symbols-outlined text-[14px] filled">verified</span>
               Verified {isNursing ? 'Caretaker' : 'Service'} Provider
            </div>
          </div>
        </div>

        {/* Quick Stats Bento */}
        <div className="flex border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 justify-around text-center">
           {!isEquipment && (
               <>
                <div className="flex flex-col gap-1">
                    <span className="material-symbols-outlined text-primary text-xl">medical_services</span>
                    <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Caretaker</span>
                    <span className="text-xs font-bold max-w-[100px] truncate">{service.staffQualification?.split('/')[0]}</span>
                </div>
                <div className="w-px bg-gray-100 dark:bg-gray-800"></div>
               </>
           )}
           <div className="flex flex-col gap-1">
              <span className="material-symbols-outlined text-secondary text-xl">reviews</span>
              <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Trust Score</span>
              <span className="text-xs font-bold">{service.reviews}+ Reviews</span>
           </div>
           <div className="w-px bg-gray-100 dark:bg-gray-800"></div>
           <div className="flex flex-col gap-1">
              <span className="material-symbols-outlined text-green-500 text-xl">verified_user</span>
              <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Safety</span>
              <span className="text-xs font-bold">Background Checked</span>
           </div>
        </div>

        <div className="p-4 space-y-6 bg-gray-50 dark:bg-black/20">
          
          {/* TRUST SIGNAL: CARETAKER BACKGROUND */}
          {!isEquipment && (
            <section className="animate-slide-up">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-3 px-1">Caretaker Verification</h3>
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 border border-emerald-50 dark:border-emerald-900/30 shadow-glass overflow-hidden relative">
                 <div className="absolute top-[-20px] right-[-20px] p-4 opacity-[0.05]">
                    <span className="material-symbols-outlined text-[120px]">badge</span>
                 </div>
                 <div className="flex items-center gap-4 mb-5">
                    <div className="size-16 rounded-2xl bg-emerald-50 dark:bg-emerald-900/40 flex items-center justify-center text-emerald-600">
                        <span className="material-symbols-outlined text-4xl">how_to_reg</span>
                    </div>
                    <div>
                        <h4 className="text-lg font-black text-slate-900 dark:text-white leading-tight">Certified Staff Only</h4>
                        <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">Government ID & Skill Verified</p>
                    </div>
                 </div>
                 
                 <div className="grid grid-cols-1 gap-3 mb-5">
                    {service.certifications?.map((cert, i) => (
                       <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-700 transition-all hover:border-emerald-200">
                          <div className="size-8 rounded-lg bg-white dark:bg-gray-800 shadow-sm flex items-center justify-center text-emerald-500">
                             <span className="material-symbols-outlined text-lg">check_circle</span>
                          </div>
                          <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{cert}</span>
                       </div>
                    ))}
                 </div>

                 <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-900/50">
                    <p className="text-xs text-blue-800 dark:text-blue-200 leading-relaxed font-medium">
                        <span className="font-black uppercase block mb-1">Our Rigorous Check:</span>
                        Every caretaker in our network undergoes a 3-step verification: Professional background check, police record clearance, and health fitness certification.
                    </p>
                 </div>
              </div>
            </section>
          )}

          {/* Plan/Variant Selection */}
          {service.plans && (
            <div className="bg-white dark:bg-gray-800 p-5 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
              <h3 className="text-lg font-black mb-4">Select Service Plan</h3>
              <div className="flex flex-col gap-3">
                {service.plans.map((plan) => (
                  <div 
                    key={plan.id}
                    onClick={() => setSelectedPlan(plan)}
                    className={`relative flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      selectedPlan?.id === plan.id 
                      ? 'border-primary bg-blue-50/50 dark:bg-blue-900/10 shadow-sm' 
                      : 'border-gray-100 dark:border-gray-700 hover:border-primary/50'
                    }`}
                  >
                    <div className="mt-1">
                      <h4 className="font-bold text-slate-900 dark:text-white">{plan.title || plan.name}</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{plan.duration}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-xl text-primary">₹{plan.price}</p>
                      {plan.savings && (
                        <p className="text-[10px] text-green-600 font-black uppercase">Save ₹{plan.savings}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* About */}
          <div className="bg-white dark:bg-gray-800 p-5 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="text-lg font-black mb-3">Service Details</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed font-medium">
              {service.description}
            </p>
          </div>

          {/* Key Features */}
          {service.features && (
            <div className="bg-white dark:bg-gray-800 p-5 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-black mb-4">What's Included</h3>
                <div className="grid grid-cols-1 gap-3">
                    {service.features.map((f, i) => (
                        <div key={i} className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-emerald-500 text-xl">check_circle</span>
                            <span className="text-sm font-medium text-slate-700 dark:text-gray-300">{f}</span>
                        </div>
                    ))}
                </div>
            </div>
          )}

          {/* TRUST SIGNAL: CUSTOMER REVIEWS */}
          <section className="animate-slide-up">
            <div className="flex justify-between items-center mb-5 px-1">
                <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tighter uppercase">Verified Customer Voice</h3>
                <div className="flex items-center gap-1 text-primary font-black text-xs cursor-pointer hover:underline">
                    {service.reviews} Feedbacks <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </div>
            </div>
            
            <div className="flex flex-col gap-4">
                {service.reviewsList?.map(review => (
                    <div key={review.id} className="bg-white dark:bg-gray-800 p-6 rounded-[2.5rem] border border-gray-100 dark:border-gray-700 shadow-sm relative transition-all hover:shadow-md">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                                <div className="size-11 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 flex items-center justify-center font-black text-slate-500 dark:text-slate-300 shadow-inner">
                                    {review.author[0]}
                                </div>
                                <div>
                                    <h4 className="text-sm font-black text-slate-900 dark:text-white">{review.author}</h4>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{review.date}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-0.5 text-amber-500">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i} className={`material-symbols-outlined text-[16px] ${i < review.rating ? 'filled' : 'opacity-20'}`}>star</span>
                                ))}
                            </div>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-300 font-medium leading-relaxed italic mb-4">
                            "{review.comment}"
                        </p>
                        {review.isVerified && (
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 dark:bg-emerald-900/30 rounded-full border border-emerald-100 dark:border-emerald-800">
                                <span className="material-symbols-outlined text-[14px] filled text-emerald-500">verified</span>
                                <span className="text-[9px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Verified Booking</span>
                            </div>
                        )}
                    </div>
                ))}
                {!service.reviewsList && (
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-[2rem] text-center border border-dashed border-gray-200 dark:border-gray-700">
                        <span className="material-symbols-outlined text-4xl text-gray-300 mb-2">rate_review</span>
                        <p className="text-gray-400 italic text-sm">Be the first to review this caretaker service.</p>
                    </div>
                )}
            </div>
          </section>

          {/* Guarantee Banner */}
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-6 rounded-[2.5rem] text-white flex items-center gap-6 shadow-xl relative overflow-hidden">
             <div className="absolute top-0 left-0 size-32 bg-primary/10 rounded-full blur-3xl -ml-16 -mt-16"></div>
             <div className="size-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/10">
                <span className="material-symbols-outlined text-3xl">verified_user</span>
             </div>
             <div>
                <h4 className="text-lg font-black leading-tight">One Medi Promise</h4>
                <p className="text-xs text-slate-300 mt-1">Direct access to certified experts and secure payment protection for home care in Kurnool.</p>
             </div>
          </div>
        </div>
      </div>

      <footer className="sticky bottom-0 z-50 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 px-5 py-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        <div className="flex items-center gap-4 max-w-md mx-auto">
          <div className="flex-1">
            <div className="flex flex-col mb-1">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                {selectedPlan ? selectedPlan.duration : 'Total Estimate'}
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">₹{currentPrice}</span>
              </div>
            </div>
          </div>
          <button onClick={handleBook} className="flex-[2] bg-primary hover:bg-blue-600 text-white h-14 rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg shadow-primary/30 flex items-center justify-center gap-2 active:scale-95 transition-transform">
            <span>Proceed to Book</span>
            <span className="material-symbols-outlined text-xl">arrow_forward</span>
          </button>
        </div>
      </footer>
    </div>
  );
}
