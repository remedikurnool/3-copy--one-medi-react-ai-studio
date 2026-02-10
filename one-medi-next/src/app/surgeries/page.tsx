'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import PageHeader from '@/components/ui/PageHeader';

// Surgery Components
import SurgeryHero from '@/components/surgery/SurgeryHero';
import TrustSignals from '@/components/surgery/TrustSignals';
import SpecialtyGrid from '@/components/surgery/SpecialtyGrid';
import CommonSurgeries from '@/components/surgery/CommonSurgeries';

export default function SurgeriesPage() {
    const router = useRouter();
    const [search, setSearch] = useState('');

    return (
        <div className="min-h-screen bg-surface-50 dark:bg-surface-950 font-sans text-slate-900 dark:text-white pb-24 animate-fade-in">
            <PageHeader
                title="Surgery Care"
                subtitle="Expert Opinions & Booking"
                showSearch={false}
                className="lg:top-20"
            />

            <main className="p-4 max-w-7xl mx-auto w-full flex flex-col gap-6">
                {/* Hero & Trust */}
                <SurgeryHero />
                <TrustSignals />

                {/* Discovery Layers */}
                <SpecialtyGrid />
                <CommonSurgeries />

                {/* Second Opinion CTA Banner */}
                <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-emerald-900 to-teal-900 text-white p-8 md:p-12 shadow-2xl group cursor-pointer border border-white/10"
                    onClick={() => router.push('/surgeries/second-opinion')}
                >
                    <div className="absolute right-0 top-0 size-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl group-hover:bg-white/10 transition-colors duration-500"></div>

                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div>
                            <span className="inline-block px-3 py-1 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-200 text-[10px] font-black uppercase tracking-widest mb-3">
                                Free Service
                            </span>
                            <h2 className="text-3xl md:text-4xl font-black mb-4 leading-tight">Got a Surgery Advice? <br /><span className="text-emerald-400">Get a Second Opinion.</span></h2>
                            <p className="text-slate-300 max-w-lg text-sm md:text-base leading-relaxed font-medium mb-8">
                                Upload your prescription or reports. Our top surgeons will review your case and guide you on the best course of action - absolutely free.
                            </p>
                            <button className="h-14 px-8 rounded-2xl bg-emerald-500 text-white font-black text-sm uppercase tracking-widest hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-900/50 active:scale-95 flex items-center gap-2">
                                Upload Reports
                                <span className="material-symbols-outlined">upload_file</span>
                            </button>
                        </div>

                        <div className="size-40 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10 shadow-inner group-hover:scale-110 transition-transform duration-700 shrink-0">
                            <span className="material-symbols-outlined text-7xl text-emerald-100 opacity-90">verified_user</span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

