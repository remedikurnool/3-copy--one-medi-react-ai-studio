import React from 'react';
import { WELLNESS_CONTENT_MASTER } from '@/data/wellness-content';

export default function WellnessTools() {
    return (
        <section className="mb-12">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 px-1">Popular Tools</h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {WELLNESS_CONTENT_MASTER.tools.map((tool) => (
                    <div key={tool.id} className="bg-slate-50 dark:bg-gray-800/50 p-4 rounded-2xl flex items-center gap-4 cursor-pointer hover:bg-white dark:hover:bg-gray-800 hover:shadow-md transition-all border border-slate-100 dark:border-gray-700 group">
                        <div className={`size-10 rounded-full bg-${tool.color}-100 dark:bg-${tool.color}-900/30 flex items-center justify-center text-${tool.color}-600 dark:text-${tool.color}-400 group-hover:scale-110 transition-transform`}>
                            <span className="material-symbols-outlined">{tool.icon}</span>
                        </div>
                        <span className="text-xs font-black text-slate-700 dark:text-slate-300 uppercase tracking-wide group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{tool.label}</span>
                    </div>
                ))}
            </div>
        </section>
    );
}
