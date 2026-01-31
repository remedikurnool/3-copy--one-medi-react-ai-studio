'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocationStore } from '../../store/locationStore';
import LocationModal from '../../components/ui/LocationModal';
import { ServiceCardSkeleton } from '../../components/ui/Skeletons';
import { useLabTests, useLabTestSearch } from '../../hooks/useLabTests';
import { LabTestCard } from '../../components/cards/LabTestCard';

const CATEGORIES = [
    { label: 'All', icon: 'grid_view' },
    { label: 'Full Body', icon: 'accessibility_new' },
    { label: 'Diabetes', icon: 'water_drop' },
    { label: 'Thyroid', icon: 'science' },
    { label: 'Fever', icon: 'thermometer' },
    { label: 'Women Health', icon: 'pregnant_woman' },
];

export default function LabTestListPage() {
    const router = useRouter();
    const { city } = useLocationStore();
    const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [selectedCat, setSelectedCat] = useState('All');

    const { data: allLabTests, loading: listLoading } = useLabTests();
    const { data: searchResults, loading: searchLoading } = useLabTestSearch(search);

    const isLoading = listLoading || (search.length >= 2 && searchLoading);
    const labTests = (search.length >= 2 ? searchResults : allLabTests) || [];

    const filteredTests = labTests.filter(test => {
        return selectedCat === 'All' || test.category === selectedCat;
    });

    return (
        <div className="min-h-screen bg-bg-light dark:bg-bg-dark text-slate-900 dark:text-white pb-32 font-sans relative overflow-x-hidden">
            <LocationModal isOpen={isLocationModalOpen} onClose={() => setIsLocationModalOpen(false)} />

            <header className="sticky top-0 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 shadow-sm transition-all pb-4">
                <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                        <button onClick={() => router.push('/')} className="bg-slate-100 dark:bg-slate-800 p-2.5 rounded-full text-slate-900 dark:text-white hover:bg-slate-200 transition-colors active:scale-95">
                            <span className="material-symbols-outlined text-2xl">arrow_back</span>
                        </button>
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Diagnostics</span>
                            <div onClick={() => setIsLocationModalOpen(true)} className="flex items-center gap-1 cursor-pointer hover:text-primary transition-colors">
                                <h1 className="text-lg font-black leading-none">{city || 'Kurnool'}</h1>
                                <span className="material-symbols-outlined text-lg">expand_more</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="px-4 mb-4">
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400">search</span>
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full h-12 pl-12 pr-4 rounded-xl border-none bg-gray-100 dark:bg-gray-800 focus:ring-2 focus:ring-primary transition-all font-semibold text-sm outline-none"
                            placeholder="Search tests (e.g. CBC, Thyroid)..."
                        />
                    </div>
                </div>

                <div className="flex gap-3 px-4 overflow-x-auto no-scrollbar scroll-pl-4">
                    {CATEGORIES.map((c) => (
                        <button
                            key={c.label}
                            onClick={() => setSelectedCat(c.label)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all active:scale-95 whitespace-nowrap ${selectedCat === c.label
                                    ? 'bg-teal-600 text-white border-teal-600 shadow-lg shadow-teal-500/30'
                                    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-slate-600 dark:text-gray-300'
                                }`}
                        >
                            <span className="material-symbols-outlined text-lg">{c.icon}</span>
                            <span className="text-[11px] font-black uppercase tracking-wider">{c.label}</span>
                        </button>
                    ))}
                </div>
            </header>

            <main className="p-4 flex flex-col gap-4 max-w-lg mx-auto w-full">
                <div className="flex justify-between items-center px-1 mb-2">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                        {isLoading ? 'Loading...' : `${filteredTests.length} Tests Available`}
                    </p>
                </div>

                {isLoading ? (
                    Array(4).fill(0).map((_, i) => <ServiceCardSkeleton key={i} />)
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {filteredTests.map((test) => (
                            <LabTestCard
                                key={test.id}
                                test={test}
                                onClick={() => router.push(`/lab-tests/${test.id}`)}
                            />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
