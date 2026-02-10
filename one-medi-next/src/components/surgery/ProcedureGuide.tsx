import React, { useState } from 'react';

const SECTIONS = [
    { title: 'What is this procedure?', content: 'A minimally invasive surgical procedure to repair the damaged area using advanced technology.' },
    { title: 'Why is it needed?', content: 'To relieve pain, restore function, and prevent further complications that could affect your quality of life.' },
    { title: 'What to expect during recovery?', content: 'Most patients are discharged within 24 hours. Complete recovery typically takes 3-5 days with minimal scarring.' },
    { title: 'Risks & Complications', content: 'As with any surgery, there are minor risks of infection or bleeding, but these are extremely rare with modern techniques.' },
];

export default function ProcedureGuide() {
    const [openIdx, setOpenIdx] = useState(0);

    return (
        <section className="mb-12">
            <div className="flex justify-between items-end mb-6 px-1">
                <div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white leading-none">Patient Guide</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mt-1">Everything you need to know</p>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-[2rem] border border-slate-100 dark:border-gray-700 overflow-hidden shadow-sm">
                {SECTIONS.map((s, idx) => (
                    <div key={idx} className="border-b border-slate-100 dark:border-gray-700 last:border-0">
                        <button
                            onClick={() => setOpenIdx(openIdx === idx ? -1 : idx)}
                            className="w-full text-left p-5 flex justify-between items-center hover:bg-slate-50 dark:hover:bg-gray-700/50 transition-colors"
                        >
                            <span className={`text-sm font-bold ${openIdx === idx ? 'text-blue-600 dark:text-blue-400' : 'text-slate-900 dark:text-white'}`}>
                                {s.title}
                            </span>
                            <span className={`material-symbols-outlined transition-transform duration-300 ${openIdx === idx ? 'rotate-180 text-blue-600' : 'text-slate-400'}`}>
                                keyboard_arrow_down
                            </span>
                        </button>

                        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openIdx === idx ? 'max-h-48' : 'max-h-0'}`}>
                            <p className="p-5 pt-0 text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                                {s.content}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
