
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useCartStore } from '../../store/cartStore';
import { triggerCartAnimation } from '../../components/ui/FlyingCartAnimation';
import { MEDICINES } from '../../constants';

const CATEGORY_GRID = [
  { name: 'Pain Relief', icon: 'https://cdn-icons-png.flaticon.com/128/3004/3004458.png', filter: 'Pain Relief', color: 'bg-red-50 text-red-600' },
  { name: 'Diabetes', icon: 'https://cdn-icons-png.flaticon.com/128/2857/2857753.png', filter: 'Diabetes', color: 'bg-blue-50 text-blue-600' },
  { name: 'Ayurvedic', icon: 'https://cdn-icons-png.flaticon.com/128/2619/2619177.png', filter: 'Ayurvedic', color: 'bg-green-50 text-green-600' },
  { name: 'Baby Care', icon: 'https://cdn-icons-png.flaticon.com/128/2753/2753995.png', filter: 'Baby Care', color: 'bg-pink-50 text-pink-600' },
  { name: 'Cardiac', icon: 'https://cdn-icons-png.flaticon.com/128/10430/10430630.png', filter: 'Cardiac', color: 'bg-indigo-50 text-indigo-600' },
  { name: 'Nutrition', icon: 'https://cdn-icons-png.flaticon.com/128/994/994928.png', filter: 'Supplements', color: 'bg-teal-50 text-teal-600' },
];

export default function MedicineList() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const cartItemsCount = useCartStore((state) => state.items.length);
  const addToCart = useCartStore((state) => state.addToCart);
  const setPrescription = useCartStore((state) => state.setPrescription);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('cat') || 'All');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const cat = searchParams.get('cat');
    if (cat) setSelectedCategory(cat.charAt(0).toUpperCase() + cat.slice(1));
  }, [searchParams]);

  const toggleCategory = (cat: string) => {
    setSelectedCategory(selectedCategory === cat ? 'All' : cat);
  };

  const filteredMedicines = MEDICINES.filter((med: any) => {
    const matchesSearch = med.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || med.category.toLowerCase().includes(selectedCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  const handleAdd = (e: React.MouseEvent, med: any) => {
    e.stopPropagation();
    triggerCartAnimation(e, med.image);
    addToCart({
      id: med.id,
      type: 'medicine',
      name: med.name,
      price: med.price,
      mrp: med.mrp,
      image: med.image,
      packSize: med.packSize,
      qty: 1,
      discount: med.discount || '',
      isPrescriptionRequired: med.isPrescriptionRequired
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      setTimeout(() => {
        const url = URL.createObjectURL(file);
        setPrescription(url);
        setIsUploading(false);
        navigate('/cart');
      }, 1200);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-bg-light dark:bg-bg-dark font-sans animate-fade-in pb-24">
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-2xl border-b border-white/40 dark:border-gray-800 shadow-glass">
        <div className="flex items-center justify-between px-4 py-3">
           <div className="flex items-center gap-3">
             <button onClick={() => navigate(-1)} className="text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 size-10 rounded-full transition-all active:scale-90 flex items-center justify-center">
               <span className="material-symbols-outlined text-2xl">arrow_back</span>
             </button>
             <h1 className="text-lg font-black uppercase tracking-tight">Pharmacy</h1>
           </div>
           <button id="cart-icon-target" onClick={() => navigate('/cart')} className="relative p-2.5 bg-slate-50 dark:bg-slate-800 rounded-2xl transition-all active:scale-95 shadow-soft border border-white dark:border-slate-700">
             <span className="material-symbols-outlined text-2xl">shopping_cart</span>
             {cartItemsCount > 0 && <span className="absolute -top-1 -right-1 flex items-center justify-center size-5 bg-red-500 rounded-full text-[10px] text-white font-black border-2 border-white dark:border-gray-900 shadow-md animate-bounce">{cartItemsCount}</span>}
           </button>
        </div>
        
        <div className="px-4 pb-3">
           <div className="flex w-full items-center rounded-2xl bg-slate-100 dark:bg-slate-800/50 border border-transparent focus-within:border-primary/50 focus-within:ring-4 focus-within:ring-primary/10 h-14 px-4 transition-all shadow-inner">
              <span className="material-symbols-outlined text-gray-400 text-2xl">search</span>
              <input 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent border-none focus:ring-0 ml-2 text-sm font-semibold text-slate-900 dark:text-white placeholder:text-gray-400" 
                placeholder="Search medicines or symptoms..." 
              />
           </div>
        </div>
      </header>

      {/* Category Selection */}
      <section className="px-4 py-6 overflow-x-auto no-scrollbar">
        <div className="flex gap-4">
          {CATEGORY_GRID.map((cat) => (
            <button 
              key={cat.name}
              onClick={() => toggleCategory(cat.filter)}
              className="flex flex-col items-center gap-2 shrink-0 group"
            >
              <div className={`size-16 rounded-[1.5rem] flex items-center justify-center transition-all duration-500 border-2 ${selectedCategory.toLowerCase() === cat.filter.toLowerCase() ? 'border-primary bg-primary/10 shadow-float scale-105' : 'border-white dark:border-slate-800 bg-white dark:bg-slate-800 shadow-soft'} group-active:scale-95`}>
                <img src={cat.icon} alt={cat.name} className="w-9 h-9 object-contain group-hover:scale-110 transition-transform duration-500" />
              </div>
              <span className={`text-[10px] font-black uppercase tracking-tighter text-center leading-tight max-w-[64px] transition-colors ${selectedCategory.toLowerCase() === cat.filter.toLowerCase() ? 'text-primary' : 'text-gray-400'}`}>
                {cat.name}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* List */}
      <main className="flex-1 p-4 pt-0 flex flex-col gap-4 max-w-4xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredMedicines.map((med: any) => (
            <div 
              key={med.id} 
              onClick={() => navigate(`/medicines/${med.id}`)} 
              className="group bg-white dark:bg-slate-900 rounded-[2.5rem] p-5 shadow-glass border border-white dark:border-slate-800/50 flex gap-5 relative cursor-pointer active:scale-[0.99] transition-all hover:shadow-float"
            >
               <div className="size-28 shrink-0 bg-slate-50 dark:bg-slate-800 rounded-3xl flex items-center justify-center p-3 border border-slate-100 dark:border-slate-700 relative overflow-hidden">
                  <img src={med.image} alt={med.name} className="w-full h-full object-contain relative z-10 group-hover:scale-110 transition-transform duration-500" />
               </div>
               <div className="flex-1 flex flex-col justify-between py-1 min-w-0">
                  <div>
                    <h3 className="font-black text-base leading-tight text-slate-900 dark:text-white line-clamp-2 tracking-tight">{med.name}</h3>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1.5">{med.category}</p>
                  </div>
                  <div className="flex items-end justify-between mt-3">
                     <div className="flex flex-col">
                       <span className="text-xl font-black text-slate-900 dark:text-white tracking-tighter">₹{med.price}</span>
                       <span className="text-[10px] text-slate-400 line-through font-bold">₹{med.mrp}</span>
                     </div>
                     <button 
                      onClick={(e) => handleAdd(e, med)}
                      className="size-11 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center shadow-xl active:scale-90 transition-all border border-white/10"
                     >
                       <span className="material-symbols-outlined text-2xl">add</span>
                     </button>
                  </div>
               </div>
               {med.isPrescriptionRequired && (
                  <div className="absolute top-2 right-2 bg-rose-500 text-white size-8 rounded-full flex items-center justify-center shadow-lg border-2 border-white dark:border-slate-900">
                    <span className="material-symbols-outlined text-sm">prescription</span>
                  </div>
               )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
