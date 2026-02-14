'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import PageHeader from '@/components/ui/PageHeader';
import { SCANS_CONTENT_MASTER } from '@/data/scans-content';
import { useMedicalScans } from '@/hooks/useMedicalScans';
import DiagnosticsHero from '@/components/scans/DiagnosticsHero';
import ModalityGrid from '@/components/scans/ModalityGrid';
import HealthPackages from '@/components/scans/HealthPackages';
import DoctorRecommended from '@/components/scans/DoctorRecommended';

export default function ScansPage() {
    const router = useRouter();
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const { data: scans, loading } = useMedicalScans();

    const selectedCategoryLabel = selectedCategory
        ? SCANS_CONTENT_MASTER.categories.find(c => c.id === selectedCategory)?.label
        : null;

    const filteredTests = selectedCategoryLabel
        ? (scans || []).filter(t => t.category === selectedCategoryLabel)
        : (scans || []);

    return (
        <div className="min-h-screen bg-surface-50 dark:bg-surface-950 pb-32 font-sans text-slate-900 dark:text-white animate-fade-in">
            <PageHeader
                title="Diagnostics"
                showSearch={true}
                searchPlaceholder="Search MRI, CT, Blood Tests..."
                showLocation={true}
                className="lg:top-20"
            />

            <main className="max-w-7xl mx-auto w-full p-4 space-y-6">
                <DiagnosticsHero />
                <DoctorRecommended />

                <ModalityGrid
                    onSelect={(id) => setSelectedCategory(selectedCategory === id ? null : id)}
                    selectedId={selectedCategory}
                />

                <HealthPackages />

                {/* Popular Tests Listing */}
                <section>
                    <div className="flex justify-between items-end mb-4 px-1">
                        <div>
                            <h3 className="text-xl font-black text-slate-900 dark:text-white leading-none">
                                {selectedCategory ? `${SCANS_CONTENT_MASTER.categories.find(c => c.id === selectedCategory)?.label} Tests` : 'Popular Tests'}
                            </h3>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mt-1">
                                {loading ? 'Loading...' : `${filteredTests.length} Tests Available`}
                            </p>
                        </div>
                        {selectedCategory && (
                            <button
                                onClick={() => setSelectedCategory(null)}
                                className="text-xs font-black text-red-500 uppercase tracking-widest hover:underline"
                            >
                                Clear Filter
                            </button>
                        )}
                    </div>

                    {loading ? (
                        <div className="text-center py-20 opacity-60">
                            <span className="material-symbols-outlined text-4xl text-slate-300 animate-spin">progress_activity</span>
                            <p className="mt-2 font-bold text-slate-500">Loading tests...</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredTests.map((test) => (
                                <div
                                    key={test.id}
                                    onClick={() => router.push(`/scans/${test.id}`)}
                                    className="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-slate-100 dark:border-gray-700 flex gap-4 cursor-pointer hover:shadow-lg transition-all hover:-translate-y-1 group"
                                >
                                    <div className="size-20 rounded-xl bg-slate-50 dark:bg-gray-700 shrink-0 overflow-hidden relative">
                                        <img src={test.image} alt={test.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start mb-1">
                                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">{test.category}</span>
                                            {test.discountPercent && test.discountPercent > 0 && (
                                                <span className="bg-green-50 text-green-600 text-[9px] font-black px-1.5 py-0.5 rounded uppercase">{test.discountPercent}% OFF</span>
                                            )}
                                        </div>
                                        <h4 className="text-sm font-black text-slate-900 dark:text-white leading-tight mb-2 truncate group-hover:text-indigo-600 transition-colors">{test.name}</h4>

                                        <div className="flex items-baseline gap-2 mt-auto">
                                            <span className="text-lg font-black text-slate-900 dark:text-white">₹{test.price}</span>
                                            <span className="text-xs font-bold text-slate-400 line-through">₹{test.mrp}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}
