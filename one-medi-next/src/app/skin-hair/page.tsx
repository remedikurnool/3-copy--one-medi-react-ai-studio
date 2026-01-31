'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSkinHairTreatments } from '@/hooks/useServices';
import type { ServiceMaster } from '@/hooks/useServices';

export default function SkinHairPage() {
    const router = useRouter();
    const [search, setSearch] = useState('');

    const { data: services, loading, error } = useSkinHairTreatments();

    const filteredServices = (services || []).filter((s: ServiceMaster) =>
        !search ||
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.description?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-bg-light dark:bg-bg-dark text-slate-900 dark:text-white pb-24 font-sans animate-fade-in">
            <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-sm border-b border-gray-100 dark:border-gray-800 transition-all">
                <div className="flex items-center gap-3 px-4 py-3">
                    <button onClick={() => router.back()} className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                        <span className="material-symbols-outlined text-2xl">arrow_back</span>
                    </button>
                    <div className="flex flex-col">
                        <h1 className="text-xl font-bold tracking-tight leading-none">Skin & Hair Care</h1>
                        <p className="text-xs text-gray-500 font-medium">Expert Dermatology</p>
                    </div>
                </div>

                <div className="px-4 pb-3">
                    <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-2xl px-4 py-2 border border-transparent focus-within:border-primary/30 transition-all">
                        <span className="material-symbols-outlined text-gray-400 text-xl">search</span>
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search skin & hair treatments..."
                            className="bg-transparent border-none focus:ring-0 w-full text-sm font-medium ml-2 placeholder:text-gray-400 focus:outline-none"
                        />
                    </div>
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
                        <p className="text-sm">Failed to load services</p>
                    </div>
                )}

                {!loading && filteredServices.map((service: ServiceMaster) => (
                    <div
                        key={service.id}
                        onClick={() => router.push(`/home-care/${service.id}`)}
                        className="group bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-lg transition-all overflow-hidden border border-gray-100 dark:border-gray-700 cursor-pointer active:scale-[0.98]"
                    >
                        <div className="flex flex-row gap-4 p-4">
                            <div className="relative size-24 shrink-0 bg-gradient-to-br from-pink-400/20 to-rose-400/20 rounded-xl overflow-hidden flex items-center justify-center">
                                <span className="material-symbols-outlined text-4xl text-pink-500/50">face</span>
                            </div>

                            <div className="flex flex-col justify-between flex-1 min-w-0">
                                <div>
                                    <h3 className="text-base font-bold leading-tight line-clamp-1">{service.name}</h3>
                                    <p className="text-gray-500 dark:text-gray-400 text-xs font-medium mb-1">{service.category}</p>
                                    <p className="text-gray-600 dark:text-gray-300 text-xs leading-relaxed line-clamp-2">
                                        {service.description || 'Professional skin and hair care treatment'}
                                    </p>
                                </div>

                                <div className="mt-2 flex items-center justify-between">
                                    <div className="text-sm font-black text-slate-900 dark:text-white">
                                        Contact for pricing
                                    </div>
                                    <button className="size-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-900 dark:text-white">
                                        <span className="material-symbols-outlined text-lg">chevron_right</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {!loading && filteredServices.length === 0 && (
                    <div className="text-center py-12 flex flex-col items-center gap-4">
                        <div className="size-20 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400">
                            <span className="material-symbols-outlined text-4xl">search_off</span>
                        </div>
                        <p className="text-gray-500 font-medium">No services found.</p>
                    </div>
                )}
            </main>
        </div>
    );
}
