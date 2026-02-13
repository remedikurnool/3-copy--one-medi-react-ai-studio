'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDoctors, useDoctorSearch } from '@/hooks/useDoctors';
import { DoctorCardSkeleton } from '@/components/ui/Skeletons';
import { DoctorCard } from '@/components/cards/DoctorCard';
import PageHeader from '@/components/ui/PageHeader';
import { useLocationStore } from '@/store/locationStore';
import LocationModal from '@/components/ui/LocationModal';

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
        return selectedSpecialty === 'All' || doc.specialization === selectedSpecialty;
    });

    return (
        <div className="min-h-screen bg-surface-50 dark:bg-surface-950 font-sans text-slate-900 dark:text-white pb-24 relative">
            <LocationModal isOpen={isLocationModalOpen} onClose={() => setIsLocationModalOpen(false)} />

            {/* Unified Page Header */}
            <PageHeader
                title="Find Specialists"
                showLocation={true}
                showSearch={true}
                searchPlaceholder="Search doctor, hospital, specialty..."
                searchValue={search}
                onSearchChange={setSearch}
                onLocationClick={() => setIsLocationModalOpen(true)}
                className="lg:top-20"
            />

            {/* Specialty Filter */}
            <div className="sticky top-[136px] md:top-[88px] z-30 bg-surface-50/95 dark:bg-surface-950/95 backdrop-blur-sm py-4 border-b border-surface-200 dark:border-surface-800 mb-6">
                <div className="flex gap-2 px-4 max-w-7xl mx-auto overflow-x-auto no-scrollbar scroll-pl-4">
                    {specialties.map(specialty => (
                        <button
                            key={specialty}
                            onClick={() => setSelectedSpecialty(specialty)}
                            className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full px-4 shadow-sm whitespace-nowrap active:scale-95 transition-all outline-none ${selectedSpecialty === specialty
                                ? 'bg-primary text-white shadow-lg shadow-primary/30'
                                : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-slate-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                                }`}
                        >
                            <span className="text-[11px] font-black uppercase tracking-wider">{specialty}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* List */}
            <main className="px-4 flex flex-col gap-4 max-w-7xl mx-auto w-full">
                <div className="flex justify-between items-center px-1">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                        {isLoading ? 'Searching...' : `${filteredDoctors.length} Specialists Found`}
                    </p>
                </div>

                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {Array(8).fill(0).map((_, i) => <DoctorCardSkeleton key={i} />)}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                        {filteredDoctors.map((doc) => (
                            <DoctorCard
                                key={doc.id}
                                doctor={doc}
                                onClick={() => router.push(`/doctors/${doc.id}`)}
                                className="w-full"
                            />
                        ))}
                    </div>
                )}

                {!isLoading && filteredDoctors.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="size-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                            <span className="material-symbols-outlined text-4xl text-gray-400">person_search</span>
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">No Specialists Found</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 max-w-xs mx-auto">
                            We couldn't find any doctors matching your search or filter. Try a different specialty.
                        </p>
                        <button
                            onClick={() => { setSearch(''); setSelectedSpecialty('All'); }}
                            className="mt-6 px-6 py-2 bg-primary/10 text-primary rounded-xl font-bold text-sm hover:bg-primary hover:text-white transition-all"
                        >
                            Clear Filters
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
}
