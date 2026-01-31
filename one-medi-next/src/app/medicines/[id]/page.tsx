'use client';

import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useCartStore } from '@/store/cartStore';
import { triggerCartAnimation } from '@/components/ui/FlyingCartAnimation';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { PrescriptionPromo } from '@/components/ui/PrescriptionPromo';
import { useMedicine } from '@/hooks/useMedicines';
import { MedicineDetailSkeleton } from '@/components/ui/Skeletons';

export default function MedicineDetailPage() {
    const router = useRouter();
    const params = useParams();
    const id = params?.id as string;
    const addToCart = useCartStore((state) => state.addToCart);

    // Fetch data
    const { data: medicine, loading, error } = useMedicine(id);

    if (loading) return <MedicineDetailSkeleton />;

    if (error || !medicine) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-bg-light dark:bg-bg-dark text-slate-900 dark:text-white pb-32">
            <div className="size-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-4xl text-gray-400">medication_liquid</span>
            </div>
            <h2 className="text-xl font-bold">Medicine Not Found</h2>
            <button onClick={() => router.push('/medicines')} className="mt-4 px-6 py-2 bg-primary text-white rounded-xl text-sm font-bold uppercase tracking-widest">
                Browse Medicines
            </button>
        </div>
    );

    // Mock data for alternatives if not present
    const alternatives = (medicine.alternatives && medicine.alternatives.length > 0) ? medicine.alternatives : [
        { id: 'alt1', name: 'Generic ' + medicine.name.split(' ')[0], manufacturer: 'Generic Labs', price: Math.round(medicine.price * 0.6), savings: '40%' },
        { id: 'alt2', name: 'Care ' + medicine.name.split(' ')[0], manufacturer: 'Care Pharma', price: Math.round(medicine.price * 0.8), savings: '20%' },
    ];

    // Transform safety advice object to array for UI
    const safetyAdviceList = [
        { label: 'Pregnancy', description: medicine.safetyAdvice?.pregnancy, icon: 'pregnant_woman', status: 'warning' },
        { label: 'Alcohol', description: medicine.safetyAdvice?.alcohol, icon: 'local_bar', status: 'unsafe' },
        { label: 'Driving', description: medicine.safetyAdvice?.driving, icon: 'directions_car', status: 'safe' }
    ].filter(item => item.description && item.description.length > 0);

    const handleAddToCart = (e: React.MouseEvent) => {
        triggerCartAnimation(e, medicine.image);
        addToCart({
            id: medicine.id,
            type: 'medicine',
            name: medicine.name,
            price: medicine.price,
            mrp: medicine.mrp,
            image: medicine.image,
            packSize: medicine.packSize,
            qty: 1,
            discount: '20% OFF',
            isPrescriptionRequired: medicine.prescriptionRequired
        });
    };

    return (
        <div className="min-h-screen bg-bg-light dark:bg-bg-dark text-slate-900 dark:text-white pb-32 animate-fade-in font-sans">
            <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center px-4 py-3 justify-between">
                    <button onClick={() => router.back()} className="size-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                        <span className="material-symbols-outlined text-2xl">arrow_back</span>
                    </button>
                    <h1 className="text-lg font-bold truncate max-w-[200px]">{medicine.name}</h1>
                    <button onClick={() => router.push('/cart')} className="size-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative">
                        <span className="material-symbols-outlined text-2xl">shopping_cart</span>
                        {useCartStore.getState().items.length > 0 && <span className="absolute top-1 right-1 size-2 rounded-full bg-red-500"></span>}
                    </button>
                </div>
            </header>

            <main className="p-4 flex flex-col gap-6 max-w-2xl mx-auto w-full">
                <Breadcrumbs items={[{ label: 'Pharmacy', path: '/medicines' }, { label: medicine.category || 'Medicine', path: `/medicines?cat=${medicine.category}` }, { label: 'Details' }]} />

                {/* Product Card */}
                <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-6 shadow-glass border border-white dark:border-slate-800/50 relative overflow-hidden">
                    {medicine.prescriptionRequired && (
                        <div className="absolute top-0 right-0 bg-rose-500 text-white text-[10px] font-black px-4 py-2 rounded-bl-3xl z-20 shadow-lg flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">description</span>
                            Prescription Required
                        </div>
                    )}

                    <div className="flex flex-col items-center mb-6">
                        <div className="size-48 bg-slate-50 dark:bg-slate-800 rounded-[2rem] p-6 flex items-center justify-center border border-slate-100 dark:border-slate-700 relative mb-6 group">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-transparent dark:from-white/5 opacity-50 rounded-[2rem]"></div>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={medicine.image} alt={medicine.name} className="w-full h-full object-contain relative z-10 transition-transform duration-500 group-hover:scale-110 drop-shadow-xl" />
                        </div>
                        <h2 className="text-2xl font-black text-center leading-tight mb-2">{medicine.name}</h2>
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{medicine.manufacturer}</p>
                        <p className="mt-2 px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 text-xs font-bold rounded-lg">{medicine.packSize}</p>
                    </div>

                    <div className="h-px bg-slate-100 dark:bg-slate-800 w-full mb-6"></div>

                    <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                            <span className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">₹{medicine.price}</span>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-slate-400 line-through font-bold">₹{medicine.mrp}</span>
                                <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded uppercase tracking-wider">20% OFF</span>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button className="size-12 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                                <span className="material-symbols-outlined">bookmark</span>
                            </button>
                            <button
                                onClick={handleAddToCart}
                                className="h-12 px-6 bg-primary hover:bg-primary-dark text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-float active:scale-95 transition-all flex items-center gap-2"
                            >
                                <span className="material-symbols-outlined text-lg">add_shopping_cart</span>
                                Add
                            </button>
                        </div>
                    </div>
                </div>

                <PrescriptionPromo />

                {/* Quick Info Grid */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 rounded-3xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/20">
                        <span className="material-symbols-outlined text-blue-500 text-2xl mb-2">science</span>
                        <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">Composition</p>
                        <p className="text-sm font-bold text-slate-700 dark:text-slate-200 leading-tight">{medicine.composition}</p>
                    </div>
                    <div className="p-4 rounded-3xl bg-purple-50 dark:bg-purple-900/10 border border-purple-100 dark:border-purple-900/20">
                        <span className="material-symbols-outlined text-purple-500 text-2xl mb-2">category</span>
                        <p className="text-[10px] font-black text-purple-400 uppercase tracking-widest mb-1">Drug Class</p>
                        <p className="text-sm font-bold text-slate-700 dark:text-slate-200 leading-tight">{medicine.category}</p>
                    </div>
                </div>

                {/* Safety Advice */}
                <section className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-6 shadow-sm border border-gray-100 dark:border-gray-800">
                    <h3 className="text-lg font-black mb-5 flex items-center gap-2">
                        <span className="material-symbols-outlined text-amber-500">health_and_safety</span>
                        Safety Advice
                    </h3>
                    <div className="space-y-4">
                        {safetyAdviceList.length > 0 ? (
                            safetyAdviceList.map((advice, idx) => (
                                <div key={idx} className="flex gap-4 items-start group">
                                    <div className={`shrink-0 size-10 rounded-xl flex items-center justify-center ${advice.status === 'safe' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'} dark:bg-gray-800`}>
                                        <span className="material-symbols-outlined text-lg">{advice.icon || 'info'}</span>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white mb-0.5">{advice.label}</p>
                                        <p className="text-xs font-medium text-slate-500 leading-relaxed">{advice.description}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-gray-500 italic">No specific safety warnings. Please consult your doctor.</p>
                        )}
                    </div>
                </section>

                {/* Substitutes */}
                <section>
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4 ml-2">Cheaper Alternatives</h3>
                    <div className="flex flex-col gap-3">
                        {alternatives.map((alt: any) => (
                            <div key={alt.id} className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-center justify-between group cursor-pointer hover:border-emerald-500/30 transition-colors">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <h4 className="font-bold text-slate-900 dark:text-white">{alt.name}</h4>
                                        <span className="text-[10px] font-black bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded uppercase tracking-wider">Save {alt.savings}</span>
                                    </div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{alt.manufacturer}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="font-black text-slate-900 dark:text-white">₹{alt.price}</span>
                                    <button className="size-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all shadow-sm">
                                        <span className="material-symbols-outlined text-lg">add</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}
