'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useUserStore } from '@/store/userStore';
import { useAuth } from '@/components/AuthProvider';
import { useMenu } from '@/hooks/useUIConfig';

interface MobileSidebarProps {
   isOpen: boolean;
   onClose: () => void;
}

export default function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
   const router = useRouter();
   const { isAuthenticated, profile } = useUserStore();
   const { signOut } = useAuth();
   const { data: menu } = useMenu('mobile_sidebar');
   const sidebarLinks = menu?.items || [];

   // Prevent background scroll when sidebar is open
   useEffect(() => {
      if (isOpen) {
         document.body.style.overflow = 'hidden';
      } else {
         document.body.style.overflow = 'unset';
      }
      return () => {
         document.body.style.overflow = 'unset';
      };
   }, [isOpen]);

   const handleNavigation = (path: string) => {
      onClose();
      router.push(path);
   };

   return (
      <AnimatePresence>
         {isOpen && (
            <>
               {/* Backdrop */}
               <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={onClose}
                  className="fixed inset-0 bg-black/50 z-50 lg:hidden"
               />

               {/* Sidebar */}
               <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '-100%' }}
                  transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                  className="fixed inset-y-0 left-0 w-[280px] bg-white dark:bg-surface-900 shadow-2xl z-50 lg:hidden overflow-y-auto"
               >
                  {/* Header/Profile Section */}
                  <div className="p-6 border-b border-slate-100 dark:border-slate-800">
                     <div className="flex items-center gap-3 mb-4">
                        <div className="size-12 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 font-bold text-xl">
                           {profile?.name?.[0] || 'G'}
                        </div>
                        <div>
                           <h3 className="font-bold text-slate-900 dark:text-white">
                              {isAuthenticated ? profile?.name : 'Guest User'}
                           </h3>
                           <p className="text-xs text-slate-500 dark:text-slate-400">
                              {isAuthenticated ? profile?.phone : 'Welcome to OneMedi'}
                           </p>
                        </div>
                     </div>
                     {!isAuthenticated && (
                        <button
                           onClick={() => handleNavigation('/login')}
                           className="w-full py-2 bg-primary-600 text-white rounded-lg font-medium text-sm hover:bg-primary-700 transition-colors"
                        >
                           Login / Sign Up
                        </button>
                     )}
                  </div>

                  {/* Navigation Links */}
                  <nav className="p-4 space-y-1">
                     {sidebarLinks.map((link) => (
                        <button
                           key={link.id}
                           onClick={() => handleNavigation(link.route || '/')}
                           className="w-full flex items-center gap-3 p-3 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group"
                        >
                           <span className="material-symbols-outlined text-[20px] group-hover:text-primary-600 transition-colors">
                              {link.icon || 'circle'}
                           </span>
                           <span className="font-medium text-sm">{link.title}</span>
                        </button>
                     ))}
                  </nav>

                  {/* Footer/Logout */}
                  {isAuthenticated && (
                     <div className="p-4 border-t border-slate-100 dark:border-slate-800 mt-auto">
                        <button
                           onClick={() => {
                              signOut();
                              onClose();
                           }}
                           className="w-full flex items-center gap-3 p-3 rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors"
                        >
                           <span className="material-symbols-outlined text-[20px]">logout</span>
                           <span className="font-medium text-sm">Sign Out</span>
                        </button>
                     </div>
                  )}
               </motion.div>
            </>
         )}
      </AnimatePresence>
   );
}
