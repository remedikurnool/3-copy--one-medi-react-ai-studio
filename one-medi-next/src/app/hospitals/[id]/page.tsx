'use client';

import React from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useHospital } from '@/hooks/useHospitals';

export default function HospitalDetailPage() {
    const router = useRouter();
    const params = useParams();
    const id = params?.id as string;

    // Fetch hospital data from Supabase
    const { data: hospital, loading, error } = useHospital(id);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-bg-light dark:bg-bg-dark">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (error || !hospital) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-bg-light dark:bg-bg-dark gap-4 text-slate-900 dark:text-white">
                <h2 className="text-xl font-bold">Hospital Not Found</h2>
                <button onClick={() => router.back()} className="text-primary font-bold">Go Back</button>
            </div>
        );
    }

    // Fallback data for fields not yet in Supabase schema
    // In a real app, these would be in a separate 'vendor_details' table or JSON metadata
    const extendedData = {
        image: hospital.image || 'https://images.unsplash.com/photo-1587351021759-3e566b9af9ef?auto=format&fit=crop&q=80&w=800',
        totalBeds: 500, // Placeholder
        totalDoctors: 120, // Placeholder 
        yearEstablished: 2010, // Placeholder
        accreditations: ['NABH', 'NABL', 'JCI'],
        departments: ['Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'Oncology', 'Gynecology'],
        insurancePartners: ['HDFC Ergo', 'Star Health', 'Apollo Munich', 'ICICI Lombard', 'Bajaj Allianz'],
        facilities: hospital.facilities || ['24/7 Pharmacy', 'Emergency Care', 'ICU / NICU', 'Ambulance Service', 'Blood Bank', 'Cafeteria'],
        emergencyNumber: '108',
        description: 'Leading healthcare provider in Kurnool offering world-class medical services and patient care.'
    };

    return (
        <div className="min-h-screen bg-bg-light dark:bg-bg-dark text-slate-900 dark:text-white pb-32 font-sans relative">
            <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 p-4 flex items-center justify-between">
                <button onClick={() => router.back()} className="size-10 flex items-center justify-center rounded-full bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <span className="material-symbols-outlined text-2xl">arrow_back</span>
                </button>
                <h1 className="text-lg font-bold">Hospital Details</h1>
                <button className="size-10 flex items-center justify-center rounded-full bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <span className="material-symbols-outlined text-2xl">share</span>
                </button>
            </header>

            <main className="flex flex-col animate-fade-in">
                <div className="relative h-64 w-full">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={extendedData.image} alt={hospital.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="bg-primary text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">Multi-Specialty</span>
                            {hospital.open24x7 && <span className="bg-emerald-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">Open 24/7</span>}
                        </div>
                        <h2 className="text-3xl font-black text-white leading-tight drop-shadow-md">{hospital.name}</h2>
                        <p className="text-white/80 text-sm font-medium mt-1 flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">location_on</span>
                            {hospital.location}
                        </p>
                    </div>
                </div>

                {/* Stats Bento Grid */}
                <div className="p-4 grid grid-cols-2 lg:grid-cols-4 gap-3 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
                    <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/30 flex flex-col items-center text-center gap-1">
                        <span className="material-symbols-outlined text-blue-600">bed</span>
                        <span className="text-[10px] font-black text-blue-400 uppercase">Total Beds</span>
                        <span className="text-xl font-black text-slate-900 dark:text-white">{extendedData.totalBeds}</span>
                    </div>
                    <div className="p-4 rounded-2xl bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-900/30 flex flex-col items-center text-center gap-1">
                        <span className="material-symbols-outlined text-teal-600">stethoscope</span>
                        <span className="text-[10px] font-black text-teal-400 uppercase">Experts</span>
                        <span className="text-xl font-black text-slate-900 dark:text-white">{extendedData.totalDoctors}+</span>
                    </div>
                    <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-900/30 flex flex-col items-center text-center gap-1">
                        <span className="material-symbols-outlined text-amber-600">star</span>
                        <span className="text-[10px] font-black text-amber-400 uppercase">Rating</span>
                        <span className="text-xl font-black text-slate-900 dark:text-white">{hospital.rating}</span>
                    </div>
                    <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-900/30 flex flex-col items-center text-center gap-1">
                        <span className="material-symbols-outlined text-purple-600">history</span>
                        <span className="text-[10px] font-black text-purple-400 uppercase">Est. Since</span>
                        <span className="text-xl font-black text-slate-900 dark:text-white">{extendedData.yearEstablished}</span>
                    </div>
                </div>

                <div className="p-4 space-y-6">
                    <section className="bg-white dark:bg-gray-800 p-6 rounded-[2rem] shadow-sm border border-gray-100 dark:border-gray-700">
                        <h3 className="text-lg font-black mb-3">About the Hospital</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed font-medium">
                            {extendedData.description}
                        </p>
                        <div className="flex gap-3 mt-5">
                            {extendedData.accreditations.map((acc, i) => (
                                <div key={i} className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 px-3 py-1.5 rounded-xl border border-emerald-100 dark:border-emerald-800">
                                    <span className="material-symbols-outlined text-lg filled">verified</span>
                                    <span className="text-[10px] font-black uppercase tracking-widest">{acc}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4 ml-1">Specialties & Departments</h3>
                        <div className="grid grid-cols-2 gap-3">
                            {extendedData.departments.map(dept => (
                                <div key={dept} className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm group hover:border-primary transition-colors cursor-pointer">
                                    <div className="size-10 rounded-xl bg-gray-50 dark:bg-gray-700 flex items-center justify-center text-gray-400 group-hover:text-primary transition-colors">
                                        <span className="material-symbols-outlined">health_metrics</span>
                                    </div>
                                    <span className="text-sm font-bold text-slate-700 dark:text-gray-200">{dept}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="bg-white dark:bg-gray-800 p-6 rounded-[2.5rem] border border-gray-100 dark:border-gray-700 shadow-sm">
                        <h3 className="text-lg font-black mb-4">Cashless Insurance Partners</h3>
                        <div className="flex flex-wrap gap-2">
                            {extendedData.insurancePartners.map(partner => (
                                <span key={partner} className="px-4 py-2 bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-300 text-[10px] font-black uppercase tracking-widest rounded-xl border border-gray-100 dark:border-gray-700">
                                    {partner}
                                </span>
                            ))}
                        </div>
                        <p className="text-[10px] text-slate-400 mt-4 font-bold italic">* Please verify your policy coverage at the TPA desk.</p>
                    </section>

                    <section>
                        <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4 ml-1">Key Facilities</h3>
                        <div className="grid grid-cols-1 gap-2">
                            {extendedData.facilities.map((fac, i) => (
                                <div key={i} className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
                                    <span className="material-symbols-outlined text-emerald-500">check_circle</span>
                                    <span className="text-sm font-bold text-slate-700 dark:text-gray-200">{fac}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </main>

            <footer className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 p-4 pb-6 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
                <div className="max-w-md mx-auto flex gap-4">
                    <button
                        onClick={() => window.open(`tel:${extendedData.emergencyNumber}`)}
                        className="flex-1 h-14 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-red-200 flex flex-col items-center justify-center transition-all active:scale-95"
                    >
                        <span className="material-symbols-outlined">call</span>
                        Emergency
                    </button>
                    <button
                        onClick={() => router.push('/doctors')}
                        className="flex-[2] h-14 bg-primary hover:bg-teal-700 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-primary/30 flex flex-col items-center justify-center transition-all active:scale-95"
                    >
                        <span className="material-symbols-outlined">calendar_month</span>
                        Book Appointment
                    </button>
                </div>
            </footer>
        </div>
    );
}
