'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '@/store/uiStore';
import { useCartStore } from '@/store/cartStore';

export default function MobileNav() {
    const pathname = usePathname();
    const { toggleServiceDrawer, isServiceDrawerOpen } = useUIStore();
    const cartItems = useCartStore((state) => state.items);
    const cartCount = cartItems.length;

    // Hiding Logic: Hide on auth pages AND detail pages with "Book Now" footers
    // Pattern: /lab-tests/[id], /scans/[id], /medicines/[id] etc.
    // But show on listing pages: /lab-tests, /scans
    const isHidden = React.useMemo(() => {
        const hiddenPrefixes = ['/login', '/register', '/checkout', '/cart'];
        if (hiddenPrefixes.some(p => pathname.startsWith(p))) return true;

        // Check for detail pages that have action footers
        // A simple heuristic: if path has 3 segments (e.g. /lab-tests/123) it's likely a detail page
        // Exception: /lab-tests/category/prevention might be a listing.
        // For now, let's target specific modules known to have footers.
        const detailModules = ['/lab-tests/', '/scans/', '/doctors/', '/medicines/'];
        if (detailModules.some(m => pathname.startsWith(m) && pathname.split('/').length > 2)) {
            return true;
        }

        return false;
    }, [pathname]);

    if (isHidden) return null;

    const navItems = [
        { label: 'Home', href: '/', icon: 'home' },
        { label: 'Bookings', href: '/bookings', icon: 'calendar_month' },
        { label: 'Menu', action: toggleServiceDrawer, icon: isServiceDrawerOpen ? 'close' : 'grid_view' }, // Middle Item
        { label: 'Cart', href: '/cart', icon: 'shopping_cart', badge: cartCount },
        { label: 'Profile', href: '/profile', icon: 'person' },
    ];

    return (
        <motion.nav
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-6 left-4 right-4 z-50 lg:hidden"
        >
            <div className="absolute inset-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-white/20 dark:border-white/10" />

            <div className="relative flex justify-between items-center px-6 py-3">
                {navItems.map((item, index) => {
                    const isActive = item.href ? pathname === item.href : isServiceDrawerOpen;

                    const Content = (
                        <motion.div
                            className="flex flex-col items-center gap-1 relative group cursor-pointer"
                            whileTap={{ scale: 0.9 }}
                        >
                            <div className={`relative p-2 rounded-xl transition-all duration-300 ${isActive
                                    ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                                    : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                                }`}>
                                <span className={`material-symbols-outlined text-2xl ${isActive ? 'filled' : ''}`}>
                                    {item.icon}
                                </span>

                                {item.badge ? (
                                    <span className="absolute -top-1 -right-1 size-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white dark:border-slate-900">
                                        {item.badge > 9 ? '9+' : item.badge}
                                    </span>
                                ) : null}
                            </div>
                        </motion.div>
                    );

                    return item.href ? (
                        <Link key={index} href={item.href} onClick={() => isServiceDrawerOpen && toggleServiceDrawer()}>
                            {Content}
                        </Link>
                    ) : (
                        <button key={index} onClick={item.action}>
                            {Content}
                        </button>
                    );
                })}
            </div>
        </motion.nav>
    );
}
