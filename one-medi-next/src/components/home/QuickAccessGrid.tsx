'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const SERVICES = [
    { id: 'medicines', label: 'Medicines', icon: 'medication', color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-900/20', link: '/medicines' },
    { id: 'labtest', label: 'Lab Tests', icon: 'biotech', color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20', link: '/lab-tests' },
    { id: 'doctors', label: 'Doctors', icon: 'stethoscope', color: 'text-indigo-500', bg: 'bg-indigo-50 dark:bg-indigo-900/20', link: '/doctors' },
    { id: 'scans', label: 'Scans', icon: 'radiology', color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/20', link: '/scans' },
    { id: 'surgeries', label: 'Surgeries', icon: 'medical_services', color: 'text-rose-500', bg: 'bg-rose-50 dark:bg-rose-900/20', link: '/surgeries' },
    { id: 'insurance', label: 'Insurance', icon: 'security', color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-900/20', link: '/insurance' },
    { id: 'wellness', label: 'Wellness', icon: 'self_improvement', color: 'text-teal-500', bg: 'bg-teal-50 dark:bg-teal-900/20', link: '/wellness' },
    { id: 'ambulance', label: 'Emergency', icon: 'ambulance', color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-900/20', link: '/ambulance' },
];

export default function QuickAccessGrid() {
    const router = useRouter();

    return (
        <div className="grid grid-cols-4 lg:grid-cols-8 gap-3 lg:gap-6">
            {SERVICES.map((item, index) => (
                <motion.button
                    key={item.id}
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => router.push(item.link)}
                    className="flex flex-col items-center gap-2 group"
                >
                    <div className={`size-14 lg:size-16 rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 dark:border-slate-800 transition-colors ${item.bg} group-hover:shadow-md`}>
                        <span className={`material-symbols-outlined text-2xl lg:text-3xl ${item.color}`}>
                            {item.icon}
                        </span>
                    </div>
                    <span className="text-[10px] lg:text-xs font-bold text-slate-700 dark:text-slate-300 text-center leading-tight">
                        {item.label}
                    </span>
                </motion.button>
            ))}
        </div>
    );
}
