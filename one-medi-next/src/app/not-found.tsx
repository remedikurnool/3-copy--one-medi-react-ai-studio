'use client';

import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-bg-light dark:bg-bg-dark flex flex-col items-center justify-center p-4 text-center">
            <div className="size-24 rounded-3xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-red-500 mb-6 shadow-float animate-pulse">
                <span className="material-symbols-outlined text-6xl">broken_image</span>
            </div>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Page Not Found</h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium mb-8 max-w-xs">
                The page you are looking for doesn't exist or has been moved.
            </p>
            <Link
                href="/"
                className="px-8 py-3 bg-primary text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl hover:scale-105 transition-transform"
            >
                Back Home
            </Link>
        </div>
    );
}
