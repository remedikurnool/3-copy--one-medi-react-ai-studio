import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { INSURANCE_PLANS } from '../../constants';
import { InsurancePlan } from '../../types';

export default function InsuranceList() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<'All' | 'Family' | 'Individual' | 'Senior' | 'Critical'>('All');
  const [compareList, setCompareList] = useState<string[]>([]);
  const [showQuoteWizard, setShowQuoteWizard] = useState(false);
  const [showCompareModal, setShowCompareModal] = useState(false);

  // Quote Wizard State
  const [quoteStep, setQuoteStep] = useState(1);
  const [quoteData, setQuoteData] = useState({ memberType: 'Family', age: '', pincode: '' });

  const categories = ['All', 'Family', 'Individual', 'Senior', 'Critical'];

  const filteredPlans = INSURANCE_PLANS.filter(plan => 
    activeCategory === 'All' || plan.category === activeCategory
  );

  const handleToggleCompare = (id: string) => {
    if (compareList.includes(id)) {
      setCompareList(prev => prev.filter(item => item !== id));
    } else {
      if (compareList.length < 3) {
        setCompareList(prev => [...prev, id]);
      } else {
        alert("You can compare up to 3 plans only.");
      }
    }
  };

  const handleRequestCallback = () => {
      alert('Callback requested! Our insurance expert will call you shortly.');
  };

  const handleGetQuote = () => {
      setShowQuoteWizard(false);
      setQuoteStep(1);
      setActiveCategory(quoteData.memberType as any);
      alert(`Finding best plans for ${quoteData.memberType} in ${quoteData.pincode}... (Simulated)`);
  };

  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark font-sans text-slate-900 dark:text-white pb-24 relative">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800 p-4">
         <div className="flex items-center gap-3 mb-3">
            <button onClick={() => navigate(-1)} className="size-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center transition-colors">
                <span className="material-symbols-outlined text-2xl">arrow_back</span>
            </button>
            <div className="flex-1">
                <h1 className="text-xl font-bold leading-none">Health Insurance</h1>
                <p className="text-xs text-gray-500 font-medium mt-1">Secure your family's future</p>
            </div>
            <button 
                onClick={() => setShowQuoteWizard(true)}
                className="bg-primary/10 text-primary px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest active:scale-95 transition-transform"
            >
                Get Quote
            </button>
         </div>

         {/* Category Tabs */}
         <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {categories.map(cat => (
                <button 
                    key={cat}
                    onClick={() => setActiveCategory(cat as any)}
                    className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${activeCategory === cat ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'bg-gray-100 dark:bg-gray-800 text-gray-500'}`}
                >
                    {cat} Plans
                </button>
            ))}
         </div>
      </header>

      <main className="p-4 flex flex-col gap-5">
         {/* Banner */}
         {activeCategory === 'All' && (
             <div className="p-5 rounded-3xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg relative overflow-hidden">
                <div className="relative z-10">
                    <h2 className="text-xl font-black mb-1">Confused?</h2>
                    <p className="text-sm opacity-90 mb-4 max-w-[200px]">Talk to our certified insurance advisors in Kurnool for free.</p>
                    <button onClick={handleRequestCallback} className="bg-white text-blue-600 px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest shadow-md active:scale-95 transition-transform">Request Callback</button>
                </div>
                <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-9xl opacity-20">support_agent</span>
             </div>
         )}

         {filteredPlans.map(plan => (
            <div key={plan.id} className="bg-white dark:bg-gray-800 p-5 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 relative overflow-hidden transition-all hover:shadow-md">
               <div className="flex justify-between items-start mb-4">
                  <div className="flex gap-3">
                      <div className="size-12 bg-white dark:bg-gray-700 rounded-xl p-1 flex items-center justify-center border border-gray-100 dark:border-gray-600">
                        <img src={plan.logo} alt={plan.provider} className="max-w-full max-h-full object-contain" />
                      </div>
                      <div>
                          <h3 className="text-lg font-bold leading-tight">{plan.planName}</h3>
                          <p className="text-xs text-gray-500">{plan.provider}</p>
                      </div>
                  </div>
                  <div className="text-right">
                     <p className="text-[9px] text-gray-500 uppercase font-black tracking-widest">Base Cover</p>
                     <p className="text-xl font-black text-slate-900 dark:text-white">₹{(plan.coverAmount/100000).toFixed(0)}L</p>
                  </div>
               </div>

               {/* Key Stats Chips */}
               <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar">
                  {plan.cashless && (
                     <div className="px-2 py-1 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-[9px] font-black uppercase rounded-lg border border-green-100 dark:border-green-800 whitespace-nowrap flex items-center gap-1">
                        <span className="material-symbols-outlined text-[10px] filled">bolt</span> Cashless
                     </div>
                  )}
                  <div className="px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 text-[9px] font-black uppercase rounded-lg border border-blue-100 dark:border-blue-800 whitespace-nowrap">
                     {plan.networkHospitals.toLocaleString()}+ Hospitals
                  </div>
                  <div className="px-2 py-1 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 text-[9px] font-black uppercase rounded-lg border border-amber-100 dark:border-amber-800 whitespace-nowrap flex items-center gap-1">
                     <span className="material-symbols-outlined text-[10px]">timer</span> {plan.waitingPeriod}
                  </div>
               </div>

               <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-3 mb-4">
                   <div className="grid grid-cols-2 gap-y-2">
                       {plan.features.slice(0, 4).map((f, i) => (
                           <div key={i} className="flex items-center gap-2 text-[11px] font-bold text-slate-600 dark:text-gray-300">
                                <span className="material-symbols-outlined text-emerald-500 text-[12px] filled">check_circle</span>
                                <span className="truncate">{f}</span>
                           </div>
                       ))}
                   </div>
               </div>

               <div className="flex items-end justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                  <div>
                     <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-0.5">Annual Premium</p>
                     <div className="flex items-baseline gap-1">
                        <p className="text-lg font-black text-primary tracking-tighter">₹{plan.premium.toLocaleString('en-IN')}</p>
                        <span className="text-[10px] text-gray-500 font-bold">/yr</span>
                     </div>
                     {plan.monthlyEmi && <p className="text-[10px] text-emerald-600 font-black uppercase">₹{plan.monthlyEmi}/mo EMI</p>}
                  </div>
                  
                  <div className="flex gap-2">
                      <button 
                        onClick={() => handleToggleCompare(plan.id)}
                        className={`size-10 rounded-xl flex items-center justify-center border transition-all ${compareList.includes(plan.id) ? 'bg-slate-900 text-white border-slate-900 shadow-md' : 'bg-white dark:bg-gray-800 border-gray-200 text-gray-400'}`}
                        title="Compare"
                      >
                          <span className="material-symbols-outlined text-xl">compare_arrows</span>
                      </button>
                      <button className="bg-primary text-white px-5 h-10 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-primary-dark active:scale-95 transition-transform shadow-lg shadow-primary/30">
                         Plan Details
                      </button>
                  </div>
               </div>
               
               <div className="absolute top-0 right-0 p-1 opacity-[0.03]">
                  <span className="material-symbols-outlined text-8xl">verified_user</span>
               </div>
            </div>
         ))}
      </main>

      {/* Compare Floating Button */}
      {compareList.length > 0 && (
          <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-40 animate-slide-up">
              <button 
                onClick={() => setShowCompareModal(true)}
                className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 pl-5 pr-6 py-3 rounded-full shadow-2xl flex items-center gap-3 font-black text-xs uppercase tracking-widest"
              >
                  <span className="bg-primary text-white size-6 rounded-full flex items-center justify-center text-[10px] font-black">{compareList.length}</span>
                  Compare Plans
              </button>
          </div>
      )}

      {/* Get Quote Wizard Modal */}
      {showQuoteWizard && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowQuoteWizard(false)}></div>
              <div className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl animate-slide-up">
                  <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-black">Get Best Quote</h3>
                      <button onClick={() => setShowQuoteWizard(false)}><span className="material-symbols-outlined">close</span></button>
                  </div>

                  {quoteStep === 1 && (
                      <div className="flex flex-col gap-4">
                          <p className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Who is this for?</p>
                          <div className="grid grid-cols-2 gap-3">
                              {['Self', 'Family', 'Parents', 'Senior'].map(opt => (
                                  <button 
                                    key={opt}
                                    onClick={() => { setQuoteData({...quoteData, memberType: opt}); setQuoteStep(2); }}
                                    className="p-5 rounded-3xl border-2 border-gray-100 dark:border-gray-700 hover:border-primary hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all text-left group"
                                  >
                                      <span className="font-black text-sm uppercase tracking-tight group-hover:text-primary">{opt}</span>
                                  </button>
                              ))}
                          </div>
                      </div>
                  )}

                  {quoteStep === 2 && (
                      <div className="flex flex-col gap-4">
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Eldest Member Age</p>
                          <input 
                            type="number" 
                            className="w-full h-14 rounded-2xl border-2 border-gray-200 dark:border-gray-700 px-4 text-xl font-black focus:border-primary outline-none bg-transparent tracking-tighter"
                            placeholder="e.g. 35"
                            value={quoteData.age}
                            onChange={(e) => setQuoteData({...quoteData, age: e.target.value})}
                          />
                          <button 
                            onClick={() => setQuoteStep(3)}
                            className="w-full h-14 bg-primary text-white rounded-2xl font-black uppercase tracking-widest mt-2"
                          >
                              Next Step
                          </button>
                      </div>
                  )}

                  {quoteStep === 3 && (
                      <div className="flex flex-col gap-4">
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Enter Pincode</p>
                          <input 
                            type="number" 
                            className="w-full h-14 rounded-2xl border-2 border-gray-200 dark:border-gray-700 px-4 text-xl font-black focus:border-primary outline-none bg-transparent tracking-tighter"
                            placeholder="e.g. 518002"
                            value={quoteData.pincode}
                            onChange={(e) => setQuoteData({...quoteData, pincode: e.target.value})}
                          />
                          <button 
                            onClick={handleGetQuote}
                            className="w-full h-14 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black uppercase tracking-widest mt-2"
                          >
                              Generate Quotes
                          </button>
                      </div>
                  )}
              </div>
          </div>
      )}

      {/* Compare Modal */}
      {showCompareModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowCompareModal(false)}></div>
              <div className="relative w-full max-w-4xl bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 shadow-2xl overflow-x-auto border border-white/20">
                  <div className="flex justify-between items-center mb-8">
                      <h3 className="text-2xl font-black uppercase tracking-tight">Compare Plans</h3>
                      <button onClick={() => setShowCompareModal(false)} className="size-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center"><span className="material-symbols-outlined">close</span></button>
                  </div>
                  
                  <div className="grid grid-cols-3 min-w-[600px] gap-8">
                      {/* Headers */}
                      <div className="col-span-3 grid grid-cols-4 gap-4 border-b pb-6 border-gray-100 dark:border-gray-800">
                          <div className="font-black text-gray-400 uppercase text-[10px] pt-12 tracking-widest">Plan Features</div>
                          {compareList.map(id => {
                              const plan = INSURANCE_PLANS.find(p => p.id === id);
                              return (
                                  <div key={id} className="text-center">
                                      <div className="h-12 flex items-center justify-center mb-3"><img src={plan?.logo} className="h-full object-contain" alt="" /></div>
                                      <p className="font-black text-sm text-slate-900 dark:text-white uppercase tracking-tighter leading-tight">{plan?.planName}</p>
                                  </div>
                              );
                          })}
                      </div>
                      
                      {/* Rows */}
                      {['Cover Amount', 'Premium', 'Network Hospitals', 'CSR', 'Copay', 'Waiting Period', 'Cashless Available'].map((feature) => (
                          <div key={feature} className="col-span-3 grid grid-cols-4 gap-4 py-4 border-b border-gray-50 dark:border-gray-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                              <div className="text-xs font-black text-slate-500 uppercase tracking-wide">{feature}</div>
                              {compareList.map(id => {
                                  const plan = INSURANCE_PLANS.find(p => p.id === id);
                                  let val: any = '';
                                  if(feature === 'Cover Amount') val = `₹${(plan?.coverAmount || 0)/100000}L`;
                                  if(feature === 'Premium') val = `₹${plan?.premium.toLocaleString()}`;
                                  if(feature === 'Network Hospitals') val = `${plan?.networkHospitals.toLocaleString()}+`;
                                  if(feature === 'CSR') val = plan?.claimSettlementRatio || '';
                                  if(feature === 'Copay') val = plan?.copay || '';
                                  if(feature === 'Waiting Period') val = plan?.waitingPeriod || '';
                                  if(feature === 'Cashless Available') val = plan?.cashless ? <span className="material-symbols-outlined text-emerald-500">check_circle</span> : <span className="material-symbols-outlined text-red-400">cancel</span>;
                                  
                                  return <div key={id} className="text-sm font-bold text-center text-slate-700 dark:text-gray-200">{val}</div>;
                              })}
                          </div>
                      ))}
                  </div>
              </div>
          </div>
      )}
    </div>
  );
}
