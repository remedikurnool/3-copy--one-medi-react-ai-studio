'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/cartStore';
import { useLocationStore } from '@/store/locationStore';

interface PageHeaderProps {
    title: string;
    subtitle?: string;
    backUrl?: string; // If not provided, router.back() is used
    showLocation?: boolean;
    showCart?: boolean;
    showSearch?: boolean;
    searchPlaceholder?: string;
    searchValue?: string;
    onSearchChange?: (value: string) => void;
    onLocationClick?: () => void;
    className?: string; // For adding specific styles like sticky behavior if needed locally
    actions?: React.ReactNode;
    customBackAction?: () => void;
}

export default function PageHeader({
    title,
    subtitle,
    backUrl,
    showLocation = true,
    showCart = true,
    showSearch = false,
    searchPlaceholder = 'Search...',
    searchValue = '',
    onSearchChange,
    onLocationClick,
    className = '',
    actions,
    customBackAction,
}: PageHeaderProps) {
    const router = useRouter();
    const cartItemsCount = useCartStore((state) => state.items.length);
    const { city } = useLocationStore();

    const handleBack = () => {
        if (customBackAction) {
            customBackAction();
        } else if (backUrl) {
            router.push(backUrl);
        } else {
            router.back();
        }
    };

    return (
        <header className={`sticky top-0 z-40 bg-surface-50/95 dark:bg-surface-950/95 backdrop-blur-md border-b border-surface-200 dark:border-surface-800 transition-all ${className}`}>
            {/* Top Bar: Back + Title + Actions */}
            <div className="flex items-center justify-between p-4 pb-2">
                <div className="flex items-center gap-3">
                    <button
                        onClick={handleBack}
                        className="flex size-10 shrink-0 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-200 transition-all active:scale-95"
                        aria-label="Go Back"
                    >
                        <span className="material-symbols-outlined text-2xl">arrow_back</span>
                    </button>

                    <div className="flex flex-col">
                        <h1 className="text-lg font-black uppercase tracking-tight text-slate-900 dark:text-white leading-none">
                            {title}
                        </h1>
                        {subtitle && (
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">
                                {subtitle}
                            </p>
                        )}
                        {showLocation && !subtitle && (
                            <button
                                onClick={onLocationClick}
                                className="flex items-center gap-1 text-[11px] font-bold text-slate-500 hover:text-primary transition-colors cursor-pointer mt-0.5"
                            >
                                <span className="material-symbols-outlined text-[14px] filled">location_on</span>
                                <span>{city || 'Kurnool'}</span>
                                <span className="material-symbols-outlined text-[14px]">expand_more</span>
                            </button>
                        )}
                    </div>
                </div>

                {/* Custom Actions */}
                {actions && (
                    <div className="flex items-center gap-2">
                        {actions}
                    </div>
                )}

                {showCart && (
                    <button
                        onClick={() => router.push('/cart')}
                        className="relative p-2.5 bg-slate-50 dark:bg-slate-800 rounded-2xl transition-all active:scale-95 shadow-sm border border-slate-100 dark:border-slate-700 hover:bg-slate-100"
                        aria-label="Cart"
                    >
                        <span className="material-symbols-outlined text-2xl text-slate-700 dark:text-white">shopping_cart</span>
                        {cartItemsCount > 0 && (
                            <span className="absolute -top-1 -right-1 flex items-center justify-center size-5 bg-red-500 rounded-full text-[10px] text-white font-black border-2 border-white dark:border-gray-900 shadow-md animate-bounce">
                                {cartItemsCount}
                            </span>
                        )}
                    </button>
                )}
            </div>

            {/* Optional Search Bar */}
            {showSearch && (
                <div className="px-4 pb-4">
                    <div className="relative group">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400 group-focus-within:text-primary transition-colors">
                            search
                        </span>
                        <input
                            value={searchValue}
                            onChange={(e) => onSearchChange?.(e.target.value)}
                            className="w-full h-12 pl-12 pr-4 rounded-xl border-none bg-surface-200 dark:bg-surface-800 group-focus-within:ring-2 group-focus-within:ring-primary/50 transition-all font-semibold text-sm outline-none text-slate-900 dark:text-white placeholder:text-gray-400"
                            placeholder={searchPlaceholder}
                        />
                    </div>
                </div>
            )}
        </header>
    );
}
