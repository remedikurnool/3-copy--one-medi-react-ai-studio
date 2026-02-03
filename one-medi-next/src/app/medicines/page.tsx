'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCartStore } from '@/store/cartStore';
import { MedicineCardSkeleton } from '@/components/ui/Skeletons';
import { useMedicines, useMedicineSearch } from '@/hooks/useMedicines';
import { MedicineCard } from '@/components/cards/MedicineCard';
import PageHeader from '@/components/ui/PageHeader';
import { useLocationStore } from '@/store/locationStore';
import LocationModal from '@/components/ui/LocationModal';

const CATEGORY_GRID = [
    { name: 'Pain Relief', icon: 'health_and_safety', filter: 'Pain Relief', color: 'text-red-500' },
    { name: 'Diabetes', icon: 'bloodtype', filter: 'Diabetes', color: 'text-blue-500' },
    { name: 'Cardiac', icon: 'cardiology', filter: 'Cardiac', color: 'text-indigo-500' },
    { name: 'Stomach', icon: 'digestive', filter: 'Stomach Care', color: 'text-green-500' },
    { name: 'Vitamins', icon: 'nutrition', filter: 'Vitamins', color: 'text-teal-500' },
    { name: 'Skin Care', icon: 'dermatology', filter: 'Skin Care', color: 'text-pink-500' },
];

const CONCERNS = [
    { id: 'c_skin', label: 'Dark Spots', query: 'Melasma', image: 'https://images.unsplash.com/photo-1554151228-14d9def656ec?auto=format&fit=crop&q=80&w=200' },
    { id: 'c_hair', label: 'Hair Loss', query: 'Hair Loss', image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80&w=200' },
    { id: 'c_pain', label: 'Joint Pain', query: 'Pain', image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=200' },
    { id: 'c_fever', label: 'Fever', query: 'Fever', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=200' },
    { id: 'c_baby', label: 'Baby Colic', query: 'Baby', image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=200' },
];

function MedicinesContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const cartItemsCount = useCartStore((state) => state.items.length);
    const { city } = useLocationStore();
    const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(searchParams.get('cat') || 'All');
    const [selectedConcern, setSelectedConcern] = useState<string | null>(null);

    // Real Database Fetching
    const { data: allMedicines, loading: listLoading } = useMedicines();
    const { data: searchResults, loading: searchLoading } = useMedicineSearch(search);

    const isLoading = listLoading || (search.length >= 2 && searchLoading);
    const medicines = (search.length >= 2 ? searchResults : allMedicines) || [];

    useEffect(() => {
        const cat = searchParams.get('cat');
        if (cat) {
            if (cat === 'diabetes') setSelectedCategory('Diabetes');
            else if (cat === 'cardiac') setSelectedCategory('Cardiac');
            else if (cat === 'pain') setSelectedCategory('Pain Relief');
            else if (cat === 'stomach') setSelectedCategory('Stomach Care');
            else if (cat === 'supplements') setSelectedCategory('Vitamins');
            else setSelectedCategory(cat.charAt(0).toUpperCase() + cat.slice(1));
        }
    }, [searchParams]);

    const toggleCategory = (cat: string) => {
        if (selectedCategory === cat && !selectedConcern) {
            if (cat !== 'All') setSelectedCategory('All');
        } else {
            setSelectedCategory(cat);
            setSelectedConcern(null);
        }
    };

    const toggleConcern = (query: string) => {
        if (selectedConcern === query) {
            setSelectedConcern(null);
        } else {
            setSelectedConcern(query);
            setSelectedCategory('All');
        }
    };

    const filteredMedicines = medicines.filter((med: any) => {
        const matchesCategory = selectedCategory === 'All' || (med.category && med.category.toLowerCase() === selectedCategory.toLowerCase());
        const matchesConcern = !selectedConcern ||
            (med.indications && med.indications.some((i: string) => i.toLowerCase().includes(selectedConcern.toLowerCase()))) ||
            (med.category && med.category.toLowerCase().includes(selectedConcern.toLowerCase()));
        return matchesCategory && matchesConcern;
    });

    return (
        <div className="flex flex-col min-h-screen bg-bg-light dark:bg-bg-dark font-sans animate-fade-in pb-24 text-slate-900 dark:text-white">
            <LocationModal isOpen={isLocationModalOpen} onClose={() => setIsLocationModalOpen(false)} />

            {/* Unified Page Header */}
            <PageHeader
                title="Pharmacy"
                showLocation={true}
                showSearch={true}
                searchPlaceholder="Search Dolo, Metformin..."
                searchValue={search}
                onSearchChange={setSearch}
                onLocationClick={() => setIsLocationModalOpen(true)}
                className="lg:top-20"
            />

            {/* Shop by Concern Section */}
            <section className="px-4 py-4 border-b border-gray-100 dark:border-gray-800/50">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Shop by Concern</h3>
                <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 snap-x snap-mandatory">
                    {CONCERNS.map((concern) => (
                        <button
                            key={concern.id}
                            onClick={() => toggleConcern(concern.query)}
                            className="snap-start flex flex-col items-center gap-2 shrink-0 group min-w-[60px]"
                        >
                            <div className={`size-14 rounded-full p-0.5 border-2 transition-all ${selectedConcern === concern.query ? 'border-primary ring-2 ring-primary/20 scale-105' : 'border-transparent group-hover:border-gray-200'}`}>
                                <img src={concern.image} alt={concern.label} className="w-full h-full object-cover rounded-full shadow-sm" />
                            </div>
                            <span className={`text-[10px] font-bold text-center leading-tight transition-colors ${selectedConcern === concern.query ? 'text-primary' : 'text-slate-600 dark:text-slate-400'}`}>
                                {concern.label}
                            </span>
                        </button>
                    ))}
                </div>
            </section>

            {/* Category Selection */}
            <section className="sticky top-[136px] md:top-[88px] z-30 bg-bg-light/95 dark:bg-bg-dark/95 backdrop-blur-sm px-4 py-4 overflow-x-auto no-scrollbar border-b border-gray-100 dark:border-gray-800 mb-2">
                <div className="flex gap-4">
                    <button
                        onClick={() => toggleCategory('All')}
                        className={`flex flex-col items-center gap-2 shrink-0 group`}
                    >
                        <div className={`size-16 rounded-[1.5rem] flex items-center justify-center transition-all duration-500 border-2 ${selectedCategory === 'All' && !selectedConcern ? 'border-primary bg-primary/10 shadow-float scale-105' : 'border-white dark:border-slate-800 bg-white dark:bg-slate-800 shadow-soft'} group-active:scale-95`}>
                            <span className="material-symbols-outlined text-2xl text-gray-500">grid_view</span>
                        </div>
                        <span className={`text-[10px] font-black uppercase tracking-tighter text-center leading-tight max-w-[64px] transition-colors ${selectedCategory === 'All' && !selectedConcern ? 'text-primary' : 'text-gray-400'}`}>
                            All
                        </span>
                    </button>
                    {CATEGORY_GRID.map((cat) => (
                        <button
                            key={cat.name}
                            onClick={() => toggleCategory(cat.filter)}
                            className="flex flex-col items-center gap-2 shrink-0 group"
                        >
                            <div className={`size-16 rounded-[1.5rem] flex items-center justify-center transition-all duration-500 border-2 ${selectedCategory.toLowerCase() === cat.filter.toLowerCase() && !selectedConcern ? 'border-primary bg-primary/10 shadow-float scale-105' : 'border-white dark:border-slate-800 bg-white dark:bg-slate-800 shadow-soft'} group-active:scale-95`}>
                                <span className={`material-symbols-outlined text-2xl ${cat.color}`}>{cat.icon}</span>
                            </div>
                            <span className={`text-[10px] font-black uppercase tracking-tighter text-center leading-tight max-w-[64px] transition-colors ${selectedCategory.toLowerCase() === cat.filter.toLowerCase() && !selectedConcern ? 'text-primary' : 'text-gray-400'}`}>
                                {cat.name}
                            </span>
                        </button>
                    ))}
                </div>
            </section>

            {/* List */}
            <main className="flex-1 p-4 pt-0 flex flex-col gap-4 max-w-7xl mx-auto w-full">
                <div className="flex justify-between items-center mb-2 px-1">
                    <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300">
                        {isLoading ? 'Loading...' : `${filteredMedicines.length} Products`}
                    </h3>
                    {(selectedCategory !== 'All' || selectedConcern) && (
                        <button
                            onClick={() => { setSelectedCategory('All'); setSelectedConcern(null); }}
                            className="text-[10px] font-black text-red-500 uppercase tracking-widest hover:underline"
                        >
                            Clear Filters
                        </button>
                    )}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {isLoading
                        ? Array(6).fill(0).map((_, i) => <MedicineCardSkeleton key={i} />)
                        : filteredMedicines.map((med: any) => (
                            <MedicineCard
                                key={med.id}
                                medicine={med}
                                onClick={() => router.push(`/medicines/${med.id}`)}
                            />
                        ))
                    }
                </div>

                {!isLoading && filteredMedicines.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-10 text-center">
                        <div className="size-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                            <span className="material-symbols-outlined text-4xl text-gray-400">search_off</span>
                        </div>
                        <p className="text-gray-500 font-bold text-sm">No medicines found for this filter.</p>
                        <button
                            onClick={() => { setSelectedCategory('All'); setSelectedConcern(null); }}
                            className="mt-4 text-primary font-bold text-xs uppercase tracking-widest border border-primary/20 px-4 py-2 rounded-xl"
                        >
                            Clear All Filters
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
}

export default function MedicinesPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-bg-light dark:bg-bg-dark flex items-center justify-center">
                <div className="animate-pulse text-center">
                    <span className="material-symbols-outlined text-4xl text-gray-400 animate-spin">sync</span>
                    <p className="text-sm font-medium text-gray-500 mt-2">Loading pharmacy...</p>
                </div>
            </div>
        }>
            <MedicinesContent />
        </Suspense>
    );
}
