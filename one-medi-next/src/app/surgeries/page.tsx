'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SURGERY_PACKAGES, SURGERY_SPECIALTIES } from '@/constants';
import PageHeader from '@/components/ui/PageHeader';
import Image from 'next/image';

export default function SurgeriesPage() {
    const router = useRouter();
    const [selectedSpecialty, setSelectedSpecialty] = useState('all');
    const [search, setSearch] = useState('');

    const filteredSurgeries = SURGERY_PACKAGES.filter(pkg => {
        const matchesSpecialty = selectedSpecialty === 'all' || pkg.category === selectedSpecialty;
        const matchesSearch = pkg.procedureName.toLowerCase().includes(search.toLowerCase()) ||
            pkg.hospital.toLowerCase().includes(search.toLowerCase());
        return matchesSpecialty && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-bg-light dark:bg-bg-dark font-sans text-slate-900 dark:text-white pb-24">
            <PageHeader
                title="Surgeries"
                subtitle="Expert Care & Packages"
                showSearch={true}
                searchValue={search}
                onSearchChange={setSearch}
                searchPlaceholder="Search surgery, symptom or hospital..."
                className="lg:top-20"
                actions={
                    <button
                        onClick={() => router.push('/surgeries/second-opinion')}
                        className="px-4 py-2 bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-xl text-xs font-black uppercase tracking-widest hover:opacity-90 transition-opacity"
                    >
                        Get Opinion
                    </button>
                }
            />

            {/* Specialty Filter */}
            <div className="sticky top-[72px] lg:top-[144px] z-30 bg-bg-light/95 dark:bg-bg-dark/95 backdrop-blur-sm border-b border-slate-100 dark:border-gray-800">
                <div className="flex gap-3 px-4 py-4 overflow-x-auto no-scrollbar max-w-7xl mx-auto w-full">
                    {SURGERY_SPECIALTIES.map((spec) => (
                        <button
                            key={spec.id}
                            onClick={() => setSelectedSpecialty(spec.id)}
                            className={`flex items-center gap-2 px-5 py-2 rounded-full border transition-all whitespace-nowrap active:scale-95 hover:shadow-sm ${selectedSpecialty === spec.id
                                ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20'
                                : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-slate-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                                }`}
                        >
                            <span className="material-symbols-outlined text-lg">{spec.icon}</span>
                            <span className="text-xs font-black uppercase tracking-wide">{spec.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            <main className="p-4 max-w-7xl mx-auto w-full flex flex-col gap-8">
                {/* Second Opinion Banner */}
                {selectedSpecialty === 'all' && !search && (
                    <div
                        onClick={() => router.push('/surgeries/second-opinion')}
                        className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8 shadow-2xl cursor-pointer group border border-white/10"
                    >
                        <div className="absolute right-0 top-0 size-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl group-hover:bg-white/10 transition-colors duration-500"></div>
                        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
                            <div>
                                <span className="bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest mb-3 inline-block border border-white/10">Free Consult</span>
                                <h2 className="text-2xl md:text-3xl font-black mb-2 leading-tight">Need a Second Opinion?</h2>
                                <p className="text-sm text-slate-300 max-w-md mb-6 leading-relaxed font-medium">Upload your reports and medical history to get expert advice from top 1% surgeons in Kurnool for free.</p>
                                <button className="bg-white text-slate-900 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-gray-100 transition-colors shadow-lg active:scale-95">Start Assessment</button>
                            </div>
                            <div className="size-32 bg-white/10 rounded-3xl flex items-center justify-center backdrop-blur-sm border border-white/10 shrink-0 shadow-inner group-hover:scale-110 transition-transform duration-500">
                                <span className="material-symbols-outlined text-6xl opacity-90">medical_services</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Surgery List */}
                <div>
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                        <span className="material-symbols-outlined text-lg">local_hospital</span>
                        {selectedSpecialty === 'all' ? 'Popular Surgeries' : `${selectedSpecialty} Procedures`}
                        <span className="bg-slate-100 dark:bg-slate-800 text-slate-500 px-2 py-0.5 rounded-md text-[10px] ml-auto">{filteredSurgeries.length} Available</span>
                    </h3>

                    {filteredSurgeries.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredSurgeries.map(pkg => (
                                <div
                                    key={pkg.id}
                                    onClick={() => router.push(`/surgeries/${pkg.id}`)}
                                    className="group bg-white dark:bg-gray-800 p-4 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col gap-4 cursor-pointer active:scale-[0.98] transition-all hover:shadow-xl hover:-translate-y-1"
                                >
                                    <div className="flex gap-4">
                                        <div className="size-24 rounded-2xl bg-gray-100 shrink-0 overflow-hidden relative shadow-inner">
                                            <Image
                                                src={pkg.image}
                                                alt={pkg.procedureName}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                        </div>
                                        <div className="flex-1 py-1 min-w-0">
                                            <div className="flex justify-between items-start mb-2">
                                                <span className="text-[9px] font-black text-primary bg-primary/10 px-2 py-1 rounded-lg uppercase tracking-wider">{pkg.department}</span>
                                                <span className="material-symbols-outlined text-slate-300 group-hover:text-primary transition-colors">arrow_outward</span>
                                            </div>
                                            <h4 className="text-base font-black leading-tight mb-1 truncate text-slate-900 dark:text-white group-hover:text-primary transition-colors">{pkg.procedureName}</h4>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate flex items-center gap-1 font-medium">
                                                <span className="material-symbols-outlined text-[14px]">apartment</span>
                                                {pkg.hospital}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-700/50 px-3 py-1.5 rounded-xl border border-slate-100 dark:border-slate-700/50">
                                            <span className="material-symbols-outlined text-[14px] text-slate-400">schedule</span>
                                            <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wide">{pkg.stayDuration} Stay</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-700/50 px-3 py-1.5 rounded-xl border border-slate-100 dark:border-slate-700/50">
                                            <span className="material-symbols-outlined text-[14px] text-slate-400">healing</span>
                                            <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wide">{pkg.recoveryTime}</span>
                                        </div>
                                    </div>

                                    <div className="h-px bg-slate-100 dark:bg-slate-700/50"></div>

                                    <div className="flex justify-between items-center px-1">
                                        <div>
                                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Approx. Cost</p>
                                            <p className="text-lg font-black text-slate-900 dark:text-white tracking-tight">{pkg.approxCost}</p>
                                        </div>
                                        <button className="text-primary text-[10px] font-black uppercase tracking-widest bg-primary/5 px-3 py-2 rounded-lg hover:bg-primary hover:text-white transition-colors">
                                            View Package
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 flex flex-col items-center gap-4 opacity-60">
                            <div className="size-20 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                                <span className="material-symbols-outlined text-4xl">search_off</span>
                            </div>
                            <p className="text-slate-500 font-bold">No surgeries found matching your search.</p>
                            <button
                                onClick={() => { setSearch(''); setSelectedSpecialty('all'); }}
                                className="text-primary font-black uppercase tracking-wider text-xs hover:underline"
                            >
                                Clear All Filters
                            </button>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
