import React from 'react';
import { useMenu } from '@/hooks/useUIConfig';

interface CategoryGridProps {
    onSelect: (id: string) => void;
    selectedId: string | null;
}

export default function ProgramCategoryGrid({ onSelect, selectedId }: CategoryGridProps) {
    const { data: menu } = useMenu('wellness_categories');
    const categories = menu?.items.sort((a, b) => a.sort_order - b.sort_order) || [];

    if (!categories.length) return null;

    return (
        <section className="mb-12 animate-fade-in">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 px-1">Explore Programs</h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {categories.map((cat) => {
                    const color = cat.badge_color || 'blue';
                    // We need to construct classes. migration has "orange" -> need "bg-orange-100 text-orange-600"

                    return (
                        <button
                            key={cat.id}
                            onClick={() => onSelect(cat.route || cat.id)}
                            className={`card-modern relative overflow-hidden p-6 text-left group
                                ${selectedId === (cat.route || cat.id)
                                    ? 'bg-slate-900 text-white shadow-xl scale-[1.02] border-slate-900'
                                    : 'hover:border-slate-200 dark:hover:border-gray-600'
                                }
                            `}
                        >
                            <div className={`size-12 rounded-xl mb-4 flex items-center justify-center transition-colors
                                ${selectedId === (cat.route || cat.id)
                                    ? 'bg-white/20 text-white'
                                    : `bg-${color}-100 text-${color}-600`
                                }
                            `}>
                                <span className="material-symbols-outlined text-2xl">{cat.icon}</span>
                            </div>

                            <h4 className={`text-lg font-black leading-tight mb-1
                                ${selectedId === (cat.route || cat.id) ? 'text-white' : 'text-slate-900 dark:text-white'}
                            `}>
                                {cat.title}
                            </h4>

                            <p className={`text-[10px] font-bold uppercase tracking-wider
                                 ${selectedId === (cat.route || cat.id) ? 'text-slate-400' : 'text-slate-400'}
                            `}>
                                Explore
                            </p>

                            <div className={`absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity
                                 ${selectedId === (cat.route || cat.id) ? 'text-white' : 'text-slate-400'}
                            `}>
                                <span className="material-symbols-outlined">arrow_outward</span>
                            </div>
                        </button>
                    );
                })}
            </div>
        </section>
    );
}
