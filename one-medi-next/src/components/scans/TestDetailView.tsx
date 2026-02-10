import React from 'react';

interface TestDetailProps {
    test: any;
}

export default function TestDetailView({ test }: TestDetailProps) {
    return (
        <div className="flex flex-col gap-6">
            <div>
                <span className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider mb-2 inline-block">
                    {test.category}
                </span>
                <h1 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white leading-tight mb-4">
                    {test.name}
                </h1>

                <div className="flex flex-wrap gap-4 text-xs font-bold text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-2 bg-slate-50 dark:bg-gray-800 px-3 py-1.5 rounded-lg border border-slate-100 dark:border-gray-700">
                        <span className="material-symbols-outlined text-sm">schedule</span>
                        Report in {test.tat}
                    </div>
                    <div className="flex items-center gap-2 bg-slate-50 dark:bg-gray-800 px-3 py-1.5 rounded-lg border border-slate-100 dark:border-gray-700">
                        <span className="material-symbols-outlined text-sm">science</span>
                        NABL Accredited Labs
                    </div>
                </div>
            </div>

            <div className="bg-amber-50 dark:bg-amber-900/10 p-4 rounded-2xl border border-amber-100 dark:border-amber-800/30 flex gap-3">
                <span className="material-symbols-outlined text-amber-500 shrink-0">info</span>
                <div>
                    <h4 className="text-xs font-black text-amber-700 dark:text-amber-400 uppercase tracking-wide mb-1">Preparation Guide</h4>
                    <p className="text-xs font-medium text-amber-700/80 dark:text-amber-400/80 leading-relaxed">
                        {test.preparation}
                    </p>
                </div>
            </div>
        </div>
    );
}
