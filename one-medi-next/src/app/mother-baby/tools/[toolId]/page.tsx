'use client';

import React, { use } from 'react';
import { useRouter } from 'next/navigation';
import PregnancyTracker from '@/components/mother-baby/tools/PregnancyTracker';
import VaccinationTracker from '@/components/mother-baby/tools/VaccinationTracker';

// Define available tools
const TOOLS_MAP: Record<string, React.ComponentType> = {
    'tracker': PregnancyTracker,
    'vaccine': VaccinationTracker,
};

export default function ToolPage({ params }: { params: Promise<{ toolId: string }> }) {
    const router = useRouter();
    const { toolId } = use(params);

    const ToolComponent = TOOLS_MAP[toolId];

    if (!ToolComponent) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-rose-50 dark:bg-gray-900 p-4 text-center">
                <div className="size-20 rounded-full bg-slate-200 dark:bg-gray-800 flex items-center justify-center text-slate-400 mb-4">
                    <span className="material-symbols-outlined text-4xl">construction</span>
                </div>
                <h1 className="text-xl font-black text-slate-900 dark:text-white mb-2">Tool Under Construction</h1>
                <p className="text-slate-500 mb-6 max-w-xs">We're building this feature to help you better. Check back soon!</p>
                <button
                    onClick={() => router.back()}
                    className="px-6 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold uppercase tracking-widest text-xs"
                >
                    Go Back
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#fffafa] dark:bg-bg-dark text-slate-900 dark:text-white font-sans animate-fade-in pb-20">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-rose-100 dark:border-gray-800">
                <div className="flex items-center gap-3 p-4 max-w-2xl mx-auto">
                    <button onClick={() => router.back()} className="size-10 flex items-center justify-center rounded-full bg-slate-50 dark:bg-gray-800 text-slate-600 dark:text-slate-300 transition-transform active:scale-90 hover:bg-slate-100">
                        <span className="material-symbols-outlined">arrow_back</span>
                    </button>
                    <h1 className="text-lg font-black tracking-tight text-slate-900 dark:text-white uppercase">One Medi Tools</h1>
                </div>
            </header>

            <main className="max-w-2xl mx-auto p-4 lg:p-6">
                <ToolComponent />
            </main>
        </div>
    );
}
