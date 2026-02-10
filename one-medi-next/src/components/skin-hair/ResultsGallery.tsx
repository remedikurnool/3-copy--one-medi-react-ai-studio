import React from 'react';

export default function ResultsGallery() {
    return (
        <section className="py-4 bg-slate-50 dark:bg-gray-800/50 -mx-4 px-4 mb-4">
            <div className="flex justify-between items-end mb-4 px-1">
                <div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white leading-none">Real Results</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mt-1">Transformations at One Medi</p>
                </div>
            </div>

            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="min-w-[260px] bg-white dark:bg-gray-800 rounded-3xl p-3 border border-slate-100 dark:border-gray-700 shadow-sm">
                        <div className="flex gap-2 h-32 mb-3">
                            <div className="flex-1 bg-slate-100 dark:bg-gray-700 rounded-2xl flex items-center justify-center text-slate-400 relative">
                                <span className="absolute top-2 left-2 text-[8px] font-black uppercase bg-black/50 text-white px-1.5 py-0.5 rounded backdrop-blur-sm">Before</span>
                                <span className="material-symbols-outlined text-3xl">image</span>
                            </div>
                            <div className="flex-1 bg-slate-100 dark:bg-gray-700 rounded-2xl flex items-center justify-center text-slate-400 relative">
                                <span className="absolute top-2 left-2 text-[8px] font-black uppercase bg-emerald-500 text-white px-1.5 py-0.5 rounded backdrop-blur-sm">After</span>
                                <span className="material-symbols-outlined text-3xl">check_circle</span>
                            </div>
                        </div>
                        <h4 className="text-xs font-black text-slate-900 dark:text-white px-1">Laser Acne Scar Revision</h4>
                        <p className="text-[10px] text-slate-500 px-1">4 Sessions • 3 Months</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
