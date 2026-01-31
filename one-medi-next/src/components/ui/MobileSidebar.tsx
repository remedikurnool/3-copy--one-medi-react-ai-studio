'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useUserStore } from '@/store/userStore';

interface MobileSidebarProps {
   isOpen: boolean;
   onClose: () => void;
}

const SIDEBAR_LINKS = [
   { icon: 'home', label: 'Home', path: '/' },
   { icon: 'calendar_today', label: 'My Bookings', path: '/bookings' },
   { icon: 'shopping_bag', label: 'My Orders', path: '/profile/orders' },
   { icon: 'description', label: 'Prescriptions', path: '/prescriptions' },
   { icon: 'lab_profile', label: 'Lab Reports', path: '/profile/reports' },
   { icon: 'favorite', label: 'Saved Items', path: '/profile/saved' },
   { icon: 'settings', label: 'Settings', path: '/profile/settings' },
   { icon: 'help', label: 'Help & Support', path: '/support' },
];

export default function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
   const router = useRouter();
   const { isAuthenticated, profile, logout } = useUserStore();

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
                  className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm lg:hidden"
               />

               {/* Sidebar */}
               <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '-100%' }}
                  transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                  className="fixed top-0 left-0 bottom-0 z-[101] w-[85%] max-w-[320px] bg-white dark:bg-slate-900 shadow-2xl lg:hidden flex flex-col"
               >
                  {/* Header / User Profile */}
                  <div className="relative overflow-hidden bg-primary p-6 pb-8">
                     {/* Background Patterns */}
                     <div className="absolute top-0 right-0 -mr-8 -mt-8 size-32 rounded-full bg-white/10 blur-xl" />
                     <div className="absolute bottom-0 left-0 -ml-8 -mb-4 size-24 rounded-full bg-white/10 blur-xl" />

                     <div className="relative z-10">
                        {isAuthenticated ? (
                           <div className="flex items-center gap-4">
                              <div
                                 className="size-16 rounded-full bg-white/20 backdrop-blur-md border-2 border-white/30 bg-cover bg-center shadow-lg"
                                 style={{ backgroundImage: `url("${profile.image}")` }}
                              />
                              <div className="text-white">
                                 <h3 className="text-xl font-bold leading-tight">{profile.name}</h3>
                                 <p className="text-primary-100 text-sm font-medium">+91 {profile.phone}</p>
                                 <button
                                    onClick={() => handleNavigation('/profile')}
                                    className="mt-2 text-[10px] font-bold uppercase tracking-wider bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full transition-colors"
                                 >
                                    View Profile
                                 </button>
                              </div>
                           </div>
                        ) : (
                           <div className="text-center">
                              <div className="size-16 mx-auto bg-white/20 rounded-2xl flex items-center justify-center mb-3 text-white">
                                 <span className="material-symbols-outlined text-3xl">person</span>
                              </div>
                              <h3 className="text-white text-lg font-bold mb-1">Welcome to One Medi</h3>
                              <p className="text-primary-100 text-xs mb-4">Login to manage your health better</p>
                              <button
                                 onClick={() => handleNavigation('/login')}
                                 className="w-full bg-white text-primary font-bold py-2.5 rounded-xl shadow-lg active:scale-95 transition-transform"
                              >
                                 Login / Register
                              </button>
                           </div>
                        )}
                     </div>
                  </div>

                  {/* Quick Actions (Overlapping Card) */}
                  <div className="px-4 -mt-6 relative z-20">
                     <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-4 grid grid-cols-2 gap-4 border border-slate-100 dark:border-slate-700">
                        <button
                           onClick={() => handleNavigation('/upload-rx')}
                           className="flex flex-col items-center gap-2 p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                        >
                           <div className="size-10 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center">
                              <span className="material-symbols-outlined text-xl">upload_file</span>
                           </div>
                           <span className="text-xs font-bold">Upload Rx</span>
                        </button>
                        <button
                           onClick={() => handleNavigation('/ambulance')}
                           className="flex flex-col items-center gap-2 p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                        >
                           <div className="size-10 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 flex items-center justify-center animate-pulse">
                              <span className="material-symbols-outlined text-xl">ambulance</span>
                           </div>
                           <span className="text-xs font-bold text-red-600">Emergency</span>
                        </button>
                     </div>
                  </div>

                  {/* Menu Links */}
                  <div className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
                     {SIDEBAR_LINKS.map((link) => (
                        <button
                           key={link.path}
                           onClick={() => handleNavigation(link.path)}
                           className="w-full flex items-center gap-4 p-3 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-primary/5 hover:text-primary transition-all active:scale-[0.98]"
                        >
                           <span className="material-symbols-outlined text-[22px] opacity-70">{link.icon}</span>
                           <span className="font-semibold text-sm">{link.label}</span>
                           <span className="material-symbols-outlined text-lg ml-auto opacity-30">chevron_right</span>
                        </button>
                     ))}

                     {isAuthenticated && (
                        <button
                           onClick={() => {
                              logout();
                              onClose();
                           }}
                           className="w-full flex items-center gap-4 p-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all mt-4"
                        >
                           <span className="material-symbols-outlined text-[22px]">logout</span>
                           <span className="font-semibold text-sm">Logout</span>
                        </button>
                     )}
                  </div>

                  {/* Footer */}
                  <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                     <div className="flex justify-center gap-4 mb-3">
                        {['facebook', 'water_drop', 'language'].map((icon, i) => (
                           <button key={i} className="size-8 rounded-full bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center text-slate-400 hover:text-primary transition-colors">
                              <span className="material-symbols-outlined text-base">{icon}</span>
                           </button>
                        ))}
                     </div>
                     <p className="text-center text-[10px] text-slate-400 font-medium">
                        Version 2.4.0 • Made in Kurnool ❤️
                     </p>
                  </div>
               </motion.div>
            </>
         )}
      </AnimatePresence>
   );
}
