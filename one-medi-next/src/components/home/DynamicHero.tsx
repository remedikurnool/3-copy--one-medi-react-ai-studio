'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

interface HeroItem {
    id: number | string;
    title: string;
    subtitle: string;
    tag?: string;
    image: string;
    link: string;
    bgClass?: string;
}

interface DynamicHeroProps {
    items?: HeroItem[];
}

const DEFAULT_ITEMS: HeroItem[] = [
    {
        id: 1,
        title: "Medicines in 2 Hours",
        subtitle: "Flat 20% OFF on First Order | Superfast Delivery",
        tag: "Pharmacy",
        image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&q=80&w=1200",
        link: '/medicines',
        bgClass: "bg-emerald-900"
    },
    {
        id: 2,
        title: "Full Body Checkup",
        subtitle: "Includes 80+ Tests | Home Sample Collection",
        tag: "Lab Tests",
        image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=1200",
        link: '/lab-tests',
        bgClass: "bg-blue-900"
    },
    {
        id: 3,
        title: "Expert Doctors",
        subtitle: "Consult Top Specialists Online or In-Clinic",
        tag: "Consultation",
        image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=1200",
        link: '/doctors',
        bgClass: "bg-indigo-900"
    }
];

export default function DynamicHero({ items = DEFAULT_ITEMS }: DynamicHeroProps) {
    const router = useRouter();
    const [currentIndex, setCurrentIndex] = React.useState(0);

    // Auto-play
    React.useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % items.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [items.length]);

    return (
        <div className="relative w-full h-[220px] md:h-[320px] lg:h-[400px] rounded-[2rem] overflow-hidden shadow-xl shadow-slate-200 dark:shadow-slate-900/50 group">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7 }}
                    className="absolute inset-0 cursor-pointer"
                    onClick={() => router.push(items[currentIndex].link)}
                >
                    {/* Background Image */}
                    <div className="absolute inset-0 bg-slate-900">
                        <img
                            src={items[currentIndex].image}
                            alt={items[currentIndex].title}
                            className="w-full h-full object-cover opacity-80"
                        />
                    </div>

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-black/10 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Content */}
                    <div className="absolute inset-0 p-6 md:p-10 lg:p-12 flex flex-col justify-end lg:justify-center items-start">
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="max-w-xl"
                        >
                            {items[currentIndex].tag && (
                                <span className="inline-block px-3 py-1 mb-3 text-[10px] lg:text-xs font-black tracking-widest text-white uppercase bg-white/20 backdrop-blur-md border border-white/10 rounded-full">
                                    {items[currentIndex].tag}
                                </span>
                            )}
                            <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-2 lg:mb-4 drop-shadow-lg font-lexend">
                                {items[currentIndex].title}
                            </h2>
                            <p className="text-sm md:text-lg text-slate-100 font-medium mb-6 line-clamp-2 drop-shadow-md">
                                {items[currentIndex].subtitle}
                            </p>
                            <button className="hidden lg:flex items-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-xl text-sm font-bold hover:bg-slate-50 transition-colors shadow-lg">
                                Explore Now
                                <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </button>
                        </motion.div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Dots Indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {items.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); }}
                        className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-8 bg-white' : 'w-2 bg-white/40'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}
