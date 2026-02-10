import React from 'react';
import { SURGERY_CONTENT_MASTER } from '@/data/surgery-content';

export default function CommonSurgeries() {
    return (
        <section className="mb-12">
            <div className="flex justify-between items-end mb-6 px-1">
                <div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white leading-none">Popular Surgeries</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mt-1">Most performed procedures</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {SURGERY_CONTENT_MASTER.commonSurgeries.map((surgery) => (
                    <div key={surgery.id} className="bg-white dark:bg-gray-800 rounded-[2rem] p-5 border border-slate-100 dark:border-gray-700 shadow-sm hover:shadow-xl transition-all group cursor-pointer active:scale-[0.99] flex flex-col h-full">
                        <div className="flex justify-between items-start mb-4">
                            <span className="inline-block px-3 py-1 rounded-lg bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-wider">
                                {surgery.category}
                            </span>
                            <div className="size-10 rounded-full bg-slate-50 dark:bg-gray-700 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                <span className="material-symbols-outlined">arrow_outward</span>
                            </div>
                        </div>

                        <h4 className="text-lg font-black text-slate-900 dark:text-white leading-tight mb-2">{surgery.title}</h4>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            {surgery.tech.slice(0, 2).map((t, i) => (
                                <span key={i} className="text-[10px] font-bold text-slate-500 bg-slate-50 dark:bg-gray-700/50 px-2 py-1 rounded-md border border-slate-100 dark:border-gray-600">
                                    {t}
                                </span>
                            ))}
                        </div>

                        <div className="mt-auto space-y-3 pt-4 border-t border-slate-100 dark:border-gray-700">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-gray-400">
                                    <span className="material-symbols-outlined text-base">healing</span>
                                    {surgery.recovery} Recovery
                                </div>
                                <span className="text-sm font-black text-slate-900 dark:text-white">{surgery.price}</span>
                            </div>

                            <button className="w-full py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-black uppercase tracking-widest hover:opacity-90 transition-opacity">
                                View Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
