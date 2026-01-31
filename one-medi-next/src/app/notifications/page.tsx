'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const NOTIFICATIONS = [
    { id: 1, title: 'Order Delivered', message: 'Your medicine order #OM-1234 has been delivered.', time: '2 mins ago', type: 'order', icon: 'local_shipping', color: 'bg-green-100 text-green-600' },
    { id: 2, title: 'Appointment Reminder', message: 'Reminder: Dr. Smith appointment at 5:00 PM tomorrow.', time: '1 hour ago', type: 'appointment', icon: 'event', color: 'bg-blue-100 text-blue-600' },
    { id: 3, title: 'Flash Sale!', message: 'Get 20% off on all diabetes care products today.', time: '5 hours ago', type: 'promo', icon: 'local_offer', color: 'bg-purple-100 text-purple-600' },
    { id: 4, title: 'Lab Report Ready', message: 'Your full body checkup report is now available.', time: '1 day ago', type: 'report', icon: 'lab_profile', color: 'bg-orange-100 text-orange-600' },
];

function NotificationsContent() {
    const router = useRouter();
    const [notifications, setNotifications] = useState(NOTIFICATIONS);

    const clearAll = () => {
        setNotifications([]);
    };

    const deleteNotification = (id: number) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    return (
        <div className="min-h-screen bg-bg-light dark:bg-bg-dark pb-24 font-sans text-slate-900 dark:text-white">
            <header className="sticky top-0 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-slate-100 dark:border-gray-800 p-4 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => router.back()}
                        className="size-10 flex items-center justify-center rounded-full bg-slate-50 dark:bg-gray-800 hover:bg-slate-100 transition-colors"
                    >
                        <span className="material-symbols-outlined text-slate-700 dark:text-slate-300">arrow_back</span>
                    </button>
                    <h1 className="text-xl font-black uppercase tracking-tight">Notifications</h1>
                </div>
                {notifications.length > 0 && (
                    <button
                        onClick={clearAll}
                        className="text-[10px] font-black uppercase tracking-widest text-red-500 bg-red-50 dark:bg-red-900/20 px-3 py-1.5 rounded-lg hover:bg-red-100 transition-colors"
                    >
                        Clear All
                    </button>
                )}
            </header>

            <main className="p-4 max-w-lg mx-auto w-full">
                {notifications.length > 0 ? (
                    <div className="flex flex-col gap-3">
                        <AnimatePresence>
                            {notifications.map((notif) => (
                                <motion.div
                                    key={notif.id}
                                    layout
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 100 }}
                                    className="bg-white dark:bg-gray-800 p-4 rounded-[1.5rem] shadow-sm border border-slate-100 dark:border-slate-800 flex gap-4 group relative overflow-hidden"
                                >
                                    <div className={`size-12 rounded-2xl flex items-center justify-center shrink-0 ${notif.color} dark:bg-opacity-20`}>
                                        <span className="material-symbols-outlined text-xl">{notif.icon}</span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start mb-1">
                                            <h3 className="font-bold text-sm text-slate-900 dark:text-white truncate">{notif.title}</h3>
                                            <span className="text-[10px] font-bold text-slate-400 whitespace-nowrap ml-2">{notif.time}</span>
                                        </div>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed line-clamp-2">
                                            {notif.message}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => deleteNotification(notif.id)}
                                        className="absolute top-2 right-2 p-1 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <span className="material-symbols-outlined text-lg">close</span>
                                    </button>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center justify-center py-24 text-center opacity-60"
                    >
                        <div className="size-24 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6">
                            <span className="material-symbols-outlined text-5xl text-slate-300">notifications_off</span>
                        </div>
                        <h3 className="text-lg font-black uppercase tracking-tight mb-1">All Caught Up!</h3>
                        <p className="text-xs font-bold text-slate-400">You have no new notifications.</p>
                    </motion.div>
                )}
            </main>
        </div>
    );
}

export default function NotificationsPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <NotificationsContent />
        </Suspense>
    );
}
