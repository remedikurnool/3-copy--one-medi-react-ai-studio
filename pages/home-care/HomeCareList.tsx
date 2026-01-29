
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHomeCareServices, ServiceMaster } from '../../hooks';

export default function HomeCareList() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  // Fetch home care services from Supabase
  const { data: homeCareServices, loading, error } = useHomeCareServices();

  const serviceFilters = ['All', 'Nursing', 'Elderly Care', 'Baby Care', 'Doctor'];

  const filteredItems = (homeCareServices || []).filter((item: ServiceMaster) => {
    // Category Filter
    let matchesFilter = true;
    if (filter !== 'All') {
      matchesFilter = item.category?.includes(filter) || item.name?.toLowerCase().includes(filter.toLowerCase());
    }

    // Search
    const matchesSearch = !search ||
      item.name?.toLowerCase().includes(search.toLowerCase()) ||
      item.description?.toLowerCase().includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
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
              placeholder="Search Nursing, Dressing..."
              className="bg-transparent border-none focus:ring-0 w-full text-sm font-medium ml-2 placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Chips */}
        <div className="flex gap-2 px-4 py-3 overflow-x-auto no-scrollbar border-t border-gray-100 dark:border-gray-800">
          {serviceFilters.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`shrink-0 h-8 px-4 rounded-full font-bold text-xs shadow-sm transition-all active:scale-95 ${filter === f
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
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent"></div>
          </div>
        )}

        {error && (
          <div className="text-center py-8 text-red-500">
            <span className="material-symbols-outlined text-4xl mb-2">error</span>
            <p className="text-sm">Failed to load services. Please try again.</p>
          </div>
        )}

        {!loading && filteredItems.map((service: ServiceMaster) => (
          <div
            key={service.id}
            onClick={() => navigate(`/home-care/${service.id}`)}
            className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-lg transition-all overflow-hidden border border-gray-100 dark:border-gray-700 cursor-pointer active:scale-[0.98]"
          >
            <div className="flex flex-row gap-4 p-4">
              <div className="relative size-24 shrink-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl overflow-hidden flex items-center justify-center">
                <span className="material-symbols-outlined text-4xl text-primary/50">
                  {service.is_home_service ? 'home_health' : 'medical_services'}
                </span>
              </div>

              <div className="flex flex-col justify-between flex-1 min-w-0">
                <div>
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-base font-bold leading-tight line-clamp-1">{service.name}</h3>
                    <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-900/20 px-1.5 py-0.5 rounded text-[10px] font-bold text-amber-600">
                      <span className="material-symbols-outlined text-[10px] filled">star</span> 4.5
                    </div>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 text-xs font-medium mb-1">{service.category}</p>

                  {service.is_home_service && (
                    <div className="inline-flex items-center gap-1 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-300 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider mb-1 w-fit border border-green-100 dark:border-green-800">
                      <span className="material-symbols-outlined text-[10px]">home</span> Home Visit
                    </div>
                  )}

                  <p className="text-gray-600 dark:text-gray-300 text-xs leading-relaxed line-clamp-2">
                    {service.description || 'Professional healthcare service available in Kurnool'}
                  </p>
                </div>

                <div className="mt-2 flex items-center justify-between">
                  <div className="text-sm font-black text-slate-900 dark:text-white">
                    {service.duration_minutes ? `${service.duration_minutes} mins` : 'Contact for pricing'}
                    <span className="text-[10px] font-medium text-gray-500 uppercase">/ {service.unit || 'session'}</span>
                  </div>
                  <button className="size-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-900 dark:text-white">
                    <span className="material-symbols-outlined text-lg">chevron_right</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {!loading && filteredItems.length === 0 && (
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
