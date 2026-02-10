import React from 'react';

export default function TrustTips() {
    return (
        <section className="mb-6">
            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-[2rem] p-6 border border-indigo-100 dark:border-indigo-900/30">
                <div className="flex items-start gap-4 mb-4">
                    <div className="size-10 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center text-indigo-500 shadow-sm shrink-0">
                        <span className="material-symbols-outlined text-xl">tips_and_updates</span>
                    </div>
                    <div>
                        <h3 className="font-black text-slate-900 dark:text-white text-lg leading-tight mb-1">Doctor's Tip of the Week</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">Stay hydrated! Your baby needs plenty of fluids. Aim for 8-10 glasses of water daily to maintain amniotic fluid levels.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                    <div className="bg-white/60 dark:bg-black/20 rounded-2xl p-4 flex gap-3 items-center backdrop-blur-sm">
                        <span className="material-symbols-outlined text-rose-500 text-xl shrink-0">warning</span>
                        <div className="text-xs">
                            <span className="block font-black text-slate-900 dark:text-white mb-0.5">Red Flags</span>
                            <span className="text-slate-500 dark:text-slate-400">Spotting, severe cramps, or fever? Consult immediately.</span>
                        </div>
                    </div>
                    <div className="bg-white/60 dark:bg-black/20 rounded-2xl p-4 flex gap-3 items-center backdrop-blur-sm">
                        <span className="material-symbols-outlined text-teal-500 text-xl shrink-0">check_circle</span>
                        <div className="text-xs">
                            <span className="block font-black text-slate-900 dark:text-white mb-0.5">Good Signs</span>
                            <span className="text-slate-500 dark:text-slate-400">Regular movement and steady weight gain.</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
