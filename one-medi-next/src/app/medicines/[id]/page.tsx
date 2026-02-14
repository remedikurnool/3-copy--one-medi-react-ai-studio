'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import PageHeader from '@/components/ui/PageHeader';
import { useMedicine } from '@/hooks/useMedicines';
import ProductGallery from '@/components/medicines/ProductGallery';
import ProductInfo from '@/components/medicines/ProductInfo';
import SafetyStatus from '@/components/medicines/SafetyStatus';
import SimilarProducts from '@/components/medicines/SimilarProducts';
import { useCartStore } from '@/store/cartStore';

export default function MedicineDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const { addToCart } = useCartStore();
    const resolvedParams = React.use(params);
    const { data: product, loading } = useMedicine(resolvedParams.id);

    const handleAddToCart = () => {
        if (!product) return;
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            mrp: product.mrp,
            image: product.thumbnailImage || product.images?.[0] || product.image,
            type: 'medicine',
            qty: 1,
            discount: product.discountPercent ? `${product.discountPercent}% OFF` : undefined,
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-surface-50 dark:bg-surface-950 flex items-center justify-center">
                <span className="material-symbols-outlined text-4xl text-slate-300 animate-spin">progress_activity</span>
            </div>
        );
    }

    if (!product) {
        return <div className="p-10 text-center">Product not found</div>;
    }

    return (
        <div className="min-h-screen bg-surface-50 dark:bg-surface-950 font-sans text-slate-900 dark:text-white pb-32 animate-fade-in">
            <PageHeader
                title="Product Details"
                subtitle="Generic & Branded Medicines"
                showSearch={false}
                className="lg:top-20"
            />

            <main className="p-4 max-w-6xl mx-auto w-full flex flex-col gap-8">
                {/* Product Hero */}
                <div className="bg-white dark:bg-gray-800 rounded-[2.5rem] p-6 shadow-sm border border-slate-100 dark:border-gray-700 grid md:grid-cols-2 gap-8">
                    <div>
                        <ProductGallery images={product.images || [product.image]} />
                    </div>

                    <div>
                        <ProductInfo product={product} />
                    </div>
                </div>

                {/* Safety */}
                {product.safety && (
                    <section>
                        <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined">health_and_safety</span>
                            Safety Profile
                        </h3>
                        <div className="bg-white dark:bg-gray-800 rounded-[2rem] p-6 shadow-sm border border-slate-100 dark:border-gray-700">
                            <SafetyStatus data={product.safety} />
                        </div>
                    </section>
                )}

                {/* Similar Products */}
                <SimilarProducts />
            </main>

            {/* Bottom Cart Bar */}
            <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 p-4 pb-6 z-50 shadow-upper">
                <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
                    <div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-black text-slate-900 dark:text-white">₹{product.price}</span>
                            <span className="text-sm font-bold text-slate-400 line-through">₹{product.mrp}</span>
                            {product.discountPercent && (
                                <span className="bg-red-50 text-red-500 text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider">{product.discountPercent}% OFF</span>
                            )}
                        </div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Inclusive of all taxes</p>
                    </div>

                    <button
                        onClick={handleAddToCart}
                        className="h-14 px-8 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl hover:shadow-2xl hover:-translate-y-1 active:scale-95 transition-all flex items-center gap-2"
                    >
                        <span className="material-symbols-outlined">shopping_cart</span>
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}
