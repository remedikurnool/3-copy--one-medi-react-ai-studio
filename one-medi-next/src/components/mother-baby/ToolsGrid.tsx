import React from 'react';
import { useRouter } from 'next/navigation';

const TOOLS = [
    { id: 'tracker', label: 'Pregnancy Tracker', sub: 'Week by Week', icon: 'calendar_month', color: 'rose' },
    { id: 'vaccine', label: 'Vaccination', sub: 'Track Schedule', icon: 'vaccines', color: 'teal' },
    { id: 'growth', label: 'Growth & Milestones', sub: 'Height & Weight', icon: 'show_chart', color: 'indigo' },
    { id: 'due-date', label: 'Due Date Calc', sub: 'Plan Ahead', icon: 'event_upcoming', color: 'amber' },
    { id: 'kick', label: 'Kick Counter', sub: 'Monitor Movement', icon: 'footprint', color: 'sky' },
    { id: 'check', label: 'Postpartum Check', sub: 'Recovery Guide', icon: 'check_circle', color: 'emerald' },
];

export default function ToolsGrid() {
    const router = useRouter();

    return (
        <section className="mb-8">
            <div className="flex justify-between items-end mb-4 px-1">
                <h3 className="text-xl font-black text-slate-900 dark:text-white leading-none">Smart Tools</h3>
                <button className="text-xs font-black text-rose-500 uppercase tracking-widest hover:text-rose-600 transition-colors">View All</button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {TOOLS.map((tool) => (
                    <button
                        key={tool.id}
                        onClick={() => router.push(`/mother-baby/tools/${tool.id}`)}
                        className="group bg-white dark:bg-gray-800 p-4 rounded-3xl flex flex-col gap-3 items-start shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-gray-100 dark:hover:border-gray-700"
                    >
                        <div className={`size-10 rounded-2xl bg-${tool.color}-50 dark:bg-${tool.color}-900/20 text-${tool.color}-500 flex items-center justify-center transition-colors group-hover:bg-${tool.color}-100 dark:group-hover:bg-${tool.color}-900/40`}>
                            <span className="material-symbols-outlined text-xl">{tool.icon}</span>
                        </div>
                        <div className="text-left">
                            <h4 className="text-xs font-black text-slate-900 dark:text-slate-200 leading-tight mb-0.5">{tool.label}</h4>
                            <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide group-hover:text-${tool.color}-500 transition-colors">{tool.sub}</p>
                        </div>
                    </button>
                ))}
            </div>
        </section>
    );
}
