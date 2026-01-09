
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MEDICAL_SCANS } from '../../constants';
import { useLocationStore } from '../../store/locationStore';
import LocationModal from '../../components/ui/LocationModal';

export default function ScanList() {
  const navigate = useNavigate();
  const { city } = useLocationStore();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  const filteredScans = MEDICAL_SCANS.filter(scan => {
    const matchesCategory = selectedCategory === 'All' || scan.category === selectedCategory;
    const matchesSearch = scan.name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark pb-24 font-sans text-slate-900 dark:text-white">
      <LocationModal isOpen={isLocationModalOpen} onClose={() => setIsLocationModalOpen(false)} />
      
      {/* Sticky Header Area */}
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-sm border-b border-gray-100 dark:border-gray-800">
        <div className="flex flex-col px-4 pt-4 pb-2 gap-3">
          {/* Top Bar: Back, Location, Profile */}
          <div className="flex items-center justify-between">
            <button 
              onClick={() => navigate('/')}
              className="flex items-center justify-center size-10 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <span className="material-symbols-outlined text-2xl">arrow_back</span>
            </button>
            <div 
              onClick={() => setIsLocationModalOpen(true)}
              className="flex items-center gap-1.5 bg-primary/10 px-4 py-2 rounded-full cursor-pointer active:scale-95 transition-transform"
            >
              <span className="material-symbols-outlined text-primary text-xl filled">location_on</span>
              <p className="text-primary text-sm font-bold tracking-tight">{city || 'Kurnool'}, AP</p>
              <span className="material-symbols-outlined text-primary text-xl">keyboard_arrow_down</span>
            </div>
            <button onClick={() => navigate('/cart')} className="flex items-center justify-center size-10 -mr-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 relative transition-colors">
              <span className="material-symbols-outlined text-2xl">shopping_cart</span>
            </button>
          </div>
          
          <h1 className="text-2xl font-bold tracking-tight mt-1 leading-tight">Find Medical Scans</h1>
          
          {/* Large Search Bar */}
          <div className="mt-1">
            <label className="flex items-center h-12 w-full bg-gray-100 dark:bg-gray-800 rounded-xl px-4 border border-transparent focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10 transition-all">
              <span className="material-symbols-outlined text-gray-500 text-xl">search</span>
              <input 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent border-none focus:ring-0 text-base ml-2 placeholder-gray-500 text-slate-900 dark:text-white h-full" 
                placeholder="Search MRI, CT scan..." 
                type="text"
              />
            </label>
          </div>
        </div>
        
        {/* Scrollable Category Chips */}
        <div className="flex gap-2 px-4 py-3 overflow-x-auto no-scrollbar">
          {/* Active: All */}
          <button 
            onClick={() => setSelectedCategory('All')}
            className={`flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full px-5 shadow-sm active:scale-95 transition-transform ${selectedCategory === 'All' ? 'bg-primary text-white shadow-lg shadow-primary/25' : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'}`}
          >
            <span className="material-symbols-outlined text-xl">grid_view</span>
            <span className="text-sm font-semibold">All</span>
          </button>
          {/* Inactive: Categories */}
          {[
            { label: 'MRI', icon: 'radiology' },
            { label: 'CT Scan', icon: 'scanner' },
            { label: 'X-Ray', icon: 'skeleton' },
            { label: 'Ultrasound', icon: 'water_drop' }
          ].map((cat) => (
            <button 
              key={cat.label} 
              onClick={() => setSelectedCategory(cat.label)}
              className={`flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full px-4 active:scale-95 transition-transform ${selectedCategory === cat.label ? 'bg-primary text-white shadow-lg' : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
            >
              <span className="material-symbols-outlined text-xl">{cat.icon}</span>
              <span className="text-sm font-semibold">{cat.label}</span>
            </button>
          ))}
        </div>
      </header>

      {/* Main Content List */}
      <main className="flex flex-col gap-4 p-4 pt-2">
        {/* Filter Summary & Sort */}
        <div className="flex justify-between items-center px-1">
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Found <span className="text-slate-900 dark:text-white font-bold">{filteredScans.length} Scans</span></p>
          <button className="flex items-center gap-1 text-primary font-bold text-sm bg-primary/10 px-3 py-1.5 rounded-lg active:bg-primary/20">
            <span className="material-symbols-outlined text-lg">sort</span>
            Sort
          </button>
        </div>

        {filteredScans.map((scan, index) => (
          <React.Fragment key={scan.id}>
             {/* Render Promo Banner after first item */}
             {index === 1 && (
               <div className="bg-gradient-to-br from-[#101922] to-[#137fec] rounded-3xl shadow-xl overflow-hidden p-6 relative min-h-[200px] border border-white/10">
                 <div className="absolute right-0 top-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
                 <div className="relative z-10 flex flex-row items-center justify-between gap-6 h-full">
                   <div className="flex flex-col justify-center flex-1">
                     <div className="bg-secondary/40 backdrop-blur-md w-fit px-3 py-1 rounded-full mb-3">
                       <p className="text-white font-black text-[9px] uppercase tracking-[0.2em]">Health Exclusive</p>
                     </div>
                     <h3 className="text-white text-2xl font-black mb-1 leading-tight tracking-tight">Full Body<br/>Diagnostic</h3>
                     <p className="text-blue-100 text-xs mb-5 font-bold opacity-90 uppercase tracking-widest">65+ Critical Markers</p>
                     <div className="flex items-baseline gap-3">
                       <span className="text-white font-black text-3xl tracking-tighter">₹999</span>
                       <span className="text-white/40 line-through text-lg font-bold">₹2,499</span>
                     </div>
                   </div>
                   <div className="w-36 h-36 bg-white rounded-3xl shadow-2xl shrink-0 overflow-hidden group">
                      <img src="https://images.unsplash.com/photo-1579152276506-44439679bb4c?auto=format&fit=crop&q=80&w=400" alt="Lab Test" className="size-full object-cover transition-transform duration-700 group-hover:scale-110" />
                   </div>
                 </div>
                 <button 
                   onClick={() => navigate('/lab-tests')}
                   className="w-full mt-6 bg-white text-slate-900 hover:bg-blue-50 active:scale-95 transition-all font-black h-14 rounded-2xl text-xs uppercase tracking-widest shadow-xl flex items-center justify-center gap-2"
                 >
                   Claim Package Now
                   <span className="material-symbols-outlined text-lg">arrow_forward</span>
                 </button>
               </div>
             )}

            <div 
              onClick={() => navigate('/scans/detail', { state: { scanId: scan.id } })}
              className="bg-white dark:bg-gray-800 rounded-[2.5rem] shadow-glass border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-float transition-all duration-300 cursor-pointer active:scale-[0.99]"
            >
              <div className="p-6 flex gap-6">
                 <div className="size-24 rounded-3xl bg-slate-50 dark:bg-gray-700 flex items-center justify-center shrink-0 shadow-inner p-4 overflow-hidden">
                    <img src={scan.image} alt={scan.name} className="size-full object-cover transition-transform duration-500 hover:scale-110" />
                 </div>
                 <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                       <div className="min-w-0">
                          <h3 className="text-lg font-black text-slate-900 dark:text-white leading-tight mb-1 truncate tracking-tight">{scan.name}</h3>
                          <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{scan.bodyPart} • {scan.variants.length} Centers</p>
                       </div>
                       <span className="shrink-0 bg-emerald-100 text-emerald-700 text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider border border-emerald-200">{scan.discount}</span>
                    </div>
                    <div className="h-px bg-slate-50 dark:bg-slate-700/50 w-full my-4"></div>
                    <div className="flex items-center justify-between">
                       <div>
                          <p className="text-[10px] text-slate-400 line-through font-bold">₹{scan.mrp}</p>
                          <p className="text-xl font-black text-slate-900 dark:text-white tracking-tighter">₹{scan.price}<span className="text-[10px] font-bold text-slate-400 ml-1 uppercase">onwards</span></p>
                       </div>
                       <button className="bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all px-6 h-10 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-sm active:scale-95">
                          Book Now
                       </button>
                    </div>
                 </div>
              </div>
            </div>
          </React.Fragment>
        ))}
      </main>

      {/* Floating Filter Button (FAB) */}
      <button className="fixed bottom-24 right-5 z-40 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full pl-5 pr-6 py-4 shadow-float flex items-center gap-3 font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all">
        <span className="material-symbols-outlined text-lg">tune</span>
        Filters
      </button>
    </div>
  );
}
