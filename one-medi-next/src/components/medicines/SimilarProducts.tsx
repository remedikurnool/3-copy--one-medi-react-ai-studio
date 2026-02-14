'use client';

import React from 'react';
import ProductCard from './ProductCard';
import { useMedicines } from '@/hooks/useMedicines';

export default function SimilarProducts() {
    const { data: products, loading } = useMedicines(4);

    return (
        <section className="mb-12">
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined">compare_arrows</span>
                Similar Medicines
            </h3>

            {loading ? (
                <div className="text-center py-8 opacity-60">
                    <span className="material-symbols-outlined text-2xl text-slate-300 animate-spin">progress_activity</span>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {(products || []).slice(0, 4).map((p) => (
                        <ProductCard key={p.id} product={p} />
                    ))}
                </div>
            )}
        </section>
    );
}
