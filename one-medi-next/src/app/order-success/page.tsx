'use client';

import React, { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function OrderSuccessContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const orderId = searchParams.get('orderId');

    // Format order ID for display (show short version if UUID)
    const displayOrderId = orderId
        ? orderId.includes('-')
            ? `#OM-${orderId.slice(0, 8).toUpperCase()}`  // Short UUID format
            : `#${orderId}`
        : '#OM-PENDING';

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col items-center justify-center p-6 text-center">
            <div className="size-24 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-6 animate-in zoom-in duration-500">
                <span className="material-symbols-outlined text-5xl text-green-600 dark:text-green-400">check_circle</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Order Placed Successfully!</h1>
            <p className="text-gray-500 dark:text-gray-400 mb-2 max-w-xs mx-auto">
                Your order {displayOrderId} has been confirmed and will be delivered shortly.
            </p>

            {orderId && (
                <p className="text-xs text-gray-400 dark:text-gray-500 mb-8 font-mono">
                    Reference: {orderId}
                </p>
            )}

            <div className="w-full max-w-xs flex flex-col gap-3">
                <button
                    onClick={() => router.push(`/orders/${orderId}`)}
                    className="w-full h-12 bg-primary hover:bg-primary-dark text-white rounded-xl font-bold shadow-lg shadow-primary/30 transition-all active:scale-95"
                >
                    Track Order
                </button>
                <button
                    onClick={() => router.push('/')}
                    className="w-full h-12 bg-gray-100 dark:bg-gray-800 text-slate-900 dark:text-white rounded-xl font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
                >
                    Back to Home
                </button>
            </div>
        </div>
    );
}

export default function OrderSuccessPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <OrderSuccessContent />
        </Suspense>
    );
}
