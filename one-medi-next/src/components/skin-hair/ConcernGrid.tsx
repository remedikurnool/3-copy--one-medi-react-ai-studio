import React from 'react';

const CONCERNS = [
    { id: 'acne', label: 'Acne & Scars', icon: 'coronavirus', color: 'rose' }, // Placeholder icon
    { id: 'pigment', label: 'Pigmentation', icon: 'contrast', color: 'amber' },
    { id: 'aging', label: 'Anti-Aging', icon: 'face_retouching_natural', color: 'purple' },
    { id: 'hairfall', label: 'Hair Fall', icon: 'content_cut', color: 'slate' }, // Placeholder
    { id: 'dull', label: 'Dull Skin', icon: 'wb_sunny', color: 'orange' },
    { id: 'fat', label: 'Body Fat', icon: 'accessibility_new', color: 'cyan' },
];

export default function ConcernGrid({ selectedConcern, onSelectConcern }: { selectedConcern: string | null, onSelectConcern: (id: string) => void }) {
    return (
        <section className="py-4">
            <div className="flex justify-between items-end mb-4 px-1">
                <div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white leading-none">What's bothering you?</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mt-1">Select a concern to find solutions</p>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
                {CONCERNS.map((item) => {
                    const isSelected = selectedConcern === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => onSelectConcern(item.id)}
                            className={`flex flex-col items-center justify-center gap-2 p-3 rounded-[1.5rem] border shadow-sm active:scale-95 transition-all hover:shadow-md 
                                ${isSelected
                                    ? `bg-${item.color}-500/10 border-${item.color}-500 dark:bg-${item.color}-500/20`
                                    : 'bg-white dark:bg-gray-800 border-slate-100 dark:border-gray-700 hover:border-slate-200'
                                }`}
                        >
                            <div className={`size-12 rounded-2xl flex items-center justify-center transition-colors
                                ${isSelected
                                    ? `bg-${item.color}-500 text-white shadow-lg shadow-${item.color}-200`
                                    : `bg-${item.color}-50 dark:bg-gray-700 text-${item.color}-500 dark:text-gray-300`
                                }`}>
                                <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                            </div>
                            <span className={`text-[10px] font-black text-center leading-tight max-w-[80px]
                                ${isSelected ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-gray-300'}
                            `}>
                                {item.label}
                            </span>
                        </button>
                    );
                })}
            </div>
        </section>
    );
}
