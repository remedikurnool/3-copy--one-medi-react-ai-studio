'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocationStore } from '@/store/locationStore';
import LocationModal from '@/components/ui/LocationModal';
import { ServiceCardSkeleton } from '@/components/ui/Skeletons';
import { useLabTests, useLabTestSearch } from '@/hooks/useLabTests';
import { LabTestCard } from '@/components/cards/LabTestCard';
import PageHeader from '@/components/ui/PageHeader';

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

            {/* Unified Page Header */}
            <PageHeader
                title="Diagnostics"
                showLocation={true}
                showSearch={true}
                searchPlaceholder="Search tests (e.g. CBC, Thyroid)..."
                searchValue={search}
                onSearchChange={setSearch}
                onLocationClick={() => setIsLocationModalOpen(true)}
                className="lg:top-20"
            />

            {/* Category selection */}
            <div className="sticky top-[136px] md:top-[88px] z-30 bg-bg-light/95 dark:bg-bg-dark/95 backdrop-blur-sm py-4 border-b border-gray-100 dark:border-gray-800 mb-6 transition-all">
                <div className="flex gap-3 px-4 max-w-7xl mx-auto overflow-x-auto no-scrollbar scroll-pl-4">
                    {CATEGORIES.map((c) => (
                        <button
                            key={c.label}
                            onClick={() => setSelectedCat(c.label)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all active:scale-95 whitespace-nowrap outline-none ${selectedCat === c.label
                                ? 'bg-primary text-white border-primary shadow-lg shadow-primary/30'
                                : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-slate-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                                }`}
                        >
                            <span className="material-symbols-outlined text-lg">{c.icon}</span>
                            <span className="text-[11px] font-black uppercase tracking-wider">{c.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* List */}
            <main className="p-4 flex flex-col gap-4 max-w-7xl mx-auto w-full">
                <div className="flex justify-between items-center px-1 mb-2">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                        {isLoading ? 'Loading...' : `${filteredTests.length} Tests Available`}
                    </p>
                </div>

                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {Array(8).fill(0).map((_, i) => <ServiceCardSkeleton key={i} />)}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                        {filteredTests.map((test) => (
                            <LabTestCard
                                key={test.id}
                                test={test}
                                onClick={() => router.push(`/lab-tests/${test.id}`)}
                                className="w-full"
                            />
                        ))}
                    </div>
                )}

                {!isLoading && filteredTests.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="size-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                            <span className="material-symbols-outlined text-4xl text-gray-400">biotech</span>
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">No Tests Found</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 max-w-xs mx-auto">
                            We couldn't find any lab tests matching your criteria.
                        </p>
                        <button
                            onClick={() => { setSearch(''); setSelectedCat('All'); }}
                            className="mt-6 px-6 py-2 bg-primary/10 text-primary rounded-xl font-bold text-sm hover:bg-primary hover:text-white transition-all"
                        >
                            Clear Filters
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
}
