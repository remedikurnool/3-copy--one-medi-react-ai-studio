'use client';

import React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_ITEMS = [
    { label: 'Medicines', href: '/medicines', icon: 'medication' },
    { label: 'Lab Tests', href: '/lab-tests', icon: 'biotech' },
    { label: 'Doctors', href: '/doctors', icon: 'stethoscope' },
    { label: 'Scans', href: '/scans', icon: 'radiology' },
    { label: 'Surgeries', href: '/surgeries', icon: 'medical_services' },
    { label: 'Insurance', href: '/insurance', icon: 'security' },
    { label: 'Wellness', href: '/wellness', icon: 'self_improvement' },
    { label: 'Hospitals', href: '/hospitals', icon: 'local_hospital' },
];

export default function MegaMenu() {
    const [activeMenu, setActiveMenu] = React.useState<string | null>(null);

    return (
        <nav className="hidden lg:block bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 relative z-40">
            <div className="max-w-7xl mx-auto px-4 lg:px-8">
                <ul className="flex items-center gap-8">
                    {NAV_ITEMS.map((item) => (
                        <li
                            key={item.label}
                            onMouseEnter={() => setActiveMenu(item.label)}
                            onMouseLeave={() => setActiveMenu(null)}
                            className="py-4"
                        >
                            <Link
                                href={item.href}
                                className={`text-sm font-bold transition-colors flex items-center gap-2 ${activeMenu === item.label ? 'text-primary-600' : 'text-slate-700 dark:text-slate-300 hover:text-primary-600'
                                    }`}
                            >
                                {item.label}
                                {activeMenu === item.label && (
                                    <span className="material-symbols-outlined text-[16px]">expand_less</span>
                                )}
                                {activeMenu !== item.label && (
                                    <span className="material-symbols-outlined text-[16px] opacity-50">expand_more</span>
                                )}
                            </Link>
                        </li>
                    ))}
                </ul>

                <AnimatePresence>
                    {activeMenu && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 5 }}
                            transition={{ duration: 0.2 }}
                            onMouseEnter={() => setActiveMenu(activeMenu)}
                            onMouseLeave={() => setActiveMenu(null)}
                            className="absolute left-0 top-full w-full bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 shadow-xl min-h-[300px] border-b-4 border-b-primary-500"
                        >
                            <div className="max-w-7xl mx-auto px-8 py-8 grid grid-cols-4 gap-8">
                                {/* Column 1: Categories */}
                                <div className="space-y-4">
                                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Categories</h4>
                                    <ul className="space-y-2">
                                        <li><Link href="#" className="text-sm text-slate-600 hover:text-primary-600 font-medium">Top Medicines</Link></li>
                                        <li><Link href="#" className="text-sm text-slate-600 hover:text-primary-600 font-medium">Chronic Care</Link></li>
                                        <li><Link href="#" className="text-sm text-slate-600 hover:text-primary-600 font-medium">Baby Care</Link></li>
                                        <li><Link href="#" className="text-sm text-slate-600 hover:text-primary-600 font-medium">Covid Essentials</Link></li>
                                    </ul>
                                </div>

                                {/* Column 2: Featured */}
                                <div className="space-y-4">
                                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Featured</h4>
                                    <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                                        <span className="text-xs font-bold text-green-600 mb-1 block">Offer</span>
                                        <p className="font-bold text-slate-800 dark:text-white mb-2">Diabetes Care Plan</p>
                                        <Link href="#" className="text-xs text-primary-600 font-bold hover:underline">View details &rarr;</Link>
                                    </div>
                                </div>

                                {/* Column 3: Banner */}
                                <div className="col-span-2 relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-600 to-indigo-700 p-6 text-white">
                                    <h3 className="text-xl font-bold mb-2">Flat 25% OFF on First Order</h3>
                                    <p className="text-white/80 text-sm mb-4">Use code: ONEMEDI25</p>
                                    <button className="bg-white text-primary-700 px-4 py-2 rounded-lg text-sm font-bold shadow-md hover:bg-slate-50 transition-colors">
                                        Order Now
                                    </button>
                                    <div className="absolute -right-10 -bottom-10 opacity-20 text-[150px]">
                                        💊
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
}
