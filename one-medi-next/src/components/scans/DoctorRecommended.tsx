import React from 'react';
import { SCANS_CONTENT_MASTER } from '@/data/scans-content';

export default function DoctorRecommended() {
    return (
        <section className="mb-10">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 px-1">Doctor Recommended</h3>

            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                {SCANS_CONTENT_MASTER.doctorRecommended.map((doc, idx) => (
                    <div key={idx} className="min-w-[200px] bg-slate-50 dark:bg-gray-800/50 p-4 rounded-2xl border border-slate-100 dark:border-gray-700 hover:border-indigo-200 transition-colors cursor-pointer group">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="size-10 rounded-full bg-white dark:bg-gray-700 shadow-sm flex items-center justify-center">
                                <span className="material-symbols-outlined text-indigo-500">{doc.icon}</span>
                            </div>
                            <span className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wide">{doc.label}</span>
                        </div>

                        <div className="flex flex-wrap gap-1">
                            {doc.tests.map((t, i) => (
                                <span key={i} className="text-[9px] font-bold text-slate-500 dark:text-slate-400 bg-white dark:bg-gray-900 px-2 py-1 rounded-md border border-slate-100 dark:border-gray-800">
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
