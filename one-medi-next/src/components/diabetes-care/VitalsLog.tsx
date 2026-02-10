import React from 'react';

const VITALS = [
    { id: 'hba1c', label: 'HbA1c', unit: '%', icon: 'event_upcoming', color: 'purple', last: '6.4' },
    { id: 'weight', label: 'Weight', unit: 'kg', icon: 'monitor_weight', color: 'emerald', last: '72.5' },
    { id: 'bp', label: 'BP', unit: 'mmHg', icon: 'favorite', color: 'rose', last: '120/80' },
];

export default function VitalsLog() {
    return (
        <section className="mb-8">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3 px-1">Track Vitals</h3>
            <div className="grid grid-cols-3 gap-3">
                {VITALS.map((v) => (
                    <div key={v.id} className="bg-white dark:bg-gray-800 p-3 rounded-2xl border border-slate-100 dark:border-gray-700 shadow-sm flex flex-col items-center gap-2 relative group cursor-pointer hover:border-slate-300 transition-colors">
                        <div className={`absolute top-2 right-2 text-${v.color}-500 opacity-20 group-hover:opacity-100 transition-opacity`}>
                            <span className="material-symbols-outlined text-lg">add_circle</span>
                        </div>

                        <div className={`size-10 rounded-full bg-${v.color}-50 dark:bg-gray-700 flex items-center justify-center text-${v.color}-500`}>
                            <span className="material-symbols-outlined text-xl">{v.icon}</span>
                        </div>

                        <div className="text-center">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block">{v.label}</span>
                            <div className="flex items-baseline justify-center gap-0.5">
                                <span className="text-sm font-black text-slate-900 dark:text-white">{v.last}</span>
                                <span className="text-[9px] text-slate-400">{v.unit}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-2 text-center text-[10px] text-slate-400 font-medium">
                Synced with <span className="text-slate-600 dark:text-slate-300 underline cursor-pointer">Health Profile</span>
            </div>
        </section>
    );
}
