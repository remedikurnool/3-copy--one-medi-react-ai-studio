'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

// Components
import DiabetesHero from '@/components/diabetes-care/DiabetesHero';
import QuickActions from '@/components/diabetes-care/QuickActions';
import ConditionSelector from '@/components/diabetes-care/ConditionSelector';
import SugarLog from '@/components/diabetes-care/SugarLog';
import VitalsLog from '@/components/diabetes-care/VitalsLog';
import ProgramList from '@/components/diabetes-care/ProgramList';
import DiagnosticsGrid from '@/components/diabetes-care/DiagnosticsGrid';
import CareTeam from '@/components/diabetes-care/CareTeam';
import DeviceStore from '@/components/diabetes-care/DeviceStore';
import LifestyleHub from '@/components/diabetes-care/LifestyleHub';
import FootCare from '@/components/diabetes-care/FootCare';
import EducationFeed from '@/components/diabetes-care/EducationFeed';

export default function DiabetesCarePage() {
    const router = useRouter();
    const [selectedCondition, setSelectedCondition] = useState<string | null>(null);

    return (
        <div className="min-h-screen bg-[#fafafa] dark:bg-bg-dark text-slate-900 dark:text-white pb-28 font-sans animate-fade-in">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-slate-100 dark:border-gray-800">
                <div className="flex items-center gap-3 p-4 max-w-lg mx-auto">
                    <button onClick={() => router.back()} className="size-10 flex items-center justify-center rounded-full bg-slate-50 dark:bg-gray-800 text-slate-600 transition-transform active:scale-90 hover:bg-slate-100">
                        <span className="material-symbols-outlined">arrow_back</span>
                    </button>
                    <div className="flex flex-col">
                        <h1 className="text-lg font-black tracking-tight text-slate-900 dark:text-white uppercase leading-none">Diabetes Care</h1>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5">Control & Reversal</p>
                    </div>
                    <div className="flex-1"></div>
                    <div className="size-10 rounded-full bg-slate-50 dark:bg-gray-800 flex items-center justify-center text-slate-600">
                        <span className="material-symbols-outlined">notifications</span>
                    </div>
                </div>
            </header>

            <main className="max-w-lg mx-auto p-4 flex flex-col gap-2">
                {/* Dashboard Core */}
                <DiabetesHero />
                <QuickActions />

                {/* Personalization */}
                <ConditionSelector selected={selectedCondition} onSelect={setSelectedCondition} />

                {/* Monitoring Tools */}
                <SugarLog />
                <VitalsLog />

                {/* Clinical Services */}
                <ProgramList />
                <DiagnosticsGrid />
                <CareTeam />

                {/* Commerce & Lifestyle */}
                <DeviceStore />
                <LifestyleHub />
                <FootCare />
                <EducationFeed />
            </main>

            {/* Sticky Action Bar */}
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-md bg-blue-600 text-white py-3.5 px-6 rounded-2xl shadow-xl shadow-blue-200 dark:shadow-none flex items-center justify-between active:scale-[0.98] transition-all cursor-pointer">
                <div className="flex flex-col">
                    <span className="text-[10px] font-medium opacity-80 uppercase tracking-wider">Need Help?</span>
                    <span className="text-sm font-black">Talk to Diabetologist</span>
                </div>
                <div className="size-10 rounded-full bg-white/20 flex items-center justify-center">
                    <span className="material-symbols-outlined">call</span>
                </div>
            </div>
        </div>
    );
}
