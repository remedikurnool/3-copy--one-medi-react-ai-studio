'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useWellnessPlans } from '@/hooks/useServices';
import type { ServiceMaster } from '@/hooks/useServices';
import PageHeader from '@/components/ui/PageHeader';

export default function WellnessPage() {
    const router = useRouter();
    const [search, setSearch] = useState('');

    const { data: services, loading, error } = useWellnessPlans();

    const filteredServices = (services || []).filter((s: ServiceMaster) =>
        !search ||
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.description?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-surface-50 dark:bg-surface-950 text-slate-900 dark:text-white pb-24 font-sans animate-fade-in">
            <PageHeader
                title="Wellness Programs"
                subtitle="Your Health Partner"
                showSearch={true}
                searchValue={search}
                onSearchChange={setSearch}
                searchPlaceholder="Search wellness programs..."
                className="lg:top-20"
            />

            <main className="flex-1 p-4 max-w-7xl mx-auto w-full">
                {loading && (
                    <div className="flex items-center justify-center py-20">
                        <div className="animate-spin rounded-full size-10 border-4 border-slate-200 border-t-primary"></div>
                    </div>
                )}

                {error && (
                    <div className="text-center py-12 text-red-500">
                        <span className="material-symbols-outlined text-4xl mb-2">error</span>
                        <p className="text-sm font-bold">Failed to load wellness programs.</p>
                    </div>
                )}

                {!loading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up">
                        {filteredServices.map((service: ServiceMaster) => (
                            <div
                                key={service.id}
                                onClick={() => router.push(`/home-care/${service.id}`)} // Redirect to specific page logic if separate wellness detail exists
                                className="group relative card-modern h-full cursor-pointer flex flex-col p-0 overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity z-10">
                                    <span className="material-symbols-outlined text-slate-300 dark:text-slate-600 group-hover:text-primary transition-colors">arrow_outward</span>
                                </div>

                                <div className="p-6 flex flex-col h-full">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="size-16 rounded-2xl bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 flex items-center justify-center text-green-500 shadow-inner">
                                            <span className="material-symbols-outlined text-4xl">spa</span>
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-black leading-tight mb-2 text-slate-900 dark:text-white group-hover:text-primary transition-colors line-clamp-2">
                                        {service.name}
                                    </h3>

                                    <div className="mb-4">
                                        <span className="inline-flex items-center px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-700 text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                            {service.category || 'Wellness'}
                                        </span>
                                    </div>

                                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed line-clamp-3 mb-6 flex-1">
                                        {service.description || 'Comprehensive wellness and lifestyle management program designed for your health goals.'}
                                    </p>

                                    <div className="mt-auto pt-4 border-t border-slate-50 dark:border-slate-700/50 flex items-center justify-between">
                                        <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Pricing</span>
                                        <button className="flex items-center gap-1 text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                                            Contact Us <span className="material-symbols-outlined text-sm">chevron_right</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {!loading && filteredServices.length === 0 && (
                    <div className="text-center py-20 flex flex-col items-center gap-4 opacity-60">
                        <div className="size-24 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                            <span className="material-symbols-outlined text-5xl">spa</span>
                        </div>
                        <p className="text-slate-500 font-bold text-lg">No wellness programs found.</p>
                        <button
                            onClick={() => setSearch('')}
                            className="text-primary font-black uppercase tracking-wider text-xs hover:underline"
                        >
                            View All Programs
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
}
