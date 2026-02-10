import React from 'react';
import { SCANS_CONTENT_MASTER } from '@/data/scans-content';

export default function HealthPackages() {
    return (
        <section className="mb-10">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 px-1">Curated Health Packages</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {SCANS_CONTENT_MASTER.packages.map((pkg) => (
                    <div key={pkg.id} className="bg-white dark:bg-gray-800 rounded-[2rem] p-5 border border-slate-100 dark:border-gray-700 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 group cursor-pointer relative overflow-hidden">
                        <div className={`absolute top-0 right-0 w-24 h-24 bg-${pkg.color}-500/10 rounded-full blur-2xl -mr-10 -mt-10 transition-all group-hover:bg-${pkg.color}-500/20`}></div>

                        <div className="flex justify-between items-start mb-4">
                            <span className={`bg-${pkg.color}-50 text-${pkg.color}-600 dark:bg-${pkg.color}-900/30 dark:text-${pkg.color}-300 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider`}>
                                {pkg.recommended}
                            </span>
                        </div>

                        <h4 className="text-lg font-black text-slate-900 dark:text-white leading-tight mb-2 pr-4">{pkg.title}</h4>

                        <div className="flex items-center gap-2 mb-4">
                            <div className="flex -space-x-2">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="size-6 rounded-full bg-slate-100 dark:bg-gray-700 border-2 border-white dark:border-gray-800 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-[10px] text-slate-400">hematology</span>
                                    </div>
                                ))}
                            </div>
                            <span className="text-xs font-bold text-slate-500">+{pkg.testsCount} Tests included</span>
                        </div>

                        <div className="pt-4 border-t border-slate-50 dark:border-gray-700 flex items-end justify-between">
                            <div>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">Package Price</p>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-xl font-black text-slate-900 dark:text-white">₹{pkg.price}</span>
                                    <span className="text-xs font-bold text-slate-400 line-through">₹{pkg.mrp}</span>
                                </div>
                            </div>
                            <button className="size-10 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center shadow-lg active:scale-90 transition-transform">
                                <span className="material-symbols-outlined text-lg">arrow_forward</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
