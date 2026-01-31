import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SKIN_HAIR_SERVICES, CARE_GUIDES, DOCTORS, MEDICINES } from '../../constants';
import { useCartStore } from '../../store/cartStore';
import { triggerCartAnimation } from '../../components/ui/FlyingCartAnimation';

export default function SkinHairCare() {
  const navigate = useNavigate();
  const addToCart = useCartStore((state) => state.addToCart);
  const [activeTab, setActiveTab] = useState<'Treatments' | 'Products'>('Treatments');
  const [selectedConcern, setSelectedConcern] = useState('All');

  // Find Dr. Ramya Reddy
  const doctor = DOCTORS.find(d => d.name.includes('Ramya')) || DOCTORS[0];

  const concerns = [
    { label: 'All', icon: 'grid_view', color: 'bg-slate-100 text-slate-600' },
    { label: 'Acne Care', icon: 'face_retouching_natural', color: 'text-rose-500 bg-rose-50 dark:bg-rose-900/20' },
    { label: 'Hair Loss', icon: 'face', color: 'text-slate-600 bg-slate-100 dark:bg-slate-800' },
    { label: 'Sun Protection', icon: 'sunny', color: 'text-amber-500 bg-amber-50 dark:bg-amber-900/20' },
    { label: 'Pigmentation/Lightening', icon: 'auto_awesome', color: 'text-purple-500 bg-purple-50 dark:bg-purple-900/20' },
  ];

  // Filter skin products based on concerns and category
  const filteredProducts = MEDICINES.filter(m => {
    const isSkinOrHair = m.category === 'Skin Care' || m.category === 'Hair Care' || 
                         ['Acne Care', 'Sun Protection', 'Pigmentation/Lightening', 'Hair Loss'].includes(m.category);
    const matchesConcern = selectedConcern === 'All' || m.category === selectedConcern;
    return isSkinOrHair && matchesConcern;
  });

  const handleAddProduct = (e: React.MouseEvent, product: any) => {
    e.stopPropagation();
    triggerCartAnimation(e, product.image);
    addToCart({
      id: product.id,
      type: 'medicine',
      name: product.name,
      price: product.price || 0,
      mrp: product.mrp || 0,
      image: product.image,
      qty: 1,
      packSize: product.packSize,
      isPrescriptionRequired: product.prescriptionRequired
    });
  };

  return (
    <div className="min-h-screen bg-[#fffbf7] dark:bg-bg-dark font-sans text-slate-900 dark:text-white pb-24">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-amber-100 dark:border-gray-800 p-4 flex items-center gap-3">
         <button onClick={() => navigate(-1)} className="size-10 rounded-full hover:bg-amber-50 dark:hover:bg-gray-800 flex items-center justify-center transition-colors text-amber-600 dark:text-amber-400">
            <span className="material-symbols-outlined text-2xl">arrow_back</span>
         </button>
         <div className="flex-1">
            <h1 className="text-xl font-bold text-amber-900 dark:text-amber-100 leading-none">Skin & Hair</h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Clinical Aesthetics</p>
         </div>
         <button id="cart-icon-target" onClick={() => navigate('/cart')} className="size-10 rounded-full bg-white dark:bg-gray-800 shadow-sm flex items-center justify-center text-slate-900 dark:text-white">
            <span className="material-symbols-outlined text-2xl">shopping_cart</span>
         </button>
      </header>

      <main className="p-4 flex flex-col gap-8 animate-fade-in">
         
         {/* Expert Spotlight Card */}
         <section className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 text-white shadow-xl cursor-pointer group" onClick={() => navigate(`/doctors/${doctor.id}`)}>
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/90 to-transparent z-10"></div>
            
            <div className="relative z-20 p-6 pt-48 flex flex-col items-start">
               <div className="flex items-center gap-2 bg-amber-500 text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest mb-2 shadow-lg">
                  <span className="material-symbols-outlined text-xs filled">verified</span>
                  Kurnool's Top Expert
               </div>
               <h2 className="text-2xl font-black leading-tight mb-1">{doctor.name}</h2>
               <p className="text-xs text-gray-300 font-medium mb-1 uppercase tracking-wide">{doctor.qualification}</p>
               <p className="text-xs text-gray-400 font-medium mb-4 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">location_on</span>
                  Remedi Clinic, Kurnool
               </p>
               <button className="bg-white text-slate-900 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2">
                  Book Consultation <span className="material-symbols-outlined text-sm">arrow_forward</span>
               </button>
            </div>
            <div className="absolute top-0 right-0 w-1/2 h-full">
               <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover object-top opacity-80 group-hover:scale-105 transition-transform duration-700" />
            </div>
         </section>

         {/* Concern Selection */}
         <section>
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4 ml-1">Shop by Concern</h3>
            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
               {concerns.map((cat, i) => (
                  <button 
                    key={i} 
                    onClick={() => setSelectedConcern(cat.label)}
                    className="flex flex-col items-center gap-2 group min-w-[70px]"
                  >
                     <div className={`size-16 rounded-3xl flex items-center justify-center transition-all duration-300 ${cat.color} ${selectedConcern === cat.label ? 'ring-2 ring-amber-500 shadow-lg' : 'shadow-sm'} group-active:scale-95`}>
                        <span className="material-symbols-outlined text-3xl">{cat.icon}</span>
                     </div>
                     <span className={`text-[10px] font-black uppercase tracking-tighter text-center leading-tight transition-colors ${selectedConcern === cat.label ? 'text-amber-600' : 'text-slate-500'}`}>
                        {cat.label.split('/')[0]}
                     </span>
                  </button>
               ))}
            </div>
         </section>

         {/* Switcher */}
         <div className="flex p-1 bg-amber-50 dark:bg-gray-800 rounded-xl">
            <button onClick={() => setActiveTab('Treatments')} className={`flex-1 py-3 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'Treatments' ? 'bg-white dark:bg-gray-700 shadow-sm text-amber-600 dark:text-amber-400' : 'text-gray-400'}`}>Laser & Procedures</button>
            <button onClick={() => setActiveTab('Products')} className={`flex-1 py-3 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'Products' ? 'bg-white dark:bg-gray-700 shadow-sm text-amber-600 dark:text-amber-400' : 'text-gray-400'}`}>Clinical Products</button>
         </div>

         {/* Main Content Area */}
         {activeTab === 'Treatments' ? (
            <div className="flex flex-col gap-6 animate-slide-up">
               <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] px-1">Advanced Aesthetic Procedures</h3>
               {SKIN_HAIR_SERVICES.map(srv => (
                  <div key={srv.id} className="group relative flex flex-col gap-0 p-5 rounded-[2.5rem] bg-white dark:bg-gray-800 shadow-glass border border-amber-50 dark:border-gray-700 overflow-hidden hover:shadow-float transition-all duration-500">
                     <div className="flex gap-5">
                       <div className="size-28 rounded-3xl bg-gray-100 shrink-0 overflow-hidden shadow-soft">
                          <img src={srv.image} alt={srv.treatment} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                       </div>
                       <div className="flex-1 flex flex-col justify-center min-w-0">
                          <div className="flex justify-between items-start mb-1">
                             <span className="text-[9px] font-black uppercase text-amber-500 tracking-wider bg-amber-50 dark:bg-amber-900/20 px-2 py-0.5 rounded">{srv.concern}</span>
                             <div className="flex items-center gap-1 text-[10px] font-bold text-amber-600">
                                 <span className="material-symbols-outlined text-[14px] filled">star</span> {srv.rating}
                             </div>
                          </div>
                          <h4 className="font-black text-lg leading-tight text-slate-900 dark:text-white truncate">{srv.name}</h4>
                          <p className="text-xs text-gray-500 font-medium mb-2">{srv.clinic}</p>
                          
                          <div className="flex flex-wrap gap-1">
                             {srv.benefits?.slice(0, 2).map((b, i) => (
                                <span key={i} className="text-[8px] font-black uppercase text-emerald-600 border border-emerald-100 px-1.5 py-0.5 rounded-md">{b}</span>
                             ))}
                          </div>
                       </div>
                     </div>
                     
                     <div className="mt-5 grid grid-cols-3 gap-2 py-4 border-y border-gray-100 dark:border-gray-700">
                        <div className="flex flex-col items-center text-center">
                           <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">Technology</span>
                           <span className="text-[10px] font-bold text-slate-700 dark:text-gray-300 leading-tight line-clamp-1">{srv.technologyUsed}</span>
                        </div>
                        <div className="flex flex-col items-center text-center border-x border-gray-100 dark:border-gray-700">
                           <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">Sessions</span>
                           <span className="text-[10px] font-bold text-slate-700 dark:text-gray-300">{srv.sessionsRequired}</span>
                        </div>
                        <div className="flex flex-col items-center text-center">
                           <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">Downtime</span>
                           <span className="text-[10px] font-bold text-slate-700 dark:text-gray-300">{srv.downtime}</span>
                        </div>
                     </div>

                     <div className="flex justify-between items-center mt-5">
                        <div>
                           <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Starts @</p>
                           <span className="font-black text-2xl text-slate-900 dark:text-white tracking-tighter">₹{srv.price}</span>
                        </div>
                        <button className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest active:scale-95 transition-all shadow-lg shadow-amber-500/20">Book Now</button>
                     </div>
                  </div>
               ))}
            </div>
         ) : (
            <div className="flex flex-col gap-6 animate-slide-up">
               <div className="flex justify-between items-end px-1">
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Doctor-Recommended Brands</h3>
                  <span className="text-[10px] font-bold text-amber-600 uppercase">Top 20% Verified</span>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredProducts.map(prod => (
                     <div key={prod.id} className="bg-white dark:bg-slate-900 p-5 rounded-[2.5rem] shadow-glass border border-white dark:border-slate-800 flex gap-5 group cursor-pointer active:scale-[0.99] transition-all" onClick={() => navigate(`/medicines/${prod.id}`)}>
                        <div className="size-28 bg-slate-50 dark:bg-gray-800 rounded-3xl shrink-0 flex items-center justify-center p-3 border border-slate-100 dark:border-gray-700 relative">
                           <img src={prod.image} alt={prod.name} className="max-h-full object-contain mix-blend-multiply dark:mix-blend-normal group-hover:scale-110 transition-transform duration-500" />
                           {prod.doctorRecommended && (
                              <div className="absolute -top-2 -right-2 bg-emerald-500 text-white size-8 rounded-full flex items-center justify-center shadow-lg border-2 border-white dark:border-slate-800" title="Dermatologist Recommended">
                                 <span className="material-symbols-outlined text-sm filled">verified_user</span>
                              </div>
                           )}
                        </div>
                        
                        <div className="flex-1 flex flex-col justify-between py-1 min-w-0">
                           <div>
                              <p className="text-[9px] font-black text-amber-500 uppercase tracking-widest mb-1">{prod.category}</p>
                              <h4 className="text-base font-black text-slate-900 dark:text-white leading-tight line-clamp-2 tracking-tight">{prod.name}</h4>
                              
                              {/* Active Ingredients Tags */}
                              {prod.activeIngredients && (
                                 <div className="flex flex-wrap gap-1 mt-2">
                                    {prod.activeIngredients.map((ing, i) => (
                                       <span key={i} className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-[8px] font-black px-1.5 py-0.5 rounded border border-blue-100 dark:border-blue-900/40 uppercase">{ing}</span>
                                    ))}
                                 </div>
                              )}
                           </div>
                           
                           <div className="mt-3 flex items-end justify-between">
                              <div className="flex flex-col">
                                 <span className="text-[10px] text-gray-400 line-through font-bold">₹{prod.mrp}</span>
                                 <span className="text-xl font-black text-slate-900 dark:text-white tracking-tighter">₹{prod.price}</span>
                              </div>
                              <button 
                                 onClick={(e) => handleAddProduct(e, prod)}
                                 className="size-11 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center shadow-xl active:scale-90 transition-all border border-white/10"
                              >
                                 <span className="material-symbols-outlined text-xl">add</span>
                              </button>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
               
               {filteredProducts.length === 0 && (
                  <div className="text-center py-12 opacity-50">
                     <span className="material-symbols-outlined text-4xl mb-2">inventory_2</span>
                     <p className="text-sm font-bold uppercase tracking-widest">No matching items</p>
                  </div>
               )}
            </div>
         )}

         {/* Educational Tip */}
         <section className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-slate-800 dark:to-slate-900 rounded-[2.5rem] p-6 border border-blue-100 dark:border-slate-700 relative overflow-hidden shadow-sm">
            <div className="relative z-10">
               <div className="flex items-center gap-2 mb-3">
                  <div className="size-8 rounded-lg bg-white dark:bg-black/20 flex items-center justify-center text-blue-600 shadow-sm">
                     <span className="material-symbols-outlined text-lg">lightbulb</span>
                  </div>
                  <span className="text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-widest">Skin Secret</span>
               </div>
               <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2 leading-tight tracking-tight">Active Ingredient Focus</h3>
               <p className="text-xs text-slate-600 dark:text-gray-400 leading-relaxed mb-4 font-medium">
                  Did you know <span className="text-blue-600 font-bold">Minoxidil</span> needs consistent use for 3-6 months to show results? For acne, <span className="text-rose-500 font-bold">Salicylic Acid</span> works by unclogging pores and reducing sebum.
               </p>
               <button onClick={() => navigate('/health-feed')} className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest flex items-center gap-1 hover:underline">
                  Read Expert Blogs <span className="material-symbols-outlined text-sm">arrow_forward</span>
               </button>
            </div>
            <div className="absolute top-0 right-0 -mr-4 -mt-4 size-24 bg-blue-200 dark:bg-blue-900/50 rounded-full blur-2xl"></div>
         </section>

      </main>
    </div>
  );
}