'use client';

import React, { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

interface CarouselItem {
    id: string | number;
    title: string;
    subtitle?: string;
    image: string;
    price?: number | string;
    discount?: string;
    tag?: string;
    link?: string;
}

interface CategoryCarouselProps {
    title: string;
    subtitle?: string;
    items: CarouselItem[];
    type?: 'medicine' | 'lab' | 'doctor' | 'standard';
    onSeeAll?: () => void;
}

export default function CategoryCarousel({
    title,
    subtitle,
    items = [],
    type = 'standard',
    onSeeAll
}: CategoryCarouselProps) {
    const router = useRouter();
    const scrollRef = useRef<HTMLDivElement>(null);

    return (
        <div className="py-4">
            {/* Header */}
            <div className="flex items-end justify-between px-4 lg:px-8 mb-6">
                <div>
                    {subtitle && (
                        <span className="text-xs font-bold text-primary-600 uppercase tracking-widest mb-1 block">
                            {subtitle}
                        </span>
                    )}
                    <h2 className="text-xl lg:text-2xl font-black text-slate-900 dark:text-white font-lexend leading-none">
                        {title}
                    </h2>
                </div>
                {onSeeAll && (
                    <button
                        onClick={onSeeAll}
                        className="text-primary-600 hover:text-primary-700 text-sm font-bold flex items-center gap-1 transition-transform active:scale-95"
                    >
                        See All <span className="material-symbols-outlined text-lg">arrow_forward</span>
                    </button>
                )}
            </div>

            {/* Carousel */}
            <div
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto no-scrollbar px-4 lg:px-8 pb-4 snap-x snap-mandatory scroll-pl-4 lg:scroll-pl-8"
            >
                {items.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => item.link && router.push(item.link)}
                        className={`
              relative shrink-0 snap-start cursor-pointer group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-lg transition-all duration-300
              ${type === 'doctor' ? 'w-[200px]' : 'w-[160px] lg:w-[180px]'}
            `}
                    >
                        {/* Image Area */}
                        <div className={`relative overflow-hidden ${type === 'doctor' ? 'h-[200px]' : 'h-[160px]'} bg-slate-100 dark:bg-slate-900`}>
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />

                            {item.discount && (
                                <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-sm">
                                    {item.discount}
                                </div>
                            )}

                            {item.tag && (
                                <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-md">
                                    {item.tag}
                                </div>
                            )}
                        </div>

                        {/* Content Area */}
                        <div className="p-3">
                            <h3 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-2 leading-tight mb-1 group-hover:text-primary-600 transition-colors">
                                {item.title}
                            </h3>

                            {item.subtitle && (
                                <p className="text-xs text-slate-500 line-clamp-1 mb-2">
                                    {item.subtitle}
                                </p>
                            )}

                            <div className="flex items-center justify-between mt-2">
                                {item.price && (
                                    <span className="text-sm font-black text-slate-900 dark:text-white">
                                        ₹{item.price}
                                    </span>
                                )}
                                <button className="size-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-colors shadow-sm">
                                    <span className="material-symbols-outlined text-lg">add</span>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
