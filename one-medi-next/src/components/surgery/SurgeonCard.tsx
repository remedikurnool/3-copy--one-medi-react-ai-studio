import React from 'react';

export default function SurgeonCard() {
    return (
        <section className="mb-12">
            <div className="flex justify-between items-end mb-6 px-1">
                <div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white leading-none">Meet the Expert</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mt-1">Top rated surgeon for this procedure</p>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-[2rem] p-5 border border-slate-100 dark:border-gray-700 shadow-sm flex flex-col md:flex-row gap-6 items-center md:items-start group hover:shadow-lg transition-all">
                <div className="size-24 md:size-32 rounded-3xl bg-slate-100 dark:bg-gray-700 shrink-0 relative overflow-hidden">
                    {/* Placeholder for Doctor Image */}
                    <div className="absolute inset-0 flex items-center justify-center text-slate-300">
                        <span className="material-symbols-outlined text-6xl">person</span>
                    </div>
                    {/* Verified Badge */}
                    <div className="absolute bottom-2 right-2 bg-blue-500 text-white size-6 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                        <span className="material-symbols-outlined text-[14px]">check</span>
                    </div>
                </div>

                <div className="flex-1 text-center md:text-left w-full">
                    <div className="flex flex-col md:flex-row justify-between items-center md:items-start mb-2">
                        <div>
                            <h4 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white leading-tight">Dr. T. Karthik</h4>
                            <p className="text-xs font-bold text-blue-600 uppercase tracking-wide">General & Laparoscopic Surgeon</p>
                        </div>
                        <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 px-2 py-1 rounded-lg border border-amber-100 dark:border-amber-800 mt-2 md:mt-0">
                            <span className="material-symbols-outlined text-sm filled">star</span>
                            <span className="text-xs font-black">4.9/5</span>
                        </div>
                    </div>

                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-4 line-clamp-2">
                        Senior consultant with 15+ years of experience in minimally invasive surgeries. Performed over 5000+ successful laparoscopic procedures.
                    </p>

                    <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-6">
                        <div className="text-center md:text-left">
                            <span className="block text-lg font-black text-slate-900 dark:text-white">15+</span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Years Exp</span>
                        </div>
                        <div className="w-px h-8 bg-slate-100 dark:bg-gray-700"></div>
                        <div className="text-center md:text-left">
                            <span className="block text-lg font-black text-slate-900 dark:text-white">5000+</span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Surgeries</span>
                        </div>
                        <div className="w-px h-8 bg-slate-100 dark:bg-gray-700"></div>
                        <div className="text-center md:text-left">
                            <span className="block text-lg font-black text-slate-900 dark:text-white">Kurnool</span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Location</span>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <button className="flex-1 h-12 rounded-xl border border-slate-200 dark:border-gray-600 text-slate-700 dark:text-slate-200 font-black text-xs uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors">
                            View Profile
                        </button>
                        <button className="flex-[2] h-12 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black text-xs uppercase tracking-widest shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
                            Book Consultation
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
