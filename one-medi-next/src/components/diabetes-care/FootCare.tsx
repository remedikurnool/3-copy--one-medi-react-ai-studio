import React from 'react';

export default function FootCare() {
    return (
        <section className="mb-8">
            <div className="flex justify-between items-end mb-4 px-1">
                <div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white leading-none">Foot Care</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mt-1">Prevent complications early</p>
                </div>
            </div>

            <div className="bg-indigo-900 rounded-[2rem] p-6 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 -mt-10 -mr-10 size-40 bg-indigo-500 rounded-full blur-3xl opacity-50"></div>

                <div className="relative z-10 flex gap-4">
                    <div className="flex-1">
                        <span className="inline-block px-2 py-1 rounded bg-white/20 text-[9px] font-bold uppercase tracking-wider mb-3 backdrop-blur-md">Daily Checklist</span>
                        <h4 className="text-lg font-bold leading-tight mb-2">Check your feet for cuts or sores every day.</h4>
                        <p className="text-xs text-indigo-200 mb-4 opacity-90">Diabetes can reduce sensation in your feet. A small cut can become a big problem if unnoticed.</p>

                        <button className="bg-white text-indigo-900 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider">
                            See Guide
                        </button>
                    </div>

                    <div className="w-24 shrink-0 flex flex-col gap-3">
                        <div className="aspect-square rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center flex-col gap-1 border border-white/10">
                            <span className="material-symbols-outlined text-2xl">foot_bones</span>
                            <span className="text-[8px] font-bold uppercase">Screening</span>
                        </div>
                        <div className="aspect-square rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center flex-col gap-1 border border-white/10">
                            <span className="material-symbols-outlined text-2xl">ice_skating</span>
                            <span className="text-[8px] font-bold uppercase">Footwear</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
