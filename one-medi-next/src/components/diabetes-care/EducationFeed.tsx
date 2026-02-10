import React from 'react';

const ARTICLES = [
    { title: '5 Myths About Insulin', type: 'Myth Buster', read: '3 min' },
    { title: 'Managing Sugar During Festivals', type: 'Guide', read: '5 min' },
];

export default function EducationFeed() {
    return (
        <section className="mb-24">
            <div className="flex justify-between items-end mb-4 px-1">
                <div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white leading-none">Learn</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mt-1">Empower yourself with knowledge</p>
                </div>
            </div>

            <div className="space-y-3">
                {ARTICLES.map((a, idx) => (
                    <div key={idx} className="flex gap-4 p-4 bg-slate-50 dark:bg-gray-800/50 rounded-3xl border border-slate-100 dark:border-gray-700">
                        <div className="size-16 bg-white dark:bg-gray-700 rounded-2xl flex items-center justify-center text-slate-300 shadow-sm shrink-0">
                            <span className="material-symbols-outlined text-3xl">article</span>
                        </div>
                        <div>
                            <span className="text-[9px] font-bold text-blue-500 uppercase tracking-wider mb-1 block">{a.type}</span>
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-tight mb-2">{a.title}</h4>
                            <span className="text-[10px] font-medium text-slate-400 bg-white dark:bg-gray-700 px-2 py-0.5 rounded-md border border-slate-100 dark:border-gray-600 inline-block">{a.read} Read</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
