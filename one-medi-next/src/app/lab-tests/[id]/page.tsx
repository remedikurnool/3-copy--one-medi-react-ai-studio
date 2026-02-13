'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useCartStore } from '@/store/cartStore';
import { useLabTest } from '@/hooks';
import PageHeader from '@/components/ui/PageHeader';

// Reusable Components for this page
const InfoCard = ({ icon, label, value, color, darkColor }: any) => (
    <div className="flex flex-col gap-2 rounded-xl bg-white dark:bg-surface-900 p-4 shadow-sm border border-surface-200 dark:border-surface-800">
        <div className={`flex size-10 items-center justify-center rounded-full ${color} ${darkColor}`}>
            <span className="material-symbols-outlined">{icon}</span>
        </div>
        <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
            <p className="text-base font-bold text-slate-900 dark:text-white">{value}</p>
        </div>
    </div>
);

const DetailsAccordion = ({ title, children, defaultOpen, badge }: any) => (
    <details className="group rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 [&_summary::-webkit-details-marker]:hidden" open={defaultOpen}>
        <summary className="flex cursor-pointer items-center justify-between p-4 text-slate-900 dark:text-white select-none list-none">
            <div className="flex items-center gap-2">
                <h2 className="text-base font-bold">{title}</h2>
                {badge && <span className="rounded bg-green-100 dark:bg-green-900/30 px-2 py-0.5 text-[10px] font-bold text-green-700 dark:text-green-400">{badge}</span>}
            </div>
            <span className="material-symbols-outlined transition duration-300 group-open:-rotate-180 text-gray-400">expand_more</span>
        </summary>
        <div className="px-4 pb-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300 border-t border-gray-50 dark:border-gray-700/50 pt-3">
            {children}
        </div>
    </details>
);

const ParameterItem = ({ name }: any) => (
    <li className="flex items-start gap-3">
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
            <div className="min-h-screen bg-bg-light dark:bg-bg-dark flex items-center justify-center">
                <div className="animate-spin rounded-full h-10 w-10 border-2 border-primary border-t-transparent"></div>
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
        <div className="min-h-screen bg-surface-50 dark:bg-surface-950 text-slate-900 dark:text-white pb-28 relative flex flex-col font-sans">
            {/* Sticky Header */}
            <PageHeader
                title="Test Details"
                showSearch={false}
                showLocation={false}
                className="lg:top-20"
                actions={
                    <button onClick={() => router.push('/cart')} className="relative flex size-10 items-center justify-center rounded-full hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors">
                        <span className="material-symbols-outlined text-[24px]">shopping_cart</span>
                        {cartItemsCount > 0 && <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">{cartItemsCount}</span>}
                    </button>
                }
            />

            <main className="flex-1 w-full">
                {/* Hero Card */}
                <div className="p-4">
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-blue-400 p-6 shadow-lg text-white">
                        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl"></div>
                        <div className="absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-white/10 blur-3xl"></div>
                        <div className="relative z-10 flex flex-col gap-4">
                            <div className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 backdrop-blur-sm border border-white/10">
                                <span className="material-symbols-outlined text-[16px] filled">verified_user</span>
                                <span className="text-xs font-semibold tracking-wide">NABL Accredited Lab</span>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold leading-tight">{test.name}</h2>
                                <p className="mt-1 text-blue-50 text-sm font-medium">{test.description}</p>
                            </div>
                            <div className="mt-2 flex items-end gap-3">
                                <span className="text-3xl font-bold">₹{currentPrice}</span>
                                <span className="mb-1 text-lg text-blue-100 line-through decoration-blue-200">₹{currentMrp}</span>
                                {test.discountPercent && test.discountPercent > 0 && (
                                    <span className="mb-1 rounded-md bg-white px-2 py-0.5 text-sm font-bold text-primary">{test.discountPercent}% OFF</span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Key Info Grid */}
                <div className="px-4 mb-4">
                    <div className="grid grid-cols-2 gap-3">
                        <InfoCard icon="schedule" label="Report in" value={currentReportTime || "24 Hours"} color="bg-blue-50 text-primary" darkColor="dark:bg-blue-900/20 dark:text-blue-400" />
                        <InfoCard icon="bloodtype" label="Sample" value={test.sampleType || "Blood"} color="bg-red-50 text-red-500" darkColor="dark:bg-red-900/20 dark:text-red-400" />
                        <InfoCard icon="no_food" label="Fasting" value={test.fastingRequired ? "Required" : "Not Required"} color="bg-amber-50 text-amber-600" darkColor="dark:bg-amber-900/20 dark:text-amber-400" />
                        <InfoCard icon="science" label="Department" value={test.category || "Pathology"} color="bg-emerald-50 text-emerald-600" darkColor="dark:bg-emerald-900/20 dark:text-emerald-400" />
                    </div>
                </div>

                {/* Centre Selection */}
                <div className="px-4 mb-4">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3">Select Diagnostic Centre</h3>
                    <div className="flex flex-col gap-3">
                        {test.variants?.map((variant: any) => (
                            <div
                                key={variant.centerId}
                                onClick={() => setSelectedVariant(variant)}
                                className={`bg-white dark:bg-surface-900 rounded-xl p-3 border transition-all cursor-pointer flex gap-3 ${selectedVariant?.centerId === variant.centerId
                                    ? 'border-primary ring-1 ring-primary/20 shadow-md'
                                    : 'border-surface-200 dark:border-surface-700 opacity-80'
                                    }`}
                            >
                                <div className="size-14 rounded-lg bg-gray-50 dark:bg-gray-700 p-1 shrink-0 flex items-center justify-center overflow-hidden">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={variant.centerImage} alt={variant.centerName} className="size-full object-cover rounded-lg" />
                                </div>
                                <div className="flex-1 flex flex-col justify-center">
                                    <div className="flex justify-between items-start">
                                        <h4 className="font-bold text-sm text-slate-900 dark:text-white leading-tight">{variant.centerName}</h4>
                                        <span className="text-xs font-bold bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                                            {variant.rating || 4.5} <span className="material-symbols-outlined text-[10px] filled">star</span>
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-end mt-1">
                                        <div className="text-xs text-gray-500 dark:text-gray-400">
                                            {variant.reportTime} Report • {variant.distance || 'Nearby'}
                                        </div>
                                        <span className="font-bold text-slate-900 dark:text-white">₹{variant.price}</span>
                                    </div>
                                </div>
                                {selectedVariant?.centerId === variant.centerId && (
                                    <div className="absolute top-0 right-0 p-1.5">
                                        <span className="material-symbols-outlined text-primary text-[18px] filled">check_circle</span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Home Collection Toggle */}
                <div className="px-4 mb-4">
                    <div className="flex items-center justify-between rounded-2xl bg-white dark:bg-gray-800 p-4 shadow-sm border border-gray-100 dark:border-gray-700">
                        <div className="flex items-center gap-3">
                            <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary shrink-0">
                                <span className="material-symbols-outlined">home_health</span>
                            </div>
                            <div className="flex flex-col">
                                <h3 className="text-base font-bold text-slate-900 dark:text-white">Home Sample Collection</h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400">+ ₹50 convenience fee</p>
                            </div>
                        </div>
                        <label className="relative inline-flex cursor-pointer items-center">
                            <input type="checkbox" checked={homeCollection} onChange={(e) => setHomeCollection(e.target.checked)} className="peer sr-only" />
                            <div className="peer h-7 w-12 rounded-full bg-gray-200 dark:bg-gray-700 after:absolute after:left-[2px] after:top-[2px] after:h-6 after:w-6 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none"></div>
                        </label>
                    </div>
                </div>

                {/* Accordions */}
                <div className="flex flex-col gap-3 px-4 pb-4">
                    {test.parametersIncluded && test.parametersIncluded.length > 0 && (
                        <DetailsAccordion title={`Parameters Included (${test.parametersIncluded.length})`} defaultOpen badge="DETAILED">
                            <ul className="space-y-3">
                                {test.parametersIncluded.map((param: string, idx: number) => (
                                    <ParameterItem key={idx} name={param} />
                                ))}
                            </ul>
                        </DetailsAccordion>
                    )}

                    {(test.prerequisites || test.preparationInstructions) && (
                        <DetailsAccordion title="Preparation Instructions" defaultOpen={!test.parametersIncluded}>
                            <p className="whitespace-pre-line">{test.prerequisites || test.preparationInstructions}</p>
                        </DetailsAccordion>
                    )}

                    <DetailsAccordion title="About this Test">
                        <p>{test.description}</p>
                    </DetailsAccordion>
                </div>
            </main>

            {/* Sticky Footer */}
            <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/90 dark:bg-surface-950/90 backdrop-blur-md border-t border-surface-200 dark:border-surface-800 p-4 pb-6 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                <div className="flex items-center gap-4 max-w-md mx-auto">
                    <div className="flex flex-col">
                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Total Price</p>
                        <p className="text-xl font-bold text-slate-900 dark:text-white">₹{totalAmount}</p>
                    </div>
                    <button onClick={handleBookNow} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3.5 text-base font-bold text-white shadow-md shadow-blue-500/30 transition-transform active:scale-[0.98]">
                        <span className="material-symbols-outlined text-[20px]">shopping_cart_checkout</span>
                        Book Now
                    </button>
                </div>
            </div>
        </div>
    );
}
