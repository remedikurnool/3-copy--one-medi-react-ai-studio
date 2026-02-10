import React from 'react';
import { MEDICINE_CONTENT_MASTER } from '@/data/medicine-content';

export default function DealSlider() {
    return (
        <section className="mb-10">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 px-1">Trending Offers</h3>

            <div className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-4">
                {MEDICINE_CONTENT_MASTER.deals.map((deal) => (
                    <div
                        key={deal.id}
                        className={`snap-center min-w-[280px] md:min-w-[320px] rounded-[2rem] p-6 bg-gradient-to-br ${deal.bg} text-white shadow-lg relative overflow-hidden group cursor-pointer`}
                    >
                        <div className="absolute top-0 right-0 -mr-10 -mt-10 size-32 rounded-full bg-white/20 blur-2xl group-hover:scale-150 transition-transform duration-700"></div>

                        <div className="relative z-10">
                            <span className="inline-block px-2 py-0.5 rounded-md bg-white/20 backdrop-blur-md border border-white/20 text-[10px] font-bold uppercase tracking-widest mb-3">
                                Limited Time
                            </span>
                            <h4 className="text-2xl font-black leading-tight mb-1">{deal.title}</h4>
                            <p className="text-white/80 font-medium text-xs mb-6">{deal.subtitle}</p>

                            <div className="flex justify-between items-end">
                                <div>
                                    <p className="text-[9px] font-bold opacity-70 uppercase tracking-wider mb-0.5">Use Code</p>
                                    <div className="px-3 py-1 bg-white/20 backdrop-blur-md border border-white/20 border-dashed rounded-lg font-mono text-sm font-bold tracking-wider">
                                        {deal.code}
                                    </div>
                                </div>
                                <button className="size-10 rounded-full bg-white text-slate-900 flex items-center justify-center shadow-md active:scale-90 transition-transform">
                                    <span className="material-symbols-outlined">arrow_forward</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
