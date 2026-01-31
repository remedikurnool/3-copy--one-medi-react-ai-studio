'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useBloodBanks } from '@/hooks/useHospitals';

export default function BloodBankListPage() {
    const router = useRouter();
    const [selectedGroup, setSelectedGroup] = useState('All');

    // Fetch blood banks from Supabase
    const { data: bloodBanks, loading, error } = useBloodBanks();

    // Filter by blood group (static list - no dynamic availability per user request)
    const filteredBanks = (bloodBanks || []).filter(b =>
        selectedGroup === 'All' || (b.availableGroups || []).includes(selectedGroup)
    );

    return (
        <div className="min-h-screen bg-bg-light dark:bg-bg-dark font-sans text-slate-900 dark:text-white pb-24 animate-fade-in">
            <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800 p-4">
                <div className="flex items-center gap-3 mb-4">
                    <button onClick={() => router.back()} className="size-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center transition-colors">
                        <span className="material-symbols-outlined text-2xl">arrow_back</span>
                    </button>
                    <h1 className="text-xl font-bold">Blood Banks</h1>
                </div>

                <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                    {['All', 'A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(g => (
                        <button
                            key={g}
                            onClick={() => setSelectedGroup(g)}
                            className={`size-10 rounded-xl font-bold text-xs shrink-0 transition-all ${selectedGroup === g ? 'bg-red-500 text-white shadow-lg shadow-red-500/30' : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'}`}
                        >
                            {g}
                        </button>
                    ))}
                </div>
            </header>

            <main className="p-4 flex flex-col gap-4">
                {loading && (
                    <div className="flex items-center justify-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-2 border-red-500 border-t-transparent"></div>
                    </div>
                )}

                {error && (
                    <div className="text-center py-8 text-red-500">
                        <span className="material-symbols-outlined text-4xl mb-2">error</span>
                        <p className="text-sm">Failed to load blood banks. Please try again.</p>
                    </div>
                )}

                {!loading && filteredBanks.map(bank => (
                    <div key={bank.id} className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-bold leading-tight">{bank.name}</h3>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${bank.isOpen24x7 ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                                {bank.isOpen24x7 ? 'Open 24/7' : 'Timings Vary'}
                            </span>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1 mb-4">
                            <span className="material-symbols-outlined text-[16px]">location_on</span>
                            {bank.address || 'Kurnool'}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-5">
                            {(bank.availableGroups || []).map(bg => (
                                <span key={bg} className="px-2 py-1 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-xs font-bold rounded-lg border border-red-100 dark:border-red-900/30">{bg}</span>
                            ))}
                        </div>

                        <div className="flex gap-3">
                            <button className="flex-1 h-10 rounded-xl border border-gray-300 dark:border-gray-600 font-bold text-xs uppercase tracking-widest hover:bg-gray-50 dark:hover:bg-gray-700">Directions</button>
                            <a href={`tel:${bank.phone || ''}`} className="flex-1 h-10 rounded-xl bg-red-500 text-white flex items-center justify-center gap-2 font-bold text-xs uppercase tracking-widest shadow-md active:scale-95 transition-all">
                                <span className="material-symbols-outlined text-[18px]">call</span>
                                Call Now
                            </a>
                        </div>
                    </div>
                ))}

                {!loading && filteredBanks.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                        <span className="material-symbols-outlined text-5xl mb-3 opacity-30">water_drop</span>
                        <p className="text-sm">No blood banks found for this group.</p>
                    </div>
                )}
            </main>
        </div>
    );
}
