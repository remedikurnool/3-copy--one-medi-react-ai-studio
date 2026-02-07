'use client';

import React, { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/userStore';
import { useMyOrders } from '@/hooks';
import { motion, AnimatePresence } from 'framer-motion';
import PageHeader from '@/components/ui/PageHeader';

const OrderStatusBadge = ({ status }: { status: string }) => {
    const getStatusStyle = () => {
        switch (status) {
            case 'confirmed': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200';
            case 'pending': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200';
            case 'shipped': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200';
            case 'delivered': return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200';
            case 'cancelled': return 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 border-red-100';
            default: return 'bg-gray-100 text-gray-600 border-gray-200';
        }
    };

    return (
        <div className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider border ${getStatusStyle()}`}>
            {status}
        </div>
    );
};

function OrderListContent() {
    const router = useRouter();
    const { profile } = useUserStore();
    const { orders, loading, error, refetch } = useMyOrders(profile?.id);

    const formatDate = (dateString: string) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return 'Invalid';
        return date.toLocaleDateString(undefined, {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-surface-50 dark:bg-surface-950 text-slate-900 dark:text-white pb-32">
                <PageHeader title="My Orders" className="lg:top-20" />
                <div className="p-4 flex flex-col gap-4 max-w-7xl mx-auto w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="bg-white dark:bg-gray-800 rounded-[2rem] p-6 shadow-sm border border-slate-50 dark:border-slate-800 animate-pulse h-40">
                                <div className="h-4 bg-slate-100 dark:bg-slate-700 w-1/3 rounded mb-4"></div>
                                <div className="h-10 bg-slate-100 dark:bg-slate-700 w-full rounded-xl mb-4"></div>
                                <div className="h-4 bg-slate-100 dark:bg-slate-700 w-1/2 rounded"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-surface-50 dark:bg-surface-950 p-6 flex items-center justify-center">
                <div className="text-center">
                    <div className="size-20 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="material-symbols-outlined text-4xl text-red-500">error_outline</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 font-bold mb-4">Failed to load orders.</p>
                    <button onClick={refetch} className="text-primary font-black uppercase tracking-widest text-xs border border-primary/20 px-6 py-3 rounded-xl hover:bg-primary hover:text-white transition-colors">
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-surface-50 dark:bg-surface-950 pb-32 font-sans text-slate-900 dark:text-white">
            <PageHeader
                title="My Orders"
                className="lg:top-20"
            />

            <div className="p-4 flex flex-col gap-4 max-w-7xl mx-auto w-full">
                {orders.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center justify-center py-20 text-center"
                    >
                        <div className="size-32 bg-slate-50 dark:bg-slate-800/50 rounded-[2rem] flex items-center justify-center mb-6 shadow-inner">
                            <span className="material-symbols-outlined text-6xl text-slate-300">shopping_bag</span>
                        </div>
                        <h3 className="text-2xl font-black mb-2 text-slate-900 dark:text-white tracking-tight">No orders found</h3>
                        <p className="text-sm font-medium text-slate-500 mb-8 max-w-[200px]">Your order history will appear here once you make a purchase.</p>
                        <button
                            onClick={() => router.push('/')}
                            className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/30 transition-all hover:scale-105 active:scale-95"
                        >
                            Start Shopping
                        </button>
                    </motion.div>
                ) : (
                    <AnimatePresence>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {orders.map((order, index) => (
                                <motion.div
                                    key={order.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    onClick={() => router.push(`/orders/${order.id}`)}
                                    className="bg-white dark:bg-surface-900 rounded-[2rem] p-5 shadow-sm hover:shadow-card-hover border border-surface-200 dark:border-surface-800 active:scale-[0.99] transition-all cursor-pointer group h-full flex flex-col"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex gap-4 items-center">
                                            <div className={`size-12 rounded-2xl flex items-center justify-center ${order.prescription_url
                                                ? 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400'
                                                : 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                                                }`}>
                                                <span className="material-symbols-outlined text-2xl">
                                                    {order.prescription_url ? 'file_upload' : 'shopping_basket'}
                                                </span>
                                            </div>
                                            <div>
                                                <h3 className="font-black text-sm uppercase tracking-wider text-slate-400">Order #{order.id.slice(0, 8)}</h3>
                                                <p className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                                                    {formatDate(order.created_at)}
                                                </p>
                                            </div>
                                        </div>
                                        <OrderStatusBadge status={order.status} />
                                    </div>

                                    <div className="bg-slate-50 dark:bg-slate-700/30 rounded-xl p-3 mb-4 flex gap-2 overflow-hidden relative flex-1">
                                        <div className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-300">
                                            <span className="material-symbols-outlined text-base">receipt_long</span>
                                            <span>Contains medicines & health products</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between pt-2 mt-auto">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider">Total Amount</span>
                                            <span className="font-black text-xl text-slate-900 dark:text-white">₹{order.final_amount}</span>
                                        </div>
                                        <div className="size-10 rounded-full bg-slate-100 dark:bg-slate-700/50 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-colors shadow-sm">
                                            <span className="material-symbols-outlined text-xl">arrow_forward</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </AnimatePresence>
                )}
            </div>
        </div>
    );
}

export default function OrderListPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-surface-50 dark:bg-surface-950 flex items-center justify-center">
                <span className="material-symbols-outlined text-4xl text-slate-300 animate-spin">refresh</span>
            </div>
        }>
            <OrderListContent />
        </Suspense>
    );
}
