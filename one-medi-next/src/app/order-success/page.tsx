'use client';

import React, { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';

function OrderSuccessContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const orderId = searchParams.get('orderId');

    const displayOrderId = orderId
        ? orderId.includes('-')
            ? `#OM-${orderId.slice(0, 8).toUpperCase()}`
            : `#${orderId}`
        : '#OM-PENDING';

    return (
        <div className="min-h-screen bg-bg-light dark:bg-bg-dark flex flex-col items-center justify-center p-6 text-center font-sans relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-100 dark:bg-emerald-900/10 rounded-full blur-3xl opacity-50"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-100 dark:bg-blue-900/10 rounded-full blur-3xl opacity-50"></div>
            </div>

            <motion.div
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="size-32 rounded-full bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center mb-8 shadow-inner relative z-10"
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="size-24 rounded-full bg-emerald-100 dark:bg-emerald-800 flex items-center justify-center shadow-lg"
                >
                    <span className="material-symbols-outlined text-6xl text-emerald-600 dark:text-emerald-400">check_rounded</span>
                </motion.div>
            </motion.div>

            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl font-black text-slate-900 dark:text-white mb-3 tracking-tight"
            >
                Order Confirmed!
            </motion.h1>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-slate-500 dark:text-slate-400 mb-8 max-w-sm mx-auto font-medium text-lg"
            >
                Thank you for your purchase. Your order <span className="font-bold text-slate-900 dark:text-white">{displayOrderId}</span> has been placed successfully.
            </motion.p>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="w-full max-w-xs flex flex-col gap-4 relative z-10"
            >
                <button
                    onClick={() => router.push(`/orders/${orderId}`)}
                    className="w-full h-14 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-slate-900/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                    Track Order
                    <span className="material-symbols-outlined">local_shipping</span>
                </button>
                <button
                    onClick={() => router.push('/')}
                    className="w-full h-14 bg-transparent text-slate-500 dark:text-slate-400 font-bold hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                    Continue Shopping
                </button>
            </motion.div>
        </div>
    );
}

export default function OrderSuccessPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-bg-light dark:bg-bg-dark flex items-center justify-center">
                <span className="material-symbols-outlined text-4xl text-slate-300 animate-spin">sync</span>
            </div>
        }>
            <OrderSuccessContent />
        </Suspense>
    );
}
