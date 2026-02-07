'use client';

import React from 'react';

interface SectionHeaderProps {
    title: string;
    subtitle?: string;
    onSeeAll?: () => void;
    icon?: string;
    actionLabel?: string;
}

const SectionHeader = ({ title, subtitle, onSeeAll, icon, actionLabel = "View All" }: SectionHeaderProps) => {
    return (
        <div className="flex items-end justify-between mb-5 px-1">
            <div className="flex flex-col gap-0.5">
                {subtitle && (
                    <span className="text-[10px] font-bold text-primary-600 uppercase tracking-widest">{subtitle}</span>
                )}
                <h2 className="text-xl lg:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2 font-lexend">
                    {icon && <span className="material-symbols-outlined text-primary-500">{icon}</span>}
                    {title}
                </h2>
            </div>

            {onSeeAll && (
                <button
                    onClick={onSeeAll}
                    className="group flex items-center gap-1 text-xs font-bold text-primary-600 hover:text-primary-700 transition-colors bg-primary-50 dark:bg-primary-900/20 px-3 py-1.5 rounded-full"
                >
                    {actionLabel}
                    <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-0.5">arrow_forward</span>
                </button>
            )}
        </div>
    );
};

export default SectionHeader;
