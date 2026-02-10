import React from 'react';

const TECHS = [
    { title: 'Robotic Surgery', icon: 'precision_manufacturing', desc: 'Highest Precision', benefits: ['Min. Blood Loss', 'Faster Recovery'], color: 'indigo' },
    { title: 'Laparoscopic', icon: 'medical_services', desc: 'Keyhole Surgery', benefits: ['Small Scars', 'Less Pain'], color: 'emerald' },
    { title: 'Open Surgery', icon: 'scalpel', desc: 'Traditional', benefits: ['Cost Effective', 'Proven'], color: 'slate' },
];

export default function TechShowcase() {
    return (
        <section className="mb-12">
            <div className="flex justify-between items-end mb-6 px-1">
                <div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white leading-none">Treatment Options</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mt-1">Choose the right technology</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {TECHS.map((t, idx) => (
                    <div key={idx} className={`bg-white dark:bg-gray-800 p-5 rounded-[2rem] border border-slate-100 dark:border-gray-700 shadow-sm relative overflow-hidden group`}>
                        <div className={`absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity text-${t.color}-500`}>
                            <span className="material-symbols-outlined text-8xl">{t.icon}</span>
                        </div>

                        <div className={`size-12 rounded-xl bg-${t.color}-50 dark:bg-gray-700 flex items-center justify-center text-${t.color}-500 mb-4`}>
                            <span className="material-symbols-outlined text-2xl">{t.icon}</span>
                        </div>

                        <h4 className="text-sm font-black text-slate-900 dark:text-white leading-tight mb-1">{t.title}</h4>
                        <p className={`text-[10px] font-bold uppercase tracking-wide mb-3 text-${t.color}-500`}>{t.desc}</p>

                        <ul className="space-y-2">
                            {t.benefits.map((b, i) => (
                                <li key={i} className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-gray-400">
                                    <span className={`size-1.5 rounded-full bg-${t.color}-400`}></span>
                                    {b}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    );
}
