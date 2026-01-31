'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useCartStore } from '@/store/cartStore';
import { useLocationStore } from '@/store/locationStore';
import { useUserStore } from '@/store/userStore';
import MegaMenu from './MegaMenu';
import LocationModal from './LocationModal';
import GlobalSearchBar from './GlobalSearchBar';

export default function DesktopHeader() {
  const router = useRouter();
  const cartItemsCount = useCartStore((state) => state.items.length);
  const { city } = useLocationStore();
  const { isAuthenticated, profile } = useUserStore();

  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Track scroll for header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <LocationModal isOpen={isLocationModalOpen} onClose={() => setIsLocationModalOpen(false)} />

      <motion.header
        className={`sticky top-0 z-50 hidden lg:block transition-all duration-300 ${isScrolled
            ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl shadow-lg'
            : 'bg-white dark:bg-slate-900'
          }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        {/* Top Bar */}
        <div className={`bg-gradient-to-r from-primary/5 to-primary/10 dark:from-slate-800 dark:to-slate-800 py-2 px-4 transition-all duration-300 ${isScrolled ? 'opacity-0 h-0 py-0 overflow-hidden' : 'opacity-100'
          }`}>
          <div className="max-w-7xl mx-auto flex justify-between items-center text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            <div className="flex gap-6">
              <span className="flex items-center gap-1.5 hover:text-primary transition-colors cursor-pointer">
                <span className="material-symbols-outlined text-sm">call</span>
                Support: 94296-90055
              </span>
              <span className="flex items-center gap-1.5 text-red-500 font-black animate-pulse">
                <span className="material-symbols-outlined text-sm">ambulance</span>
                Emergency: 108
              </span>
            </div>
            <div className="flex gap-6">
              <Link href="/bookings" className="hover:text-primary transition-colors">Track Order</Link>
              <Link href="/chat" className="hover:text-primary transition-colors">Help Center</Link>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <motion.div
              className="size-12 rounded-2xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white shadow-float"
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="material-symbols-outlined text-2xl">local_hospital</span>
            </motion.div>
            <div className="flex flex-col">
              <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white leading-none">
                ONE MEDI
              </h1>
              <span className="text-[10px] font-black text-primary tracking-[0.25em] uppercase mt-0.5">
                Kurnool
              </span>
            </div>
          </Link>

          {/* Center Section */}
          <div className="flex-1 flex items-center gap-4 max-w-2xl">
            {/* Services Menu */}
            <div className="relative" onMouseEnter={() => setIsMegaMenuOpen(true)}>
              <motion.button
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm transition-all ${isMegaMenuOpen
                    ? 'bg-primary text-white shadow-button'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="material-symbols-outlined text-xl">grid_view</span>
                All Services
                <motion.span
                  className="material-symbols-outlined text-sm"
                  animate={{ rotate: isMegaMenuOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  expand_more
                </motion.span>
              </motion.button>

              <AnimatePresence>
                {isMegaMenuOpen && <MegaMenu onClose={() => setIsMegaMenuOpen(false)} />}
              </AnimatePresence>
            </div>

            {/* Search */}
            <div className="flex-1">
              <GlobalSearchBar />
            </div>

            {/* Location */}
            <motion.button
              onClick={() => setIsLocationModalOpen(true)}
              className="flex items-center gap-2 px-4 py-3 rounded-2xl hover:bg-primary/5 transition-all whitespace-nowrap"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="material-symbols-outlined text-primary text-xl">location_on</span>
              <div className="flex flex-col items-start leading-none">
                <span className="text-[9px] text-slate-400 uppercase font-black tracking-wider">Deliver to</span>
                <span className="text-sm font-bold text-slate-700 dark:text-white">{city}</span>
              </div>
            </motion.button>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Notifications */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/notifications"
                className="relative size-12 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 transition-all"
              >
                <span className="material-symbols-outlined">notifications</span>
                <span className="absolute top-2 right-2 size-2.5 bg-red-500 rounded-full border-2 border-white dark:border-slate-800" />
              </Link>
            </motion.div>

            {/* Auth */}
            {isAuthenticated ? (
              <Link
                href="/profile"
                className="flex items-center gap-3 pl-2 pr-4 py-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
              >
                <div
                  className="size-10 rounded-full bg-cover bg-center border-2 border-primary/20 shadow-sm"
                  style={{ backgroundImage: `url("${profile.image}")` }}
                />
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                    {profile.name.split(' ')[0]}
                  </span>
                  <span className="text-[10px] font-bold text-primary">Pro Member</span>
                </div>
              </Link>
            ) : (
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/login"
                  className="px-5 py-3 rounded-2xl text-sm font-bold text-primary bg-primary/10 hover:bg-primary hover:text-white transition-all"
                >
                  Login
                </Link>
              </motion.div>
            )}

            {/* Cart */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                id="cart-icon-target"
                href="/cart"
                className="flex items-center gap-2 bg-gradient-to-r from-slate-900 to-slate-800 dark:from-white dark:to-slate-100 text-white dark:text-slate-900 px-6 py-3.5 rounded-2xl font-black text-sm shadow-lg hover:shadow-xl transition-all"
              >
                <span className="material-symbols-outlined text-xl">shopping_cart</span>
                <span>Cart</span>
                <AnimatePresence>
                  {cartItemsCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="bg-accent text-white text-[10px] px-2 py-0.5 rounded-full font-black"
                    >
                      {cartItemsCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.header>
    </>
  );
}