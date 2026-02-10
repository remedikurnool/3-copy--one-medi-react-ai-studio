import React from 'react';

interface CurriculumProps {
    includes: string[];
}

export default function ProgramCurriculum({ includes }: CurriculumProps) {
    return (
        <div className="bg-slate-50 dark:bg-gray-800/50 rounded-[2rem] p-6 border border-slate-100 dark:border-gray-700">
            <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider mb-4">
                What's Included
            </h3>

            <div className="space-y-4">
                {includes.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                        <div className="size-6 rounded-full bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 flex items-center justify-center mt-0.5 shrink-0">
                            <span className="material-symbols-outlined text-sm">check</span>
                        </div>
                        <p className="text-sm font-bold text-slate-700 dark:text-slate-300 leading-tight pt-1">
                            {item}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
