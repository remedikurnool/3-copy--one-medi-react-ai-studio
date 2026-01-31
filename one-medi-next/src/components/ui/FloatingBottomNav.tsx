'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/store/cartStore';

const NAV_ITEMS = [
  { id: 'home', icon: 'home', label: 'Home', path: '/' },
  { id: 'bookings', icon: 'calendar_today', label: 'Bookings', path: '/bookings' },
  { id: 'chat', icon: 'chat_bubble', label: 'Chat', path: '/chat' },
  { id: 'profile', icon: 'person', label: 'Profile', path: '/profile' },
];

export default function FloatingBottomNav() {
  const pathname = usePathname();
  const cartItems = useCartStore((state) => state.items);
  const cartCount = cartItems.length;

  // Hide on certain pages
  const hiddenPaths = ['/checkout', '/login', '/register'];
  if (hiddenPaths.some(p => pathname.startsWith(p))) return null;

  return (
    <motion.div
      className="lg:hidden fixed bottom-0 left-0 right-0 z-[100] px-4 pb-safe"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      {/* Glassmorphism Container */}
      <nav className="relative mx-auto max-w-md">
        {/* Background Blur Layer */}
        <div className="absolute inset-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl rounded-[2rem] shadow-lg border border-white/50 dark:border-slate-700/50" />

        {/* Navigation Content */}
        <div className="relative flex items-center justify-around px-2 py-2">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.path ||
              (item.path !== '/' && pathname.startsWith(item.path));

            return (
              <NavItem
                key={item.id}
                item={item}
                isActive={isActive}
              />
            );
          })}

          {/* Center Cart Button */}
          <Link
            href="/cart"
            className="relative -mt-8"
          >
            <motion.div
              id="cart-icon-target"
              className="relative flex items-center justify-center size-16 bg-gradient-to-br from-primary to-primary-dark rounded-full shadow-float"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-full bg-primary/30 blur-xl opacity-60" />

              {/* Icon */}
              <span className="material-symbols-outlined text-white text-2xl relative z-10">
                shopping_cart
              </span>

              {/* Badge */}
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 size-6 bg-accent text-white text-xs font-black rounded-full flex items-center justify-center shadow-md z-20"
                  >
                    {cartCount > 9 ? '9+' : cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          </Link>
        </div>
      </nav>
    </motion.div>
  );
}

function NavItem({ item, isActive }: { item: typeof NAV_ITEMS[0]; isActive: boolean }) {
  return (
    <Link href={item.path} className="relative flex flex-col items-center gap-1 px-4 py-2 touch-target">
      <motion.div
        className="relative"
        whileTap={{ scale: 0.9 }}
      >
        {/* Active Indicator */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              layoutId="navIndicator"
              className="absolute -inset-2 bg-primary/10 dark:bg-primary/20 rounded-2xl"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          )}
        </AnimatePresence>

        {/* Icon */}
        <span
          className={`material-symbols-outlined text-2xl transition-colors duration-300 relative z-10 ${isActive
              ? 'text-primary filled'
              : 'text-slate-400 dark:text-slate-500'
            }`}
        >
          {item.icon}
        </span>
      </motion.div>

      {/* Label */}
      <span
        className={`text-[10px] font-bold uppercase tracking-wider transition-colors duration-300 ${isActive
            ? 'text-primary'
            : 'text-slate-400 dark:text-slate-500'
          }`}
      >
        {item.label}
      </span>
    </Link>
  );
}
