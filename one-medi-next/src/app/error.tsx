'use client';

import { useEffect } from 'react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-screen bg-bg-light dark:bg-bg-dark flex flex-col items-center justify-center p-4 text-center">
            <div className="size-24 rounded-3xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-red-500 mb-6 shadow-float">
                <span className="material-symbols-outlined text-6xl">error</span>
            </div>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Something went wrong!</h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium mb-8 max-w-xs">
                We encountered an unexpected error.
            </p>
            <div className="flex gap-4">
                <button
                    onClick={() => reset()}
                    className="px-6 py-3 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-2xl font-bold text-sm uppercase tracking-wide hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                >
                    Try Again
                </button>
                <button
                    onClick={() => window.location.href = '/'}
                    className="px-6 py-3 bg-primary text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl hover:scale-105 transition-transform"
                >
                    Back Home
                </button>
            </div>
        </div>
    );
}
