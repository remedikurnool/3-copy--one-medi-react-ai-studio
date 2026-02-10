'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import PageHeader from '@/components/ui/PageHeader';
import ProcedureGuide from '@/components/surgery/ProcedureGuide';
import TechShowcase from '@/components/surgery/TechShowcase';
import SurgeonCard from '@/components/surgery/SurgeonCard';
import CostEstimator from '@/components/surgery/CostEstimator';

export default function ProcedurePage({ params }: { params: { slug: string } }) {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-surface-50 dark:bg-surface-950 font-sans text-slate-900 dark:text-white pb-24 animate-fade-in">
            <PageHeader
                title="Procedure Details"
                subtitle="Comprehensive Guide"
                showSearch={false}
                className="lg:top-20"
            />

            <main className="p-4 max-w-4xl mx-auto w-full flex flex-col gap-6">
                {/* Hero */}
                <div className="bg-white dark:bg-gray-800 rounded-[2.5rem] p-6 md:p-8 border border-slate-100 dark:border-gray-700 shadow-sm mb-6">
                    <span className="inline-block px-3 py-1 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 text-[10px] font-black uppercase tracking-widest mb-4">
                        General Surgery
                    </span>
                    <h1 className="text-3xl md:text-4xl font-black mb-4 leading-tight">Hernia Repair Surgery</h1>
                    <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-2xl">
                        A common procedure to correct a hernia (bulging of an internal organ). Using modern laparoscopic techniques, recovery is quick and pain is minimal.
                    </p>

                    <div className="flex gap-4 mt-8">
                        <div className="flex items-center gap-2">
                            <div className="size-10 rounded-full bg-slate-50 dark:bg-gray-700 flex items-center justify-center text-slate-500">
                                <span className="material-symbols-outlined">schedule</span>
                            </div>
                            <div>
                                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide">Duration</span>
                                <span className="text-sm font-black">45 Mins</span>
                            </div>
                        </div>
                        <div className="w-px h-10 bg-slate-100 dark:bg-gray-700"></div>
                        <div className="flex items-center gap-2">
                            <div className="size-10 rounded-full bg-slate-50 dark:bg-gray-700 flex items-center justify-center text-slate-500">
                                <span className="material-symbols-outlined">healing</span>
                            </div>
                            <div>
                                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide">Recovery</span>
                                <span className="text-sm font-black">2 Days</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Educational Content */}
                <ProcedureGuide />

                {/* Technology */}
                <TechShowcase />

                {/* Doctor & Cost */}
                <SurgeonCard />
                <CostEstimator />

                {/* CTA Bar */}
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-md bg-slate-900 text-white py-4 px-6 rounded-2xl shadow-2xl flex items-center justify-between active:scale-[0.98] transition-all cursor-pointer">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-medium opacity-60 uppercase tracking-wider">Interested?</span>
                        <span className="text-sm font-black">Book Consultation</span>
                    </div>
                    <div className="size-10 rounded-full bg-white/20 flex items-center justify-center">
                        <span className="material-symbols-outlined">calendar_month</span>
                    </div>
                </div>
            </main>
        </div>
    );
}
