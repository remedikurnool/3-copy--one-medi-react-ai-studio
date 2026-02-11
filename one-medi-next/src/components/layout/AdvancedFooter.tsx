'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AdvancedFooter() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-surface-100 dark:bg-slate-950 pt-16 pb-8 border-t border-slate-200 dark:border-slate-800 text-sm">
            <div className="max-w-7xl mx-auto px-4 lg:px-8">

                {/* Top Section */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">

                    <div className="col-span-2 lg:col-span-2 space-y-4 pr-0 lg:pr-12">
                        <h2 className="text-2xl font-black font-lexend text-slate-900 dark:text-white">ONE MEDI</h2>
                        <p className="text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm">
                            Kurnool's most trusted healthcare super-app. Medicines, Labs, Doctors, and Surgery Care - everything you need in one place.
                        </p>
                        <div className="flex items-center gap-4 mt-4">
                            {[
                                { icon: 'facebook', link: '#' },
                                { icon: 'smart_display', link: '#' }, // Youtube
                                { icon: 'photo_camera', link: '#' }, // Instagram
                            ].map((social, i) => (
                                <a key={i} href={social.link} className="size-10 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 shadow-sm hover:bg-primary-600 hover:text-white transition-colors">
                                    <span className="material-symbols-outlined">{social.icon}</span>
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="font-bold text-slate-900 dark:text-white mb-4 uppercase text-xs tracking-wider">Services</h3>
                        <ul className="space-y-3">
                            <li><Link href="/medicines" className="text-slate-600 dark:text-slate-400 hover:text-primary-600 transition-colors">Order Medicines</Link></li>
                            <li><Link href="/lab-tests" className="text-slate-600 dark:text-slate-400 hover:text-primary-600 transition-colors">Book Lab Tests</Link></li>
                            <li><Link href="/doctors" className="text-slate-600 dark:text-slate-400 hover:text-primary-600 transition-colors">Consult Doctors</Link></li>
                            <li><Link href="/surgeries" className="text-slate-600 dark:text-slate-400 hover:text-primary-600 transition-colors">Surgeries</Link></li>
                            <li><Link href="/scans" className="text-slate-600 dark:text-slate-400 hover:text-primary-600 transition-colors">MRI & CT Scans</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold text-slate-900 dark:text-white mb-4 uppercase text-xs tracking-wider">Company</h3>
                        <ul className="space-y-3">
                            <li><Link href="/about" className="text-slate-600 dark:text-slate-400 hover:text-primary-600 transition-colors">About Us</Link></li>
                            <li><Link href="/careers" className="text-slate-600 dark:text-slate-400 hover:text-primary-600 transition-colors">Careers</Link></li>
                            <li><Link href="/blog" className="text-slate-600 dark:text-slate-400 hover:text-primary-600 transition-colors">Health Blog</Link></li>
                            <li><Link href="/partners" className="text-slate-600 dark:text-slate-400 hover:text-primary-600 transition-colors">Become a Partner</Link></li>
                            <li><Link href="/contact" className="text-slate-600 dark:text-slate-400 hover:text-primary-600 transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold text-slate-900 dark:text-white mb-4 uppercase text-xs tracking-wider">Policy</h3>
                        <ul className="space-y-3">
                            <li><Link href="/privacy" className="text-slate-600 dark:text-slate-400 hover:text-primary-600 transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="text-slate-600 dark:text-slate-400 hover:text-primary-600 transition-colors">Terms of Use</Link></li>
                            <li><Link href="/refunds" className="text-slate-600 dark:text-slate-400 hover:text-primary-600 transition-colors">Refund Policy</Link></li>
                            <li><Link href="/editorial" className="text-slate-600 dark:text-slate-400 hover:text-primary-600 transition-colors">Editorial Policy</Link></li>
                        </ul>
                    </div>

                </div>

                {/* Accreditions */}
                <div className="border-t border-slate-200 dark:border-slate-800 pt-8 pb-8">
                    <p className="text-center text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Our Accreditations</p>
                    <div className="flex flex-wrap justify-center gap-8 grayscale opacity-70">
                        {/* Placeholders for ISO, NABH badges */}
                        <div className="h-10 w-24 bg-slate-300 dark:bg-slate-700 rounded blur-[1px]"></div>
                        <div className="h-10 w-24 bg-slate-300 dark:bg-slate-700 rounded blur-[1px]"></div>
                        <div className="h-10 w-24 bg-slate-300 dark:bg-slate-700 rounded blur-[1px]"></div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-slate-200 dark:border-slate-800 pt-8 text-center text-slate-500 dark:text-slate-400 text-xs">
                    <p>&copy; {currentYear} One Medi Technologies Pvt Ltd. All rights reserved.</p>
                    <p className="mt-2 text-[10px] text-slate-400">
                        Disclaimer: The information provided on this website is for informational purposes only and is not intended as a substitute for professional medical advice, diagnosis, or treatment.
                    </p>
                </div>

            </div>
        </footer>
    );
}
