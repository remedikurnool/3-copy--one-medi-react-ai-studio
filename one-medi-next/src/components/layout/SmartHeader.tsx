'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import GlobalSearchBar from '@/components/ui/GlobalSearchBar';
import { useLocationStore } from '@/store/locationStore';
import { useUIStore } from '@/store/uiStore';
import LocationModal from '@/components/ui/LocationModal';
import { useCartStore } from '@/store/cartStore';

export default function SmartHeader() {
    const router = useRouter();
    const { city, address } = useLocationStore();
    const { openServiceDrawer } = useUIStore();
    const cartItems = useCartStore((state) => state.items);
    const cartCount = cartItems.length;

    const [isScrolled, setIsScrolled] = useState(false);
    const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <LocationModal isOpen={isLocationModalOpen} onClose={() => setIsLocationModalOpen(false)} />

            <motion.header
                className={`sticky top-0 z-40 w-full transition-all duration-300 ${isScrolled
                    ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-sm border-b border-surface-200/50 dark:border-surface-800/50 py-2'
                    : 'bg-transparent py-3 border-b border-transparent'
                    }`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
            >
                <div className="max-w-7xl mx-auto px-4 lg:px-8 flex items-center justify-between gap-4">

                    {/* Left: Logo & Menu Trigger */}
                    <div className="flex items-center gap-4 lg:gap-8 shrink-0">
                        {/* Mobile Menu Trigger */}
                        <button
                            onClick={openServiceDrawer}
                            className="lg:hidden p-2 -ml-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                        >
                            <span className="material-symbols-outlined text-2xl">menu</span>
                        </button>

                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="flex flex-col">
                                <h1 className={`font-black tracking-tight text-slate-900 dark:text-white leading-none font-lexend transition-all ${isScrolled ? 'text-xl' : 'text-2xl'}`}>
                                    ONE MEDI
                                </h1>
                                <span className={`text-[10px] font-bold text-primary-600 tracking-[0.2em] transition-all duration-300 ${isScrolled ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}`}>
                                    SUPERAPP
                                </span>
                            </div>
                        </Link>

                        {/* Location (Desktop) */}
                        <button
                            onClick={() => setIsLocationModalOpen(true)}
                            className={`hidden lg:flex items-center gap-2 text-left hover:bg-slate-50 dark:hover:bg-slate-800 px-3 py-1.5 rounded-full border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all ${isScrolled ? 'bg-slate-50 dark:bg-slate-800/50' : ''}`}
                        >
                            <div className="size-8 rounded-full bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center text-primary-600">
                                <span className="material-symbols-outlined text-lg">location_on</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider leading-none mb-0.5">Delivering to</span>
                                <div className="flex items-center gap-1">
                                    <span className="text-sm font-bold text-slate-900 dark:text-white max-w-[140px] truncate leading-none">
                                        {city || 'Select Location'}
                                    </span>
                                    <span className="material-symbols-outlined text-sm text-slate-400">expand_more</span>
                                </div>
                            </div>
                        </button>
                    </div>

                    {/* Center: Search Bar (Desktop) */}
                    <div className="flex-1 max-w-2xl hidden lg:block mx-4">
                        <motion.div
                            initial={false}
                            animate={isScrolled ? { scale: 0.98 } : { scale: 1 }}
                        >
                            <GlobalSearchBar />
                        </motion.div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-2 lg:gap-3 shrink-0">
                        {/* Mobile Search Toggle (Optional if you want a dedicated search screen)
                        <button className="lg:hidden p-2 text-slate-600 dark:text-slate-300 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
                            <span className="material-symbols-outlined text-2xl">search</span>
                        </button>
                        */}

                        <Link href="/notifications" className="p-2.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 relative group transition-all">
                            <span className="material-symbols-outlined text-[24px] group-hover:animate-swing">notifications</span>
                            <span className="absolute top-2 right-2.5 size-2 bg-red-500 rounded-full border border-white dark:border-slate-900 ring-2 ring-white dark:ring-slate-900"></span>
                        </Link>

                        <Link href="/cart" className="p-2.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 relative group transition-all hidden lg:flex">
                            <span className="material-symbols-outlined text-[24px] group-hover:animate-swing">shopping_cart</span>
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white dark:border-slate-900 shadow-sm">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        {/* Mobile Cart (Visible only on mobile/tablet) - usually handled by BottomNav, but can be here too */}
                        <Link href="/cart" className="lg:hidden p-2.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 relative">
                            <span className="material-symbols-outlined text-[24px]">shopping_cart</span>
                            {cartCount > 0 && (
                                <span className="absolute top-1 right-1 size-2.5 bg-red-500 rounded-full border border-white dark:border-slate-900"></span>
                            )}
                        </Link>

                        <Link href="/profile" className="hidden lg:flex items-center gap-3 ml-2 pl-4 border-l border-slate-200 dark:border-slate-700">
                            <div className="text-right hidden xl:block leading-tight">
                                <p className="text-sm font-bold text-slate-700 dark:text-white">Hello, User</p>
                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wide">My Account</p>
                            </div>
                            <div className="size-10 rounded-full bg-gradient-to-br from-primary-100 to-indigo-100 dark:from-primary-900 dark:to-indigo-900 flex items-center justify-center text-primary-700 dark:text-primary-300 font-bold border-2 border-white dark:border-slate-800 shadow-sm ring-1 ring-slate-100 dark:ring-slate-800">
                                U
                            </div>
                        </Link>
                    </div>
                </div>

                {/* Mobile Search Bar Row (Visible only on mobile when scrolled or always?) 
                    Let's keep it clean: GlobalSearchBar usually handles its own mobile state or we put it here.
                    For now, we can put a simplified search trigger or the full bar.
                */}
                <div className="lg:hidden px-4 pb-3">
                    <GlobalSearchBar />
                </div>
            </motion.header>
        </>
    );
}
