import React from 'react';
import { WELLNESS_CONTENT_MASTER } from '@/data/wellness-content';

interface CategoryGridProps {
    onSelect: (id: string) => void;
    selectedId: string | null;
}

export default function ProgramCategoryGrid({ onSelect, selectedId }: CategoryGridProps) {
    return (
        <section className="mb-12">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 px-1">Explore Programs</h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {WELLNESS_CONTENT_MASTER.categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => onSelect(cat.id)}
                        className={`relative overflow-hidden p-6 rounded-[2rem] text-left transition-all duration-300 group
                            ${selectedId === cat.id
                                ? 'bg-slate-900 text-white shadow-xl scale-[1.02]'
                                : 'bg-white dark:bg-gray-800 hover:shadow-lg border border-slate-100 dark:border-gray-700'
                            }
                        `}
                    >
                        <div className={`size-12 rounded-xl mb-4 flex items-center justify-center transition-colors
                            ${selectedId === cat.id
                                ? 'bg-white/20 text-white'
                                : `${cat.color}`
                            }
                        `}>
                            <span className="material-symbols-outlined text-2xl">{cat.icon}</span>
                        </div>

                        <h4 className={`text-lg font-black leading-tight mb-1
                            ${selectedId === cat.id ? 'text-white' : 'text-slate-900 dark:text-white'}
                        `}>
                            {cat.label}
                        </h4>

                        <p className={`text-[10px] font-bold uppercase tracking-wider
                             ${selectedId === cat.id ? 'text-slate-400' : 'text-slate-400'}
                        `}>
                            Explore
                        </p>

                        <div className={`absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity
                             ${selectedId === cat.id ? 'text-white' : 'text-slate-400'}
                        `}>
                            <span className="material-symbols-outlined">arrow_outward</span>
                        </div>
                    </button>
                ))}
            </div>
        </section>
    );
}
