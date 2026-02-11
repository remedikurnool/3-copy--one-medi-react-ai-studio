'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function TopOfferStrip() {
    return (
        <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            className="hidden lg:flex bg-gradient-to-r from-slate-900 via-primary-900 to-slate-900 text-white text-xs font-medium py-2 px-4 justify-center items-center gap-6 relative overflow-hidden"
        >
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay"></div>

            <div className="flex items-center gap-2 z-10">
                <span className="bg-yellow-400 text-slate-900 text-[10px] font-bold px-1.5 py-0.5 rounded animate-pulse">NEW</span>
                <span>Free Delivery on orders above ₹499</span>
            </div>

            <div className="w-1 h-1 bg-white/20 rounded-full z-10"></div>

            <div className="flex items-center gap-2 z-10">
                <span className="material-symbols-outlined text-[14px] text-primary-400">verified_user</span>
                <span>Trusted by 10 Lakh+ Patients</span>
            </div>

            <div className="w-1 h-1 bg-white/20 rounded-full z-10"></div>

            <div className="flex items-center gap-2 z-10">
                <span className="material-symbols-outlined text-[14px] text-green-400">call</span>
                <span>Emergency: <span className="font-bold underline cursor-pointer hover:text-green-300 transition-colors">1800-123-4567</span></span>
            </div>
        </motion.div>
    );
}
