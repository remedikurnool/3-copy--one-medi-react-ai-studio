'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const NAV_ITEMS = [
    { label: 'Home', href: '/', icon: 'home' },
    { label: 'Services', href: '/services', icon: 'grid_view' },
    { label: 'Bookings', href: '/bookings', icon: 'calendar_month' },
    { label: 'Orders', href: '/orders', icon: 'shopping_bag' },
    { label: 'Profile', href: '/profile', icon: 'person' },
];

export default function MobileNav() {
    const pathname = usePathname();

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 z-50 lg:hidden pb-safe-area-inset-bottom">
            <div className="flex justify-around items-center h-16">
                {NAV_ITEMS.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex flex-col items-center justify-center w-full h-full relative ${isActive ? 'text-primary-600' : 'text-slate-500 dark:text-slate-400'
                                }`}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="mobile-nav-indicator"
                                    className="absolute -top-[1px] w-12 h-[3px] bg-primary-600 rounded-b-full shadow-[0_4px_12px_rgba(37,99,235,0.5)]"
                                />
                            )}
                            <span className={`material-symbols-outlined text-2xl mb-0.5 transition-transform ${isActive ? '-translate-y-1' : ''}`}>
                                {item.icon}
                            </span>
                            <span className={`text-[10px] font-bold transition-all ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0 hidden'}`}>
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
