'use client';

import React from 'react';
import { motion } from 'framer-motion';

const TESTIMONIALS = [
    {
        id: 1,
        name: "Suresh K.",
        location: "Kurnool",
        rating: 5,
        text: "Ordered medicines at 10 AM and got them by 12 PM. Super fast delivery and genuine products. Highly recommend One Medi for all pharmacy needs.",
        image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100"
    },
    {
        id: 2,
        name: "Lakshmi P.",
        location: "Nandyal",
        rating: 5,
        text: "The home sample collection for lab tests was very professional. The phlebotomist was on time and very hygienic. Reports were delivered on WhatsApp too.",
        image: "https://images.unsplash.com/photo-1554151228-14d9def656ec?auto=format&fit=crop&q=80&w=100"
    },
    {
        id: 3,
        name: "Rajesh M.",
        location: "Adoni",
        rating: 4,
        text: "Great app for booking doctor appointments. I consulted a Dermatologist online and the video quality was good. Prescription was instantly available.",
        image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80&w=100"
    }
];

export default function TestimonialsTrust() {
    return (
        <section className="py-12 px-4 lg:px-8 bg-slate-50 dark:bg-slate-900/50 rounded-[3rem] my-8 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                <div className="absolute top-0 left-0 size-64 bg-primary-500 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-0 right-0 size-64 bg-indigo-500 rounded-full blur-[100px]"></div>
            </div>

            <div className="text-center md:flex md:items-end md:justify-between md:text-left mb-10 relative z-10">
                <div>
                    <span className="text-xs font-bold text-primary-600 uppercase tracking-widest mb-2 block">
                        What Patients Say
                    </span>
                    <h2 className="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white font-lexend">
                        Trusted by 50,000+ <br className="hidden md:block" /> Families in Kurnool
                    </h2>
                </div>
                <div className="hidden md:flex items-center gap-2">
                    <div className="flex -space-x-3">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="size-10 rounded-full border-2 border-white dark:border-slate-800 bg-slate-200 dark:bg-slate-700"></div>
                        ))}
                    </div>
                    <div className="text-left ml-2">
                        <div className="flex text-yellow-500 text-sm">
                            {'★'.repeat(5)}
                        </div>
                        <p className="text-xs font-bold text-slate-500">4.8/5 Average Rating</p>
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 relative z-10">
                {TESTIMONIALS.map((item, idx) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        viewport={{ once: true }}
                        className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <img src={item.image} alt={item.name} className="size-10 rounded-full object-cover bg-slate-100" />
                            <div>
                                <p className="text-sm font-bold text-slate-900 dark:text-white">{item.name}</p>
                                <p className="text-xs text-slate-500">{item.location}</p>
                            </div>
                            <div className="ml-auto flex text-yellow-400 text-xs">
                                {'★'.repeat(item.rating)}
                            </div>
                        </div>
                        <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed italic">
                            "{item.text}"
                        </p>
                    </motion.div>
                ))}
            </div>

            <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-wrap justify-center items-center gap-8 lg:gap-16 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                {/* Partner Logos Placeholders */}
                <div className="h-8 w-24 bg-slate-300/50 dark:bg-slate-700/50 rounded mask-image-logo"></div>
                <div className="h-10 w-28 bg-slate-300/50 dark:bg-slate-700/50 rounded mask-image-logo"></div>
                <div className="h-8 w-24 bg-slate-300/50 dark:bg-slate-700/50 rounded mask-image-logo"></div>
                <div className="h-12 w-32 bg-slate-300/50 dark:bg-slate-700/50 rounded mask-image-logo"></div>
            </div>
        </section>
    );
}
