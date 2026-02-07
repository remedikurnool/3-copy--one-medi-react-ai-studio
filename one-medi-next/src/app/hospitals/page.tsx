'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useHospitals, useHospitalSearch } from '@/hooks/useHospitals';
import PageHeader from '@/components/ui/PageHeader';

export default function HospitalsPage() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');

    // Fetch hospitals from Supabase
    const { data: hospitals, loading, error } = useHospitals();
    const { data: searchResults } = useHospitalSearch(searchQuery);

    // Use search results if query exists, otherwise use all hospitals
    const displayHospitals = searchQuery.length >= 2 ? searchResults : hospitals;

    return (
        <div className="min-h-screen bg-surface-50 dark:bg-surface-950 text-slate-900 dark:text-white pb-24 font-sans">
            <PageHeader
                title="Find Hospitals"
                showSearch={true}
                searchPlaceholder="Search hospital or specialty..."
                searchValue={searchQuery}
                onSearchChange={setSearchQuery}
                className="lg:top-20"
            />

            <div className="flex flex-col gap-4 p-4">
                {loading && (
                    <div className="flex items-center justify-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent"></div>
                    </div>
                )}

                {error && (
                    <div className="text-center py-8 text-red-500">
                        <span className="material-symbols-outlined text-4xl mb-2">error</span>
                        <p className="text-sm">Failed to load hospitals. Please try again.</p>
                    </div>
                )}

                {!loading && displayHospitals?.map((hospital: any) => (
                    <div
                        key={hospital.id}
                        onClick={() => router.push(`/hospitals/${hospital.id}`)}
                        className="flex flex-col gap-0 rounded-3xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all cursor-pointer active:scale-[0.98]"
                    >
                        <div className="relative h-48 w-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                            {hospital.logo_url ? (
                                /* eslint-disable-next-line @next/next/no-img-element */
                                <img src={hospital.logo_url} alt={hospital.name} className="max-h-full max-w-full object-contain p-4" />
                            ) : (
                                <span className="material-symbols-outlined text-6xl text-primary/40">local_hospital</span>
                            )}
                            {hospital.location?.is_open_24x7 && (
                                <div className="absolute top-3 left-3 bg-green-500 text-white text-[10px] font-black px-2.5 py-1 rounded-lg shadow-sm flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[14px]">check_circle</span>
                                    Open 24/7
                                </div>
                            )}
                            {hospital.is_verified && (
                                <div className="absolute top-3 right-3 bg-blue-500 text-white text-[10px] font-black px-2.5 py-1 rounded-lg shadow-sm flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[14px]">verified</span>
                                    Verified
                                </div>
                            )}
                        </div>

                        <div className="p-5">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h3 className="text-lg font-bold leading-tight">{hospital.name}</h3>
                                    <p className="text-secondary text-sm font-medium mt-0.5">Multi-Specialty Hospital</p>
                                </div>
                                <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-900/20 px-1.5 py-0.5 rounded text-xs font-bold text-amber-600">
                                    <span className="material-symbols-outlined text-sm filled">star</span> {hospital.rating?.toFixed(1) || '4.5'}
                                </div>
                            </div>
                            <div className="flex items-start gap-2 text-gray-500 dark:text-gray-400 text-sm">
                                <span className="material-symbols-outlined text-[18px] shrink-0 mt-0.5">location_on</span>
                                <p className="leading-snug">{hospital.location?.address || 'Kurnool, Andhra Pradesh'}</p>
                            </div>
                            {hospital.description && (
                                <p className="text-xs text-gray-400 mt-2 line-clamp-2">{hospital.description}</p>
                            )}
                        </div>
                    </div>
                ))}

                {!loading && (!displayHospitals || displayHospitals.length === 0) && (
                    <div className="text-center py-12 text-gray-500">
                        <span className="material-symbols-outlined text-5xl mb-3 opacity-30">local_hospital</span>
                        <p className="text-sm">No hospitals found.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
