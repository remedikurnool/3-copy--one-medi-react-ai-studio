import React from 'react';

export default function PharmacyHero() {
    return (
        <section className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-teal-500 to-emerald-600 text-white p-6 md:p-10 shadow-2xl shadow-teal-900/10 mb-8 group">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 size-80 rounded-full bg-white/10 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 size-60 rounded-full bg-yellow-400/20 blur-3xl"></div>

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex-1 text-center md:text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/20 mb-4 shadow-sm">
                        <span className="material-symbols-outlined text-[16px]">verified</span>
                        <span className="text-[10px] font-black uppercase tracking-widest text-white">Genuine Machines</span>
                    </div>

                    <h1 className="text-3xl md:text-5xl font-black leading-tight mb-4 tracking-tight drop-shadow-sm">
                        Upload Prescription,<br />
                        <span className="text-teal-100">We do the rest!</span>
                    </h1>

                    <p className="text-teal-50 font-medium text-sm md:text-base leading-relaxed mb-6 max-w-lg mx-auto md:mx-0 opacity-90">
                        Flat 20% OFF on all prescription medicines. Free home delivery within 2 hours in Kurnool.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                        <button className="h-14 px-8 rounded-2xl bg-white text-teal-700 font-black text-xs uppercase tracking-widest hover:bg-teal-50 transition-colors shadow-lg active:scale-95 flex items-center justify-center gap-2">
                            <span className="material-symbols-outlined">upload_file</span>
                            Upload Now
                        </button>
                        <button className="h-14 px-8 rounded-2xl bg-teal-800/30 backdrop-blur-md border border-white/20 text-white font-black text-xs uppercase tracking-widest hover:bg-teal-800/40 transition-colors flex items-center justify-center gap-2">
                            <span className="material-symbols-outlined">call</span>
                            Call to Order
                        </button>
                    </div>
                </div>

                {/* Hero Illustration/Image Placeholder */}
                <div className="hidden md:flex size-48 lg:size-64 bg-white/10 backdrop-blur-md rounded-full items-center justify-center border border-white/20 shadow-inner group-hover:scale-105 transition-transform duration-700">
                    <span className="material-symbols-outlined text-8xl lg:text-9xl text-white opacity-90 drop-shadow-lg">prescriptions</span>
                </div>
            </div>
        </section>
    );
}
