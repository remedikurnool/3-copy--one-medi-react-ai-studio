'use client';

import React, { useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { useLocationStore } from '@/store/locationStore';
import { useMedicalScans, useScanSearch } from '@/hooks/useMedicalScans';
import { ScanCenterSkeleton } from '@/components/ui/Skeletons';
import { ScanCard } from '@/components/cards/ScanCard';
import PageHeader from '@/components/ui/PageHeader';
import Image from 'next/image';

const CATEGORIES = [
    { label: 'All', icon: 'grid_view' },
    { label: 'MRI', icon: 'radiology' },
    { label: 'CT Scan', icon: 'scanner' },
    { label: 'X-Ray', icon: 'skeleton' },
    { label: 'Ultrasound', icon: 'water_drop' }
];

function ScansContent() {
    const router = useRouter();
    const { city } = useLocationStore();
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [search, setSearch] = useState('');

    // Real Database Fetching
    const { data: allScans, loading: listLoading } = useMedicalScans();
    const { data: searchResults, loading: searchLoading } = useScanSearch(search);

    const isLoading = listLoading || (search.length >= 2 && searchLoading);
    const scanList = (search.length >= 2 ? searchResults : allScans) || [];

    const filteredScans = scanList.filter((scan: any) => {
        const matchesCategory = selectedCategory === 'All' || scan.category === selectedCategory;
        return matchesCategory;
    });

    return (
        <div className="min-h-screen bg-bg-light dark:bg-bg-dark pb-32 font-sans text-slate-900 dark:text-white overflow-x-hidden">
            <PageHeader
                title="Medical Scans"
                showSearch={true}
                searchValue={search}
                onSearchChange={setSearch}
                searchPlaceholder="Search MRI, CT scan..."
                showLocation={true}
                className="lg:top-20"
            />

            {/* Categories & Main Content */}
            <main className="max-w-7xl mx-auto w-full p-4 space-y-6">

                {/* Scrollable Category Chips */}
                <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat.label}
                            onClick={() => setSelectedCategory(cat.label)}
                            className={`flex h-10 shrink-0 items-center justify-center gap-2 rounded-full px-5 active:scale-95 transition-all ${selectedCategory === cat.label
                                ? 'bg-primary text-white shadow-lg shadow-primary/30 ring-2 ring-primary/20'
                                : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-slate-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                                }`}
                        >
                            <span className="material-symbols-outlined text-lg">{cat.icon}</span>
                            <span className="text-[11px] font-black uppercase tracking-wider">{cat.label}</span>
                        </button>
                    ))}
                </div>

                {/* Filter Summary */}
                <div className="flex justify-between items-center px-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        {isLoading ? 'Searching...' : `${filteredScans.length} Centers Found`}
                    </p>
                    <button className="flex items-center gap-1 text-primary font-black text-[10px] uppercase tracking-widest bg-primary/10 px-3 py-1.5 rounded-lg active:bg-primary/20 hover:bg-primary/20 transition-colors">
                        <span className="material-symbols-outlined text-sm">sort</span>
                        Sort
                    </button>
                </div>

                {/* Grid Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {isLoading ? (
                        Array(6).fill(0).map((_, i) => <ScanCenterSkeleton key={i} />)
                    ) : (
                        <>
                            {/* Promo Banner Integrated into Grid */}
                            {!search && selectedCategory === 'All' && (
                                <div className="col-span-1 md:col-span-2 lg:col-span-2 bg-gradient-to-br from-[#0f172a] to-[#334155] dark:from-[#000] dark:to-[#1e293b] rounded-[2rem] shadow-xl overflow-hidden p-6 relative min-h-[220px] border border-white/10 group cursor-pointer">
                                    <div className="absolute right-0 top-0 size-64 bg-blue-500/10 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-blue-500/20 transition-colors"></div>
                                    <div className="relative z-10 flex flex-row items-center justify-between gap-6 h-full">
                                        <div className="flex flex-col justify-center flex-1">
                                            <div className="bg-emerald-500/20 backdrop-blur-md w-fit px-3 py-1 rounded-lg mb-3 border border-emerald-500/30">
                                                <p className="text-emerald-400 font-black text-[9px] uppercase tracking-[0.2em]">Health Checkup</p>
                                            </div>
                                            <h3 className="text-white text-2xl font-black mb-1 leading-tight tracking-tight">Full Body<br />Diagnostic</h3>
                                            <p className="text-slate-400 text-[10px] mb-5 font-bold uppercase tracking-widest">65+ Critical Markers</p>
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-white font-black text-3xl tracking-tighter">₹999</span>
                                                <span className="text-slate-500 line-through text-sm font-bold">₹2,499</span>
                                            </div>
                                        </div>
                                        <div className="size-32 bg-white rounded-2xl shadow-2xl shrink-0 overflow-hidden relative rotate-3 group-hover:rotate-6 transition-transform duration-500 border-4 border-white/10 hidden sm:block">
                                            <Image
                                                src="https://images.unsplash.com/photo-1579152276506-44439679bb4c?auto=format&fit=crop&q=80&w=400"
                                                alt="Lab Test"
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => router.push('/lab-tests')}
                                        className="w-full sm:w-auto mt-6 bg-white text-slate-900 hover:bg-blue-50 active:scale-95 transition-all font-black h-12 rounded-xl text-[10px] uppercase tracking-widest shadow-lg flex items-center justify-center gap-2 sm:px-8"
                                    >
                                        View Package
                                        <span className="material-symbols-outlined text-base">arrow_forward</span>
                                    </button>
                                </div>
                            )}

                            {filteredScans.map((scan: any) => (
                                <ScanCard key={scan.id} scan={scan} onClick={() => router.push(`/scans/${scan.id}`)} />
                            ))}
                        </>
                    )}
                </div>

                {!isLoading && filteredScans.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 opacity-50">
                        <span className="material-symbols-outlined text-6xl mb-2">radiology</span>
                        <p className="font-bold text-sm">No scans found</p>
                    </div>
                )}
            </main>

            {/* Floating Filter Button (FAB) */}
            <button className="fixed bottom-6 right-5 z-40 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full pl-5 pr-6 py-4 shadow-float flex items-center gap-3 font-black text-[10px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all lg:hidden">
                <span className="material-symbols-outlined text-lg">tune</span>
                Filters
            </button>
        </div>
    );
}

export default function ScansPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-bg-light dark:bg-bg-dark flex items-center justify-center">
                <span className="material-symbols-outlined text-4xl text-slate-300 animate-spin">sync</span>
            </div>
        }>
            <ScansContent />
        </Suspense>
    );
}
