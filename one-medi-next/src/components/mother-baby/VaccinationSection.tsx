import React from 'react';
import { useRouter } from 'next/navigation';

export default function VaccinationSection() {
    const router = useRouter();

    return (
        <section className="mb-8">
            <div
                onClick={() => router.push('/mother-baby/tools/vaccine')}
                className="bg-gradient-to-r from-teal-500 to-emerald-500 rounded-[2.5rem] p-6 text-white shadow-lg shadow-teal-500/20 relative overflow-hidden group cursor-pointer"
            >
                {/* Background Decor */}
                <div className="absolute top-0 right-0 p-8 opacity-20 transform translate-x-1/4 -translate-y-1/4">
                    <span className="material-symbols-outlined text-[180px]">vaccines</span>
                </div>

                <div className="relative z-10">
                    <div className="flex items-start justify-between mb-8">
                        <div>
                            <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-[10px] font-black uppercase tracking-widest mb-3 shadow-sm">
                                Important
                            </span>
                            <h3 className="text-2xl font-black leading-tight mb-2">Baby's Immunization<br />Schedule</h3>
                            <p className="text-sm font-medium text-teal-50 max-w-[200px] leading-relaxed">Ensure your little one is protected. Track upcoming vaccines effortlessly.</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex-1 bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10">
                            <p className="text-[10px] font-bold uppercase tracking-wide text-teal-100 mb-1">Next Due</p>
                            <p className="font-black text-lg">Oct 05</p>
                            <p className="text-xs text-teal-100">Polio & Hep-B</p>
                        </div>
                        <button className="size-12 rounded-full bg-white text-teal-600 flex items-center justify-center shadow-lg active:scale-90 transition-transform group-hover:scale-110">
                            <span className="material-symbols-outlined text-2xl">arrow_forward</span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
