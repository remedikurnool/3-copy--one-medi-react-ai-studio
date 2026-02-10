import React from 'react';
import { WELLNESS_CONTENT_MASTER } from '@/data/wellness-content';

export default function SuccessStories() {
    return (
        <section className="mb-12">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 px-1">Success Stories</h3>

            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4">
                {WELLNESS_CONTENT_MASTER.successStories.map((story, idx) => (
                    <div key={idx} className="min-w-[280px] bg-white dark:bg-gray-800 p-4 rounded-[2rem] border border-slate-100 dark:border-gray-700 shadow-sm flex items-center gap-4">
                        <div className="size-16 rounded-2xl overflow-hidden shrink-0">
                            <img src={story.image} alt={story.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <h4 className="text-sm font-black text-slate-900 dark:text-white leading-tight mb-1">
                                {story.result}
                            </h4>
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-2">
                                {story.name} • {story.program}
                            </p>
                            <div className="flex gap-0.5">
                                {[1, 2, 3, 4, 5].map(i => (
                                    <span key={i} className="material-symbols-outlined text-[12px] text-yellow-400 filled">star</span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
