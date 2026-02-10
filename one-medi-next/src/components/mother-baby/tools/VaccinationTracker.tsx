import React from 'react';

const VACCINES = [
    { id: 1, age: 'Birth', name: 'BCG, OPV 0, Hep-B 1', status: 'done', date: 'Aug 24, 2026' },
    { id: 2, age: '6 Weeks', name: 'DTwP 1, IPV 1, Hep-B 2', status: 'upcoming', date: 'Oct 05, 2026' },
    { id: 3, age: '10 Weeks', name: 'DTwP 2, IPV 2, Hib 2', status: 'pending', date: 'Nov 02, 2026' },
];

export default function VaccinationTracker() {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-teal-100 dark:border-teal-900/30">
            <div className="flex items-center gap-4 mb-6">
                <div className="size-16 rounded-full bg-teal-50 dark:bg-teal-900/20 flex items-center justify-center text-teal-500 border-4 border-teal-100 dark:border-teal-900/40">
                    <span className="material-symbols-outlined text-3xl">vaccines</span>
                </div>
                <div>
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white leading-none mb-1">Vaccinations</h2>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Up to date • Next due in 3 weeks</p>
                </div>
            </div>

            <div className="space-y-4">
                {VACCINES.map((v) => (
                    <div key={v.id} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-gray-700/50 border border-slate-100 dark:border-gray-700">
                        <div className={`
                            size-10 rounded-full flex items-center justify-center shrink-0
                            ${v.status === 'done' ? 'bg-emerald-100 text-emerald-600' :
                                v.status === 'upcoming' ? 'bg-amber-100 text-amber-600' : 'bg-slate-200 text-slate-400'}
                        `}>
                            <span className="material-symbols-outlined text-xl">
                                {v.status === 'done' ? 'check' : v.status === 'upcoming' ? 'schedule' : 'lock'}
                            </span>
                        </div>
                        <div className="flex-1">
                            <h4 className="text-sm font-black text-slate-900 dark:text-white leading-tight">{v.name}</h4>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mt-0.5">{v.age}</p>
                        </div>
                        <div className="text-right">
                            {v.status === 'done' ? (
                                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wide bg-emerald-50 px-2 py-1 rounded-lg">Completed</span>
                            ) : (
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">{v.date}</span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <button className="w-full mt-6 py-4 rounded-2xl bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400 font-black uppercase tracking-widest text-xs hover:bg-teal-100 dark:hover:bg-teal-900/30 transition-colors">
                Downoad Schedule PDF
            </button>
        </div>
    );
}
