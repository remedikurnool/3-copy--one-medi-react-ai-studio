'use client';

import React from 'react';
import { useRouter, useParams } from 'next/navigation';
import { SURGERY_PACKAGES } from '@/constants';

export default function SurgeryDetailPage() {
    const router = useRouter();
    const params = useParams();
    const surgery = SURGERY_PACKAGES.find(s => s.id === params.id);

    if (!surgery) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <span className="material-symbols-outlined text-6xl text-gray-300 mb-4">search_off</span>
                    <p className="text-xl font-bold text-gray-600">Surgery Package Not Found</p>
                    <button onClick={() => router.back()} className="mt-4 px-4 py-2 bg-primary text-white rounded-xl font-bold">
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-bg-light dark:bg-bg-dark font-sans text-slate-900 dark:text-white pb-32">
            {/* Header Image */}
            <div className="relative h-64 w-full">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url("${surgery.image}")` }}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-bg-light dark:from-bg-dark via-transparent to-transparent"></div>
                <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-center">
                    <button onClick={() => router.back()} className="size-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                        <span className="material-symbols-outlined text-2xl">arrow_back</span>
                    </button>
                    <button className="size-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                        <span className="material-symbols-outlined text-2xl">share</span>
                    </button>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                    <span className="bg-primary text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest mb-2 inline-block shadow-sm">
                        {surgery.category}
                    </span>
                    <h1 className="text-3xl font-black leading-tight text-slate-900 dark:text-white drop-shadow-sm">{surgery.procedureName}</h1>
                </div>
            </div>

            <main className="p-4 flex flex-col gap-6 -mt-2">
                {/* Key Stats */}
                <div className="grid grid-cols-3 gap-3">
                    <div className="bg-white dark:bg-gray-800 p-3 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 text-center">
                        <span className="material-symbols-outlined text-blue-500 mb-1">apartment</span>
                        <p className="text-[10px] font-bold text-gray-400 uppercase">Hospital</p>
                        <p className="text-xs font-black truncate">{surgery.hospital}</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-3 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 text-center">
                        <span className="material-symbols-outlined text-purple-500 mb-1">bed</span>
                        <p className="text-[10px] font-bold text-gray-400 uppercase">Stay</p>
                        <p className="text-xs font-black">{surgery.stayDuration}</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-3 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 text-center">
                        <span className="material-symbols-outlined text-green-500 mb-1">timelapse</span>
                        <p className="text-[10px] font-bold text-gray-400 uppercase">Recovery</p>
                        <p className="text-xs font-black">{surgery.recoveryTime}</p>
                    </div>
                </div>

                {/* Description */}
                <div className="bg-white dark:bg-gray-800 p-5 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <h3 className="text-lg font-black mb-2">About Procedure</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
                        {surgery.description}
                    </p>

                    {surgery.symptoms && (
                        <div className="mt-4">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Recommended For</p>
                            <div className="flex flex-wrap gap-2">
                                {surgery.symptoms.map((sym, i) => (
                                    <span key={i} className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-300 px-3 py-1 rounded-lg text-xs font-bold border border-red-100 dark:border-red-900/30">
                                        {sym}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Package Inclusions */}
                <div className="bg-white dark:bg-gray-800 p-5 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <h3 className="text-lg font-black mb-4">Package Inclusions</h3>
                    <ul className="space-y-3">
                        {(surgery.inclusions || ['Surgeon Fee', 'Anesthesia', 'Hospital Stay', 'Post-op Care', 'Medicines']).map((inc, i) => (
                            <li key={i} className="flex items-center gap-3 text-sm font-medium text-slate-700 dark:text-gray-200">
                                <span className="size-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 shrink-0">
                                    <span className="material-symbols-outlined text-sm font-bold">check</span>
                                </span>
                                {inc}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Surgeon Note Mock */}
                <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-3xl border border-blue-100 dark:border-blue-800 flex gap-4 items-center">
                    <div className="size-12 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center text-blue-500 shadow-sm shrink-0">
                        <span className="material-symbols-outlined text-2xl">medical_services</span>
                    </div>
                    <div>
                        <p className="text-xs font-bold text-blue-800 dark:text-blue-300 uppercase tracking-widest mb-1">Surgeon&apos;s Advice</p>
                        <p className="text-sm font-medium text-slate-700 dark:text-gray-300 leading-tight">
                            &quot;Recovery usually takes {surgery.recoveryTime}. Physical therapy is recommended post-discharge.&quot;
                        </p>
                    </div>
                </div>
            </main>

            {/* Footer Actions */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 z-40 pb-6 shadow-[0_-4px_20px_-4px_rgba(0,0,0,0.1)]">
                <div className="max-w-lg mx-auto flex items-center gap-4">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Est. Cost</span>
                        <span className="text-xl font-black text-slate-900 dark:text-white">{surgery.approxCost}</span>
                    </div>
                    <button
                        onClick={() => router.push(`/surgeries/second-opinion?procedure=${encodeURIComponent(surgery.procedureName)}&category=${encodeURIComponent(surgery.category)}`)}
                        className="flex-1 h-14 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-all"
                    >
                        Get Opinion
                    </button>
                </div>
            </div>
        </div>
    );
}
