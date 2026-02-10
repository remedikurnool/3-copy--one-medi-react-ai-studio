import React from 'react';
import { SCANS_CONTENT_MASTER } from '@/data/scans-content';

interface ModalityGridProps {
    onSelect: (id: string) => void;
    selectedId: string | null;
}

export default function ModalityGrid({ onSelect, selectedId }: ModalityGridProps) {
    return (
        <section className="mb-10">
            <div className="flex justify-between items-end mb-4 px-1">
                <div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white leading-none">Browse by Modality</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mt-1">Select a department</p>
                </div>
            </div>

            <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-9 gap-3">
                {SCANS_CONTENT_MASTER.categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => onSelect(cat.id)}
                        className={`flex flex-col items-center gap-2 p-3 rounded-2xl transition-all duration-300 group
                            ${selectedId === cat.id
                                ? 'bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-800 scale-105'
                                : 'bg-white dark:bg-gray-800 border border-slate-100 dark:border-gray-700 hover:border-slate-200 dark:hover:border-gray-600 hover:shadow-md'
                            }
                        `}
                    >
                        <div className={`size-10 md:size-12 rounded-xl flex items-center justify-center transition-colors
                             ${selectedId === cat.id ? `bg-indigo-100 text-indigo-600` : `bg-slate-50 dark:bg-gray-700 text-${cat.color}-500 group-hover:bg-${cat.color}-50 dark:group-hover:bg-gray-600`}
                        `}>
                            <span className="material-symbols-outlined text-2xl">{cat.icon}</span>
                        </div>

                        <span className={`text-[9px] font-bold uppercase tracking-tight text-center leading-tight
                            ${selectedId === cat.id ? 'text-indigo-700 dark:text-indigo-300' : 'text-slate-500 dark:text-gray-400'}
                        `}>
                            {cat.label}
                        </span>
                    </button>
                ))}
            </div>
        </section>
    );
}
