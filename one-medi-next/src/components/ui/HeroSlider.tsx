'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export const HeroSlider = ({ items = [] }: { items?: any[] }) => {
    const router = useRouter();
    const [activeSlide, setActiveSlide] = React.useState(0);

    // Auto-play
    React.useEffect(() => {
        if (!items?.length) return;
        const interval = setInterval(() => {
            setActiveSlide(bs => (bs + 1) % items.length);
        }, 6000);
        return () => clearInterval(interval);
    }, [items]);

    const slides = items && items.length > 0 ? items : [
        {
            id: 1,
            title: "Medicines in 2 Hours",
            subtitle: "Flat 20% OFF | Fast Delivery",
            tag: "Pharmacy",
            bg: "bg-teal-900",
            image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            link: '/medicines'
        },
        {
            id: 2,
            title: "Full Body Checkup",
            subtitle: "Includes 80+ Tests",
            tag: "Lab Tests",
            bg: "bg-blue-900",
            image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=800",
            link: '/lab-tests'
        }
    ];

    return (
        <div className="relative w-full h-[280px] lg:h-[420px] rounded-[2.5rem] overflow-hidden shadow-2xl group transition-all duration-500 hover:shadow-primary-500/20">
            <AnimatePresence mode='wait'>
                {slides.map((slide, index) => (
                    index === activeSlide && (
                        <motion.div
                            key={slide.id}
                            className="absolute inset-0 cursor-pointer"
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.8 }}
                            onClick={() => slide.link && router.push(slide.link)}
                        >
                            <img src={slide.image || slide.image_url} className="absolute inset-0 w-full h-full object-cover" alt="" />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                            <div className="absolute inset-0 p-8 lg:p-12 flex flex-col justify-center max-w-2xl">
                                <motion.div
                                    initial={{ y: 30, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.3, duration: 0.5 }}
                                >
                                    {slide.tag && (
                                        <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] lg:text-xs font-black uppercase tracking-[0.2em] text-white mb-4 border border-white/20 shadow-lg">
                                            {slide.tag}
                                        </span>
                                    )}
                                    <h2 className="text-3xl lg:text-6xl font-black text-white leading-tight mb-3 font-lexend drop-shadow-lg">
                                        {slide.title}
                                    </h2>
                                    <p className="text-white/90 font-medium text-sm lg:text-lg mb-8 max-w-md leading-relaxed drop-shadow-md">
                                        {slide.subtitle}
                                    </p>
                                    <button className="bg-white text-primary-900 px-8 py-3.5 rounded-2xl text-xs lg:text-sm font-black uppercase tracking-widest hover:bg-primary-50 hover:scale-105 transition-all flex items-center gap-2 w-fit shadow-xl group/btn">
                                        Explore Now
                                        <span className="material-symbols-outlined text-sm group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
                                    </button>
                                </motion.div>
                            </div>
                        </motion.div>
                    )
                ))}
            </AnimatePresence>

            {/* Dots */}
            <div className="absolute bottom-6 left-8 flex gap-2 z-20">
                {slides.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={(e) => { e.stopPropagation(); setActiveSlide(idx); }}
                        className={`h-2 rounded-full transition-all duration-500 ${activeSlide === idx ? 'w-10 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]' : 'w-2 bg-white/30 hover:bg-white/50'}`}
                    />
                ))}
            </div>
        </div>
    );
};
