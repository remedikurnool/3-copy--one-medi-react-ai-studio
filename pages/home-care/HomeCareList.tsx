import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HOME_CARE_SERVICES } from '../../constants';

export default function HomeCareList() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filters = ['All', 'Nursing', 'Physiotherapy', 'Lab', 'Elderly Care'];

  const filteredServices = HOME_CARE_SERVICES.filter(service => {
    const matchesFilter = filter === 'All' || service.category.includes(filter === 'Lab' ? 'Lab' : filter);
    const matchesSearch = service.title.toLowerCase().includes(search.toLowerCase()) || 
                          service.description.toLowerCase().includes(search.toLowerCase()) ||
                          (service.localTitle && service.localTitle.toLowerCase().includes(search.toLowerCase()));
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
            <h1 className="text-xl font-bold tracking-tight leading-none">Home Care Services</h1>
            <p className="text-xs text-gray-500 font-medium">Professional care at your doorstep</p>
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
              placeholder="Search services (e.g. Nursing, Dressing)"
              className="bg-transparent border-none focus:ring-0 w-full text-sm font-medium ml-2 placeholder:text-gray-400"
            />
          </div>
        </div>

        <div className="flex gap-2 px-4 py-2 overflow-x-auto no-scrollbar pb-3">
          {filters.map(f => (
            <button 
              key={f}
              onClick={() => setFilter(f)}
              className={`shrink-0 h-9 px-4 rounded-full font-bold text-xs shadow-sm transition-all active:scale-95 ${
                filter === f 
                ? 'bg-primary text-white shadow-md' 
                : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-slate-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </header>

      <main className="flex-1 px-4 py-4 space-y-4 max-w-lg mx-auto w-full">
        {filteredServices.map(service => (
          <div 
            key={service.id}
            onClick={() => navigate(`/home-care/${service.id}`)}
            className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-lg transition-all overflow-hidden border border-gray-100 dark:border-gray-700 cursor-pointer active:scale-[0.98]"
          >
            <div className="flex flex-col sm:flex-row">
              <div className="relative w-full sm:w-1/3 h-48 sm:h-auto shrink-0 bg-gray-200">
                <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                {service.plans && (
                  <div className="absolute top-3 right-3 bg-secondary text-white px-2 py-1 rounded-md text-[10px] font-bold shadow-sm">
                    {service.plans.length} PLANS
                  </div>
                )}
              </div>
              
              <div className="p-5 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-bold leading-tight">{service.title}</h3>
                      {service.localTitle && <p className="text-sm text-gray-500 font-medium mt-1">{service.localTitle}</p>}
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4 line-clamp-2">
                    {service.description}
                  </p>
                </div>
                
                <div className="mt-auto">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-blue-50 dark:bg-blue-900/30 text-primary dark:text-blue-300 px-3 py-1 rounded-lg text-sm font-bold">
                      ₹{service.price}/{service.priceUnit}
                    </span>
                    <div className="flex items-center text-amber-500 text-xs font-bold">
                      <span className="material-symbols-outlined text-sm mr-0.5 filled">star</span>
                      {service.rating}
                    </div>
                  </div>
                  <button className="w-full bg-gray-900 dark:bg-white dark:text-gray-900 hover:bg-gray-700 text-white font-bold h-12 rounded-xl text-sm shadow-md flex items-center justify-center gap-2 transition-colors">
                    <span>View Details</span>
                    <span className="material-symbols-outlined text-lg">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredServices.length === 0 && (
          <div className="text-center py-12 flex flex-col items-center gap-4">
            <div className="size-20 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400">
               <span className="material-symbols-outlined text-4xl">search_off</span>
            </div>
            <p className="text-gray-500 font-medium italic">No home care services match your search.</p>
          </div>
        )}

        <div className="text-center py-6 text-gray-400 text-sm">
          Showing {filteredServices.length} services
        </div>
      </main>
    </div>
  );
}
