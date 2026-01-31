'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/userStore';

export default function ProfileEdit() {
    const router = useRouter();
    const { profile, updateProfile } = useUserStore();
    const [formData, setFormData] = useState(profile);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            updateProfile(formData);
            setIsLoading(false);
            router.back();
        }, 800);
    };

    return (
        <div className="min-h-screen bg-bg-light dark:bg-bg-dark pb-32 font-sans text-slate-900 dark:text-white flex flex-col">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800 px-4 py-3 flex items-center justify-between">
                <button
                    onClick={() => router.back()}
                    className="flex size-10 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                    <span className="material-symbols-outlined text-[24px]">arrow_back</span>
                </button>
                <h1 className="text-lg font-bold">Edit Profile</h1>
                <div className="w-10"></div>
            </header>

            <main className="flex-1 p-4 flex flex-col gap-6">
                {/* Avatar Section */}
                <div className="flex flex-col items-center gap-3 py-4">
                    <div className="relative group cursor-pointer">
                        <div
                            className="size-28 rounded-full bg-cover bg-center border-4 border-white dark:border-gray-800 shadow-md"
                            style={{ backgroundImage: `url("${formData.image}")` }}
                        ></div>
                        <div className="absolute inset-0 bg-black/30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="material-symbols-outlined text-white text-3xl">camera_alt</span>
                        </div>
                        <div className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full border-2 border-white dark:border-gray-800 shadow-sm">
                            <span className="material-symbols-outlined text-[18px]">edit</span>
                        </div>
                    </div>
                    <p className="text-sm font-bold text-primary">Change Photo</p>
                </div>

                {/* Personal Details */}
                <section className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col gap-4">
                    <h2 className="text-base font-bold flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">person</span>
                        Personal Details
                    </h2>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Full Name</label>
                        <input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full h-12 px-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-base focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-gray-400"
                            placeholder="Enter your name"
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Mobile Number</label>
                        <div className="relative">
                            <input
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full h-12 px-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-base focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-gray-400"
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500 material-symbols-outlined text-[20px]">check_circle</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Email Address</label>
                        <input
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full h-12 px-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-base focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-gray-400"
                            placeholder="email@example.com"
                        />
                    </div>
                </section>

                {/* Health Profile */}
                <section className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col gap-4">
                    <h2 className="text-base font-bold flex items-center gap-2">
                        <span className="material-symbols-outlined text-red-500">monitor_heart</span>
                        Health Profile
                    </h2>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Gender</label>
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className="w-full h-12 px-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-base focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all appearance-none"
                            >
                                <option>Male</option>
                                <option>Female</option>
                                <option>Other</option>
                            </select>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Blood Group</label>
                            <select
                                name="bloodGroup"
                                value={formData.bloodGroup}
                                onChange={handleChange}
                                className="w-full h-12 px-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-base focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all appearance-none"
                            >
                                {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(bg => (
                                    <option key={bg} value={bg}>{bg}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Date of Birth</label>
                        <input
                            name="dob"
                            type="date"
                            value={formData.dob}
                            onChange={handleChange}
                            className="w-full h-12 px-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-base focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-gray-400"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Height (cm)</label>
                            <input
                                name="height"
                                type="number"
                                value={formData.height}
                                onChange={handleChange}
                                className="w-full h-12 px-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-base focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-gray-400"
                                placeholder="175"
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Weight (kg)</label>
                            <input
                                name="weight"
                                type="number"
                                value={formData.weight}
                                onChange={handleChange}
                                className="w-full h-12 px-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-base focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-gray-400"
                                placeholder="70"
                            />
                        </div>
                    </div>
                </section>
            </main>

            {/* Sticky Footer */}
            <footer className="fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                <div className="max-w-md mx-auto">
                    <button
                        onClick={handleSave}
                        disabled={isLoading}
                        className="w-full h-12 rounded-xl bg-primary text-white font-bold text-lg shadow-lg shadow-primary/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:scale-100"
                    >
                        {isLoading ? (
                            <span className="material-symbols-outlined animate-spin text-xl">progress_activity</span>
                        ) : (
                            'Save Changes'
                        )}
                    </button>
                </div>
            </footer>
        </div>
    );
}
