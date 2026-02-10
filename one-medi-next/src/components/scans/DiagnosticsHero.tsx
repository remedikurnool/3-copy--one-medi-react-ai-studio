import React from 'react';

export default function DiagnosticsHero() {
    return (
        <section className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-indigo-600 to-purple-700 text-white p-6 md:p-10 shadow-2xl shadow-indigo-900/20 mb-8 group">
            {/* Background Effects */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 size-96 rounded-full bg-white/10 blur-3xl animate-pulse-slow"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 size-72 rounded-full bg-blue-500/20 blur-3xl"></div>

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex-1 text-center md:text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-4">
                        <span className="material-symbols-outlined text-[16px] text-yellow-300">home_health</span>
                        <span className="text-[10px] font-black uppercase tracking-widest text-white">Home Collection Available</span>
                    </div>

                    <h1 className="text-3xl md:text-5xl font-black leading-tight mb-4 tracking-tight">
                        Advanced Diagnostics<br />
                        <span className="text-indigo-200">at Your Doorstep</span>
                    </h1>

                    <p className="text-indigo-100 font-medium text-sm md:text-base leading-relaxed mb-8 max-w-lg mx-auto md:mx-0 opacity-90">
                        From MRI & CT Scans to Blood Tests. NABL Accredited Labs. Digital Reports in 24 Hours.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                        <button className="h-14 px-8 rounded-2xl bg-white text-indigo-700 font-black text-xs uppercase tracking-widest hover:bg-indigo-50 transition-colors shadow-lg active:scale-95 flex items-center justify-center gap-2">
                            <span className="material-symbols-outlined">add_a_photo</span>
                            Upload Prescription
                        </button>
                        <button className="h-14 px-8 rounded-2xl bg-indigo-900/30 backdrop-blur-md border border-white/20 text-white font-black text-xs uppercase tracking-widest hover:bg-indigo-900/50 transition-colors flex items-center justify-center gap-2">
                            <span className="material-symbols-outlined">medical_services</span>
                            Book Home Visit
                        </button>
                    </div>
                </div>

                <div className="hidden md:flex size-56 lg:size-72 relative">
                    <div className="absolute inset-0 bg-white/5 rounded-full backdrop-blur-sm border border-white/10 flex items-center justify-center animate-float">
                        <span className="material-symbols-outlined text-9xl text-white/90">biotech</span>
                    </div>
                    {/* Orbiting Icons */}
                    <div className="absolute -top-4 right-10 p-3 bg-white rounded-2xl shadow-lg animate-bounce">
                        <span className="material-symbols-outlined text-red-500 text-2xl">hematology</span>
                    </div>
                    <div className="absolute bottom-4 left-0 p-3 bg-white rounded-2xl shadow-lg">
                        <span className="material-symbols-outlined text-blue-500 text-2xl">radiology</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
