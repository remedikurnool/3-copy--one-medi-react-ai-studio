import React from 'react';

const PROGRAMS = [
    { title: 'Diabetes Reversal', duration: '12 Months', price: '₹14,999', features: ['Endocrinologist Consults', 'Personalized Diet', 'Fitness Plan'], color: 'emerald' },
    { title: 'Intensive Control', duration: '6 Months', price: '₹8,999', features: ['Bi-weekly Followups', 'CGM Monitoring', 'Diet Charts'], color: 'blue' },
    { title: 'Gestational Care', duration: '9 Months', price: '₹11,999', features: ['ObGyn + Diabetologist', 'Safe Diet for Baby', 'Post-partum Care'], color: 'rose' },
];

export default function ProgramList() {
    return (
        <section className="mb-8">
            <div className="flex justify-between items-end mb-4 px-1">
                <div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white leading-none">Care Programs</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mt-1">Structured plans for long-term health</p>
                </div>
                <button className="text-xs font-black text-blue-600 uppercase tracking-widest hover:text-blue-700 transition-colors">Compare</button>
            </div>

            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 px-1">
                {PROGRAMS.map((p, idx) => (
                    <div key={idx} className="min-w-[260px] bg-white dark:bg-gray-800 p-5 rounded-[2rem] border border-slate-100 dark:border-gray-700 shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-lg transition-all">
                        <div className={`absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity text-${p.color}-500`}>
                            <span className="material-symbols-outlined text-8xl">verified</span>
                        </div>

                        <div>
                            <span className={`inline-block px-3 py-1 rounded-full bg-${p.color}-50 dark:bg-gray-700 text-${p.color}-600 dark:text-${p.color}-400 text-[10px] font-black uppercase tracking-wider mb-3`}>
                                {p.duration}
                            </span>
                            <h4 className="text-lg font-black text-slate-900 dark:text-white leading-tight mb-2">{p.title}</h4>
                            <ul className="space-y-1 mb-4">
                                {p.features.map((f, i) => (
                                    <li key={i} className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-gray-400">
                                        <span className={`size-1.5 rounded-full bg-${p.color}-400`}></span>
                                        {f}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="flex items-center justify-between mt-auto">
                            <span className="text-sm font-black text-slate-900 dark:text-white">{p.price}</span>
                            <button className={`size-8 rounded-full bg-${p.color}-500 text-white flex items-center justify-center shadow-lg shadow-${p.color}-200 dark:shadow-none active:scale-95 transition-transform`}>
                                <span className="material-symbols-outlined text-lg">arrow_forward</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
