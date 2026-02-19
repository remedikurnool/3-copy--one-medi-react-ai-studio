'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ALL_SERVICES } from '@/constants/services';
import { useUIStore } from '@/store/uiStore';
import { getServiceColor } from '@/lib/utils';

export default function QuickAccessGrid() {
    const router = useRouter();
    const { openServiceDrawer } = useUIStore();

    // Show top 7 services + "More" button
    const displayedServices = ALL_SERVICES.slice(0, 7);

    return (
        <div className="grid grid-cols-4 lg:grid-cols-8 gap-3 lg:gap-6">
            {displayedServices.map((service, index) => {
                const { bg, text, darkBg } = getServiceColor(service.color);
                return (
                    <motion.button
                        key={service.id}
                        whileHover={{ y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => router.push(service.route)}
                        className="flex flex-col items-center gap-2 group"
                    >
                        <div className={`size-14 lg:size-16 rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 dark:border-slate-800 ${bg} ${text} ${darkBg} group-hover:shadow-md transition-all`}>
                            <span className={`material-symbols-outlined text-2xl lg:text-3xl group-hover:scale-110 transition-transform`}>
                                {service.icon}
                            </span>
                        </div>
                        <span className="text-[10px] lg:text-xs font-bold text-slate-700 dark:text-slate-300 text-center leading-tight line-clamp-1">
                            {service.label}
                        </span>
                    </motion.button>
                );
            })}

            {/* More Button */}
            <motion.button
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/services')}
                className="flex flex-col items-center gap-2 group"
            >
                <div className="size-14 lg:size-16 rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 group-hover:shadow-md transition-all">
                    <span className="material-symbols-outlined text-2xl lg:text-3xl text-slate-500 group-hover:scale-110 transition-transform">
                        grid_view
                    </span>
                </div>
                <span className="text-[10px] lg:text-xs font-bold text-slate-700 dark:text-slate-300 text-center leading-tight">
                    More
                </span>
            </motion.button>
        </div>
    );
}
