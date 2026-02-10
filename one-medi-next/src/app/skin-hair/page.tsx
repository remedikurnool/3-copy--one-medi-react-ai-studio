'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSkinHairTreatments } from '@/hooks/useServices';
import type { ServiceMaster } from '@/hooks/useServices';

// Components
import AestheticHero from '@/components/skin-hair/AestheticHero';
import ConcernGrid from '@/components/skin-hair/ConcernGrid';
import TreatmentLibrary from '@/components/skin-hair/TreatmentLibrary';
import BodyContouring from '@/components/skin-hair/BodyContouring';
import TechShowcase from '@/components/skin-hair/TechShowcase';
import DoctorShowcase from '@/components/skin-hair/DoctorShowcase';
import ProductLayer from '@/components/skin-hair/ProductLayer';
import ResultsGallery from '@/components/skin-hair/ResultsGallery';

export default function SkinHairPage() {
    const router = useRouter();
    const [search, setSearch] = useState('');
    const [selectedConcern, setSelectedConcern] = useState<string | null>(null);

    const { data: services, loading, error } = useSkinHairTreatments();

    const filteredServices = (services || []).filter((s: ServiceMaster) => {
        const matchesSearch = !search ||
            s.name.toLowerCase().includes(search.toLowerCase()) ||
            s.description?.toLowerCase().includes(search.toLowerCase());

        const matchesConcern = !selectedConcern ||
            (s.concern && s.concern.toLowerCase() === selectedConcern.toLowerCase()) ||
            s.name.toLowerCase().includes(selectedConcern.toLowerCase()); // Fallback matching

        return matchesSearch && matchesConcern;
    });

    const handleConcernSelect = (concernId: string) => {
        // Toggle selection
        setSelectedConcern(prev => prev === concernId ? null : concernId);

        // Scroll to treatments if selecting
        if (selectedConcern !== concernId) {
            const element = document.getElementById('treatment-library');
            if (element) {
                setTimeout(() => element.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
            }
        }
    };

    return (
        <div className="min-h-screen bg-[#fafafa] dark:bg-bg-dark text-slate-900 dark:text-white pb-28 font-sans animate-fade-in">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-slate-100 dark:border-gray-800">
                <div className="flex items-center gap-3 p-4 max-w-lg mx-auto">
                    <button onClick={() => router.back()} className="size-10 flex items-center justify-center rounded-full bg-slate-50 dark:bg-gray-800 text-slate-600 transition-transform active:scale-90 hover:bg-slate-100">
                        <span className="material-symbols-outlined">arrow_back</span>
                    </button>
                    <div className="flex flex-col">
                        <h1 className="text-lg font-black tracking-tight text-slate-900 dark:text-white uppercase leading-none">Skin & Hair</h1>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5">Medical Aesthetics</p>
                    </div>
                    <div className="flex-1"></div>
                    <div className="size-10 rounded-full bg-slate-50 dark:bg-gray-800 flex items-center justify-center text-slate-600">
                        <span className="material-symbols-outlined">search</span>
                    </div>
                </div>
            </header>

            <main className="max-w-lg mx-auto p-4 flex flex-col gap-6">

                {/* Hero */}
                <AestheticHero />

                {/* Concerns */}
                <ConcernGrid selectedConcern={selectedConcern} onSelectConcern={handleConcernSelect} />

                {/* Treatments */}
                <div id="treatment-library">
                    <TreatmentLibrary services={filteredServices} loading={loading} />
                </div>

                {/* Body Studio */}
                <BodyContouring />

                {/* Tech Showcase */}
                <TechShowcase />

                {/* Doctors */}
                <DoctorShowcase />

                {/* Results Evidence */}
                <ResultsGallery />

                {/* Commerce */}
                <ProductLayer />

            </main>

            {/* Sticky Consultation Bar */}
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-md bg-slate-900/90 dark:bg-white/90 backdrop-blur-xl text-white dark:text-slate-900 py-3.5 px-6 rounded-2xl shadow-2xl flex items-center justify-between border border-white/10 dark:border-slate-900/10 active:scale-[0.98] transition-all cursor-pointer">
                <div className="flex flex-col">
                    <span className="text-[10px] font-medium opacity-80 uppercase tracking-wider">Start Journey</span>
                    <span className="text-sm font-black">Book Consultation</span>
                </div>
                <div className="size-10 rounded-full bg-white/20 dark:bg-slate-900/10 flex items-center justify-center">
                    <span className="material-symbols-outlined">calendar_month</span>
                </div>
            </div>
        </div>
    );
}
