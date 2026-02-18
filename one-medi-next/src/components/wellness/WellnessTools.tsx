import React from 'react';
import { useMenu } from '@/hooks/useUIConfig';

export default function WellnessTools() {
    const { data: menu } = useMenu('wellness_tools');
    const tools = menu?.items.sort((a, b) => a.sort_order - b.sort_order) || [];

    if (!tools.length) return null;

    return (
        <section className="mb-12 animate-fade-in">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 px-1">Popular Tools</h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {tools.map((tool) => {
                    const color = tool.badge_color || 'indigo';
                    return (
                        <div key={tool.id} className="bg-slate-50 dark:bg-gray-800/50 p-4 rounded-2xl flex items-center gap-4 cursor-pointer hover:bg-white dark:hover:bg-gray-800 hover:shadow-md transition-all border border-slate-100 dark:border-gray-700 group">
                            <div className={`size-10 rounded-full bg-${color}-100 dark:bg-${color}-900/30 flex items-center justify-center text-${color}-600 dark:text-${color}-400 group-hover:scale-110 transition-transform`}>
                                <span className="material-symbols-outlined">{tool.icon}</span>
                            </div>
                            <span className="text-xs font-black text-slate-700 dark:text-slate-300 uppercase tracking-wide group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{tool.title}</span>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
