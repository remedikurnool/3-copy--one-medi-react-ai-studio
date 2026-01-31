'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

// Mock Data for Past Prescriptions
const PAST_PRESCRIPTIONS = [
    { id: 1, date: '12 Oct 2023', doctor: 'Dr. Ramesh Gupta', type: 'Medicine', url: '#' },
    { id: 2, date: '25 Sep 2023', doctor: 'Dr. Priya Sharma', type: 'Lab Test', url: '#' },
];

export default function PrescriptionsPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-bg-light dark:bg-bg-dark text-slate-900 dark:text-white pb-32 font-sans">
            <header className="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-b border-slate-100 dark:border-gray-800 p-4 flex items-center gap-3">
                <button
                    onClick={() => router.back()}
                    className="size-10 flex items-center justify-center rounded-full bg-slate-50 dark:bg-gray-800 hover:bg-slate-100 transition-colors"
                >
                    <span className="material-symbols-outlined text-slate-700 dark:text-slate-300">arrow_back</span>
                </button>
                <h1 className="text-xl font-black uppercase tracking-tight">Prescriptions</h1>
            </header>

            <main className="p-5 flex flex-col gap-8 max-w-lg mx-auto w-full">
                {/* Upload Action */}
                <motion.button
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => router.push('/upload-rx')}
                    className="w-full py-8 rounded-[2rem] border-2 border-dashed border-primary/30 bg-blue-50/50 dark:bg-blue-900/10 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-primary flex flex-col items-center justify-center gap-3 transition-all group shadow-sm hover:shadow-md"
                >
                    <div className="size-16 rounded-2xl bg-white dark:bg-gray-800 flex items-center justify-center shadow-lg text-primary group-hover:scale-110 transition-transform duration-300">
                        <span className="material-symbols-outlined text-3xl">add_a_photo</span>
                    </div>
                    <div className="text-center">
                        <span className="font-black text-sm uppercase tracking-widest block">Upload New Prescription</span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mt-1">Camera or Gallery</span>
                    </div>
                </motion.button>

                {/* List */}
                <section>
                    <h2 className="font-black text-slate-400 uppercase text-[10px] mb-4 px-2 tracking-[0.2em]">Digital Vault</h2>
                    <div className="flex flex-col gap-3">
                        {PAST_PRESCRIPTIONS.map((p, i) => (
                            <motion.div
                                key={p.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white dark:bg-gray-800 p-4 rounded-[1.5rem] shadow-sm hover:shadow-card-hover border border-slate-100 dark:border-slate-800 flex items-center gap-4 transition-all group cursor-pointer"
                            >
                                <div className="size-16 rounded-2xl bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center shrink-0 group-hover:bg-purple-100 dark:group-hover:bg-purple-900/30 transition-colors">
                                    <span className="material-symbols-outlined text-2xl text-purple-500">description</span>
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-black text-sm leading-tight text-slate-900 dark:text-white">{p.doctor}</h3>
                                    <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-wide">{p.type} • {p.date}</p>
                                </div>
                                <button className="size-10 rounded-full bg-slate-50 dark:bg-slate-700/50 flex items-center justify-center text-slate-400 hover:text-primary hover:bg-primary/10 transition-all">
                                    <span className="material-symbols-outlined">visibility</span>
                                </button>
                            </motion.div>
                        ))}
                        {PAST_PRESCRIPTIONS.length === 0 && (
                            <div className="text-center py-10 opacity-50">
                                <span className="material-symbols-outlined text-5xl mb-2 text-slate-300">folder_open</span>
                                <p className="font-bold text-sm">Vault is empty</p>
                            </div>
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
}
