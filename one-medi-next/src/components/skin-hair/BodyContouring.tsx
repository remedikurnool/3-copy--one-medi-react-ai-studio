import React from 'react';

export default function BodyContouring() {
    return (
        <section className="py-4">
            <div className="relative rounded-[2.5rem] overflow-hidden bg-slate-900 text-white p-6 shadow-2xl">
                {/* Background Image Placeholder */}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-transparent z-10"></div>

                <div className="relative z-20 max-w-[80%]">
                    <span className="inline-block px-3 py-1 rounded-full bg-rose-500 text-white text-[9px] font-black uppercase tracking-widest mb-3">
                        Body Studio
                    </span>
                    <h3 className="text-2xl font-black leading-none mb-2">Sculpt Your Dream Body</h3>
                    <p className="text-xs text-slate-300 font-medium leading-relaxed mb-6">
                        Non-invasive fat loss and muscle building with FDA-approved HIFEM & Cryo technology.
                    </p>

                    <button className="flex items-center gap-2 bg-white text-slate-900 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg active:scale-95 transition-transform hover:bg-slate-100">
                        <span>Explore Plans</span>
                        <span className="material-symbols-outlined text-base">arrow_forward</span>
                    </button>
                </div>
            </div>
        </section>
    );
}
