import React from 'react';

export default function SurgeryHero() {
    return (
        <section className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white p-8 md:p-12 shadow-2xl shadow-blue-900/20 mb-8">
            {/* Background Effects */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 size-80 rounded-full bg-blue-500/20 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 size-60 rounded-full bg-emerald-500/10 blur-3xl"></div>

            <div className="relative z-10 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 mb-4">
                    <span className="size-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-100">Trusted by 10,000+ Patients</span>
                </div>

                <h1 className="text-3xl md:text-5xl font-black leading-tight mb-4 tracking-tight">
                    Confused about <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-emerald-200">Surgery?</span>
                </h1>

                <p className="text-slate-300 font-medium text-sm md:text-base leading-relaxed mb-8 max-w-lg">
                    Get expert guidance, compare costs, and book surgeries with top surgeons in Kurnool. Zero hidden charges. 100% Insurance assistance.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                    <button className="h-14 px-8 rounded-2xl bg-white text-blue-900 font-black text-sm uppercase tracking-widest hover:bg-blue-50 transition-colors shadow-lg active:scale-95 flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined">call</span>
                        Talk to Surgeon
                    </button>
                    <button className="h-14 px-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-sm uppercase tracking-widest hover:bg-white/20 transition-colors flex items-center justify-center gap-2">
                        Get Second Opinion
                    </button>
                </div>
            </div>
        </section>
    );
}
