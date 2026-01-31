'use client';

import React, { Suspense } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useOrderDetails } from '../../../hooks';
import Image from 'next/image';

const OrderStatusBadge = ({ status }: { status: string }) => {
    const getStatusColor = () => {
        switch (status) {
            case 'confirmed': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
            case 'pending': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
            case 'shipped': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
            case 'delivered': return 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary';
            case 'cancelled': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
            default: return 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400';
        }
    };

    return (
        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${getStatusColor()}`}>
            {status}
        </span>
    );
};

function OrderDetailContent() {
    const params = useParams();
    const router = useRouter();
    const id = typeof params.id === 'string' ? params.id : '';
    const { order, items, loading, error, refetch } = useOrderDetails(id);

    const formatDate = (dateString: string) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return 'Invalid Date';
        return date.toLocaleDateString(undefined, {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-bg-light dark:bg-bg-dark p-4 flex flex-col gap-4">
                <div className="bg-white dark:bg-gray-800 h-14 rounded-xl shadow-sm animate-pulse"></div>
                <div className="bg-white dark:bg-gray-800 h-40 rounded-xl shadow-sm animate-pulse"></div>
                <div className="bg-white dark:bg-gray-800 h-60 rounded-xl shadow-sm animate-pulse"></div>
            </div>
        );
    }

    if (error || !order) {
        return (
            <div className="min-h-screen bg-bg-light dark:bg-bg-dark p-4 flex items-center justify-center">
                <div className="text-center">
                    <span className="material-symbols-outlined text-4xl text-red-500 mb-2">error</span>
                    <p className="text-gray-600 dark:text-gray-400">Failed to load order details.</p>
                    <button onClick={refetch} className="text-primary font-bold mt-2">Try Again</button>
                    <button onClick={() => router.back()} className="block mt-4 text-sm text-gray-500">Go Back</button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-bg-light dark:bg-bg-dark pb-10 font-sans text-slate-900 dark:text-white">
            <header className="sticky top-0 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 px-4 py-3 flex items-center gap-3">
                <button
                    onClick={() => router.back()}
                    className="size-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                    <span className="material-symbols-outlined text-slate-700 dark:text-slate-200">arrow_back</span>
                </button>
                <div>
                    <h1 className="text-lg font-bold leading-tight">Order Details</h1>
                    <p className="text-xs text-gray-500">#{order.id.slice(0, 8).toUpperCase()}</p>
                </div>
            </header>

            <div className="p-4 flex flex-col gap-4">
                {/* Status Card */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-xs text-gray-500 mb-1">Order Status</p>
                            <OrderStatusBadge status={order.status} />
                        </div>
                        <div className="text-right">
                            <p className="text-xs text-gray-500 mb-1">Order Date</p>
                            <p className="text-sm font-bold">{formatDate(order.created_at)}</p>
                        </div>
                    </div>
                    {/* Stepper could go here if status logic requires it */}
                </div>

                {/* Items List */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
                    <h3 className="text-sm font-bold mb-3 flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-lg">shopping_bag</span>
                        Items in Order
                    </h3>
                    <div className="divide-y divide-gray-100 dark:divide-gray-700">
                        {items.map((item) => (
                            <div key={item.id} className="py-3 first:pt-0 last:pb-0 flex gap-3">
                                <div className="size-12 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center justify-center shrink-0 relative overflow-hidden">
                                    {item.medicine ? (
                                        <Image src={item.medicine.image} alt={item.medicine.name} fill className="object-contain mix-blend-multiply dark:mix-blend-normal p-1" unoptimized />
                                    ) : item.lab_test ? (
                                        <span className="material-symbols-outlined text-blue-500">science</span>
                                    ) : (
                                        <span className="material-symbols-outlined text-gray-400">medication</span>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <h4 className="text-sm font-semibold line-clamp-2">
                                            {item.medicine?.name || item.lab_test?.name || 'Unknown Item'}
                                        </h4>
                                        <span className="text-sm font-bold">₹{item.total_price}</span>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-0.5">
                                        Qty: {item.quantity} × ₹{item.unit_price}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Delivery Address */}
                {order.delivery_address && (
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
                        <h3 className="text-sm font-bold mb-3 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary text-lg">location_on</span>
                            Delivery Information
                        </h3>
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                            <p className="font-bold text-slate-900 dark:text-white mb-1">{order.delivery_address.tag || 'Home'}</p>
                            <p>{order.delivery_address.line1}</p>
                            <p>{order.delivery_address.line2}</p>
                            <p>{order.delivery_address.city} - {order.delivery_address.pincode}</p>
                        </div>
                    </div>
                )}

                {/* Payment Summary */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
                    <h3 className="text-sm font-bold mb-3 flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-lg">receipt_long</span>
                        Payment Details
                    </h3>
                    <div className="flex flex-col gap-2 text-sm">
                        <div className="flex justify-between text-gray-600 dark:text-gray-400">
                            <span>Total Amount</span>
                            <span>₹{order.total_amount}</span>
                        </div>
                        {order.discount_amount > 0 && (
                            <div className="flex justify-between text-green-600 font-medium">
                                <span>Discount</span>
                                <span>-₹{order.discount_amount}</span>
                            </div>
                        )}
                        <div className="flex justify-between text-gray-600 dark:text-gray-400">
                            <span>Delivery Fee</span>
                            <span>{order.final_amount - (order.total_amount - order.discount_amount) > 0 ? `₹${order.final_amount - (order.total_amount - order.discount_amount)}` : 'FREE'}</span>
                        </div>
                        <div className="border-t border-dashed border-gray-200 dark:border-gray-700 pt-2 mt-1 flex justify-between font-bold text-base text-slate-900 dark:text-white">
                            <span>Paid Amount</span>
                            <span>₹{order.final_amount}</span>
                        </div>
                        <div className="mt-2 bg-gray-50 dark:bg-gray-700/50 p-2 rounded-lg text-xs text-center text-gray-500">
                            Payment Method: <span className="font-bold uppercase text-slate-700 dark:text-gray-300">{order.payment_method}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function OrderDetailPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <OrderDetailContent />
        </Suspense>
    );
}
