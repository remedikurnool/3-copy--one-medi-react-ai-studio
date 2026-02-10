import React from 'react';
import { SURGERY_CONTENT_MASTER } from '@/data/surgery-content';

export default function SpecialtyGrid() {
    return (
        <section className="mb-12">
            <div className="flex justify-between items-end mb-6 px-1">
                <div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white leading-none">Find by Department</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mt-1">Specialized Care Centers</p>
                </div>
                <button className="text-xs font-black text-blue-600 uppercase tracking-widest hover:text-blue-700 transition-colors">View All</button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {SURGERY_CONTENT_MASTER.specialties.map((spec) => (
                    <div key={spec.id} className="bg-white dark:bg-gray-800 p-5 rounded-[2rem] border border-slate-100 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all cursor-pointer group active:scale-[0.98]">
                        <div className="size-16 rounded-2xl bg-indigo-50 dark:bg-gray-700 flex items-center justify-center text-indigo-500 mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                            <span className="material-symbols-outlined text-3xl">{spec.icon}</span>
                        </div>

                        <h4 className="text-sm font-black text-slate-900 dark:text-white leading-tight mb-1">{spec.label}</h4>
                        <p className="text-[10px] text-slate-400 font-medium leading-relaxed line-clamp-2 min-h-[2.5em]">{spec.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
