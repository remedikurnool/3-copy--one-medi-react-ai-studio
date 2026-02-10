'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import PageHeader from '@/components/ui/PageHeader';
import { MEDICINE_CONTENT_MASTER } from '@/data/medicine-content';
import PharmacyHero from '@/components/medicines/PharmacyHero';
import CategoryGrid from '@/components/medicines/CategoryGrid';
import DealSlider from '@/components/medicines/DealSlider';
import ProductCard from '@/components/medicines/ProductCard';

export default function MedicinesPage() {
    const router = useRouter();
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const filteredProducts = selectedCategory
        ? MEDICINE_CONTENT_MASTER.products.filter(p =>
            p.category === MEDICINE_CONTENT_MASTER.categories.find(c => c.id === selectedCategory)?.label)
        : MEDICINE_CONTENT_MASTER.products;

    return (
        <div className="flex flex-col min-h-screen bg-surface-50 dark:bg-surface-950 font-sans animate-fade-in pb-24 text-slate-900 dark:text-white">
            <PageHeader
                title="Pharmacy"
                showLocation={true}
                showSearch={true}
                searchPlaceholder="Search medicines, health products..."
                className="lg:top-20"
            />

            <main className="p-4 max-w-7xl mx-auto w-full flex flex-col gap-6">
                {/* Hero & Offers */}
                <PharmacyHero />
                <DealSlider />

                {/* Categories */}
                <CategoryGrid
                    onSelect={(id) => setSelectedCategory(selectedCategory === id ? null : id)}
                    selectedId={selectedCategory}
                />

                {/* Product Listing */}
                <section>
                    <div className="flex justify-between items-end mb-4 px-1">
                        <div>
                            <h3 className="text-xl font-black text-slate-900 dark:text-white leading-none">
                                {selectedCategory ? `${MEDICINE_CONTENT_MASTER.categories.find(c => c.id === selectedCategory)?.label}` : 'Popular Medicines'}
                            </h3>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mt-1">
                                {filteredProducts.length} Products Found
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

                    {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {filteredProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    onClick={() => router.push(`/medicines/${product.id}`)}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 opacity-60">
                            <span className="material-symbols-outlined text-4xl text-slate-300">medication_liquid</span>
                            <p className="mt-2 font-bold text-slate-500">No products found in this category.</p>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}

