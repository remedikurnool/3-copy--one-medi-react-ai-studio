'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const PROGRAMS = [
    {
        id: 1,
        title: "Diabetes Reversal",
        subtitle: "3-Month Plan",
        bg: "bg-orange-50 dark:bg-orange-900/20",
        color: "text-orange-600",
        icon: "bloodtype",
        features: ["Personal Dietician", "Daily Monitoring", "Doctor Connect"],
        link: "/diabetes-care"
    },
    {
        id: 2,
        title: "Weight Loss",
        subtitle: "Scientific Approach",
        bg: "bg-green-50 dark:bg-green-900/20",
        color: "text-green-600",
        icon: "monitor_weight",
        features: ["Calorie Tracking", "Workout Plans", "Supplement Guide"],
        link: "/wellness"
    },
    {
        id: 3,
        title: "Pregnancy Care",
        subtitle: "Trimester Wise",
        bg: "bg-pink-50 dark:bg-pink-900/20",
        color: "text-pink-600",
        icon: "child_care",
        features: ["Growth Scans", "Nutrition for Two", "Labor Prep"],
        link: "/mother-baby"
    }
];

export default function FeaturedPrograms() {
    const router = useRouter();

    return (
        <section className="py-8 px-4 lg:px-8">
            <div className="mb-6">
                <span className="text-xs font-bold text-primary-600 uppercase tracking-widest mb-1 block">
                    Curated For You
                </span>
                <h2 className="text-xl lg:text-2xl font-black text-slate-900 dark:text-white font-lexend">
                    Health Programs
                </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {PROGRAMS.map((program, idx) => (
                    <motion.div
                        key={program.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        onClick={() => router.push(program.link)}
                        className={`
              cursor-pointer rounded-[1.5rem] p-6 border border-slate-100 dark:border-slate-800 transition-all hover:shadow-lg hover:-translate-y-1 group bg-white dark:bg-slate-900
            `}
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className={`p-3 rounded-xl ${program.bg}`}>
                                <span className={`material-symbols-outlined text-3xl ${program.color}`}>
                                    {program.icon}
                                </span>
                            </div>
                            <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded-full group-hover:bg-primary-600 group-hover:text-white transition-colors">
                                <span className="material-symbols-outlined text-lg">arrow_outward</span>
                            </div>
                        </div>

                        <h3 className="text-lg font-black text-slate-900 dark:text-white mb-1">
                            {program.title}
                        </h3>
                        <p className="text-sm font-semibold text-slate-500 mb-4">
                            {program.subtitle}
                        </p>

                        <ul className="space-y-2">
                            {program.features.map((feat, i) => (
                                <li key={i} className="flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-400">
                                    <span className="material-symbols-outlined text-[14px] text-green-500">check_circle</span>
                                    {feat}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
