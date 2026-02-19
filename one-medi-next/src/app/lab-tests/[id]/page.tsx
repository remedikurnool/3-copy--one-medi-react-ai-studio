'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useCartStore } from '@/store/cartStore';
import { useLabTest } from '@/hooks';
import PageHeader from '@/components/ui/PageHeader';
import { motion, AnimatePresence } from 'framer-motion';

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

const ParameterItem = ({ name }: any) => (
    <li className="flex items-start gap-3 p-2 rounded-lg hover:bg-surface-50 dark:hover:bg-surface-800/50 transition-colors">
        <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
            <span className="material-symbols-outlined text-[14px] font-bold">check</span>
        </span>
        <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">{name}</p>
        </div>
    </li>
);

export default function LabTestDetailPage() {
    const params = useParams();
    const id = params?.id as string;
    const router = useRouter();

    // Try to get from Supabase
    const { data: dbTest, loading } = useLabTest(id);

    // Mock Variants since LabTest doesn't support them natively yet in DB
    const variants = dbTest ? [{
        centerId: 'c1',
        centerName: 'One Medi Partner Lab',
        centerImage: 'https://images.unsplash.com/photo-1579152276506-0d60c41098ed?auto=format&fit=crop&q=80',
        price: dbTest.finalPrice,
        mrp: dbTest.marketPrice,
        reportTime: dbTest.turnaroundTime || '24 Hours',
        distance: '0.8 km',
        rating: 4.8
    }] : [];

    const test = dbTest ? { ...dbTest, variants } : null;

    const addToCart = useCartStore((state) => state.addToCart);
    const cartItemsCount = useCartStore((state) => state.items.length);
    const [homeCollection, setHomeCollection] = useState(true);
    const [selectedVariant, setSelectedVariant] = useState<any>(null);

    useEffect(() => {
        if (test && test.variants && test.variants.length > 0 && !selectedVariant) {
            setSelectedVariant(test.variants[0]);
        }
    }, [test]); // eslint-disable-line react-hooks/exhaustive-deps

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-surface-50 dark:bg-surface-950 flex items-center justify-center">
                <span className="material-symbols-outlined text-4xl text-slate-300 animate-spin">progress_activity</span>
            </div>
        );
    }

    if (!test) return <div className="p-8 text-center text-slate-500">Test not found</div>;

    const currentPrice = selectedVariant ? selectedVariant.price : test.finalPrice;
    const currentMrp = selectedVariant ? selectedVariant.mrp : test.marketPrice;
    const currentReportTime = selectedVariant ? selectedVariant.reportTime : test.turnaroundTime;
    const totalAmount = homeCollection ? currentPrice + 50 : currentPrice;

    const handleBookNow = () => {
        addToCart({
            id: test.id,
            type: 'lab',
            name: `${test.name} (${selectedVariant?.centerName || 'Lab'})`,
            price: totalAmount,
            mrp: currentMrp,
            qty: 1,
            discount: test.discountPercent ? `${test.discountPercent}% OFF` : undefined
        });
        router.push('/cart');
    };

    return (
        <div className="min-h-screen bg-surface-50 dark:bg-surface-950 text-slate-900 dark:text-white pb-32 relative flex flex-col font-sans animate-fade-in">
            {/* Sticky Header */}
            <PageHeader
                title="Test Details"
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
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 to-indigo-600 p-6 shadow-xl shadow-primary/20 text-white">
                        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl"></div>
                        <div className="absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-white/10 blur-3xl"></div>

                        <div className="relative z-10 flex flex-col gap-4">
                            <div className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 backdrop-blur-md border border-white/20 shadow-inner">
                                <span className="material-symbols-outlined text-[16px] filled">verified_user</span>
                                <span className="text-xs font-bold tracking-wide">NABL Accredited Lab</span>
                            </div>

                            <div>
                                <h2 className="text-2xl font-black leading-tight tracking-tight">{test.name}</h2>
                                <p className="mt-2 text-blue-50 text-sm font-medium leading-relaxed max-w-lg">{test.description}</p>
                            </div>

                            <div className="mt-4 flex items-end gap-3">
                                <span className="text-3xl font-black tracking-tight">₹{currentPrice}</span>
                                <span className="mb-1.5 text-lg text-blue-200 line-through decoration-blue-300 font-bold">₹{currentMrp}</span>
                                {test.discountPercent && test.discountPercent > 0 && (
                                    <span className="mb-1.5 rounded-lg bg-white px-2 py-0.5 text-xs font-black text-primary shadow-sm uppercase tracking-wide">{test.discountPercent}% OFF</span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Key Info Grid */}
                <div className="px-4">
                    <div className="grid grid-cols-2 gap-3">
                        <InfoCard icon="schedule" label="Report in" value={currentReportTime || "24 Hours"} color="bg-blue-50 text-blue-600" darkColor="dark:bg-blue-900/20 dark:text-blue-400" />
                        <InfoCard icon="bloodtype" label="Sample Type" value={test.sampleType || "Blood"} color="bg-red-50 text-red-600" darkColor="dark:bg-red-900/20 dark:text-red-400" />
                        <InfoCard icon="no_food" label="Fasting" value={test.fastingRequired ? "Required" : "Not Required"} color="bg-amber-50 text-amber-600" darkColor="dark:bg-amber-900/20 dark:text-amber-400" />
                        <InfoCard icon="science" label="Department" value={test.category || "Pathology"} color="bg-emerald-50 text-emerald-600" darkColor="dark:bg-emerald-900/20 dark:text-emerald-400" />
                    </div>
                </div>

                {/* Centre Selection */}
                <div className="px-4">
                    <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3 px-1">Select Lab Partner</h3>
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
                                    <img src={variant.centerImage} alt={variant.centerName} className="size-full object-cover rounded-lg" />
                                </div>
                                <div className="flex-1 flex flex-col justify-center">
                                    <div className="flex justify-between items-start mb-1">
                                        <h4 className="font-bold text-sm text-slate-900 dark:text-white leading-tight">{variant.centerName}</h4>
                                        <span className="text-[10px] font-bold bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                                            {variant.rating || 4.5} <span className="material-symbols-outlined text-[10px] filled">star</span>
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-end mt-1">
                                        <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                                            {variant.reportTime} Report • {variant.distance || 'Nearby'}
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

                {/* Home Collection Toggle */}
                <div className="px-4">
                    <div className="flex items-center justify-between rounded-2xl bg-white dark:bg-surface-900 p-4 shadow-sm border border-surface-100 dark:border-surface-800">
                        <div className="flex items-center gap-3">
                            <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
                                <span className="material-symbols-outlined">home_health</span>
                            </div>
                            <div className="flex flex-col">
                                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Home Collection</h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">+ ₹50 convenience fee</p>
                            </div>
                        </div>
                        <label className="relative inline-flex cursor-pointer items-center">
                            <input type="checkbox" checked={homeCollection} onChange={(e) => setHomeCollection(e.target.checked)} className="peer sr-only" />
                            <div className="peer h-6 w-11 rounded-full bg-slate-200 dark:bg-slate-700 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none transition-colors"></div>
                        </label>
                    </div>
                </div>

                {/* Accordions */}
                <div className="flex flex-col gap-3 px-4 pb-4">
                    {test.parametersIncluded && test.parametersIncluded.length > 0 && (
                        <DetailsAccordion title={`Parameters Included (${test.parametersIncluded.length})`} defaultOpen badge="DETAILED">
                            <ul className="space-y-1">
                                {test.parametersIncluded.map((param: string, idx: number) => (
                                    <ParameterItem key={idx} name={param} />
                                ))}
                            </ul>
                        </DetailsAccordion>
                    )}

                    {(test.prerequisites || test.preparationInstructions) && (
                        <DetailsAccordion title="Preparation Instructions" defaultOpen={!test.parametersIncluded}>
                            <div className="flex items-start gap-3 p-2 bg-amber-50 dark:bg-amber-900/10 rounded-xl border border-amber-100 dark:border-amber-800/20 text-amber-900 dark:text-amber-100">
                                <span className="material-symbols-outlined text-amber-500 mt-0.5">info</span>
                                <p className="text-sm font-medium whitespace-pre-line">{test.prerequisites || test.preparationInstructions}</p>
                            </div>
                        </DetailsAccordion>
                    )}

                    <DetailsAccordion title="About this Test">
                        <p className="p-2">{test.description}</p>
                    </DetailsAccordion>
                </div>
            </main>

            {/* Sticky Footer */}
            <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/90 dark:bg-surface-950/90 backdrop-blur-xl border-t border-surface-200 dark:border-surface-800 p-4 pb-6 shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.1)]">
                <div className="flex items-center gap-4 max-w-4xl mx-auto">
                    <div className="flex flex-col">
                        <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total Price</p>
                        <div className="flex items-baseline gap-1.5">
                            <p className="text-2xl font-black text-slate-900 dark:text-white">₹{totalAmount}</p>
                            <span className="text-sm font-bold text-slate-400 line-through">₹{currentMrp}</span>
                        </div>
                    </div>
                    <button
                        onClick={handleBookNow}
                        className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-slate-900 dark:bg-white px-6 py-4 text-base font-black text-white dark:text-slate-900 shadow-lg shadow-slate-900/20 dark:shadow-white/10 hover:scale-[1.02] active:scale-[0.98] transition-all"
                    >
                        <span className="material-symbols-outlined text-[20px]">add_task</span>
                        Book Now
                    </button>
                </div>
            </div>
        </div>
    );
}
