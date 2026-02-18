'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useMenu } from '@/hooks/useUIConfig';

// Helper to map color names to Tailwind classes
const getColorClasses = (colorName: string = 'gray') => {
    const colors: Record<string, { text: string; bg: string }> = {
        emerald: { text: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
        blue: { text: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
        indigo: { text: 'text-indigo-500', bg: 'bg-indigo-50 dark:bg-indigo-900/20' },
        purple: { text: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/20' },
        rose: { text: 'text-rose-500', bg: 'bg-rose-50 dark:bg-rose-900/20' },
        amber: { text: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-900/20' },
        teal: { text: 'text-teal-500', bg: 'bg-teal-50 dark:bg-teal-900/20' },
        red: { text: 'text-red-500', bg: 'bg-red-50 dark:bg-red-900/20' },
        gray: { text: 'text-slate-500', bg: 'bg-slate-50 dark:bg-slate-900/20' },
    };
    return colors[colorName.toLowerCase()] || colors.gray;
};

export default function QuickAccessGrid() {
    const router = useRouter();
    const { data: menu, loading } = useMenu('home_quick_access');
    const services = menu?.items || [];

    if (loading) {
        return (
            <div className="grid grid-cols-4 lg:grid-cols-8 gap-3 lg:gap-6 animate-pulse">
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="flex flex-col items-center gap-2">
                        <div className="size-14 lg:size-16 rounded-2xl bg-slate-200 dark:bg-slate-800" />
                        <div className="h-3 w-12 bg-slate-200 dark:bg-slate-800 rounded" />
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-4 lg:grid-cols-8 gap-3 lg:gap-6">
            {services.map((item) => {
                const { text, bg } = getColorClasses(item.badge_color || 'gray');
                return (
                    <motion.button
                        key={item.id}
                        whileHover={{ y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => router.push(item.route || '/')}
                        className="flex flex-col items-center gap-2 group"
                    >
                        <div className={`size-14 lg:size-16 rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 dark:border-slate-800 transition-colors ${bg} group-hover:shadow-md`}>
                            <span className={`material-symbols-outlined text-2xl lg:text-3xl ${text}`}>
                                {item.icon || 'circle'}
                            </span>
                        </div>
                        <span className="text-[10px] lg:text-xs font-bold text-slate-700 dark:text-slate-300 text-center leading-tight">
                            {item.title}
                        </span>
                    </motion.button>
                );
            })}
        </div>
    );
}
