'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useCartStore } from '@/store/cartStore';
import { useMedicalScan } from '@/hooks/useMedicalScans';
import PageHeader from '@/components/ui/PageHeader';
import { motion } from 'framer-motion';

// Reusable Components for this page
const InfoCard = ({ icon, label, value, color, darkColor }: any) => (
    <div className="flex flex-col gap-2 rounded-2xl bg-white dark:bg-surface-900 p-4 shadow-sm border border-surface-100 dark:border-surface-800 hover:shadow-md transition-shadow">
        <div className={`flex size-10 items-center justify-center rounded-xl ${color} ${darkColor}`}>
            <span className="material-symbols-outlined">{icon}</span>
        </div>
        <div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">{label}</p>
            <p className="text-base font-bold text-slate-900 dark:text-white leading-tight mt-0.5">{value}</p>
        </div>
    </div>
);

const DetailsAccordion = ({ title, children, defaultOpen, badge }: any) => (
    <details className="group rounded-2xl bg-white dark:bg-surface-900 shadow-sm border border-surface-100 dark:border-surface-800 [&_summary::-webkit-details-marker]:hidden overflow-hidden" open={defaultOpen}>
        <summary className="flex cursor-pointer items-center justify-between p-4 text-slate-900 dark:text-white select-none list-none active:bg-surface-50 dark:active:bg-surface-800 transition-colors">
            <div className="flex items-center gap-2">
                <h2 className="text-base font-bold">{title}</h2>
                {badge && <span className="rounded-lg bg-green-100 dark:bg-green-900/30 px-2 py-0.5 text-[10px] font-bold text-green-700 dark:text-green-400">{badge}</span>}
            </div>
            <span className="material-symbols-outlined transition-transform duration-300 group-open:rotate-180 text-surface-400">expand_more</span>
        </summary>
        <div className="px-4 pb-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300 border-t border-surface-50 dark:border-surface-800/50 pt-3">
            {children}
        </div>
    </details>
);

export default function ScanDetailPage() {
    const params = useParams();
    const id = params?.id as string;
    const router = useRouter();

    // Try to get from Supabase or Mock
    const { data: test, loading } = useMedicalScan(id);

    const addToCart = useCartStore((state) => state.addToCart);
    const cartItemsCount = useCartStore((state) => state.items.length);
    const [selectedVariant, setSelectedVariant] = useState<any>(null);

    // Auto-select first variant/partner if available
    useEffect(() => {
        if (test && test.variants && test.variants.length > 0 && !selectedVariant) {
            setSelectedVariant(test.variants[0]);
        }
    }, [test]); // eslint-disable-line react-hooks/exhaustive-deps

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-surface-50 dark:bg-surface-950 flex items-center justify-center">
                <span className="material-symbols-outlined text-4xl text-slate-300 animate-spin">radiology</span>
            </div>
        );
    }

    if (!test) return <div className="p-8 text-center text-slate-500">Scan not found</div>;

    const currentPrice = selectedVariant ? selectedVariant.price : test.price;
    const currentMrp = selectedVariant ? selectedVariant.mrp : test.mrp;
    const currentReportTime = selectedVariant ? selectedVariant.reportTime : test.reportTime;

    const handleBookNow = () => {
        addToCart({
            id: test.id,
            type: 'scan',
            name: `${test.name} (${selectedVariant?.centerName || 'Center'})`,
            price: currentPrice,
            mrp: currentMrp,
            image: test.image,
            qty: 1,
            discount: test.discountPercent ? `${test.discountPercent}% OFF` : undefined
        });
        router.push('/cart');
    };

    return (
        <div className="min-h-screen bg-surface-50 dark:bg-surface-950 text-slate-900 dark:text-white pb-32 relative flex flex-col font-sans animate-fade-in">
            {/* Sticky Header */}
            <PageHeader
                title="Scan Details"
                showSearch={false}
                showLocation={false}
                className="lg:top-20"
                actions={
                    <button onClick={() => router.push('/cart')} className="relative flex size-10 items-center justify-center rounded-full bg-white dark:bg-surface-800 shadow-sm border border-surface-200 dark:border-surface-700 hover:bg-surface-50 dark:hover:bg-surface-700 transition-colors">
                        <span className="material-symbols-outlined text-[20px] text-slate-600 dark:text-slate-300">shopping_cart</span>
                        {cartItemsCount > 0 && <span className="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-sm ring-2 ring-white dark:ring-surface-900">{cartItemsCount}</span>}
                    </button>
                }
            />

            <main className="flex-1 w-full max-w-4xl mx-auto space-y-4 pt-4">
                {/* Hero Card */}
                <div className="px-4">
                    <div className="relative overflow-hidden rounded-3xl bg-slate-900 p-0 shadow-xl shadow-slate-900/20">
                        {/* Background Image with Overlay */}
                        <div className="absolute inset-0">
                            {test.image && <img src={test.image} alt={test.name} className="w-full h-full object-cover opacity-60" />}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
                        </div>

                        <div className="relative z-10 p-6 flex flex-col gap-4 text-white">
                            <div className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 backdrop-blur-md border border-white/20 shadow-inner">
                                <span className="material-symbols-outlined text-[16px] filled">verified_user</span>
                                <span className="text-xs font-bold tracking-wide">Standard Diagnostics</span>
                            </div>

                            <div>
                                <h2 className="text-2xl font-black leading-tight tracking-tight max-w-lg">{test.name}</h2>
                                {test.bodyPart && <p className="mt-1 text-slate-300 text-xs font-bold uppercase tracking-wider">{test.bodyPart}</p>}
                            </div>

                            <div className="mt-4 flex items-end gap-3">
                                <span className="text-3xl font-black tracking-tight">₹{currentPrice}</span>
                                <span className="mb-1.5 text-lg text-slate-400 line-through font-bold">₹{currentMrp}</span>
                                {test.discountPercent && test.discountPercent > 0 && (
                                    <span className="mb-1.5 rounded-lg bg-green-500 px-2 py-0.5 text-xs font-black text-white shadow-sm uppercase tracking-wide">{test.discountPercent}% OFF</span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Key Info Grid */}
                <div className="px-4">
                    <div className="grid grid-cols-2 gap-3">
                        <InfoCard icon="schedule" label="Report in" value={currentReportTime || "24 Hours"} color="bg-blue-50 text-blue-600" darkColor="dark:bg-blue-900/20 dark:text-blue-400" />
                        <InfoCard icon="radiology" label="Scan Type" value={test.scanType || "Imaging"} color="bg-indigo-50 text-indigo-600" darkColor="dark:bg-indigo-900/20 dark:text-indigo-400" />
                        <InfoCard icon="no_food" label="Contrast" value={test.contrastRequired ? "Required" : "No"} color="bg-amber-50 text-amber-600" darkColor="dark:bg-amber-900/20 dark:text-amber-400" />
                        <InfoCard icon="science" label="Category" value={test.category || "Radiology"} color="bg-emerald-50 text-emerald-600" darkColor="dark:bg-emerald-900/20 dark:text-emerald-400" />
                    </div>
                </div>

                {/* Centre Selection */}
                {test.variants && test.variants.length > 0 && (
                    <div className="px-4">
                        <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3 px-1">Select Diagnostic Centre</h3>
                        <div className="flex flex-col gap-3">
                            {test.variants?.map((variant: any) => (
                                <motion.div
                                    key={variant.centerId}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setSelectedVariant(variant)}
                                    className={`rounded-2xl p-3 border transition-all cursor-pointer flex gap-4 ${selectedVariant?.centerId === variant.centerId
                                        ? 'bg-white dark:bg-surface-900 border-primary ring-2 ring-primary/10 shadow-lg shadow-primary/5'
                                        : 'bg-white dark:bg-surface-900 border-surface-200 dark:border-surface-700 opacity-80 hover:opacity-100 hover:shadow-md'
                                        }`}
                                >
                                    <div className="size-16 rounded-xl bg-gray-50 dark:bg-gray-800 p-0.5 shrink-0 overflow-hidden relative border border-surface-100 dark:border-surface-700">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        {variant.centerImage ? (
                                            <img src={variant.centerImage} alt={variant.centerName} className="size-full object-cover rounded-lg" />
                                        ) : (
                                            <div className="size-full flex items-center justify-center text-slate-400">
                                                <span className="material-symbols-outlined">local_hospital</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 flex flex-col justify-center">
                                        <div className="flex justify-between items-start mb-1">
                                            <h4 className="font-bold text-sm text-slate-900 dark:text-white leading-tight">{variant.centerName}</h4>
                                            {variant.rating && (
                                                <span className="text-[10px] font-bold bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                                                    {variant.rating} <span className="material-symbols-outlined text-[10px] filled">star</span>
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex justify-between items-end mt-1">
                                            <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                                                {variant.reportTime || '24h'} Report • {variant.distance || 'Nearby'}
                                            </div>
                                            <span className="font-bold text-slate-900 dark:text-white text-base">₹{variant.price}</span>
                                        </div>
                                    </div>
                                    {selectedVariant?.centerId === variant.centerId && (
                                        <div className="absolute top-2 right-2">
                                            <span className="material-symbols-outlined text-primary text-[20px] filled bg-white dark:bg-surface-900 rounded-full">check_circle</span>
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Accordions */}
                <div className="flex flex-col gap-3 px-4 pb-4">
                    {(test.preparationInstructions || test.prerequisites) && (
                        <DetailsAccordion title="Preparation Instructions" defaultOpen>
                            <div className="flex items-start gap-3 p-2 bg-amber-50 dark:bg-amber-900/10 rounded-xl border border-amber-100 dark:border-amber-800/20 text-amber-900 dark:text-amber-100">
                                <span className="material-symbols-outlined text-amber-500 mt-0.5">info</span>
                                <p className="text-sm font-medium whitespace-pre-line">{test.preparationInstructions || test.prerequisites}</p>
                            </div>
                        </DetailsAccordion>
                    )}

                    <DetailsAccordion title="About this Scan">
                        <p className="p-2 description-text">{test.description}</p>
                    </DetailsAccordion>

                    {test.contraindications && test.contraindications.length > 0 && (
                        <DetailsAccordion title="Safety & Contraindications">
                            <ul className="space-y-1 p-2">
                                {test.contraindications.map((contra: string, idx: number) => (
                                    <li key={idx} className="flex items-center gap-2 text-red-600 dark:text-red-400 font-medium text-xs">
                                        <span className="material-symbols-outlined text-[16px]">warning</span>
                                        {contra}
                                    </li>
                                ))}
                            </ul>
                        </DetailsAccordion>
                    )}
                </div>
            </main>

            {/* Sticky Footer */}
            <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/90 dark:bg-surface-950/90 backdrop-blur-xl border-t border-surface-200 dark:border-surface-800 p-4 pb-6 shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.1)]">
                <div className="flex items-center gap-4 max-w-4xl mx-auto">
                    <div className="flex flex-col">
                        <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total Price</p>
                        <div className="flex items-baseline gap-1.5">
                            <p className="text-2xl font-black text-slate-900 dark:text-white">₹{currentPrice}</p>
                            <span className="text-sm font-bold text-slate-400 line-through">₹{currentMrp}</span>
                        </div>
                    </div>
                    <button
                        onClick={handleBookNow}
                        className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-slate-900 dark:bg-white px-6 py-4 text-base font-black text-white dark:text-slate-900 shadow-lg shadow-slate-900/20 dark:shadow-white/10 hover:scale-[1.02] active:scale-[0.98] transition-all"
                    >
                        <span className="material-symbols-outlined text-[20px]">add_task</span>
                        Book Scan
                    </button>
                </div>
            </div>
        </div>
    );
}
