'use client';

import React from 'react';
import { useSurgeryPackages } from '@/hooks/useServices';

export default function CommonSurgeries() {
    const { data: surgeries, loading } = useSurgeryPackages();

    return (
        <section className="mb-12">
            <div className="flex justify-between items-end mb-6 px-1">
                <div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white leading-none">Popular Surgeries</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mt-1">Most performed procedures</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    <div className="col-span-full flex justify-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent"></div>
                    </div>
                ) : (surgeries || []).map((surgery) => (
                    <div key={surgery.id} className="card-modern p-5 flex flex-col h-full group cursor-pointer active:scale-[0.99]">
                        <div className="flex justify-between items-start mb-4">
                            <span className="inline-block px-3 py-1 rounded-lg bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-wider">
                                {surgery.category}
                            </span>
                            <div className="size-10 rounded-full bg-slate-50 dark:bg-gray-700 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                <span className="material-symbols-outlined">arrow_outward</span>
                            </div>
                        </div>

                        <h4 className="text-lg font-black text-slate-900 dark:text-white leading-tight mb-2">{surgery.name}</h4>

                        {/* Tags from requirements */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            {(surgery.requirements || []).slice(0, 2).map((t, i) => (
                                <span key={i} className="text-[10px] font-bold text-slate-500 bg-slate-50 dark:bg-gray-700/50 px-2 py-1 rounded-md border border-slate-100 dark:border-gray-600">
                                    {t}
                                </span>
                            ))}
                        </div>

                        <div className="mt-auto space-y-3 pt-4 border-t border-slate-100 dark:border-gray-700">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-gray-400">
                                    <span className="material-symbols-outlined text-base">healing</span>
                                    {surgery.durationMinutes ? `${surgery.durationMinutes} min` : 'Varies'} Recovery
                                </div>
                                <span className="text-sm font-black text-slate-900 dark:text-white">
                                    {surgery.price ? `₹${surgery.price.toLocaleString()}` : 'Consult'}
                                </span>
                            </div>

                            <button className="w-full btn bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs uppercase tracking-widest py-3 hover:opacity-90">
                                View Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
