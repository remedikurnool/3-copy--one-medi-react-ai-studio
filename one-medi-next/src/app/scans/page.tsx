'use client';

import React, { useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { useLocationStore } from '@/store/locationStore';
import { useMedicalScans, useScanSearch } from '@/hooks/useMedicalScans';
import { ScanCenterSkeleton } from '@/components/ui/Skeletons';
import { ScanCard } from '@/components/cards/ScanCard';
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
            {/* Sticky Header Area */}
            <header className="sticky top-0 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-sm border-b border-gray-100 dark:border-gray-800 transition-all">
                <div className="flex flex-col px-4 pt-4 pb-2 gap-3">
                    {/* Top Bar: Back, Location, Cart */}
                    <div className="flex items-center justify-between">
                        <button
                            onClick={() => router.push('/')}
                            className="flex items-center justify-center size-10 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors active:scale-95"
                        >
                            <span className="material-symbols-outlined text-2xl">arrow_back</span>
                        </button>
                        <div className="flex items-center gap-1.5 bg-primary/10 px-4 py-2 rounded-full cursor-pointer active:scale-95 transition-transform hover:bg-primary/20">
                            <span className="material-symbols-outlined text-primary text-xl filled">location_on</span>
                            <p className="text-primary text-sm font-black tracking-tight">{city || 'Kurnool'}, AP</p>
                            <span className="material-symbols-outlined text-primary text-xl">keyboard_arrow_down</span>
                        </div>
                        <button onClick={() => router.push('/cart')} className="flex items-center justify-center size-10 -mr-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 relative transition-colors active:scale-95">
                            <span className="material-symbols-outlined text-2xl">shopping_cart</span>
                        </button>
                    </div>

                    <h1 className="text-2xl font-black tracking-tight mt-1 leading-tight uppercase">Medical Scans</h1>

                    {/* Large Search Bar */}
                    <div className="mt-1">
                        <label className="flex items-center h-12 w-full bg-gray-100 dark:bg-gray-800 rounded-2xl px-4 border border-transparent focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10 transition-all">
                            <span className="material-symbols-outlined text-gray-400 text-xl">search</span>
                            <input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full bg-transparent border-none focus:ring-0 text-sm font-bold ml-2 placeholder-gray-400 text-slate-900 dark:text-white h-full outline-none"
                                placeholder="Search MRI, CT scan..."
                                type="text"
                            />
                        </label>
                    </div>
                </div>

                {/* Scrollable Category Chips */}
                <div className="flex gap-3 px-4 py-3 overflow-x-auto no-scrollbar pb-4">
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
            </header>

            {/* Main Content List */}
            <main className="flex flex-col gap-4 p-4 pt-2 max-w-lg mx-auto w-full">
                {/* Filter Summary */}
                <div className="flex justify-between items-center px-2">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        {isLoading ? 'Searching...' : `${filteredScans.length} Centers Found`}
                    </p>
                    <button className="flex items-center gap-1 text-primary font-black text-[10px] uppercase tracking-widest bg-primary/10 px-3 py-1.5 rounded-lg active:bg-primary/20 hover:bg-primary/20 transition-colors">
                        <span className="material-symbols-outlined text-sm">sort</span>
                        Sort
                    </button>
                </div>

                {isLoading ? (
                    Array(4).fill(0).map((_, i) => <ScanCenterSkeleton key={i} />)
                ) : (
                    filteredScans.map((scan: any, index: number) => (
                        <React.Fragment key={scan.id}>
                            {/* Promo Banner Position 2 */}
                            {index === 1 && !search && selectedCategory === 'All' && (
                                <div className="bg-gradient-to-br from-[#0f172a] to-[#334155] dark:from-[#000] dark:to-[#1e293b] rounded-[2rem] shadow-xl overflow-hidden p-6 relative min-h-[220px] border border-white/10 group cursor-pointer mb-2">
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
                                        <div className="size-32 bg-white rounded-2xl shadow-2xl shrink-0 overflow-hidden relative rotate-3 group-hover:rotate-6 transition-transform duration-500 border-4 border-white/10">
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
                                        className="w-full mt-6 bg-white text-slate-900 hover:bg-blue-50 active:scale-95 transition-all font-black h-12 rounded-xl text-[10px] uppercase tracking-widest shadow-lg flex items-center justify-center gap-2"
                                    >
                                        View Package
                                        <span className="material-symbols-outlined text-base">arrow_forward</span>
                                    </button>
                                </div>
                            )}

                            <ScanCard scan={scan} onClick={() => router.push(`/scans/${scan.id}`)} />
                        </React.Fragment>
                    ))
                )}

                {!isLoading && filteredScans.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 opacity-50">
                        <span className="material-symbols-outlined text-6xl mb-2">radiology</span>
                        <p className="font-bold text-sm">No scans found</p>
                    </div>
                )}
            </main>

            {/* Floating Filter Button (FAB) */}
            <button className="fixed bottom-6 right-5 z-40 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full pl-5 pr-6 py-4 shadow-float flex items-center gap-3 font-black text-[10px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all">
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
