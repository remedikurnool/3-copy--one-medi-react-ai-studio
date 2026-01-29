
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useService, ServiceMaster } from '../../hooks';

// Helper to generate plans since backend doesn't support them yet
const getPhysioPlans = (service: ServiceMaster) => {
  // Default Physio Plans
  const basePrice = service.price || 500;
  return [
    { id: 'p1', name: 'Single Session', duration: service.duration_minutes ? `${service.duration_minutes} Mins` : '45 Mins', price: basePrice, title: 'Single', type: 'Session' },
    { id: 'p2', name: '5 Sessions', duration: 'Package', price: basePrice * 5 * 0.9, savings: basePrice * 5 * 0.1, title: 'Package', type: 'Session' },
    { id: 'p3', name: '10 Sessions', duration: 'Full Course', price: basePrice * 10 * 0.8, savings: basePrice * 10 * 0.2, title: 'Recovery', type: 'Session' }
  ];
};

export default function PhysioDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: service, loading, error } = useService(id);
  const [homeVisit, setHomeVisit] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);

  useEffect(() => {
    if (service) {
      setHomeVisit(service.is_home_service);
      const plans = getPhysioPlans(service);
      setSelectedPlan(plans[0]);
    }
  }, [service]);

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-light dark:bg-bg-dark flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="min-h-screen bg-bg-light dark:bg-bg-dark flex flex-col items-center justify-center text-center p-6 font-sans text-slate-900 dark:text-white">
        <span className="material-symbols-outlined text-4xl text-gray-300 mb-2">accessibility_new</span>
        <h2 className="text-xl font-bold">Service Not Found</h2>
        <button onClick={() => navigate(-1)} className="mt-4 text-primary font-bold">Go Back</button>
      </div>
    );
  }

  const plans = getPhysioPlans(service);
  const visitFee = homeVisit ? 300 : 0; // Standard convenience fee
  const currentPrice = selectedPlan ? Math.floor(selectedPlan.price) : 0;
  const totalPrice = currentPrice + visitFee;

  const handleBook = () => {
    navigate('/home-care/booking', {
      state: {
        service: { ...service, title: service.name, image: service.description || 'https://images.unsplash.com/photo-1576091160550-217358c7e6c9?auto=format&fit=crop&q=80&w=800' }, // Map expected fields
        plan: selectedPlan,
        isHomeVisit: homeVisit
      }
    });
  };

  return (
    <div className="bg-bg-light dark:bg-bg-dark text-slate-900 dark:text-white font-sans min-h-screen relative flex flex-col">
      <header className="sticky top-0 z-30 flex items-center bg-white/95 dark:bg-gray-900/95 backdrop-blur-md p-4 pb-3 justify-between shadow-sm border-b border-gray-100 dark:border-gray-800">
        <button onClick={() => navigate(-1)} className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <span className="material-symbols-outlined text-2xl">arrow_back</span>
        </button>
        <h2 className="text-lg font-bold leading-tight flex-1 text-center pr-10">Details</h2>
        <button className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <span className="material-symbols-outlined text-xl">share</span>
        </button>
      </header>

      <main className="flex-1 overflow-y-auto pb-32">
        {/* Hero Image Section */}
        <div className="relative h-72 w-full">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url("https://images.unsplash.com/photo-1576091160550-217358c7e6c9?auto=format&fit=crop&q=80&w=800")` }}></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex gap-2 mb-3">
              <span className="bg-primary text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-white/20">
                {service.category}
              </span>
              {service.is_home_service && (
                <span className="bg-secondary text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-white/20 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[10px]">home_health</span> Home Visit
                </span>
              )}
            </div>
            <h1 className="text-3xl font-black text-white leading-tight mb-2">{service.name}</h1>
            <div className="flex items-center gap-4 text-white/90">
              <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-2 py-1 rounded-lg">
                <span className="material-symbols-outlined text-amber-400 text-sm filled">star</span>
                <span className="text-xs font-bold">4.9</span>
                <span className="text-[10px] opacity-70">(120 Reviews)</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-bold">
                <span className="material-symbols-outlined text-sm">verified</span>
                Expert Care
              </div>
            </div>
          </div>
        </div>

        {/* TRUST SIGNAL: SPECIALIST VERIFICATION */}
        <div className="p-4 mt-2">
          <section className="bg-white dark:bg-gray-800 rounded-[2.5rem] p-6 shadow-sm border border-emerald-50 dark:border-emerald-900/30 overflow-hidden relative">
            <div className="absolute top-[-20px] right-[-20px] p-4 opacity-[0.05]">
              <span className="material-symbols-outlined text-[120px]">badge</span>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="size-14 rounded-2xl bg-emerald-50 dark:bg-emerald-900/40 flex items-center justify-center text-emerald-600 shadow-inner">
                <span className="material-symbols-outlined text-3xl">how_to_reg</span>
              </div>
              <div>
                <h4 className="text-lg font-black text-slate-900 dark:text-white leading-tight">Verified Specialist</h4>
                <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Certified Expert</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {['IAP Certified', 'Govt Regd Therapist'].map((cert, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-700">
                  <span className="material-symbols-outlined text-emerald-500 text-lg">verified</span>
                  <span className="text-xs font-bold text-slate-700 dark:text-gray-300">{cert}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Pricing Variants Selection */}
        <div className="p-4">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 ml-1">Select Session / Plan</h3>
          <div className="flex flex-col gap-3">
            {plans.map((plan) => (
              <div
                key={plan.id}
                onClick={() => setSelectedPlan(plan)}
                className={`relative p-5 rounded-3xl border-2 transition-all flex justify-between items-center cursor-pointer ${selectedPlan?.id === plan.id
                  ? 'border-primary bg-primary/5 shadow-md'
                  : 'border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800'
                  }`}
              >
                {plan.title && (
                  <span className="absolute -top-3 right-6 bg-secondary text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
                    {plan.title}
                  </span>
                )}
                <div className="flex items-center gap-4">
                  <div className={`size-12 rounded-2xl flex items-center justify-center transition-colors ${selectedPlan?.id === plan.id ? 'bg-primary text-white' : 'bg-gray-50 dark:bg-gray-700 text-gray-400'}`}>
                    <span className="material-symbols-outlined">{plan.type === 'Rental' ? 'bed' : 'timer'}</span>
                  </div>
                  <div>
                    <h4 className="font-black text-base text-slate-900 dark:text-white">{plan.name}</h4>
                    <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mt-0.5 tracking-tighter">{plan.duration}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-baseline gap-1.5 justify-end">
                    <span className="font-black text-xl text-primary tracking-tighter">₹{Math.floor(plan.price).toLocaleString()}</span>
                  </div>
                  {plan.savings && (
                    <p className="text-[10px] font-black text-green-600 uppercase tracking-widest">Save ₹{Math.floor(plan.savings)}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Toggle Home Visit (Only if relevant) */}
        {service.is_home_service && (
          <div className="px-4 mb-4">
            <div className="bg-white dark:bg-gray-800 p-5 rounded-[2rem] shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`size-12 rounded-full flex items-center justify-center transition-all ${homeVisit ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-gray-100 dark:bg-gray-700 text-gray-400'}`}>
                  <span className="material-symbols-outlined text-2xl">home_health</span>
                </div>
                <div>
                  <p className="font-black text-sm">Home Visit Required?</p>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-tight">+ ₹{visitFee} Travel Conv. Fee</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={homeVisit} onChange={(e) => setHomeVisit(e.target.checked)} className="sr-only peer" />
                <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
        )}

        {/* Description & Features */}
        <div className="px-4 flex flex-col gap-6 mt-2">
          <section className="bg-white dark:bg-gray-800 p-6 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="text-lg font-black mb-3">Description</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed font-medium">
              {service.description || "Professional physiotherapy session tailored to your recovery needs."}
            </p>
          </section>

          {service.requirements && service.requirements.length > 0 && (
            <section className="bg-white dark:bg-gray-800 p-6 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-gray-700">
              <h3 className="text-lg font-black mb-4">Key Inclusions</h3>
              <div className="grid grid-cols-1 gap-3">
                {service.requirements.map((f, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-emerald-500 text-xl filled">check_circle</span>
                    <span className="text-sm font-bold text-slate-700 dark:text-gray-300">{f}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* TRUST SIGNAL: REVIEWS */}
        <section className="p-4 mt-4 animate-slide-up">
          <div className="flex justify-between items-center mb-5 px-1">
            <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tighter uppercase">Patient Stories</h3>
            <div className="text-xs font-black text-primary uppercase tracking-widest">{120} Feedbacks</div>
          </div>

          <div className="flex flex-col gap-4">
            {[
              { id: 'rev1', author: 'Anil Kumar', rating: 5, comment: 'Dr. Srinivas was very professional. My back pain reduced significantly in just 3 sessions.', date: 'Oct 10, 2023', isVerified: true },
              { id: 'rev2', author: 'Latha M.', rating: 4, comment: 'Punctual staff and well-explained exercises.', date: 'Sep 28, 2023', isVerified: true }
            ].map(review => (
              <div key={review.id} className="bg-white dark:bg-gray-800 p-6 rounded-[2rem] border border-gray-100 dark:border-gray-700 shadow-sm relative">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center font-black text-slate-500 dark:text-slate-300">
                      {review.author[0]}
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-slate-900 dark:text-white leading-none mb-1">{review.author}</h4>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{review.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-0.5 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`material-symbols-outlined text-[14px] ${i < review.rating ? 'filled' : 'opacity-20'}`}>star</span>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 font-medium leading-relaxed italic">
                  "{review.comment}"
                </p>
                {review.isVerified && (
                  <div className="mt-3 inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 dark:bg-emerald-900/20 rounded-md border border-emerald-100 dark:border-emerald-800">
                    <span className="material-symbols-outlined text-[12px] filled text-emerald-500">verified</span>
                    <span className="text-[9px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Verified Booking</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Sticky Action Footer */}
      <footer className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 p-4 pb-6 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
        <div className="max-w-lg mx-auto flex items-center gap-6">
          <div className="flex flex-col">
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Total Amount</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">₹{totalPrice.toLocaleString()}</span>
              {selectedPlan?.type !== 'Rental' && (
                <span className="text-xs font-bold text-gray-400">/ session</span>
              )}
            </div>
          </div>
          <button
            onClick={handleBook}
            className="flex-1 h-14 bg-primary hover:bg-primary-dark text-white font-black text-sm uppercase tracking-widest rounded-2xl shadow-float shadow-primary/30 flex items-center justify-center gap-2 active:scale-95 transition-all"
          >
            <span>Confirm Booking</span>
            <span className="material-symbols-outlined text-xl">arrow_forward</span>
          </button>
        </div>
      </footer>
    </div>
  );
}
