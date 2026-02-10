import React from 'react';

const GUIDES = [
    { title: 'South Indian Diabetic Diet', icon: 'rice_bowl', color: 'emerald', tag: 'Top Rated' },
    { title: '15-Min Post Meal Walk', icon: 'directions_walk', color: 'orange', tag: 'Effective' },
    { title: 'Yoga for Stress Relief', icon: 'self_improvement', color: 'purple', tag: 'New' },
];

export default function LifestyleHub() {
    return (
        <section className="mb-8">
            <div className="flex justify-between items-end mb-4 px-1">
                <div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white leading-none">Diet & Lifestyle</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mt-1">Managing diabetes beyond medicine</p>
                </div>
            </div>

            <div className="flex flex-col gap-3">
                {GUIDES.map((g, idx) => (
                    <div key={idx} className="bg-white dark:bg-gray-800 p-4 rounded-3xl border border-slate-100 dark:border-gray-700 shadow-sm flex items-center gap-4 cursor-pointer hover:shadow-md transition-shadow">
                        <div className={`size-12 rounded-2xl bg-${g.color}-50 dark:bg-gray-700 flex items-center justify-center text-${g.color}-500 shrink-0`}>
                            <span className="material-symbols-outlined text-2xl">{g.icon}</span>
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start mb-1">
                                <h4 className="text-sm font-black text-slate-900 dark:text-white leading-tight">{g.title}</h4>
                                <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-${g.color}-50 text-${g.color}-600 dark:bg-gray-700 dark:text-${g.color}-400`}>
                                    {g.tag}
                                </span>
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium line-clamp-1">Expert-curated guide for indian context</p>
                        </div>

                        <span className="material-symbols-outlined text-slate-300">chevron_right</span>
                    </div>
                ))}
            </div>
        </section>
    );
}
