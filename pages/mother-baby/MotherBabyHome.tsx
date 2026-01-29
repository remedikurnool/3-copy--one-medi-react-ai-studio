import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMotherBabyServices, ServiceMaster, useHealthContent } from '../../hooks';
import type { HealthContent } from '../../hooks/useContent';

const STAGES = [
  { id: 'preg', label: 'Pregnancy', icon: 'pregnant_woman', sub: 'Weeks 1-40' },
  { id: 'newborn', label: 'Newborn', icon: 'child_care', sub: '0-12 Months' },
  { id: 'toddler', label: 'Toddler', icon: 'rowing', sub: '1-5 Years' },
  { id: 'working', label: 'Working Mom', icon: 'business_center', sub: 'Care Balance' },
];

export default function MotherBabyHome() {
  const navigate = useNavigate();
  const [selectedStage, setSelectedStage] = useState('preg');
  const [search, setSearch] = useState('');

  // Fetch mother & baby services from Supabase
  const { data: motherBabyServices, loading, error } = useMotherBabyServices();

  // Fetch health content for care guides
  const { data: healthContent } = useHealthContent();
  const careGuides = (healthContent || []).slice(0, 4);

  const filteredServices = (motherBabyServices || []).filter((s: ServiceMaster) => {
    const matchesSearch = !search ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.description?.toLowerCase().includes(search.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#fffafa] dark:bg-bg-dark text-slate-900 dark:text-white pb-32 font-sans">
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-2xl border-b border-rose-100 dark:border-gray-800">
        <div className="flex items-center gap-3 p-4">
          <button onClick={() => navigate('/')} className="size-10 flex items-center justify-center rounded-full bg-rose-50 dark:bg-gray-800 text-rose-500 transition-transform active:scale-90">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <div className="flex flex-col">
            <h1 className="text-xl font-black tracking-tight text-rose-600 dark:text-rose-400 uppercase leading-none">Mother & Baby</h1>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Care Beyond Delivery</p>
          </div>
        </div>

        <div className="px-4 pb-3">
          <div className="flex items-center bg-rose-50/50 dark:bg-gray-800 rounded-2xl px-4 py-2 border border-rose-100 dark:border-gray-700 focus-within:border-rose-300 transition-all">
            <span className="material-symbols-outlined text-rose-300 text-xl">search</span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search pregnancy scans, nursing, vaccines..."
              className="bg-transparent border-none focus:ring-0 w-full text-sm font-medium ml-2 placeholder:text-rose-200"
            />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 lg:p-8 flex flex-col gap-8 animate-fade-in">

        {/* Baby Profile & Tool Shortcuts */}
        <section className="bg-gradient-to-br from-rose-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800 rounded-[2.5rem] p-6 shadow-sm border border-white dark:border-slate-800">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="size-14 rounded-full bg-white border-2 border-rose-200 p-0.5 shadow-sm overflow-hidden flex items-center justify-center">
                <span className="material-symbols-outlined text-3xl text-rose-300">child_care</span>
              </div>
              <div>
                <h3 className="font-black text-slate-900 dark:text-white leading-none">Your Baby</h3>
                <p className="text-[10px] font-black text-rose-500 uppercase tracking-widest mt-1">Track Milestones</p>
              </div>
            </div>
            <button className="size-10 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center text-slate-400 shadow-sm">
              <span className="material-symbols-outlined text-xl">edit</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => navigate('/mother-baby/vaccination-tracker')}
              className="bg-white dark:bg-gray-800 p-4 rounded-3xl flex flex-col gap-2 items-start shadow-sm hover:shadow-md transition-all active:scale-[0.98]"
            >
              <div className="size-8 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                <span className="material-symbols-outlined text-lg">vaccines</span>
              </div>
              <div className="text-left">
                <p className="text-xs font-black uppercase tracking-tight">Vaccinations</p>
                <p className="text-[9px] text-gray-400 font-bold">Track Schedule</p>
              </div>
            </button>
            <button
              className="bg-white dark:bg-gray-800 p-4 rounded-3xl flex flex-col gap-2 items-start shadow-sm hover:shadow-md transition-all active:scale-[0.98]"
            >
              <div className="size-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <span className="material-symbols-outlined text-lg">height</span>
              </div>
              <div className="text-left">
                <p className="text-xs font-black uppercase tracking-tight">Milestones</p>
                <p className="text-[9px] text-gray-400 font-bold">Track Growth</p>
              </div>
            </button>
          </div>
        </section>

        {/* Stage Selector */}
        <section>
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4 px-1">Tailored for your stage</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {STAGES.map((stage) => (
              <button
                key={stage.id}
                onClick={() => setSelectedStage(stage.id)}
                className={`flex flex-col items-center justify-center p-5 rounded-3xl border-2 transition-all duration-300 h-28 ${selectedStage === stage.id
                  ? 'bg-rose-500 border-rose-500 text-white shadow-lg shadow-rose-200 -translate-y-1'
                  : 'bg-white dark:bg-gray-800 border-rose-100 dark:border-gray-700 text-slate-600 dark:text-gray-400 hover:border-rose-200'
                  }`}
              >
                <span className="material-symbols-outlined text-3xl mb-2">{stage.icon}</span>
                <span className="text-xs font-black tracking-tight uppercase">{stage.label}</span>
                <span className={`text-[9px] font-bold ${selectedStage === stage.id ? 'opacity-80' : 'text-slate-400'}`}>{stage.sub}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-2 border-rose-500 border-t-transparent"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-8 text-red-500">
            <span className="material-symbols-outlined text-4xl mb-2">error</span>
            <p className="text-sm font-medium">Failed to load services</p>
          </div>
        )}

        {/* Dynamic Services Grid */}
        {!loading && (
          <section>
            <div className="flex justify-between items-end mb-4 px-1">
              <h3 className="text-xl font-black text-slate-900 dark:text-white leading-none">Curated Services</h3>
              <button className="text-xs font-black text-rose-500 uppercase tracking-widest">See All</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredServices.map((service: ServiceMaster) => (
                <div
                  key={service.id}
                  onClick={() => navigate(`/home-care/${service.id}`)}
                  className="bg-white dark:bg-gray-800 rounded-[2.25rem] p-5 shadow-glass border border-white dark:border-slate-800 flex gap-5 cursor-pointer active:scale-[0.99] transition-all group overflow-hidden relative"
                >
                  <div className="size-28 rounded-3xl overflow-hidden shrink-0 shadow-soft bg-gradient-to-br from-rose-100 to-pink-100 dark:from-rose-900/30 dark:to-pink-900/30 flex items-center justify-center">
                    <span className="material-symbols-outlined text-5xl text-rose-400/50">child_care</span>
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <h4 className="text-lg font-black text-slate-900 dark:text-white leading-tight mb-1 group-hover:text-rose-500 transition-colors">{service.name}</h4>
                    <p className="text-[10px] font-bold text-rose-400 uppercase tracking-widest mb-2">{service.category}</p>
                    <p className="text-[11px] text-slate-400 font-medium line-clamp-2 leading-relaxed mb-4">{service.description || 'Specialized mother & baby care service'}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-black text-slate-900 dark:text-white tracking-tighter">
                        Contact <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">for quote</span>
                      </span>
                      <button className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg active:scale-95 transition-all">Book</button>
                    </div>
                  </div>
                  {service.is_home_service && (
                    <div className="absolute top-2 right-2">
                      <span className="material-symbols-outlined text-primary text-lg filled">verified</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {filteredServices.length === 0 && (
              <div className="text-center py-12 flex flex-col items-center gap-4">
                <div className="size-20 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center text-rose-400">
                  <span className="material-symbols-outlined text-4xl">search_off</span>
                </div>
                <p className="text-gray-500 font-medium">No services found.</p>
              </div>
            )}
          </section>
        )}

        {/* Education Section */}
        {careGuides.length > 0 && (
          <section>
            <div className="flex justify-between items-end mb-4 px-1">
              <h3 className="text-xl font-black text-slate-900 dark:text-white leading-none">Education Hub</h3>
              <button onClick={() => navigate('/mother-baby/guides')} className="text-xs font-black text-rose-500 uppercase tracking-widest">Read All</button>
            </div>
            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 -mx-1 px-1">
              {careGuides.map((guide: HealthContent) => (
                <div
                  key={guide.id}
                  onClick={() => navigate('/health-feed')}
                  className="min-w-[240px] bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-sm border border-rose-50 dark:border-gray-700 group cursor-pointer"
                >
                  <div className="h-32 overflow-hidden bg-gradient-to-br from-rose-100 to-pink-100 dark:from-rose-900/30 dark:to-pink-900/30 flex items-center justify-center">
                    <span className="material-symbols-outlined text-5xl text-rose-400/50">article</span>
                  </div>
                  <div className="p-4">
                    <span className="text-[9px] font-black text-primary uppercase tracking-widest bg-primary/10 px-2 py-0.5 rounded-full mb-2 inline-block">{guide.type}</span>
                    <h4 className="text-sm font-black text-slate-900 dark:text-white leading-snug line-clamp-1">{guide.title}</h4>
                    <p className="text-[10px] text-slate-400 font-bold mt-1 line-clamp-2">{guide.category}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

      </main>

      {/* WhatsApp Action */}
      <button
        onClick={() => alert('Opening ONE MEDI Mother & Baby Care Expert Support on WhatsApp...')}
        className="fixed bottom-28 right-6 size-14 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-2xl shadow-emerald-500/40 z-40 active:scale-90 transition-transform group"
      >
        <span className="material-symbols-outlined text-3xl group-hover:scale-110 transition-transform">chat</span>
      </button>
    </div>
  );
}
