'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import PageHeader from '@/components/ui/PageHeader';
import { useMedicalScans } from '@/hooks/useMedicalScans';
import { useMenu } from '@/hooks/useUIConfig';
import DiagnosticsHero from '@/components/scans/DiagnosticsHero';
import ModalityGrid from '@/components/scans/ModalityGrid';
import HealthPackages from '@/components/scans/HealthPackages';
import DoctorRecommended from '@/components/scans/DoctorRecommended';
import { ScanCard } from '@/components/cards/ScanCard'; // [New Import]
import { motion } from 'framer-motion';

export default function ScansPage() {
    const router = useRouter();
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const { data: scans, loading } = useMedicalScans();

    // Dynamic UI Config
    const { data: categoryMenu } = useMenu('scans_categories');

    const selectedCategoryLabel = selectedCategory
        ? categoryMenu?.items.find(c => (c.route || c.id) === selectedCategory)?.title
        : null;

    const filteredTests = selectedCategoryLabel
        ? (scans || []).filter(t => t.category === selectedCategoryLabel)
        : (scans || []);

    return (
        <div className="min-h-screen bg-surface-50 dark:bg-surface-950 pb-32 font-sans text-slate-900 dark:text-white animate-fade-in">
            <PageHeader
                title="Diagnostics & Scans"
                showSearch={true}
                searchPlaceholder="Search MRI, CT, X-Ray..."
                showLocation={true}
                className="lg:top-20"
            />

            <main className="max-w-7xl mx-auto w-full p-4 space-y-8">
                <DiagnosticsHero />
                <DoctorRecommended />

                {/* Modality Grid */}
                <ModalityGrid
                    onSelect={(id) => setSelectedCategory(selectedCategory === id ? null : id)}
                    selectedId={selectedCategory}
                    categories={categoryMenu?.items || []}
                />

                <HealthPackages />

                {/* Popular Scans Listing */}
                <section>
                    <div className="flex justify-between items-end mb-6 px-1">
                        <div>
                            <h3 className="text-xl font-black text-slate-900 dark:text-white leading-none">
                                {selectedCategoryLabel ? `${selectedCategoryLabel} Scans` : 'Popular Scans'}
                            </h3>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mt-1.5">
                                {loading ? 'Loading...' : `${filteredTests.length} Scans Available`}
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
                        <div className="flex flex-col items-center justify-center py-20 opacity-60">
                            <span className="material-symbols-outlined text-4xl text-slate-300 animate-spin">radiology</span>
                            <p className="mt-2 font-bold text-slate-500 text-sm">Loading diagnostic scans...</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 auto-rows-fr">
                            {filteredTests.map((test, index) => (
                                <motion.div
                                    key={test.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <ScanCard
                                        scan={test}
                                        onClick={() => router.push(`/scans/${test.id}`)}
                                        className="h-full w-full"
                                    />
                                </motion.div>
                            ))}
                        </div>
                    )}

                    {!loading && filteredTests.length === 0 && (
                        <div className="text-center py-20 text-slate-400">
                            <span className="material-symbols-outlined text-4xl mb-2">search_off</span>
                            <p>No scans found in this category.</p>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}
