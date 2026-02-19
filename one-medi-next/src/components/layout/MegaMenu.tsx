'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ALL_SERVICES } from '@/constants/services';
import { getServiceColor } from '@/lib/utils';

export default function MegaMenu() {
    const pathname = usePathname();
    const [activeCategory, setActiveCategory] = React.useState<string | null>(null);

    // Group services (arbitrary grouping for UI, or just display grid)
    // For MegaMenu, we'll iterate all services in a clean grid.

    // Split into 3 columns
    // Split into 4 columns
    const columns = [
        ALL_SERVICES.slice(0, 4),
        ALL_SERVICES.slice(4, 8),
        ALL_SERVICES.slice(8, 12),
        ALL_SERVICES.slice(12, 16)
    ];

    return (
        <div className="hidden lg:block border-b border-surface-200 dark:border-surface-800 bg-white dark:bg-slate-900 sticky top-[68px] z-30">
            <div className="max-w-7xl mx-auto px-8">
                <nav className="flex items-center gap-8">
                    {/* Primary Trigger - Services */}
                    <div
                        className="group relative py-3"
                        onMouseEnter={() => setActiveCategory('services')}
                        onMouseLeave={() => setActiveCategory(null)}
                    >
                        <button className={`flex items-center gap-1.5 text-sm font-bold tracking-wide uppercase transition-colors ${activeCategory === 'services' ? 'text-primary' : 'text-slate-600 dark:text-slate-300 hover:text-primary'}`}>
                            <span className="material-symbols-outlined text-lg">grid_view</span>
                            All Services
                            <span className={`material-symbols-outlined text-lg transition-transform duration-300 ${activeCategory === 'services' ? 'rotate-180' : ''}`}>expand_more</span>
                        </button>

                        {/* Dropdown Content */}
                        <AnimatePresence>
                            {activeCategory === 'services' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute top-full left-0 w-[800px] bg-white dark:bg-slate-900 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-black/50 border border-surface-100 dark:border-surface-800 p-6 z-50 mt-1"
                                >
                                    <div className="grid grid-cols-4 gap-6">
                                        {columns.map((col, i) => (
                                            <div key={i} className="flex flex-col gap-2">
                                                {col.map((service) => {
                                                    const { bg, text, darkBg } = getServiceColor(service.color);
                                                    return (
                                                        <Link
                                                            key={service.id}
                                                            href={service.route}
                                                            className="flex items-start gap-3 p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group/item"
                                                        >
                                                            <div className={`mt-0.5 size-8 rounded-lg ${bg} ${text} ${darkBg} flex items-center justify-center shrink-0 group-hover/item:scale-110 transition-transform`}>
                                                                <span className="material-symbols-outlined text-lg">{service.icon}</span>
                                                            </div>
                                                            <div>
                                                                <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover/item:text-primary transition-colors">{service.label}</h3>
                                                                <p className="text-[10px] text-slate-500 font-medium line-clamp-1">{service.description}</p>
                                                            </div>
                                                        </Link>
                                                    );
                                                })}
                                            </div>
                                        ))}
                                    </div>

                                    {/* Footer Promo */}
                                    <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                                            <span className="material-symbols-outlined text-base text-green-500">verified</span>
                                            Trusted by 10k+ Doctors
                                        </div>
                                        <Link href="/doctors" className="text-xs font-bold text-primary hover:underline">
                                            View Top Specialists &rarr;
                                        </Link>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Quick Core Links */}
                    {['Doctors', 'Lab Tests', 'Medicines', 'Scans'].map((label) => {
                        const service = ALL_SERVICES.find(s => s.label === label);
                        if (!service) return null;
                        return (
                            <Link
                                key={service.id}
                                href={service.route}
                                className={`text-sm font-bold tracking-wide transition-colors ${pathname.startsWith(service.route) ? 'text-primary' : 'text-slate-600 dark:text-slate-300 hover:text-primary'}`}
                            >
                                {service.label}
                            </Link>
                        );
                    })}

                    <div className="flex-1" />

                    <Link href="/bookings" className="text-xs font-bold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
                        My Bookings
                    </Link>
                </nav>
            </div>
        </div>
    );
}
