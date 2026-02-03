'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useHomeCareServices } from '@/hooks/useServices';
import { ServiceMaster } from '@/hooks/useServices';
import PageHeader from '@/components/ui/PageHeader';

export default function HomeCareListPage() {
    const router = useRouter();
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
        <div className="min-h-screen bg-bg-light dark:bg-bg-dark text-slate-900 dark:text-white pb-24 font-sans animate-fade-in">
            <PageHeader
                title="Home Healthcare"
                subtitle="Care & Equipment at Doorstep"
                showSearch={true}
                searchValue={search}
                onSearchChange={setSearch}
                searchPlaceholder="Search Nursing, Dressing..."
                className="lg:top-20"
            />

            {/* Chips */}
            <div className="sticky top-[72px] lg:top-[144px] z-30 bg-bg-light/95 dark:bg-bg-dark/95 backdrop-blur-sm border-b border-slate-100 dark:border-gray-800">
                <div className="flex gap-2 p-4 overflow-x-auto no-scrollbar max-w-7xl mx-auto w-full">
                    {serviceFilters.map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`shrink-0 h-9 px-5 rounded-full font-bold text-xs shadow-sm transition-all active:scale-95 border ${filter === f
                                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white shadow-md'
                                : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-slate-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            <main className="flex-1 p-4 max-w-7xl mx-auto w-full">
                {loading && (
                    <div className="flex items-center justify-center py-20">
                        <div className="animate-spin rounded-full size-10 border-4 border-slate-200 border-t-primary"></div>
                    </div>
                )}

                {error && (
                    <div className="text-center py-12 text-red-500">
                        <span className="material-symbols-outlined text-4xl mb-2">error</span>
                        <p className="text-sm font-bold">Failed to load services. Please try again.</p>
                    </div>
                )}

                {!loading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredItems.map((service: ServiceMaster) => (
                            <div
                                key={service.id}
                                onClick={() => router.push(`/home-care/${service.id}`)}
                                className="group relative bg-white dark:bg-gray-800 rounded-[2rem] shadow-sm hover:shadow-xl transition-all overflow-hidden border border-slate-100 dark:border-slate-700 cursor-pointer active:scale-[0.98] hover:-translate-y-1"
                            >
                                <div className="absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity">
                                    <span className="material-symbols-outlined text-slate-300 dark:text-slate-600 group-hover:text-primary transition-colors">arrow_outward</span>
                                </div>
                                <div className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="size-16 rounded-2xl bg-slate-50 dark:bg-slate-700 flex items-center justify-center text-slate-400 dark:text-slate-300 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                            <span className="material-symbols-outlined text-3xl">
                                                {service.isHomeService ? 'home_health' : 'medical_services'}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-900/20 px-2 py-1 rounded-lg text-[10px] font-bold text-amber-600 border border-amber-100 dark:border-amber-800/30">
                                            <span className="material-symbols-outlined text-[12px] filled">star</span> 4.5
                                        </div>
                                    </div>

                                    <h3 className="text-lg font-black leading-tight mb-2 text-slate-900 dark:text-white group-hover:text-primary transition-colors line-clamp-1">{service.name}</h3>

                                    <div className="flex flex-wrap gap-2 mb-3">
                                        <span className="inline-flex items-center px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-700 text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                            {service.category}
                                        </span>
                                        {service.isHomeService && (
                                            <span className="inline-flex items-center px-2 py-1 rounded-md bg-green-50 dark:bg-green-900/20 text-[10px] font-bold uppercase tracking-wider text-green-600 border border-green-100 dark:border-green-800/30">
                                                Home Visit
                                            </span>
                                        )}
                                    </div>

                                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed line-clamp-2 h-10 mb-4">
                                        {service.description || 'Professional healthcare service available in Kurnool'}
                                    </p>

                                    <div className="flex items-center justify-between pt-4 border-t border-slate-50 dark:border-slate-700/50">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Duration</span>
                                            <span className="text-sm font-black text-slate-900 dark:text-white">
                                                {service.durationMinutes ? `${service.durationMinutes} mins` : 'Flexible'}
                                            </span>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Price</span>
                                            <span className="text-sm font-black text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded-lg">
                                                {service.price ? `₹${service.price}` : 'Contact'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {!loading && filteredItems.length === 0 && (
                    <div className="text-center py-20 flex flex-col items-center gap-4 opacity-60">
                        <div className="size-24 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-300">
                            <span className="material-symbols-outlined text-5xl">search_off</span>
                        </div>
                        <p className="text-slate-500 font-bold text-lg">No services match your filters.</p>
                        <button
                            onClick={() => { setFilter('All'); setSearch(''); }}
                            className="text-primary font-black uppercase tracking-wider text-xs hover:underline"
                        >
                            Clear Filters
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
}
