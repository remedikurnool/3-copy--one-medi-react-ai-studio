import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StageId } from './StageSelector';
import { useRouter } from 'next/navigation';

interface DynamicHeroProps {
    stage: StageId;
}

const HERO_CONTENT: Record<StageId, {
    title: string;
    subtitle: string;
    cta: string;
    imageGradient: string;
    icon: string;
    pattern: string;
}> = {
    preg: {
        title: "Your pregnancy, cared for week by week",
        subtitle: "Track growth, book scans, and consult experts.",
        cta: "Book Scan",
        imageGradient: "from-rose-100 to-orange-100 dark:from-rose-900/40 dark:to-orange-900/40",
        icon: "monitor_heart",
        pattern: "radial-gradient(circle at 10% 20%, rgba(255, 255, 255, 0.4) 0%, transparent 20%)"
    },
    newborn: {
        title: "From first cry to first steps",
        subtitle: "Vaccinations, lactation support, and newborn care.",
        cta: "Talk to Pediatrician",
        imageGradient: "from-teal-100 to-emerald-100 dark:from-teal-900/40 dark:to-emerald-900/40",
        icon: "baby_changing_station",
        pattern: "radial-gradient(circle at 90% 80%, rgba(255, 255, 255, 0.4) 0%, transparent 20%)"
    },
    toddler: {
        title: "Fueling their curiosity & growth",
        subtitle: "Nutrition plans, milestones, and early checks.",
        cta: "View Diet Chart",
        imageGradient: "from-orange-100 to-amber-100 dark:from-orange-900/40 dark:to-amber-900/40",
        icon: "toys",
        pattern: "radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.4) 0%, transparent 20%)"
    },
    working: {
        title: "Balancing work & motherhood",
        subtitle: "Stress management, childcare, and flexibility.",
        cta: "Mental Wellness",
        imageGradient: "from-indigo-100 to-violet-100 dark:from-indigo-900/40 dark:to-violet-900/40",
        icon: "self_improvement",
        pattern: "radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.4) 0%, transparent 20%)"
    }
};

export default function DynamicHero({ stage }: DynamicHeroProps) {
    const router = useRouter();
    const content = HERO_CONTENT[stage];

    return (
        <section className="relative overflow-hidden rounded-[2.5rem] shadow-sm mb-6">
            <AnimatePresence mode='wait'>
                <motion.div
                    key={stage}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className={`relative p-8 min-h-[280px] flex flex-col justify-center bg-gradient-to-br ${content.imageGradient}`}
                >
                    {/* Background Pattern */}
                    <div
                        className="absolute inset-0 opacity-50"
                        style={{ backgroundImage: content.pattern }}
                    />

                    {/* Floating Icons Background */}
                    <motion.div
                        animate={{ y: [0, -10, 0], opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute right-8 top-8 text-black/5 dark:text-white/10"
                    >
                        <span className="material-symbols-outlined text-[120px]">{content.icon}</span>
                    </motion.div>

                    <div className="relative z-10 max-w-lg">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            <span className="inline-block px-3 py-1 rounded-full bg-white/60 dark:bg-black/20 backdrop-blur-md border border-white/20 text-[10px] font-black uppercase tracking-widest mb-3 text-slate-800 dark:text-white/90 shadow-sm">
                                {stage === 'preg' ? 'Trimester 2 • Week 24' : stage === 'newborn' ? 'Month 2 • Growth Spurt' : 'Care Guide'}
                            </span>
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white leading-[1.1] mb-3"
                        >
                            {content.title}
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-sm font-medium text-slate-700 dark:text-slate-200 mb-6 max-w-xs leading-relaxed"
                        >
                            {content.subtitle}
                        </motion.p>

                        <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => router.push('/home-care')} // Placeholder link
                            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xl shadow-slate-900/10 active:shadow-none transition-all Group"
                        >
                            <span className="text-xs font-black uppercase tracking-widest">{content.cta}</span>
                            <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
                        </motion.button>
                    </div>
                </motion.div>
            </AnimatePresence>
        </section>
    );
}
