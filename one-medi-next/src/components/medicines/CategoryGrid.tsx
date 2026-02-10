import React from 'react';
import { MEDICINE_CONTENT_MASTER } from '@/data/medicine-content';

interface CategoryGridProps {
    onSelect: (id: string) => void;
    selectedId: string | null;
}

export default function CategoryGrid({ onSelect, selectedId }: CategoryGridProps) {
    return (
        <section className="mb-10">
            <div className="flex justify-between items-end mb-4 px-1">
                <div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white leading-none">Shop by Category</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mt-1">Wide Range of Medicines</p>
                </div>
            </div>

            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 select-none">
                {MEDICINE_CONTENT_MASTER.categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => onSelect(cat.id)}
                        className={`min-w-[100px] flex flex-col items-center gap-3 p-4 rounded-[1.5rem] border-2 transition-all duration-300 group
                            ${selectedId === cat.id
                                ? 'bg-primary/5 border-primary shadow-md scale-105'
                                : 'bg-white dark:bg-gray-800 border-slate-100 dark:border-gray-700 hover:border-slate-200 dark:hover:border-gray-600 hover:shadow-sm'
                            }
                        `}
                    >
                        <div className={`size-14 rounded-2xl flex items-center justify-center transition-colors
                             ${selectedId === cat.id ? `bg-${cat.color}-100 text-${cat.color}-600` : `bg-slate-50 dark:bg-gray-700 text-${cat.color}-500 group-hover:bg-${cat.color}-50`}
                        `}>
                            <span className="material-symbols-outlined text-3xl">{cat.icon}</span>
                        </div>

                        <span className={`text-[10px] font-black uppercase tracking-tight text-center leading-tight max-w-[80px]
                            ${selectedId === cat.id ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-gray-400'}
                        `}>
                            {cat.label}
                        </span>
                    </button>
                ))}
            </div>
        </section>
    );
}
