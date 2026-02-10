import React from 'react';

const BREAKDOWN = [
    { label: 'Surgeon Fee', value: 'Included' },
    { label: 'OT & Anesthesia', value: 'Included' },
    { label: 'Hospital Stay (2 Days)', value: 'Included' },
    { label: 'Medicines & Consumables', value: 'Included' },
    { label: 'Post-op Follow-up', value: 'Free' },
];

export default function CostEstimator() {
    return (
        <section className="mb-24">
            <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 rounded-[2.5rem] p-6 md:p-8 text-white relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 size-80 rounded-full bg-blue-500/20 blur-3xl"></div>

                <div className="relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8 border-b border-white/10 pb-6">
                        <div>
                            <h3 className="text-xl font-black leading-none mb-2">Transparent Pricing</h3>
                            <p className="text-xs text-slate-300 font-medium opacity-80">No hidden charges. Know what you pay.</p>
                        </div>
                        <div className="text-left md:text-right">
                            <span className="block text-[10px] font-bold text-blue-200 uppercase tracking-widest mb-1">Estimated Package</span>
                            <span className="text-3xl md:text-4xl font-black tracking-tight">₹40,000 - ₹55,000</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">What's Included</h4>
                            <ul className="space-y-3">
                                {BREAKDOWN.map((item, idx) => (
                                    <li key={idx} className="flex justify-between items-center text-sm font-medium border-b border-white/5 pb-2 last:border-0 last:pb-0">
                                        <span className="text-slate-200">{item.label}</span>
                                        <span className="text-emerald-400 font-bold flex items-center gap-1">
                                            <span className="material-symbols-outlined text-base">check</span>
                                            {item.value}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-white/5 rounded-2xl p-5 border border-white/10 flex flex-col justify-center">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="size-10 rounded-xl bg-white/10 flex items-center justify-center">
                                    <span className="material-symbols-outlined">health_and_safety</span>
                                </div>
                                <h4 className="font-bold text-lg">Insurance Accepted</h4>
                            </div>
                            <p className="text-xs text-slate-300 leading-relaxed mb-4">
                                We accept all major insurance providers. Our team handles the paperwork for a cashless experience.
                            </p>
                            <button className="w-full py-3 bg-white text-slate-900 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-50 transition-colors">
                                Check Eligibility
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
