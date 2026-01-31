'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '../../store/userStore';
import { motion } from 'framer-motion';

const MenuLink = ({ icon, label, sub, onClick, color = "text-slate-600" }: any) => (
    <motion.button
        onClick={onClick}
        whileTap={{ scale: 0.98 }}
        className="flex items-center gap-4 w-full p-4 bg-white dark:bg-gray-800 border-b border-gray-50 dark:border-gray-800/50 last:border-0 hover:bg-slate-50 dark:hover:bg-gray-700/30 transition-all group"
    >
        <div className={`size-12 rounded-[1rem] bg-slate-50 dark:bg-gray-700/50 flex items-center justify-center ${color} group-hover:scale-110 group-hover:shadow-md transition-all duration-300`}>
            <span className="material-symbols-outlined text-2xl">{icon}</span>
        </div>
        <div className="flex-1 text-left">
            <h3 className="font-bold text-base text-slate-900 dark:text-white leading-tight">{label}</h3>
            {sub && <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">{sub}</p>}
        </div>
        <span className="material-symbols-outlined text-gray-300 group-hover:text-primary transition-colors">chevron_right</span>
    </motion.button>
);

function ProfileContent() {
    const router = useRouter();
    const { profile, isAuthenticated, logout } = useUserStore();
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login');
        }
    }, [isAuthenticated, router]);

    useEffect(() => {
        const isDarkMode = document.documentElement.classList.contains('dark');
        setIsDark(isDarkMode);
    }, []);

    const toggleDarkMode = () => {
        const newMode = !isDark;
        setIsDark(newMode);
        if (newMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    };

    const handleLogout = () => {
        if (confirm('Are you sure you want to log out?')) {
            logout();
            router.push('/login');
        }
    };

    if (!isAuthenticated) return null;

    return (
        <div className="min-h-screen bg-bg-light dark:bg-bg-dark pb-32 font-sans overflow-x-hidden">
            {/* Header Profile Card */}
            <div className="relative bg-white dark:bg-gray-800 pb-8 rounded-b-[3rem] shadow-glass border-b border-gray-100 dark:border-gray-700 overflow-hidden">
                {/* Decorative Background */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 size-64 bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 -ml-20 -mb-10 size-40 bg-blue-500/5 rounded-full blur-3xl" />

                <div className="relative z-10 p-6 pt-safe">
                    <div className="flex justify-between items-center mb-8">
                        <button onClick={() => router.back()} className="size-10 rounded-full bg-slate-50 dark:bg-gray-700/50 flex items-center justify-center hover:bg-slate-100 transition-colors">
                            <span className="material-symbols-outlined text-slate-600 dark:text-white">arrow_back</span>
                        </button>
                        <h1 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em]">My Profile</h1>
                        <button
                            onClick={() => router.push('/profile/edit')}
                            className="text-primary font-black text-[10px] bg-primary/10 px-4 py-2 rounded-xl hover:bg-primary hover:text-white transition-all hover:shadow-lg hover:shadow-primary/30 uppercase tracking-widest"
                        >
                            Edit
                        </button>
                    </div>

                    <div className="flex flex-col items-center text-center">
                        <div className="relative group mb-4">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="size-28 rounded-[2rem] bg-gray-200 border-4 border-white dark:border-gray-700 shadow-2xl bg-cover bg-center"
                                style={{ backgroundImage: `url("${profile.image}")` }}>
                            </motion.div>
                            <div className="absolute -bottom-2 -right-2 size-8 bg-emerald-500 border-4 border-white dark:border-gray-800 rounded-full flex items-center justify-center text-white shadow-lg">
                                <span className="material-symbols-outlined text-[16px] font-black">check</span>
                            </div>
                        </div>

                        <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-1">{profile.name}</h2>
                        <p className="text-slate-500 dark:text-slate-400 font-bold mb-3">+91 {profile.phone}</p>

                        <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-primary/10 to-blue-500/10 px-3 py-1.5 rounded-full border border-primary/20">
                            <span className="material-symbols-outlined text-[16px] filled text-primary">verified</span>
                            <span className="text-[10px] font-black text-primary uppercase tracking-wide">Verified Patient</span>
                        </div>
                    </div>

                    {/* Quick Stats Cards */}
                    <div className="grid grid-cols-3 gap-3 mt-8">
                        <div className="bg-blue-50 dark:bg-gray-700/30 p-4 rounded-[1.5rem] text-center border border-blue-100 dark:border-gray-600">
                            <span className="block text-xl font-black text-blue-600 dark:text-blue-400 mb-1">{profile.bloodGroup || 'O+'}</span>
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Blood Type</span>
                        </div>
                        <div className="bg-purple-50 dark:bg-gray-700/30 p-4 rounded-[1.5rem] text-center border border-purple-100 dark:border-gray-600">
                            <span className="block text-xl font-black text-purple-600 dark:text-purple-400 mb-1">{profile.height || '175'}</span>
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Height (cm)</span>
                        </div>
                        <div className="bg-orange-50 dark:bg-gray-700/30 p-4 rounded-[1.5rem] text-center border border-orange-100 dark:border-gray-600">
                            <span className="block text-xl font-black text-orange-600 dark:text-orange-400 mb-1">{profile.weight || '72'}</span>
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Weight (kg)</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-5 mt-6 flex flex-col gap-8">
                <section>
                    <h3 className="font-black text-slate-400 uppercase text-[10px] mb-4 px-2 tracking-[0.2em]">Health & Records</h3>
                    <div className="rounded-[2rem] overflow-hidden shadow-card hover:shadow-card-hover transition-shadow border border-slate-100 dark:border-slate-800 bg-white dark:bg-gray-800">
                        <MenuLink icon="shopping_bag" label="My Orders" sub="Track active orders" onClick={() => router.push('/orders')} color="text-violet-500" />
                        <MenuLink icon="calendar_month" label="Appointments" sub="Upcoming & Past" onClick={() => router.push('/bookings')} color="text-blue-500" />
                        <MenuLink icon="description" label="Prescriptions" sub="Digital Volt" onClick={() => router.push('/prescriptions')} color="text-teal-500" />
                        <MenuLink icon="monitor_heart" label="Health Trends" sub="Vitals history" onClick={() => router.push('/profile/health-records')} color="text-rose-500" />
                    </div>
                </section>

                <section>
                    <h3 className="font-black text-slate-400 uppercase text-[10px] mb-4 px-2 tracking-[0.2em]">Settings</h3>
                    <div className="rounded-[2rem] overflow-hidden shadow-card hover:shadow-card-hover transition-shadow border border-slate-100 dark:border-slate-800 bg-white dark:bg-gray-800">
                        <MenuLink icon="location_on" label="Addresses" sub="Delivery locations" onClick={() => router.push('/profile/addresses')} color="text-indigo-500" />
                        <MenuLink icon="family_restroom" label="Family Members" sub="Manage dependents" onClick={() => router.push('/profile/family')} color="text-pink-500" />
                        <MenuLink icon="account_balance_wallet" label="Payments" sub="Cards & UPI" onClick={() => router.push('/profile/payments')} color="text-emerald-500" />

                        {/* Dark Mode Toggle */}
                        <div className="flex items-center gap-4 w-full p-4 border-b border-gray-50 dark:border-gray-800/50 hover:bg-slate-50 dark:hover:bg-gray-700/30 transition-colors cursor-pointer" onClick={toggleDarkMode}>
                            <div className="size-12 rounded-[1rem] bg-slate-50 dark:bg-gray-700/50 flex items-center justify-center text-slate-600 dark:text-slate-300">
                                <span className="material-symbols-outlined text-2xl">{isDark ? 'dark_mode' : 'light_mode'}</span>
                            </div>
                            <div className="flex-1 text-left">
                                <h3 className="font-bold text-base text-slate-900 dark:text-white">App Theme</h3>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{isDark ? 'Dark Mode' : 'Light Mode'}</p>
                            </div>
                            <div className={`w-12 h-6 rounded-full p-1 transition-all duration-300 ${isDark ? 'bg-primary' : 'bg-slate-200'}`}>
                                <div className={`size-4 bg-white rounded-full shadow-md transition-transform duration-300 ${isDark ? 'translate-x-6' : 'translate-x-0'}`}></div>
                            </div>
                        </div>
                    </div>
                </section>

                <section>
                    <div className="rounded-[2rem] overflow-hidden shadow-card border border-slate-100 dark:border-slate-800 bg-white dark:bg-gray-800">
                        <MenuLink icon="headset_mic" label="Help & Support" sub="24/7 Chat" onClick={() => router.push('/chat')} color="text-primary" />
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-4 w-full p-5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors group"
                        >
                            <div className="size-12 rounded-[1rem] bg-red-50 dark:bg-red-900/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-2xl">logout</span>
                            </div>
                            <div className="text-left">
                                <h3 className="font-black text-sm uppercase tracking-widest">Log Out</h3>
                                <p className="text-[9px] font-bold opacity-60 uppercase">Sign out of device</p>
                            </div>
                        </button>
                    </div>
                </section>

                <div className="flex flex-col items-center gap-1 mt-4 mb-2">
                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">One Medi v2.4.0</p>
                    <p className="text-[9px] font-bold text-slate-300 uppercase">Crafted in Kurnool</p>
                </div>
            </div>
        </div>
    );
}

export default function ProfilePage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-bg-light dark:bg-bg-dark flex items-center justify-center">
                <span className="material-symbols-outlined text-4xl text-slate-300 animate-spin">sync</span>
            </div>
        }>
            <ProfileContent />
        </Suspense>
    );
}
