'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import GlobalSearchBar from '@/components/ui/GlobalSearchBar';
import { useLocationStore } from '@/store/locationStore';
import LocationModal from '@/components/ui/LocationModal';

export default function SmartHeader() {
    const router = useRouter();
    const { city, address } = useLocationStore();
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
                className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled
                        ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-md py-2 border-b border-slate-200 dark:border-slate-800'
                        : 'bg-white dark:bg-slate-900 py-4 border-b border-transparent'
                    }`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
            >
                <div className="max-w-7xl mx-auto px-4 lg:px-8 flex items-center justify-between gap-4 lg:gap-8">

                    {/* Logo & Location */}
                    <div className="flex items-center gap-6 lg:gap-8 shrink-0">
                        <Link href="/" className="flex flex-col">
                            <h1 className={`font-black tracking-tight text-slate-900 dark:text-white leading-none font-lexend transition-all ${isScrolled ? 'text-xl' : 'text-2xl'}`}>
                                ONE MEDI
                            </h1>
                            {!isScrolled && (
                                <span className="text-[10px] font-bold text-primary-600 tracking-wider hidden lg:block">SUPERAPP</span>
                            )}
                        </Link>

                        <button
                            onClick={() => setIsLocationModalOpen(true)}
                            className={`hidden lg:flex items-center gap-2 text-left hover:bg-slate-50 dark:hover:bg-slate-800 p-2 rounded-lg transition-colors ${isScrolled ? 'scale-90 origin-left' : ''}`}
                        >
                            <div className="bg-primary-50 dark:bg-primary-900/20 p-2 rounded-full text-primary-600">
                                <span className="material-symbols-outlined text-lg">location_on</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Delivering to</span>
                                <span className="text-xs font-bold text-slate-700 dark:text-slate-200 max-w-[120px] truncate">
                                    {address || city || 'Select Location'}
                                </span>
                            </div>
                            <span className="material-symbols-outlined text-sm text-slate-400">expand_more</span>
                        </button>
                    </div>

                    {/* Search Bar - Centers and expands */}
                    <div className="flex-1 max-w-2xl hidden lg:block">
                        <GlobalSearchBar />
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-1 lg:gap-3 shrink-0">
                        {/* Mobile Search Toggle (Visible only on mobile/tablet) */}
                        <button className="lg:hidden p-2 text-slate-600 dark:text-slate-200">
                            <span className="material-symbols-outlined">search</span>
                        </button>

                        <Link href="/notifications" className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 relative group transition-colors">
                            <span className="material-symbols-outlined group-hover:animate-swing">notifications</span>
                            <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
                        </Link>

                        <Link href="/cart" className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 relative group transition-colors">
                            <span className="material-symbols-outlined group-hover:animate-swing">shopping_cart</span>
                            <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white dark:border-slate-900">
                                2
                            </span>
                        </Link>

                        <Link href="/profile" className="hidden lg:flex items-center gap-3 ml-2 pl-4 border-l border-slate-200 dark:border-slate-700">
                            <div className="text-right hidden xl:block">
                                <p className="text-xs font-bold text-slate-700 dark:text-white">Hello, User</p>
                                <p className="text-[10px] text-slate-500 font-bold">Orders & Profile</p>
                            </div>
                            <div className="size-9 rounded-full bg-gradient-to-tr from-primary-100 to-primary-200 dark:from-primary-900 dark:to-primary-800 flex items-center justify-center text-primary-700 dark:text-primary-300 font-bold border-2 border-white dark:border-slate-800 shadow-sm">
                                U
                            </div>
                        </Link>
                    </div>
                </div>
            </motion.header>
        </>
    );
}
