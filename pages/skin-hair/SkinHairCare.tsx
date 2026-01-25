
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SKIN_HAIR_SERVICES, CARE_GUIDES, DOCTORS, MEDICINES } from '../../constants';
import { useCartStore } from '../../store/cartStore';
import { triggerCartAnimation } from '../../components/ui/FlyingCartAnimation';

export default function SkinHairCare() {
  const navigate = useNavigate();
  const addToCart = useCartStore((state) => state.addToCart);
  const [activeTab, setActiveTab] = useState<'Treatments' | 'Products'>('Treatments');

  // Find Dr. Ramya
  const doctor = DOCTORS.find(d => d.name.includes('Ramya')) || DOCTORS[0];

  // Filter skin products
  const products = MEDICINES.filter(m => m.category === 'Skin Care' || m.category === 'Hair Care' || m.category === 'Foot Care');

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
      packSize: product.packSize
    });
  };

  return (
    <div className="min-h-screen bg-[#fffbf7] dark:bg-bg-dark font-sans text-slate-900 dark:text-white pb-24">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-amber-100 dark:border-gray-800 p-4 flex items-center gap-3">
         <button onClick={() => navigate(-1)} className="size-10 rounded-full hover:bg-amber-50 dark:hover:bg-gray-800 flex items-center justify-center transition-colors text-amber-600 dark:text-amber-400">
            <span className="material-symbols-outlined text-2xl">arrow_back</span>
         </button>
         <div>
            <h1 className="text-xl font-bold text-amber-900 dark:text-amber-100 leading-none">Skin & Hair</h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Aesthetics & Care</p>
         </div>
         <button onClick={() => navigate('/cart')} className="ml-auto size-10 rounded-full bg-white dark:bg-gray-800 shadow-sm flex items-center justify-center text-slate-900 dark:text-white">
            <span className="material-symbols-outlined text-2xl">shopping_cart</span>
         </button>
      </header>

      <main className="p-4 flex flex-col gap-8 animate-fade-in">
         
         {/* Expert Spotlight Card */}
         <section className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 text-white shadow-xl cursor-pointer group" onClick={() => navigate(`/doctors/${doctor.id}`)}>
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/90 to-transparent z-10"></div>
            
            <div className="relative z-20 p-6 pt-48 flex flex-col items-start">
               <span className="bg-amber-500 text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest mb-2 shadow-lg">Kurnool's Expert</span>
               <h2 className="text-2xl font-black leading-tight mb-1">{doctor.name}</h2>
               <p className="text-xs text-gray-300 font-medium mb-1 uppercase tracking-wide">{doctor.qualification}</p>
               <p className="text-xs text-gray-400 font-medium mb-4 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">location_on</span>
                  Remedi Clinic, Gayathri Estates
               </p>
               <button className="bg-white text-slate-900 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
                  Book Consult <span className="material-symbols-outlined text-sm">arrow_forward</span>
               </button>
            </div>
            <div className="absolute top-0 right-0 w-1/2 h-full">
               <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover object-top opacity-80 group-hover:scale-105 transition-transform duration-700" />
            </div>
         </section>

         {/* Quick Actions / Categories */}
         <section>
            <div className="grid grid-cols-4 gap-3">
               {[
                  { label: 'Acne', icon: 'face_retouching_natural', color: 'text-rose-500 bg-rose-50 dark:bg-rose-900/20' },
                  { label: 'Hair Loss', icon: 'face', color: 'text-slate-600 bg-slate-100 dark:bg-slate-800' },
                  { label: 'Sun Care', icon: 'sunny', color: 'text-amber-500 bg-amber-50 dark:bg-amber-900/20' },
                  { label: 'Anti-Aging', icon: 'auto_awesome', color: 'text-purple-500 bg-purple-50 dark:bg-purple-900/20' },
               ].map((cat, i) => (
                  <button key={i} className="flex flex-col items-center gap-2 group">
                     <div className={`size-16 rounded-2xl flex items-center justify-center ${cat.color} shadow-sm group-active:scale-95 transition-transform`}>
                        <span className="material-symbols-outlined text-3xl">{cat.icon}</span>
                     </div>
                     <span className="text-[10px] font-black uppercase tracking-tight text-slate-600 dark:text-gray-400">{cat.label}</span>
                  </button>
               ))}
            </div>
         </section>

         {/* Switcher */}
         <div className="flex p-1 bg-amber-50 dark:bg-gray-800 rounded-xl">
            <button onClick={() => setActiveTab('Treatments')} className={`flex-1 py-2.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'Treatments' ? 'bg-white dark:bg-gray-700 shadow-sm text-amber-600 dark:text-amber-400' : 'text-gray-400'}`}>Treatments</button>
            <button onClick={() => setActiveTab('Products')} className={`flex-1 py-2.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'Products' ? 'bg-white dark:bg-gray-700 shadow-sm text-amber-600 dark:text-amber-400' : 'text-gray-400'}`}>Products</button>
         </div>

         {/* Main Content Area */}
         {activeTab === 'Treatments' ? (
            <div className="flex flex-col gap-4 animate-slide-up">
               <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] px-1">Popular Procedures</h3>
               {SKIN_HAIR_SERVICES.map(srv => (
                  <div key={srv.id} className="flex flex-col gap-0 p-4 rounded-3xl bg-white dark:bg-gray-800 shadow-sm border border-amber-50 dark:border-gray-700">
                     <div className="flex gap-4">
                       <div className="size-24 rounded-2xl bg-gray-100 shrink-0 overflow-hidden">
                          <img src={srv.image} alt={srv.treatment} className="w-full h-full object-cover" />
                       </div>
                       <div className="flex-1 flex flex-col justify-center">
                          <span className="text-[9px] font-black uppercase text-amber-500 tracking-wider mb-1">{srv.concern}</span>
                          <h4 className="font-bold text-lg leading-tight text-slate-900 dark:text-white">{srv.treatment}</h4>
                          <p className="text-xs text-gray-500 mb-2">{srv.clinic}</p>
                          <div className="flex items-center gap-1 text-[10px] font-bold bg-amber-50 dark:bg-amber-900/20 text-amber-600 px-2 py-1 rounded-lg w-fit">
                              <span className="material-symbols-outlined text-xs filled">star</span> {srv.rating}
                          </div>
                       </div>
                     </div>
                     
                     <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between gap-2">
                        <div className="flex flex-col items-start">
                           <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">Tech</span>
                           <span className="text-[10px] font-bold text-slate-700 dark:text-gray-300 max-w-[80px] truncate">{srv.technologyUsed}</span>
                        </div>
                        <div className="flex flex-col items-start border-l border-gray-100 dark:border-gray-700 pl-3">
                           <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">Sessions</span>
                           <span className="text-[10px] font-bold text-slate-700 dark:text-gray-300">{srv.sessionsRequired}</span>
                        </div>
                        <div className="flex flex-col items-start border-l border-gray-100 dark:border-gray-700 pl-3">
                           <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">Downtime</span>
                           <span className="text-[10px] font-bold text-slate-700 dark:text-gray-300">{srv.downtime}</span>
                        </div>
                     </div>

                     <div className="flex justify-between items-center mt-4">
                        <span className="font-black text-xl text-slate-900 dark:text-white">₹{srv.price}</span>
                        <button className="bg-amber-500 hover:bg-amber-600 text-white px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest active:scale-95 transition-all shadow-md shadow-amber-500/20">Book Now</button>
                     </div>
                  </div>
               ))}
            </div>
         ) : (
            <div className="grid grid-cols-2 gap-4 animate-slide-up">
               {products.map(prod => (
                  <div key={prod.id} className="bg-white dark:bg-gray-800 p-4 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col h-full group cursor-pointer" onClick={() => navigate(`/medicines/${prod.id}`)}>
                     <div className="h-32 bg-gray-50 dark:bg-gray-700 rounded-2xl mb-3 flex items-center justify-center p-4">
                        <img src={prod.image} alt={prod.name} className="max-h-full object-contain mix-blend-multiply dark:mix-blend-normal group-hover:scale-110 transition-transform duration-500" />
                     </div>
                     <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">{prod.category}</span>
                     <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-tight line-clamp-2 mb-2">{prod.name}</h4>
                     
                     <div className="mt-auto flex items-center justify-between">
                        <div className="flex flex-col">
                           <span className="text-[10px] text-gray-400 line-through font-bold">₹{prod.mrp}</span>
                           <span className="text-base font-black text-slate-900 dark:text-white">₹{prod.price}</span>
                        </div>
                        <button 
                           onClick={(e) => handleAddProduct(e, prod)}
                           className="size-9 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center shadow-lg active:scale-90 transition-all"
                        >
                           <span className="material-symbols-outlined text-lg">add</span>
                        </button>
                     </div>
                  </div>
               ))}
            </div>
         )}

         {/* Educational Tip */}
         <section className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-slate-800 dark:to-slate-900 rounded-[2rem] p-6 border border-blue-100 dark:border-slate-700 relative overflow-hidden">
            <div className="relative z-10">
               <span className="bg-white dark:bg-black/30 text-blue-600 dark:text-blue-400 text-[9px] font-black px-2 py-1 rounded-md uppercase tracking-widest mb-2 inline-block">Skin Secret</span>
               <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2">Beat the Kurnool Heat</h3>
               <p className="text-xs text-slate-600 dark:text-gray-400 leading-relaxed mb-4">
                  The dry heat in Kurnool can dehydrate your skin rapidly. Dr. Ramya recommends using a hyaluronic acid serum before your sunscreen for lasting hydration.
               </p>
               <button onClick={() => navigate('/health-feed')} className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest flex items-center gap-1 hover:underline">
                  Read More Tips <span className="material-symbols-outlined text-sm">arrow_forward</span>
               </button>
            </div>
            <div className="absolute top-0 right-0 -mr-4 -mt-4 size-24 bg-blue-200 dark:bg-blue-900/50 rounded-full blur-2xl"></div>
         </section>

      </main>
    </div>
  );
}
