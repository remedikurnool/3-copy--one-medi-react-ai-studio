import React from 'react';
import ProductCard from './ProductCard';
import { MEDICINE_CONTENT_MASTER } from '@/data/medicine-content';

export default function SimilarProducts() {
    return (
        <section className="mb-12">
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined">compare_arrows</span>
                Similar Medicines
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {MEDICINE_CONTENT_MASTER.products.slice(0, 4).map((p) => (
                    <ProductCard key={p.id} product={p} />
                ))}
            </div>
        </section>
    );
}
