import React from 'react';
import { UIMenuItem } from '@/hooks/useUIConfig';

interface ModalityGridProps {
    onSelect: (id: string) => void;
    selectedId: string | null;
    categories: UIMenuItem[];
}

export default function ModalityGrid({ onSelect, selectedId, categories = [] }: ModalityGridProps) {
    if (!categories.length) return null;

    return (
        <section className="mb-10 animate-fade-in">
            <div className="flex justify-between items-end mb-4 px-1">
                <div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white leading-none">Browse by Modality</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mt-1">Select a department</p>
                </div>
            </div>

            <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-9 gap-3">
                {categories.map((cat) => {
                    const catId = cat.route || cat.id;
                    const color = cat.badge_color || 'indigo';

                    return (
                        <button
                            key={cat.id}
                            onClick={() => onSelect(catId)}
                            className={`flex flex-col items-center gap-2 p-3 rounded-2xl transition-all duration-300 group
                                ${selectedId === catId
                                    ? `bg-${color}-50 dark:bg-${color}-900/30 border border-${color}-200 dark:border-${color}-800 scale-105`
                                    : 'bg-white dark:bg-gray-800 border border-slate-100 dark:border-gray-700 hover:border-slate-200 dark:hover:border-gray-600 hover:shadow-md'
                                }
                            `}
                        >
                            <div className={`size-10 md:size-12 rounded-xl flex items-center justify-center transition-colors
                                 ${selectedId === catId ? `bg-${color}-100 text-${color}-600` : `bg-slate-50 dark:bg-gray-700 text-${color}-500 group-hover:bg-${color}-50 dark:group-hover:bg-gray-600`}
                            `}>
                                <span className="material-symbols-outlined text-2xl">{cat.icon || 'radiology'}</span>
                            </div>

                            <span className={`text-[9px] font-bold uppercase tracking-tight text-center leading-tight
                                ${selectedId === catId ? `text-${color}-700 dark:text-${color}-300` : 'text-slate-500 dark:text-gray-400'}
                            `}>
                                {cat.title}
                            </span>
                        </button>
                    );
                })}
            </div>
        </section>
    );
}
