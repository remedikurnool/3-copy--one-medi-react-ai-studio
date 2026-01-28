
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useCartStore } from '../../store/cartStore';
import { triggerCartAnimation } from '../../components/ui/FlyingCartAnimation';
import { useMedicines, useMedicineSearch } from '../../hooks/useMedicines';
import { MedicineCardSkeleton } from '../../components/ui/Skeletons';

const CATEGORY_GRID = [
  { name: 'Pain Relief', icon: 'https://cdn-icons-png.flaticon.com/128/3004/3004458.png', filter: 'Pain Relief', color: 'bg-red-50 text-red-600' },
  { name: 'Diabetes', icon: 'https://cdn-icons-png.flaticon.com/128/2857/2857753.png', filter: 'Diabetes', color: 'bg-blue-50 text-blue-600' },
  { name: 'Cardiac', icon: 'https://cdn-icons-png.flaticon.com/128/10430/10430630.png', filter: 'Cardiac', color: 'bg-indigo-50 text-indigo-600' },
  { name: 'Stomach', icon: 'https://cdn-icons-png.flaticon.com/128/2619/2619177.png', filter: 'Stomach Care', color: 'bg-green-50 text-green-600' },
  { name: 'Vitamins', icon: 'https://cdn-icons-png.flaticon.com/128/994/994928.png', filter: 'Vitamins', color: 'bg-teal-50 text-teal-600' },
];

const CONCERNS = [
  { id: 'c_skin', label: 'Dark Spots', query: 'Melasma', image: 'https://images.unsplash.com/photo-1554151228-14d9def656ec?auto=format&fit=crop&q=80&w=200' },
  { id: 'c_hair', label: 'Hair Loss', query: 'Hair Loss', image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80&w=200' },
  { id: 'c_pain', label: 'Joint Pain', query: 'Pain', image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=200' },
  { id: 'c_fever', label: 'Fever', query: 'Fever', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=200' },
  { id: 'c_baby', label: 'Baby Colic', query: 'Baby', image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=200' },
];

export default function MedicineList() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const cartItemsCount = useCartStore((state) => state.items.length);
  const addToCart = useCartStore((state) => state.addToCart);

  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('cat') || 'All');
  const [selectedConcern, setSelectedConcern] = useState<string | null>(null);

  // Fetch medicines from Supabase
  const { data: allMedicines, loading: loadingAll } = useMedicines();
  const { data: searchResults, loading: loadingSearch } = useMedicineSearch(debouncedSearch);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    const cat = searchParams.get('cat');
    if (cat) {
      if (cat === 'diabetes') setSelectedCategory('Diabetes');
      else if (cat === 'cardiac') setSelectedCategory('Cardiac');
      else if (cat === 'pain') setSelectedCategory('Pain Relief');
      else if (cat === 'stomach') setSelectedCategory('Stomach Care');
      else if (cat === 'supplements') setSelectedCategory('Vitamins');
      else setSelectedCategory(cat.charAt(0).toUpperCase() + cat.slice(1));
    }
  }, [searchParams]);

  const toggleCategory = (cat: string) => {
    if (selectedCategory === cat && !selectedConcern) {
      if (cat !== 'All') setSelectedCategory('All');
    } else {
      setSelectedCategory(cat);
      setSelectedConcern(null);
    }
  };

  const toggleConcern = (query: string) => {
    if (selectedConcern === query) {
      setSelectedConcern(null);
    } else {
      setSelectedConcern(query);
      setSelectedCategory('All');
    }
  };

  // Filter medicines based on search, category, and concern
  const filteredMedicines = useMemo(() => {
    const medicines = debouncedSearch && searchResults ? searchResults : (allMedicines || []);

    return medicines.filter((med: any) => {
      const matchesCategory = selectedCategory === 'All' ||
        (med.form && med.form.toLowerCase().includes(selectedCategory.toLowerCase())) ||
        (med.category && med.category.toLowerCase().includes(selectedCategory.toLowerCase()));

      const matchesConcern = !selectedConcern ||
        (med.name && med.name.toLowerCase().includes(selectedConcern.toLowerCase())) ||
        (med.generic_name && med.generic_name.toLowerCase().includes(selectedConcern.toLowerCase()));

      return matchesCategory && matchesConcern;
    });
  }, [allMedicines, searchResults, debouncedSearch, selectedCategory, selectedConcern]);

  const isLoading = loadingAll || (debouncedSearch && loadingSearch);

  const handleAdd = (e: React.MouseEvent, med: any) => {
    e.stopPropagation();
    const imageUrl = med.image_url || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=200&q=80';
    triggerCartAnimation(e, imageUrl);
    addToCart({
      id: med.id,
      type: 'medicine',
      name: med.name,
      price: 99, // TODO: Fetch from vendor_pricing
      mrp: 120,
      image: imageUrl,
      packSize: med.pack_size || '',
      qty: 1,
      discount: '17%',
      isPrescriptionRequired: med.prescription_required || false
    });
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
              placeholder="Search Dolo, Metformin..."
            />
            {search && (
              <button onClick={() => setSearch('')} className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full">
                <span className="material-symbols-outlined text-gray-400 text-xl">close</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Shop by Concern Section */}
      <section className="px-4 py-4 border-b border-gray-100 dark:border-gray-800/50">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Shop by Concern</h3>
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
          {CONCERNS.map((concern) => (
            <button
              key={concern.id}
              onClick={() => toggleConcern(concern.query)}
              className="flex flex-col items-center gap-2 shrink-0 group min-w-[60px]"
            >
              <div className={`size-14 rounded-full p-0.5 border-2 transition-all ${selectedConcern === concern.query ? 'border-primary ring-2 ring-primary/20 scale-105' : 'border-transparent group-hover:border-gray-200'}`}>
                <img src={concern.image} alt={concern.label} className="w-full h-full object-cover rounded-full shadow-sm" />
              </div>
              <span className={`text-[10px] font-bold text-center leading-tight transition-colors ${selectedConcern === concern.query ? 'text-primary' : 'text-slate-600 dark:text-slate-400'}`}>
                {concern.label}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Category Selection */}
      <section className="px-4 py-4 overflow-x-auto no-scrollbar">
        <div className="flex gap-4">
          <button
            onClick={() => toggleCategory('All')}
            className={`flex flex-col items-center gap-2 shrink-0 group`}
          >
            <div className={`size-16 rounded-[1.5rem] flex items-center justify-center transition-all duration-500 border-2 ${selectedCategory === 'All' && !selectedConcern ? 'border-primary bg-primary/10 shadow-float scale-105' : 'border-white dark:border-slate-800 bg-white dark:bg-slate-800 shadow-soft'} group-active:scale-95`}>
              <span className="material-symbols-outlined text-2xl text-gray-500">grid_view</span>
            </div>
            <span className={`text-[10px] font-black uppercase tracking-tighter text-center leading-tight max-w-[64px] transition-colors ${selectedCategory === 'All' && !selectedConcern ? 'text-primary' : 'text-gray-400'}`}>
              All
            </span>
          </button>
          {CATEGORY_GRID.map((cat) => (
            <button
              key={cat.name}
              onClick={() => toggleCategory(cat.filter)}
              className="flex flex-col items-center gap-2 shrink-0 group"
            >
              <div className={`size-16 rounded-[1.5rem] flex items-center justify-center transition-all duration-500 border-2 ${selectedCategory.toLowerCase() === cat.filter.toLowerCase() && !selectedConcern ? 'border-primary bg-primary/10 shadow-float scale-105' : 'border-white dark:border-slate-800 bg-white dark:bg-slate-800 shadow-soft'} group-active:scale-95`}>
                <img src={cat.icon} alt={cat.name} className="w-9 h-9 object-contain group-hover:scale-110 transition-transform duration-500" />
              </div>
              <span className={`text-[10px] font-black uppercase tracking-tighter text-center leading-tight max-w-[64px] transition-colors ${selectedCategory.toLowerCase() === cat.filter.toLowerCase() && !selectedConcern ? 'text-primary' : 'text-gray-400'}`}>
                {cat.name}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* List */}
      <main className="flex-1 p-4 pt-0 flex flex-col gap-4 max-w-4xl mx-auto w-full">
        <div className="flex justify-between items-center mb-2 px-1">
          <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300">
            {isLoading ? 'Loading...' : `${filteredMedicines.length} Products`}
          </h3>
          {(selectedCategory !== 'All' || selectedConcern) && (
            <button
              onClick={() => { setSelectedCategory('All'); setSelectedConcern(null); }}
              className="text-[10px] font-black text-red-500 uppercase tracking-widest hover:underline"
            >
              Clear Filters
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {isLoading
            ? Array(6).fill(0).map((_, i) => <MedicineCardSkeleton key={i} />)
            : filteredMedicines.map((med: any) => (
              <div
                key={med.id}
                onClick={() => navigate(`/medicines/${med.id}`)}
                className="group bg-white dark:bg-slate-900 rounded-[2.5rem] p-5 shadow-glass border border-white dark:border-slate-800/50 flex gap-5 relative cursor-pointer active:scale-[0.99] transition-all hover:shadow-float overflow-hidden"
              >
                {med.prescription_required && (
                  <div className="absolute top-0 right-0 bg-rose-500 text-white text-[10px] font-black px-3 py-1.5 rounded-bl-2xl z-20 shadow-sm flex items-center gap-1">
                    <span className="material-symbols-outlined text-[12px]">description</span> Rx
                  </div>
                )}

                <div className="size-28 shrink-0 bg-slate-50 dark:bg-slate-800 rounded-3xl flex items-center justify-center p-3 border border-slate-100 dark:border-slate-700 relative overflow-hidden">
                  <img
                    src={med.image_url || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=200&q=80'}
                    alt={med.name}
                    className="w-full h-full object-contain relative z-10 group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between py-1 min-w-0">
                  <div>
                    <h3 className="font-black text-base leading-tight text-slate-900 dark:text-white line-clamp-2 tracking-tight">{med.name}</h3>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1.5">{med.form || med.generic_name || 'Medicine'}</p>
                  </div>
                  <div className="flex items-end justify-between mt-3">
                    <div className="flex flex-col">
                      <span className="text-xl font-black text-slate-900 dark:text-white tracking-tighter">₹99</span>
                      <span className="text-[10px] text-slate-400 line-through font-bold">₹120</span>
                    </div>
                    <button
                      onClick={(e) => handleAdd(e, med)}
                      className="size-11 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center shadow-xl active:scale-90 transition-all border border-white/10"
                    >
                      <span className="material-symbols-outlined text-2xl">add</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {!isLoading && filteredMedicines.length === 0 && (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="size-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-4xl text-gray-400">search_off</span>
            </div>
            <p className="text-gray-500 font-bold text-sm">No medicines found for this filter.</p>
            <button
              onClick={() => { setSelectedCategory('All'); setSelectedConcern(null); setSearch(''); }}
              className="mt-4 text-primary font-bold text-xs uppercase tracking-widest border border-primary/20 px-4 py-2 rounded-xl"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
