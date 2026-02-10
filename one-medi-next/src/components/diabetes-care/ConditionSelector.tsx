import React from 'react';

const CONDITIONS = [
    { id: 'type2', label: 'Type 2 Diabetes', desc: 'Lifestyle & Meds', icon: 'person' },
    { id: 'type1', label: 'Type 1 Diabetes', desc: 'Insulin Management', icon: 'water_drop' },
    { id: 'gestational', label: 'Gestational', desc: 'During Pregnancy', icon: 'pregnant_woman' },
    { id: 'prediabetes', label: 'Pre-Diabetes', desc: 'Prevention', icon: 'monitor_heart' },
];

export default function ConditionSelector({ selected, onSelect }: { selected: string | null, onSelect: (id: string) => void }) {
    return (
        <section className="mb-6">
            <div className="flex justify-between items-end mb-3 px-1">
                <div>
                    <h3 className="text-lg font-black text-slate-900 dark:text-white leading-none">Your Condition</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mt-1">Personalize your care plan</p>
                </div>
            </div>

            <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 px-1">
                {CONDITIONS.map((c) => {
                    const isSelected = selected === c.id;
                    return (
                        <button
                            key={c.id}
                            onClick={() => onSelect(c.id)}
                            className={`min-w-[140px] p-3 rounded-2xl border text-left transition-all active:scale-95
                                ${isSelected
                                    ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200'
                                    : 'bg-white dark:bg-gray-800 border-slate-100 dark:border-gray-700 text-slate-900 dark:text-white'
                                }
                            `}
                        >
                            <div className={`size-8 rounded-full flex items-center justify-center mb-2 
                                ${isSelected ? 'bg-white/20' : 'bg-slate-50 dark:bg-gray-700 text-slate-500'}
                            `}>
                                <span className="material-symbols-outlined text-lg">{c.icon}</span>
                            </div>
                            <div className="font-bold text-xs leading-tight mb-0.5">{c.label}</div>
                            <div className={`text-[9px] ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>{c.desc}</div>
                        </button>
                    );
                })}
            </div>
        </section>
    );
}
