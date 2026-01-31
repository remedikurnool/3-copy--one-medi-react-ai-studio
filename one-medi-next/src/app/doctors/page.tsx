'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocationStore } from '../../store/locationStore';
import LocationModal from '../../components/ui/LocationModal';
import { useDoctors, useDoctorSearch } from '../../hooks/useDoctors';
import { DoctorCardSkeleton } from '../../components/ui/Skeletons';
import { DoctorCard } from '../../components/cards/DoctorCard';

export default function DoctorListPage() {
    const router = useRouter();
    const { city } = useLocationStore();
    const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
    const [selectedSpecialty, setSelectedSpecialty] = useState('All');
    const [search, setSearch] = useState('');

    const specialties = ['All', 'General Physician', 'Cardiologist', 'Dentist', 'Gynecologist', 'Pediatrician', 'Dermatologist'];

    const { data: allDoctors, loading: loadingAll } = useDoctors();
    const { data: searchResults, loading: loadingSearch } = useDoctorSearch(search);

    const isLoading = loadingAll || (search.length >= 2 && loadingSearch);
    const displayDoctors = search.length >= 2 ? searchResults : allDoctors;
    const filteredDoctors = (displayDoctors || []).filter(doc => {
        return selectedSpecialty === 'All' || doc.specialty === selectedSpecialty;
    });

    return (
        <div className="min-h-screen bg-bg-light dark:bg-bg-dark font-sans text-slate-900 dark:text-white pb-24 relative">
            <LocationModal isOpen={isLocationModalOpen} onClose={() => setIsLocationModalOpen(false)} />

            {/* Sticky Header */}
            <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 p-4 transition-colors">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => router.push('/')}
                            className="text-primary flex size-10 shrink-0 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-900/20 active:scale-95 transition-transform"
                        >
                            <span className="material-symbols-outlined text-2xl">arrow_back</span>
                        </button>
                        <div>
                            <h2 className="text-slate-900 dark:text-white text-lg font-black leading-tight tracking-tight">ONE MEDI</h2>
                            <button
                                onClick={() => setIsLocationModalOpen(true)}
                                className="flex items-center gap-1 text-sm text-secondary font-medium cursor-pointer hover:text-primary transition-colors"
                            >
                                <span className="material-symbols-outlined text-[16px] filled">location_on</span>
                                <span>{city || 'Kurnool'}, AP</span>
                                <span className="material-symbols-outlined text-[16px]">expand_more</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Title & Search */}
            <div className="pt-4 px-4 space-y-4">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Find Specialists</h1>
                    <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Top doctors in your city</p>
                </div>

                <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400">search</span>
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full h-12 pl-12 pr-4 rounded-xl border-none bg-gray-100 dark:bg-gray-800 focus:ring-2 focus:ring-primary transition-all font-medium text-sm"
                        placeholder="Search doctor, hospital, specialty..."
                    />
                </div>
            </div>

            {/* Specialty Filter */}
            <div className="sticky top-[73px] z-40 bg-bg-light/95 dark:bg-bg-dark/95 backdrop-blur-sm py-4 border-b border-gray-100 dark:border-gray-800 mb-2">
                <div className="flex gap-2 px-4 overflow-x-auto no-scrollbar scroll-pl-4">
                    {specialties.map(specialty => (
                        <button
                            key={specialty}
                            onClick={() => setSelectedSpecialty(specialty)}
                            className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full px-4 shadow-sm whitespace-nowrap active:scale-95 transition-all outline-none ${selectedSpecialty === specialty
                                ? 'bg-primary text-white shadow-lg shadow-primary/30'
                                : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-slate-600 dark:text-gray-400'
                                }`}
                        >
                            <span className="text-[11px] font-black uppercase tracking-wider">{specialty}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* List */}
            <main className="px-4 flex flex-col gap-4 max-w-lg mx-auto w-full">
                <div className="flex justify-between items-center px-1">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                        {isLoading ? 'Searching...' : `${filteredDoctors.length} Specialists Found`}
                    </p>
                </div>

                {isLoading ? (
                    Array(4).fill(0).map((_, i) => <DoctorCardSkeleton key={i} />)
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {filteredDoctors.map((doc) => (
                            <div key={doc.id} className="w-full">
                                {/* Using a wrapper to make DoctorCard full width in this context if needed, 
                                    but DoctorCard has fixed width. Let's override or use as is. 
                                    DoctorCard is designed for horizontal scroll, might need adjustment for vertical list.
                                    Actually, let's use a modified list item version or adjust DoctorCard. 
                                    For now, let's duplicate the card style from the original file but cleaner, 
                                    OR better yet, let's trust the DoctorCard but make it responsive width. 
                                    
                                    Wait, the previous DoctorCard component has w-[280px]. 
                                    I should probably update DoctorCard to accept className for width.
                                */}
                                <div
                                    onClick={() => router.push(`/doctors/${doc.id}`)}
                                    className="flex flex-col gap-3 rounded-[2rem] bg-white dark:bg-gray-800 p-5 shadow-sm border border-gray-100 dark:border-gray-700 transition-all cursor-pointer active:scale-[0.99] hover:shadow-card-hover"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="relative shrink-0">
                                            <div className="size-20 rounded-2xl bg-gray-200 bg-center bg-cover" style={{ backgroundImage: `url("${doc.image}")` }} />
                                            <div className="absolute -bottom-1 -right-1 bg-green-500 text-white size-6 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center shadow-sm">
                                                <span className="material-symbols-outlined text-[14px]">check</span>
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-start">
                                                <h3 className="text-lg font-black text-slate-900 dark:text-white leading-tight truncate">{doc.name}</h3>
                                                <div className="flex items-center gap-1 bg-amber-50 text-amber-600 px-1.5 py-0.5 rounded text-[10px] font-black border border-amber-100">
                                                    {doc.rating} <span className="material-symbols-outlined text-[10px] filled">star</span>
                                                </div>
                                            </div>
                                            <p className="text-primary text-[10px] font-black uppercase tracking-wider mt-1">{doc.specialty}</p>
                                            <p className="text-xs text-gray-500 font-bold mt-0.5">{doc.experience} Experience • {doc.qualification}</p>
                                            <div className="flex items-center gap-1 text-gray-400 text-[10px] font-bold mt-2 uppercase">
                                                <span className="material-symbols-outlined text-[14px]">apartment</span>
                                                {doc.hospital}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between pt-3 border-t border-gray-50 dark:border-gray-700/50 mt-1">
                                        <div>
                                            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Consult Fee</p>
                                            <p className="text-lg font-black text-slate-900 dark:text-white">₹{doc.fee}</p>
                                        </div>
                                        <button className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg active:scale-95 transition-transform">
                                            Book Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
