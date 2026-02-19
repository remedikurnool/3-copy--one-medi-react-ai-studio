'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ALL_SERVICES } from '@/constants/services';
import { getServiceColor } from '@/lib/utils';
import PageHeader from '@/components/ui/PageHeader';

export default function ServicesPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-surface-50 dark:bg-surface-950 pb-32 font-sans text-slate-900 dark:text-white animate-fade-in relative">
            <PageHeader
                title="All Services"
                showSearch={true}
                searchPlaceholder="Search services..."
                className="lg:top-20"
            />

            <main className="max-w-7xl mx-auto w-full p-4 lg:p-8 space-y-8 pt-6">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
                    {ALL_SERVICES.map((service, index) => {
                        const { bg, text, darkBg } = getServiceColor(service.color);
                        return (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                onClick={() => router.push(service.route)}
                                className="group relative overflow-hidden rounded-3xl bg-white dark:bg-surface-900 border border-slate-100 dark:border-surface-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer p-5 flex flex-col h-full ring-1 ring-black/5 dark:ring-white/5"
                            >
                                <div className={`size-14 rounded-2xl flex items-center justify-center mb-4 ${bg} ${text} ${darkBg} shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                                    <span className="material-symbols-outlined text-3xl">{service.icon}</span>
                                </div>

                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-primary transition-colors">{service.label}</h3>
                                    {service.isNew && (
                                        <span className="bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">New</span>
                                    )}
                                </div>

                                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed line-clamp-2 mb-4 flex-1">
                                    {service.description}
                                </p>

                                <div className="mt-auto flex items-center text-primary text-sm font-bold group-hover:translate-x-1 transition-transform">
                                    <span>Explore</span>
                                    <span className="material-symbols-outlined text-lg ml-1">arrow_forward</span>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </main>
        </div>
    );
}
