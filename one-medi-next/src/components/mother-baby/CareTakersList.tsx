import React from 'react';

const CARETAKERS = [
    { id: 1, name: 'Sunita Devi', role: 'Japa Maid', exp: '15 Yrs', rating: 4.9, image: 'person_apron', type: 'traditional', location: 'Live-in' },
    { id: 2, name: 'Grace Mary', role: 'Expert Nanny', exp: '8 Yrs', rating: 4.8, image: 'person', type: 'modern', location: 'Day Shift' },
    { id: 3, name: 'Lakshmi K', role: 'Postpartum Care', exp: '12 Yrs', rating: 4.7, image: 'person_apron', type: 'traditional', location: 'Visit' },
];

export default function CareTakersList() {
    return (
        <section className="mb-8">
            <div className="flex justify-between items-end mb-4 px-1">
                <div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white leading-none">Care Takers</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mt-1">Trusted Nannies & Japa Maids</p>
                </div>
                <button className="text-xs font-black text-rose-500 uppercase tracking-widest hover:text-rose-600 transition-colors">See All</button>
            </div>

            <div className="space-y-3">
                {CARETAKERS.map((caretaker) => (
                    <div key={caretaker.id} className="bg-white dark:bg-gray-800 rounded-3xl p-4 flex items-center gap-4 shadow-sm border border-slate-100 dark:border-gray-700 active:scale-[0.99] transition-transform">
                        <div className="size-16 rounded-2xl bg-indigo-50 dark:bg-gray-700 flex items-center justify-center text-indigo-400 shrink-0">
                            <span className="material-symbols-outlined text-3xl">{caretaker.image}</span>
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap gap-2 mb-1">
                                <span className="px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-[9px] font-black uppercase tracking-wider text-indigo-500">{caretaker.role}</span>
                                <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-gray-700 text-[9px] font-black uppercase tracking-wider text-slate-500">{caretaker.location}</span>
                            </div>
                            <h4 className="text-sm font-black text-slate-900 dark:text-white leading-tight mb-0.5">{caretaker.name}</h4>
                            <div className="flex items-center gap-3 text-[10px] font-medium text-slate-500 dark:text-slate-400">
                                <span className="flex items-center gap-0.5"><span className="material-symbols-outlined text-xs text-amber-400 filled">star</span> {caretaker.rating}</span>
                                <span className="w-px h-2.5 bg-slate-200"></span>
                                <span>{caretaker.exp} Experience</span>
                            </div>
                        </div>

                        <button className="size-10 rounded-full border-2 border-slate-100 dark:border-gray-600 flex items-center justify-center text-slate-400 hover:bg-rose-50 hover:border-rose-200 hover:text-rose-500 transition-colors">
                            <span className="material-symbols-outlined">call</span>
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
}
