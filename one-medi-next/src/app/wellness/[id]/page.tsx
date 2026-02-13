'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import PageHeader from '@/components/ui/PageHeader';
import { WELLNESS_CONTENT_MASTER } from '@/data/wellness-content';
import { useCartStore } from '@/store/cartStore';
import ProgramCurriculum from '@/components/wellness/ProgramCurriculum';

export default function WellnessDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const { addToCart } = useCartStore();
    const resolvedParams = React.use(params);

    // Use mock data or first item as fallback
    const program = WELLNESS_CONTENT_MASTER.programs.find(p => p.id === resolvedParams.id) || WELLNESS_CONTENT_MASTER.programs[0];

    const handleAddToCart = () => {
        addToCart({
            id: program.id,
            name: program.name,
            price: program.price,
            mrp: program.mrp,
            image: program.image,
            type: 'lab', // Reusing lab type or add 'wellness' to CartItem interface if needed
            qty: 1,
            discount: '20% OFF',
        });
    };

    return (
        <div className="min-h-screen bg-surface-50 dark:bg-surface-950 font-sans text-slate-900 dark:text-white pb-32 animate-fade-in">
            <PageHeader
                title="Program Details"
                showSearch={false}
                className="lg:top-20"
            />

            <main className="p-4 max-w-4xl mx-auto w-full flex flex-col gap-6">
                {/* Hero Card */}
                <div className="bg-white dark:bg-gray-800 rounded-[2.5rem] overflow-hidden shadow-sm border border-slate-100 dark:border-gray-700">
                    <div className="relative h-64 md:h-80 w-full">
                        <img
                            src={program.image}
                            alt={program.name}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                        <div className="absolute bottom-6 left-6 right-6 text-white">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="bg-teal-500/20 backdrop-blur-md border border-teal-500/30 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                                    {program.category}
                                </span>
                                <span className="flex items-center gap-1 text-[10px] font-bold text-yellow-300">
                                    <span className="material-symbols-outlined text-sm filled">star</span>
                                    {program.rating} Rating
                                </span>
                            </div>
                            <h1 className="text-3xl md:text-4xl font-black leading-tight mb-2">{program.name}</h1>
                            <p className="text-sm font-medium text-slate-200 line-clamp-2 max-w-xl">{program.description}</p>
                        </div>
                    </div>

                    <div className="p-6 md:p-8">
                        <div className="flex flex-wrap gap-6 mb-8">
                            <div className="flex items-center gap-3">
                                <div className="size-10 rounded-full bg-slate-50 dark:bg-gray-700 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-slate-600 dark:text-slate-300">schedule</span>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Duration</p>
                                    <p className="text-sm font-black text-slate-900 dark:text-white">{program.duration}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="size-10 rounded-full bg-slate-50 dark:bg-gray-700 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-slate-600 dark:text-slate-300">person</span>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Expert</p>
                                    <p className="text-sm font-black text-slate-900 dark:text-white">{program.expert}</p>
                                </div>
                            </div>
                        </div>

                        <ProgramCurriculum includes={program.includes} />

                        <div className="mt-8 bg-teal-50 dark:bg-teal-900/10 p-4 rounded-2xl border border-teal-100 dark:border-teal-800/30 flex gap-4 items-start">
                            <span className="material-symbols-outlined text-teal-600 mt-1">support_agent</span>
                            <div>
                                <h4 className="text-sm font-black text-teal-800 dark:text-teal-400 uppercase tracking-wide mb-1">Expert Support</h4>
                                <p className="text-xs text-teal-700/80 dark:text-teal-400/80 leading-relaxed">
                                    Get 24/7 chat access to your dietitian/trainer throughout the program for doubts and motivation.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Bottom Cart Bar */}
            <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 p-4 pb-6 z-50">
                <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
                    <div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-black text-slate-900 dark:text-white">₹{program.price}</span>
                            <span className="text-sm font-bold text-slate-400 line-through">₹{program.mrp}</span>
                        </div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Limited Time Offer</p>
                    </div>

                    <button
                        onClick={handleAddToCart}
                        className="h-14 px-8 bg-teal-600 hover:bg-teal-700 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-teal-500/30 hover:shadow-2xl hover:-translate-y-1 active:scale-95 transition-all flex items-center gap-2"
                    >
                        <span className="material-symbols-outlined">rocket_launch</span>
                        Join Now
                    </button>
                </div>
            </div>
        </div>
    );
}
