'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMotherBabyServices } from '@/hooks/useServices';
import type { ServiceMaster } from '@/hooks/useServices';

// Components
import StageSelector, { StageId } from '@/components/mother-baby/StageSelector';
import DynamicHero from '@/components/mother-baby/DynamicHero';
import ToolsGrid from '@/components/mother-baby/ToolsGrid';
import ProfileSection from '@/components/mother-baby/ProfileSection';
import ExpertsSection from '@/components/mother-baby/ExpertsSection';
import TrustTips from '@/components/mother-baby/TrustTips';
import ProductsCarousel from '@/components/mother-baby/ProductsCarousel';
import VaccinationSection from '@/components/mother-baby/VaccinationSection';
import CareTakersList from '@/components/mother-baby/CareTakersList';

export default function MotherBabyHomePage() {
    const router = useRouter();
    const [selectedStage, setSelectedStage] = useState<StageId>('preg');
    const [search, setSearch] = useState('');

    // Fetch mother & baby services from Supabase
    const { data: motherBabyServices, loading, error } = useMotherBabyServices();

    const filteredServices = (motherBabyServices || []).filter((s: ServiceMaster) => {
        // 1. Basic search filter
        const matchesSearch = !search ||
            s.name.toLowerCase().includes(search.toLowerCase()) ||
            s.description?.toLowerCase().includes(search.toLowerCase());

        // 2. Stage Filtering Logic (Simulated based on keywords)
        // In a real app, 'ServiceMaster' would have a 'tags' or 'applicable_stages' array.
        let matchesStage = true;

        if (!search) { // Only apply stage filtering if not explicitly searching
            const lowerName = s.name.toLowerCase();

            switch (selectedStage) {
                case 'preg':
                    matchesStage = lowerName.includes('scan') || lowerName.includes('pregnan') || lowerName.includes('maternity') || lowerName.includes('antenatal') || lowerName.includes('fetal');
                    break;
                case 'newborn':
                    matchesStage = lowerName.includes('baby') || lowerName.includes('vaccin') || lowerName.includes('lactation') || lowerName.includes('newborn') || lowerName.includes('nurse') || lowerName.includes('pediatric');
                    break;
                case 'toddler':
                    matchesStage = lowerName.includes('nutri') || lowerName.includes('diet') || lowerName.includes('growth') || lowerName.includes('child') || lowerName.includes('speech');
                    break;
                case 'working':
                    matchesStage = lowerName.includes('therapy') || lowerName.includes('counsel') || lowerName.includes('mental') || lowerName.includes('stress') || lowerName.includes('physio');
                    break;
            }
        }

        return matchesSearch && matchesStage;
    });

    return (
        <div className="min-h-screen bg-[#fffafa] dark:bg-bg-dark text-slate-900 dark:text-white pb-32 font-sans animate-fade-in relative">

            {/* Header */}
            <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-2xl border-b border-rose-100 dark:border-gray-800">
                <div className="flex items-center gap-3 p-4 max-w-7xl mx-auto">
                    <button onClick={() => router.back()} className="size-10 flex items-center justify-center rounded-full bg-rose-50 dark:bg-gray-800 text-rose-500 transition-transform active:scale-90 hover:bg-rose-100">
                        <span className="material-symbols-outlined">arrow_back</span>
                    </button>
                    <div className="flex flex-col">
                        <h1 className="text-xl font-black tracking-tight text-rose-600 dark:text-rose-400 uppercase leading-none">Mother & Baby</h1>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5">Care Beyond Delivery</p>
                    </div>
                    <div className="flex-1"></div>
                    <div className="size-10 rounded-full bg-slate-100 dark:bg-gray-800 flex items-center justify-center text-slate-600 relative">
                        <span className="material-symbols-outlined">notifications</span>
                        <span className="absolute top-2 right-2 size-2 bg-rose-500 rounded-full border-2 border-white"></span>
                    </div>
                </div>

                <div className="px-4 pb-3 max-w-7xl mx-auto">
                    <StageSelector currentStage={selectedStage} onSelectStage={setSelectedStage} />
                </div>
            </header>

            <main className="max-w-7xl mx-auto p-4 lg:p-6 flex flex-col gap-6">

                {/* Dynamic Hero */}
                <DynamicHero stage={selectedStage} />

                {/* Profiles */}
                <ProfileSection />

                {/* Trust & Tips */}
                <TrustTips />

                {/* Dedicated Vaccination Section (Prominent only for Newborn/Toddler/Working) - Or always show but distinct */}
                {(selectedStage === 'newborn' || selectedStage === 'toddler') && (
                    <VaccinationSection />
                )}

                {/* Tools Grid */}
                <ToolsGrid />

                {/* Products */}
                <ProductsCarousel stage={selectedStage} />

                {/* Experts */}
                <ExpertsSection />

                {/* Care Takers */}
                <CareTakersList />

                {/* Services Section */}

                {/* Services Section */}
                <section>
                    <div className="flex justify-between items-end mb-4 px-1">
                        <h3 className="text-xl font-black text-slate-900 dark:text-white leading-none">Care Programs</h3>
                        <div className="flex items-center gap-2">
                            <div className="flex items-center bg-white dark:bg-gray-800 rounded-full px-3 py-1.5 border border-slate-200 dark:border-gray-700 shadow-sm">
                                <span className="material-symbols-outlined text-slate-400 text-base">search</span>
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search services..."
                                    className="bg-transparent border-none focus:ring-0 w-24 text-xs font-medium ml-1 placeholder:text-slate-400 focus:outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Loading State */}
                    {loading && (
                        <div className="flex items-center justify-center py-12">
                            <div className="animate-spin rounded-full h-10 w-10 border-2 border-rose-500 border-t-transparent"></div>
                        </div>
                    )}

                    {/* Error State */}
                    {error && (
                        <div className="text-center py-8 text-red-500 bg-red-50 rounded-3xl">
                            <span className="material-symbols-outlined text-4xl mb-2">error</span>
                            <p className="text-sm font-medium">Failed to load services</p>
                        </div>
                    )}

                    {!loading && !error && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {filteredServices.map((service: ServiceMaster) => (
                                <div
                                    key={service.id}
                                    onClick={() => router.push(`/home-care/${service.id}`)}
                                    className="bg-white dark:bg-gray-800 rounded-[2.25rem] p-5 shadow-glass border border-white dark:border-slate-800 flex gap-5 cursor-pointer active:scale-[0.99] transition-all group overflow-hidden relative hover:shadow-xl hover:border-rose-100"
                                >
                                    <div className="size-28 rounded-[1.5rem] overflow-hidden shrink-0 shadow-soft bg-gradient-to-br from-rose-100 to-pink-50 dark:from-rose-900/30 dark:to-pink-900/30 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                                        <span className="material-symbols-outlined text-5xl text-rose-400/50 group-hover:text-rose-400 transition-colors">child_care</span>
                                    </div>
                                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-gray-700 text-[9px] font-black uppercase tracking-wider text-slate-500">{service.category}</span>
                                            {service.isHomeService && (
                                                <span className="px-2 py-0.5 rounded-full bg-teal-50 dark:bg-teal-900/30 text-[9px] font-black uppercase tracking-wider text-teal-600 flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-[10px]">home</span> Home
                                                </span>
                                            )}
                                        </div>
                                        <h4 className="text-lg font-black text-slate-900 dark:text-white leading-tight mb-2 group-hover:text-rose-500 transition-colors">{service.name}</h4>
                                        <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium line-clamp-2 leading-relaxed mb-4">{service.description || 'Specialized mother & baby care service designed for your comfort and safety.'}</p>
                                        <div className="flex items-center justify-between mt-auto">
                                            <span className="text-sm font-black text-slate-900 dark:text-white tracking-tight flex items-baseline gap-1">
                                                Start <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">Quote</span>
                                            </span>
                                            <button className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-slate-900/10 active:scale-95 transition-all group-hover:bg-rose-500 group-hover:text-white group-hover:shadow-rose-200">Book Now</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {!loading && filteredServices.length === 0 && (
                        <div className="text-center py-16 flex flex-col items-center gap-4 bg-white dark:bg-gray-800 rounded-[2.5rem] border border-dashed border-slate-200">
                            <div className="size-20 rounded-full bg-slate-50 dark:bg-gray-700 flex items-center justify-center text-slate-300">
                                <span className="material-symbols-outlined text-4xl">search_off</span>
                            </div>
                            <div>
                                <h4 className="text-slate-900 dark:text-white font-bold mb-1">No services found for this stage</h4>
                                <p className="text-gray-500 text-sm font-medium">Try changing the stage or search for a specific service.</p>
                            </div>
                        </div>
                    )}
                </section>
            </main>

            {/* Sticky Actions Bar */}
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-slate-900/90 dark:bg-white/90 backdrop-blur-xl text-white dark:text-slate-900 py-3 px-6 rounded-full shadow-2xl flex items-center gap-6 border border-white/10 dark:border-slate-900/10">
                <button className="flex flex-col items-center gap-0.5 group">
                    <span className="material-symbols-outlined text-xl group-hover:text-rose-400 transition-colors">calendar_month</span>
                    <span className="text-[9px] font-black uppercase tracking-widest">Book</span>
                </button>
                <div className="w-px h-8 bg-white/20 dark:bg-slate-900/20"></div>
                <button className="flex flex-col items-center gap-0.5 group">
                    <span className="material-symbols-outlined text-xl group-hover:text-rose-400 transition-colors">support_agent</span>
                    <span className="text-[9px] font-black uppercase tracking-widest">Expert</span>
                </button>
                <div className="w-px h-8 bg-white/20 dark:bg-slate-900/20"></div>
                <button className="flex flex-col items-center gap-0.5 group">
                    <span className="material-symbols-outlined text-xl group-hover:text-rose-400 transition-colors">chat</span>
                    <span className="text-[9px] font-black uppercase tracking-widest">Chat</span>
                </button>
            </div>

            {/* Help Button */}
            <button className="fixed bottom-28 right-6 size-12 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/40 z-30 active:scale-90 transition-transform animate-bounce-subtle">
                <span className="material-symbols-outlined text-2xl">whatsapp</span>
            </button>
        </div>
    );
}
