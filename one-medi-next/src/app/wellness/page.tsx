'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import PageHeader from '@/components/ui/PageHeader';
import { WELLNESS_CONTENT_MASTER } from '@/data/wellness-content';
import WellnessHero from '@/components/wellness/WellnessHero';
import ProgramCategoryGrid from '@/components/wellness/ProgramCategoryGrid';
import WellnessTools from '@/components/wellness/WellnessTools';
import ProgramCard from '@/components/wellness/ProgramCard';
import SuccessStories from '@/components/wellness/SuccessStories';

export default function WellnessPage() {
    const router = useRouter();
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const filteredPrograms = selectedCategory
        ? WELLNESS_CONTENT_MASTER.programs.filter(p =>
            p.category === WELLNESS_CONTENT_MASTER.categories.find(c => c.id === selectedCategory)?.label)
        : WELLNESS_CONTENT_MASTER.programs;

    return (
        <div className="min-h-screen bg-surface-50 dark:bg-surface-950 pb-32 font-sans text-slate-900 dark:text-white animate-fade-in">
            <PageHeader
                title="Diet & Wellness"
                showSearch={true}
                searchPlaceholder="Search diet plans, yoga, meditation..."
                className="lg:top-20"
            />

            <main className="max-w-7xl mx-auto w-full p-4 space-y-6">
                <WellnessHero />

                <ProgramCategoryGrid
                    onSelect={(id) => setSelectedCategory(selectedCategory === id ? null : id)}
                    selectedId={selectedCategory}
                />

                <WellnessTools />

                {/* Programs Listing */}
                <section>
                    <div className="flex justify-between items-end mb-6 px-1">
                        <div>
                            <h3 className="text-xl font-black text-slate-900 dark:text-white leading-none">
                                {selectedCategory ? `${WELLNESS_CONTENT_MASTER.categories.find(c => c.id === selectedCategory)?.label}` : 'Featured Programs'}
                            </h3>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mt-1">
                                {filteredPrograms.length} Plans Available
                            </p>
                        </div>
                        {selectedCategory && (
                            <button
                                onClick={() => setSelectedCategory(null)}
                                className="text-xs font-black text-teal-500 uppercase tracking-widest hover:underline"
                            >
                                Clear Filter
                            </button>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredPrograms.map((program) => (
                            <ProgramCard
                                key={program.id}
                                program={program}
                                onClick={() => router.push(`/wellness/${program.id}`)}
                            />
                        ))}
                    </div>

                    {filteredPrograms.length === 0 && (
                        <div className="text-center py-20 opacity-50">
                            <span className="material-symbols-outlined text-6xl mb-2">spa</span>
                            <p className="font-bold text-sm">No programs found in this category.</p>
                        </div>
                    )}
                </section>

                <SuccessStories />
            </main>
        </div>
    );
}

