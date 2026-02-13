'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PHYSIO_SERVICES } from '@/constants';

export default function PhysiotherapyPage() {
    const router = useRouter();
    const [search, setSearch] = useState('');
    const [activeFilter, setActiveFilter] = useState('All');

    const filters = ['All', 'Ortho Care', 'Neuro Care', 'Equipment', 'Post-Op', 'Sports Rehab'];

    const filteredServices = (PHYSIO_SERVICES as any[]).filter(service => {
        const matchesSearch = service.name.toLowerCase().includes(search.toLowerCase()) ||
            service.description.toLowerCase().includes(search.toLowerCase()) ||
            service.conditions?.some((c: string) => c.toLowerCase().includes(search.toLowerCase()));

        const matchesFilter = activeFilter === 'All' || service.subCategory === activeFilter;

        return matchesSearch && matchesFilter;
    });

    return (
        <div className="min-h-screen bg-bg-light dark:bg-bg-dark font-sans text-slate-900 dark:text-white pb-24">
            {/* Sticky Header Group */}
            <div className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-sm border-b border-gray-100 dark:border-gray-800 transition-all">
                <div className="flex items-center p-4 justify-between">
                    <button onClick={() => router.back()} className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                        <span className="material-symbols-outlined text-2xl">arrow_back</span>
                    </button>
                    <div className="flex-1 ml-3">
                        <h1 className="text-xl font-bold leading-none">Physiotherapy</h1>
                        <p className="text-xs text-gray-500 font-medium mt-0.5">Experts at your doorstep</p>
                    </div>
                    <button className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                        <span className="material-symbols-outlined">tune</span>
                    </button>
                </div>

                {/* Search Bar */}
                <div className="px-4 pb-3">
                    <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-2xl px-4 py-2 border border-transparent focus-within:border-primary/30 focus-within:ring-2 focus-within:ring-primary/10 transition-all">
                        <span className="material-symbols-outlined text-gray-400 text-xl">search</span>
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search Strokes, Back Pain, TENS..."
                            className="bg-transparent border-none focus:ring-0 w-full text-sm font-medium ml-2 placeholder:text-gray-400 outline-none"
                        />
                    </div>
                </div>

                {/* Filter Chips */}
                <div className="flex gap-2 px-4 py-3 overflow-x-auto no-scrollbar pb-3 border-t border-gray-100 dark:border-gray-800">
                    {filters.map(filter => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`flex h-8 shrink-0 items-center justify-center px-4 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeFilter === filter
                                ? 'bg-primary text-white shadow-md'
                                : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-slate-600 dark:text-slate-300'
                                }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Content List */}
            <div className="flex flex-col gap-4 p-4 max-w-2xl mx-auto">
                {filteredServices.length > 0 ? (
                    filteredServices.map(service => (
                        <div
                            key={service.id}
                            className="flex flex-col rounded-3xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden transition-all hover:shadow-lg cursor-pointer active:scale-[0.99]"
                            onClick={() => router.push(`/physiotherapy/${service.id}`)}
                        >
                            <div className="w-full h-44 bg-cover bg-center relative" style={{ backgroundImage: `url('${service.image}')` }}>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                                <div className="absolute top-3 left-3 flex flex-col gap-2">
                                    <div className="bg-secondary/90 backdrop-blur text-white px-2 py-1 rounded-md text-[9px] font-black shadow-sm uppercase tracking-widest w-fit">
                                        {service.subCategory}
                                    </div>
                                    {service.isVerified && (
                                        <div className="bg-emerald-500/90 backdrop-blur text-white px-2 py-1 rounded-md text-[9px] font-black shadow-sm uppercase tracking-widest w-fit flex items-center gap-1">
                                            <span className="material-symbols-outlined text-[10px] filled">verified</span> Certified
                                        </div>
                                    )}
                                </div>

                                <div className="absolute bottom-3 left-3 text-white">
                                    <div className="flex items-center gap-1 bg-black/30 backdrop-blur-sm px-2 py-0.5 rounded-lg text-xs font-bold w-fit mb-1">
                                        <span className="material-symbols-outlined text-xs filled text-amber-400">star</span> {service.rating}
                                        <span className="text-[10px] opacity-80 font-medium">({service.reviews})</span>
                                    </div>
                                </div>

                                {service.homeVisitAvailable && (
                                    <div className="absolute top-3 right-3 bg-white/90 dark:bg-black/70 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1">
                                        <span className="material-symbols-outlined text-primary text-sm">home_health</span>
                                        <span className="text-[9px] font-black uppercase text-slate-900 dark:text-white">Home Visit</span>
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-col p-5 gap-3">
                                <div className="flex flex-col gap-1">
                                    <h3 className="text-xl font-black leading-tight text-slate-900 dark:text-white tracking-tight">{service.name}</h3>
                                    <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed line-clamp-2 font-medium">{service.description}</p>

                                    {/* Conditions Tags */}
                                    {service.conditions && (
                                        <div className="flex gap-2 mt-2 overflow-hidden">
                                            {service.conditions.slice(0, 3).map((c: string) => (
                                                <span key={c} className="text-[9px] bg-slate-50 dark:bg-slate-700 text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded border border-slate-100 dark:border-slate-600 font-bold uppercase tracking-tighter truncate">
                                                    {c}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div className="flex items-center justify-between mt-2 pt-3 border-t border-gray-100 dark:border-gray-700">
                                    <div className="flex flex-col">
                                        <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Starting @</span>
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-xl font-black text-primary">₹{service.price}</span>
                                            <span className="text-[10px] font-bold text-gray-400">/ {service.priceUnit}</span>
                                        </div>
                                    </div>
                                    <button
                                        className="h-11 px-6 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black text-xs uppercase tracking-widest shadow-xl active:scale-95 transition-all"
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-12 flex flex-col items-center gap-3 opacity-60">
                        <span className="material-symbols-outlined text-4xl">search_off</span>
                        <p className="text-sm font-bold">No services found.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
