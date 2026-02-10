import React from 'react';

const EXPERTS = [
    { id: 1, name: 'Dr. Ananya Reddy', role: 'Gynecologist', exp: '12 Yrs', rating: 4.9, image: 'woman' },
    { id: 2, name: 'Dr. Rahul Verma', role: 'Pediatrician', exp: '8 Yrs', rating: 4.8, image: 'man' },
    { id: 3, name: 'Ms. Sarah Jones', role: 'Lactation Consultant', exp: '5 Yrs', rating: 4.9, image: 'woman' },
    { id: 4, name: 'Dr. Priya Singh', role: 'Nutritionist', exp: '10 Yrs', rating: 4.7, image: 'woman' },
];

export default function ExpertsSection() {
    return (
        <section className="mb-4">
            <div className="flex justify-between items-end mb-4 px-1">
                <h3 className="text-xl font-black text-slate-900 dark:text-white leading-none">Experts who care</h3>
                <button className="text-xs font-black text-rose-500 uppercase tracking-widest hover:text-rose-600 transition-colors">See All</button>
            </div>

            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 px-1 snap-x">
                {EXPERTS.map((expert) => (
                    <div key={expert.id} className="min-w-[160px] snap-center bg-white dark:bg-gray-800 rounded-3xl p-4 flex flex-col items-center shadow-sm border border-slate-100 dark:border-gray-700 relative group overflow-hidden">
                        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-rose-50 to-transparent dark:from-rose-900/20 opacity-50"></div>

                        <div className="size-20 rounded-full bg-slate-200 dark:bg-gray-700 mb-3 border-4 border-white dark:border-gray-800 shadow-sm relative z-10 overflow-hidden">
                            <span className="material-symbols-outlined text-4xl text-slate-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">{expert.image}</span>
                        </div>

                        <h4 className="text-sm font-black text-slate-900 dark:text-white text-center leading-tight mb-1">{expert.name}</h4>
                        <p className="text-[10px] font-bold text-rose-500 uppercase tracking-wide mb-3">{expert.role}</p>

                        <div className="flex items-center gap-3 w-full text-[10px] font-medium text-slate-500 dark:text-gray-400 mb-4 justify-center">
                            <span className="flex items-center gap-0.5"><span className="material-symbols-outlined text-xs text-amber-400 filled">star</span> {expert.rating}</span>
                            <span className="w-px h-3 bg-slate-200 dark:bg-gray-600"></span>
                            <span>{expert.exp} Exp</span>
                        </div>

                        <button className="w-full py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all">Consult</button>
                    </div>
                ))}
            </div>
        </section>
    );
}
