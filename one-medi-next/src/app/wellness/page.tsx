'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import PageHeader from '@/components/ui/PageHeader';
import { useMenu } from '@/hooks/useUIConfig';
import { useWellnessPlans } from '@/hooks/useServices';
import WellnessHero from '@/components/wellness/WellnessHero';
import ProgramCategoryGrid from '@/components/wellness/ProgramCategoryGrid';
import WellnessTools from '@/components/wellness/WellnessTools';
import ProgramCard from '@/components/wellness/ProgramCard';
import SuccessStories from '@/components/wellness/SuccessStories';

export default function WellnessPage() {
    const router = useRouter();
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const { data: programs, loading: programsLoading } = useWellnessPlans();
    const { data: menu } = useMenu('wellness_categories');
    const categories = menu?.items || [];

    // Map Supabase services to program-like shape for ProgramCard
    const mappedPrograms = (programs || []).map(p => ({
        id: p.id,
        name: p.name,
        category: p.category,
        image: p.imageUrl || 'https://images.unsplash.com/photo-1544367563-12123d8965cd?auto=format&fit=crop&q=80&w=400',
        duration: p.durationMinutes ? `${p.durationMinutes} mins` : 'Flexible',
        price: p.price || 0,
        mrp: Math.round((p.price || 0) * 1.5),
        expert: 'OneMedi Expert',
        rating: 4.8,
        tags: p.requirements?.slice(0, 2) || [],
        description: p.description || '',
        includes: p.requirements || []
    }));

    // Find selected category object to get its title/label for matching
    const selectedCategoryItem = selectedCategory ? categories.find(c => (c.route || c.id) === selectedCategory || c.id === selectedCategory) : null;
    // Note: ProgramCategoryGrid uses cat.route || cat.id as selection key.
    // In migration, I used route params like '/wellness/weight-loss'.
    // Existing logic might be using 'weight-loss'.
    // Let's assume onSelect passes the ID or Route.
    // In ProgramCategoryGrid refactor: onClick={() => onSelect(cat.route || cat.id)}
    // The route is '/wellness/weight-loss'.
    // The program.category in DB might be 'Weight Loss' (Title).

    // If selectedCategory is '/wellness/weight-loss', I need to find the item and get its title 'Weight Loss'.
    // Then filter programs where category === 'Weight Loss'.

    const filteredPrograms = selectedCategory && selectedCategoryItem
        ? mappedPrograms.filter(p => p.category === selectedCategoryItem.title)
        : mappedPrograms;

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
                                {selectedCategoryItem ? selectedCategoryItem.title : 'Featured Programs'}
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
                        {programsLoading ? (
                            <div className="col-span-full flex justify-center py-12">
                                <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent"></div>
                            </div>
                        ) : filteredPrograms.map((program) => (
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
