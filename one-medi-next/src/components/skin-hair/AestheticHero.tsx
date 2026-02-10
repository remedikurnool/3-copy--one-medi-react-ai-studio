import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const HERO_SLIDES = [
    {
        id: 'acne',
        title: "Clear Skin, Confidence Within",
        subtitle: "Advanced acne solutions & scar treatments by expert dermatologists.",
        cta: "Treat Acne",
        image: "face_3", // Material symbol placeholder
        gradient: "from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-900",
        accent: "text-blue-500"
    },
    {
        id: 'hair',
        title: "Restore Your Hail's Glory",
        subtitle: "PRP, GFC & Transplants driven by science.",
        cta: "Stop Hair Fall",
        image: "face_6",
        gradient: "from-amber-50 to-orange-50 dark:from-slate-800 dark:to-slate-900",
        accent: "text-amber-600"
    },
    {
        id: 'glow',
        title: "Radiance Redefined",
        subtitle: "HydraFacials, Peels & Lasers for that perfect glow.",
        cta: "Get the Glow",
        image: "face_4",
        gradient: "from-rose-50 to-pink-50 dark:from-slate-800 dark:to-slate-900",
        accent: "text-rose-500"
    }
];

export default function AestheticHero() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % HERO_SLIDES.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const slide = HERO_SLIDES[current];

    return (
        <section className={`relative overflow-hidden rounded-[2.5rem] p-8 min-h-[320px] flex flex-col justify-center bg-gradient-to-br ${slide.gradient} transition-colors duration-700`}>
            {/* Abstract Background Shapes */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/40 dark:bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/60 dark:bg-white/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>

            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1 space-y-4 text-center md:text-left">
                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={slide.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.5 }}
                        >
                            <span className={`inline-block px-3 py-1 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md text-[10px] font-black uppercase tracking-widest mb-3 shadow-sm ${slide.accent}`}>
                                Medical Aesthetics
                            </span>
                            <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white leading-tight mb-2">
                                {slide.title}
                            </h2>
                            <p className="text-sm md:text-base font-medium text-slate-500 dark:text-slate-400 max-w-sm mx-auto md:mx-0 leading-relaxed">
                                {slide.subtitle}
                            </p>
                        </motion.div>
                    </AnimatePresence>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="mt-4 px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black uppercase tracking-wider text-xs shadow-lg shadow-slate-900/10 hover:shadow-xl transition-all"
                    >
                        {slide.cta}
                    </motion.button>
                </div>

                {/* Visual Placeholder */}
                <div className="w-full md:w-1/3 flex justify-center">
                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={slide.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.5 }}
                            className="relative"
                        >
                            <div className="relative z-10 size-48 rounded-full bg-white dark:bg-slate-800 shadow-2xl flex items-center justify-center border-4 border-white/50 dark:border-slate-700 overflow-hidden">
                                <span className={`material-symbols-outlined text-9xl opacity-80 ${slide.accent}`}>
                                    {slide.image}
                                </span>
                            </div>
                            {/* Decorative Rings */}
                            <div className="absolute inset-0 rounded-full border border-slate-900/5 dark:border-white/5 scale-110"></div>
                            <div className="absolute inset-0 rounded-full border border-slate-900/5 dark:border-white/5 scale-125"></div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Progress Indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                {HERO_SLIDES.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrent(idx)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${current === idx ? 'w-6 bg-slate-900 dark:bg-white' : 'w-1.5 bg-slate-300 dark:bg-slate-700'}`}
                    />
                ))}
            </div>
        </section>
    );
}
