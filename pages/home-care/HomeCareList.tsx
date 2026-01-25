
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HOME_CARE_SERVICES } from '../../constants';

export default function HomeCareList() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'Services' | 'Equipment'>('Services');
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const serviceFilters = ['All', 'Nursing', 'Elderly Care', 'Baby Care', 'Doctor'];
  const equipmentFilters = ['All', 'Respiratory', 'Furniture', 'Mobility', 'ICU'];

  const filteredItems = HOME_CARE_SERVICES.filter(item => {
    // 1. Tab Filter (Service vs Equipment)
    const isEquipment = item.category === 'Medical Equipment' || item.category === 'Critical Care'; // Basic check based on data
    const matchesTab = activeTab === 'Equipment' ? isEquipment : !isEquipment;

    // 2. Category Filter
    let matchesFilter = true;
    if (filter !== 'All') {
        if (activeTab === 'Services') {
            matchesFilter = item.category.includes(filter) || item.type === filter;
        } else {
            matchesFilter = item.subCategory?.includes(filter) || false;
        }
    }

    // 3. Search
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) || 
                          item.description.toLowerCase().includes(search.toLowerCase()) ||
                          (item.localTitle && item.localTitle.toLowerCase().includes(search.toLowerCase()));

    return matchesTab && matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark text-slate-900 dark:text-white pb-24 font-sans">
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-sm border-b border-gray-100 dark:border-gray-800 transition-all">
        <div className="flex items-center gap-3 px-4 py-3">
          <button onClick={() => navigate('/')} className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <span className="material-symbols-outlined text-2xl">arrow_back</span>
          </button>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold tracking-tight leading-none">Home Healthcare</h1>
            <p className="text-xs text-gray-500 font-medium">Care & Equipment at Doorstep</p>
          </div>
        </div>

        {/* Search Bar Section */}
        <div className="px-4 pb-3">
          <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-2xl px-4 py-2 border border-transparent focus-within:border-primary/30 focus-within:ring-2 focus-within:ring-primary/10 transition-all">
            <span className="material-symbols-outlined text-gray-400 text-xl">search</span>
            <input 
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={activeTab === 'Services' ? "Search Nursing, Dressing..." : "Search Beds, Oxygen..."}
              className="bg-transparent border-none focus:ring-0 w-full text-sm font-medium ml-2 placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Top Tabs */}
        <div className="flex px-4 pb-2">
            <button 
              onClick={() => { setActiveTab('Services'); setFilter('All'); }}
              className={`flex-1 py-2 text-sm font-bold border-b-2 transition-colors ${activeTab === 'Services' ? 'border-primary text-primary' : 'border-transparent text-gray-500'}`}
            >
                Care Services
            </button>
            <button 
              onClick={() => { setActiveTab('Equipment'); setFilter('All'); }}
              className={`flex-1 py-2 text-sm font-bold border-b-2 transition-colors ${activeTab === 'Equipment' ? 'border-primary text-primary' : 'border-transparent text-gray-500'}`}
            >
                Medical Equipment
            </button>
        </div>

        {/* Chips */}
        <div className="flex gap-2 px-4 py-3 overflow-x-auto no-scrollbar border-t border-gray-100 dark:border-gray-800">
          {(activeTab === 'Services' ? serviceFilters : equipmentFilters).map(f => (
            <button 
              key={f}
              onClick={() => setFilter(f)}
              className={`shrink-0 h-8 px-4 rounded-full font-bold text-xs shadow-sm transition-all active:scale-95 ${
                filter === f 
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900' 
                : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-slate-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </header>

      <main className="flex-1 px-4 py-4 space-y-4 max-w-lg mx-auto w-full">
        {filteredItems.map(service => (
          <div 
            key={service.id}
            onClick={() => navigate(`/home-care/${service.id}`)}
            className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-lg transition-all overflow-hidden border border-gray-100 dark:border-gray-700 cursor-pointer active:scale-[0.98]"
          >
            <div className="flex flex-row gap-4 p-4">
              <div className="relative size-24 shrink-0 bg-gray-200 rounded-xl overflow-hidden">
                <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                {activeTab === 'Equipment' && (
                    <div className="absolute bottom-0 left-0 w-full bg-black/60 text-white text-[9px] font-bold text-center py-0.5">
                        RENT / BUY
                    </div>
                )}
              </div>
              
              <div className="flex flex-col justify-between flex-1 min-w-0">
                <div>
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-base font-bold leading-tight line-clamp-1">{service.title}</h3>
                    <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-900/20 px-1.5 py-0.5 rounded text-[10px] font-bold text-amber-600">
                        <span className="material-symbols-outlined text-[10px] filled">star</span> {service.rating}
                    </div>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 text-xs font-medium mb-1">{service.subCategory || service.category}</p>
                  
                  {service.genderPreferenceAvailable && (
                    <div className="inline-flex items-center gap-1 bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-300 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider mb-1 w-fit border border-pink-100 dark:border-pink-800">
                        <span className="material-symbols-outlined text-[10px]">female</span> Female Staff
                    </div>
                  )}

                  <p className="text-gray-600 dark:text-gray-300 text-xs leading-relaxed line-clamp-2">
                    {service.description}
                  </p>
                </div>
                
                <div className="mt-2 flex items-center justify-between">
                  <div className="text-sm font-black text-slate-900 dark:text-white">
                    ₹{service.price} <span className="text-[10px] font-medium text-gray-500 uppercase">/ {service.priceUnit}</span>
                  </div>
                  <button className="size-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-900 dark:text-white">
                    <span className="material-symbols-outlined text-lg">chevron_right</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredItems.length === 0 && (
          <div className="text-center py-12 flex flex-col items-center gap-4">
            <div className="size-20 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400">
               <span className="material-symbols-outlined text-4xl">search_off</span>
            </div>
            <p className="text-gray-500 font-medium italic">No services match your filters.</p>
          </div>
        )}
      </main>
    </div>
  );
}
