import React from 'react';

export default function PregnancyTracker() {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-rose-100 dark:border-rose-900/30">
            <div className="flex items-center gap-4 mb-6">
                <div className="size-16 rounded-full bg-rose-50 dark:bg-rose-900/20 flex items-center justify-center text-rose-500 border-4 border-rose-100 dark:border-rose-900/40">
                    <span className="material-symbols-outlined text-3xl">calendar_month</span>
                </div>
                <div>
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white leading-none mb-1">Week 24</h2>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Trimester 2 • Baby size: Ear of Corn 🌽</p>
                </div>
            </div>

            <div className="space-y-6">
                <div className="relative pl-8 border-l-2 border-slate-100 dark:border-slate-800 space-y-8">
                    <div className="relative">
                        <span className="absolute -left-[39px] top-0 size-5 rounded-full bg-rose-500 border-4 border-white dark:border-gray-800 shadow-sm"></span>
                        <h4 className="font-black text-slate-900 dark:text-white mb-1">Baby's Development</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">Your baby's inner ear is fully developed. They can now sense being upside down in the womb!</p>
                    </div>
                    <div className="relative">
                        <span className="absolute -left-[39px] top-0 size-5 rounded-full bg-slate-200 dark:bg-slate-700 border-4 border-white dark:border-gray-800 shadow-sm"></span>
                        <h4 className="font-black text-slate-900 dark:text-white mb-1">Your Symptoms</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">You might feel a bit more energetic now. Use this time to prepare the nursery.</p>
                    </div>
                </div>

                <button className="w-full py-4 rounded-2xl bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 font-black uppercase tracking-widest text-xs hover:bg-rose-100 dark:hover:bg-rose-900/30 transition-colors">
                    View Full Calendar
                </button>
            </div>
        </div>
    );
}
