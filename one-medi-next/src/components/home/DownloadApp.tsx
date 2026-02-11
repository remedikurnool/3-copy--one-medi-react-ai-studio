'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function DownloadApp() {
    return (
        <section className="px-4 lg:px-8 py-8">
            <div className="bg-slate-900 rounded-[2.5rem] overflow-hidden relative text-white p-8 lg:p-12 flex flex-col lg:flex-row items-center gap-12">
                {/* Background Patterns */}
                <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
                    <div className="absolute -top-20 -right-20 size-96 bg-primary-500 rounded-full blur-[120px]"></div>
                    <div className="absolute -bottom-20 -left-20 size-96 bg-teal-500 rounded-full blur-[120px]"></div>
                </div>

                {/* Text Content */}
                <div className="flex-1 space-y-6 relative z-10 text-center lg:text-left">
                    <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur rounded-full text-xs font-bold uppercase tracking-widest text-primary-300 border border-primary-500/30">
                        Download The App
                    </span>
                    <h2 className="text-3xl lg:text-5xl font-black font-lexend leading-tight">
                        Healthcare in Your Pocket. <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-teal-400">
                            Anytime. Anywhere.
                        </span>
                    </h2>
                    <p className="text-slate-400 text-lg max-w-lg mx-auto lg:mx-0">
                        Get exclusive offers, track orders in real-time, and consult doctors instantly with the One Medi app.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                        <button className="flex items-center gap-3 bg-white text-slate-900 px-5 py-3 rounded-xl hover:bg-slate-100 transition-colors shadow-lg active:scale-95">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" className="h-8" />
                        </button>
                        <button className="flex items-center gap-3 bg-white text-slate-900 px-5 py-3 rounded-xl hover:bg-slate-100 transition-colors shadow-lg active:scale-95">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Play Store" className="h-8" />
                        </button>
                    </div>

                    <div className="flex items-center justify-center lg:justify-start gap-6 pt-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
                        <span>● 5M+ Downloads</span>
                        <span>● 4.8 Store Rating</span>
                    </div>
                </div>

                {/* Visual / QR */}
                <div className="relative z-10 shrink-0">
                    <div className="bg-white p-4 rounded-3xl shadow-xl rotate-3 hover:rotate-0 transition-transform duration-500 border-4 border-slate-800">
                        <img
                            src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://onemedi.in/app"
                            alt="Scan to Download"
                            className="size-40 lg:size-48"
                        />
                        <p className="text-center text-slate-900 font-bold mt-3 uppercase text-xs tracking-wider">Scan to Install</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
