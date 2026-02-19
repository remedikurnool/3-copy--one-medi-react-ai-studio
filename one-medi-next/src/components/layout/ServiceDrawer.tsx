'use client';

import React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '@/store/uiStore';
import { ALL_SERVICES } from '@/constants/services';
import { getServiceColor } from '@/lib/utils';

export default function ServiceDrawer() {
    const { isServiceDrawerOpen, closeServiceDrawer } = useUIStore();

    return (
        <AnimatePresence>
            {isServiceDrawerOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={closeServiceDrawer}
                        className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm lg:hidden"
                    />

                    {/* Drawer Content */}
                    <motion.div
                        initial={{ y: '100%' }}
                        animate={{ y: '20%' }}
                        exit={{ y: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="fixed inset-0 z-[70] bg-surface-50 dark:bg-surface-950 rounded-t-[2rem] shadow-2xl overflow-hidden flex flex-col lg:hidden border-t border-white/20 dark:border-white/10"
                        style={{ top: '15vh' }}
                    >
                        {/* Handle Bar */}
                        <div className="flex justify-center pt-4 pb-2" onClick={closeServiceDrawer}>
                            <div className="w-12 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full" />
                        </div>

                        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
                            <h2 className="text-xl font-black font-lexend text-slate-900 dark:text-white">All Services</h2>
                            <button
                                onClick={closeServiceDrawer}
                                className="size-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-red-500 transition-colors"
                            >
                                <span className="material-symbols-outlined text-xl">close</span>
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 pb-32">
                            <div className="grid grid-cols-4 gap-4">
                                {ALL_SERVICES.map((service, index) => {
                                    const { bg, text, darkBg } = getServiceColor(service.color);
                                    return (
                                        <Link
                                            key={service.id}
                                            href={service.route}
                                            onClick={closeServiceDrawer}
                                            className="flex flex-col items-center gap-2 group"
                                        >
                                            <motion.div
                                                initial={{ scale: 0, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                transition={{ delay: index * 0.03 }}
                                                whileTap={{ scale: 0.9 }}
                                                className={`size-16 rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 dark:border-slate-800 ${bg} ${text} ${darkBg} group-hover:shadow-md transition-all`}
                                            >
                                                <span className="material-symbols-outlined text-3xl">{service.icon}</span>
                                            </motion.div>
                                            <span className="text-[10px] font-bold text-center text-slate-600 dark:text-slate-300 leading-tight line-clamp-2">
                                                {service.label}
                                            </span>
                                        </Link>
                                    );
                                })}
                            </div>

                            {/* Promo Banner inside Drawer */}
                            <div className="mt-8 relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary-600 to-indigo-600 p-4 text-white shadow-lg">
                                <div className="absolute right-0 top-0 h-full w-1/2 bg-white/10 skew-x-12" />
                                <div className="relative z-10">
                                    <p className="text-xs font-bold opacity-80 mb-1">Coming Soon</p>
                                    <h3 className="text-lg font-black leading-tight">AI Health Assistant</h3>
                                    <button className="mt-3 text-[10px] font-bold bg-white text-primary-600 px-3 py-1.5 rounded-lg shadow-sm">
                                        Learn More
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
