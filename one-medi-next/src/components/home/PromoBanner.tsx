'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function PromoBanner() {
    const router = useRouter();

    return (
        <div className="px-4 lg:px-8 py-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative w-full rounded-[2rem] overflow-hidden bg-gradient-to-r from-indigo-600 to-violet-600 shadow-xl shadow-indigo-500/20"
            >
                {/* Decorative Background */}
                <div className="absolute inset-0 opacity-20">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
                    </svg>
                </div>

                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-8 gap-6">
                    <div className="text-center md:text-left max-w-lg">
                        <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-black text-white uppercase tracking-widest mb-3 border border-white/20">
                            Limited Time Offer
                        </span>
                        <h3 className="text-2xl md:text-4xl font-black text-white mb-2 font-lexend leading-tight">
                            Get 15% Additional Cashback
                        </h3>
                        <p className="text-indigo-100 font-medium text-sm md:text-base mb-6">
                            On all medicine orders above ₹999. Use code <span className="font-bold text-white bg-white/20 px-1 rounded">HEALTH15</span>
                        </p>
                        <button
                            onClick={() => router.push('/medicines')}
                            className="bg-white text-indigo-700 px-8 py-3 rounded-xl font-bold hover:bg-indigo-50 transition-colors shadow-lg active:scale-95"
                        >
                            Order Now
                        </button>
                    </div>

                    <div className="hidden md:block">
                        {/* Illustration or Image placeholder */}
                        <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 rotate-3 hover:rotate-0 transition-transform duration-500">
                            <span className="text-6xl">💊</span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
