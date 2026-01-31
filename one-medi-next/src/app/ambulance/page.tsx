'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';

const AMBULANCE_TYPES = [
    {
        id: 'bls',
        name: 'Basic Life Support',
        type: 'BLS',
        icon: 'ambulance',
        baseFare: 500,
        perKm: 25,
        description: 'For non-critical patient transport to hospital.',
        includes: ['Oxygen Cylinder', 'First Aid Kit', 'Stretcher', 'Driver + Helper'],
        excludes: ['Ventilator', 'Doctor', 'Advanced Monitoring'],
        color: 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600'
    },
    {
        id: 'als',
        name: 'ICU Ambulance',
        type: 'ALS',
        icon: 'emergency',
        baseFare: 1500,
        perKm: 40,
        description: 'Equipped with ventilator for critical care.',
        includes: ['Ventilator', 'Defibrillator', 'Cardiac Monitor', 'Oxygen', 'Paramedic'],
        excludes: ['Specialist Doctor (Add-on)', 'Surgical Equipment'],
        color: 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-600'
    },
    {
        id: 'mortuary',
        name: 'Freezer Ambulance',
        type: 'MORTUARY',
        icon: 'mode_cool',
        baseFare: 2500,
        perKm: 30,
        description: 'Transport for deceased with freezer box.',
        includes: ['Built-in Freezer (-5°C)', 'Stretcher', '2 Attendants', 'Floral Decor Option'],
        excludes: ['Medical Staff', 'Life Support', 'Seating for >2 Relatives'],
        color: 'border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600'
    },
    {
        id: 'freezer_box',
        name: 'Freezer Box Rental',
        type: 'RENTAL',
        icon: 'kitchen',
        baseFare: 3500,
        perKm: 0,
        description: 'Dead body freezer box delivered to home (24 Hrs).',
        includes: ['Glass Top Freezer Box', 'Delivery & Pickup', 'Temp Control', 'Stabilizer'],
        excludes: ['Ambulance Transport', 'Attendants (Self Service)'],
        color: 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600'
    },
    {
        id: 'air',
        name: 'Air Ambulance',
        type: 'AIR',
        icon: 'flight',
        baseFare: 150000,
        perKm: 0,
        description: 'Airlift for long-distance critical transfers.',
        includes: ['Full ICU Setup', 'Flight Doctor', 'Airport Transfer', '2 Attendants'],
        excludes: ['Wait Time Charges', 'Ground Ambulance at Destination'],
        color: 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-600'
    }
];

export default function AmbulanceBookingPage() {
    const router = useRouter();
    const [selectedId, setSelectedId] = useState('bls');
    const [addons, setAddons] = useState({
        doctor: false,
        nurse: false
    });

    // Mock Distance Calculation
    const distanceKm = 12;
    const durationMins = 25;

    const selectedService = AMBULANCE_TYPES.find(s => s.id === selectedId) || AMBULANCE_TYPES[0];

    // Logic to show medical addons only for patient transport
    const showMedicalAddons = ['bls', 'als'].includes(selectedId);

    const toggleAddon = (key: 'doctor' | 'nurse') => {
        setAddons(prev => ({ ...prev, [key]: !prev[key] }));
    };

    // Pricing Logic
    const totalPrice = useMemo(() => {
        let total = selectedService.baseFare + (selectedService.perKm * distanceKm);
        if (showMedicalAddons) {
            if (addons.doctor) total += 800;
            if (addons.nurse) total += 400;
        }
        return total;
    }, [selectedService, addons, showMedicalAddons, distanceKm]);

    const handleBook = () => {
        // Navigate to confirmation or success
        if (confirm(`Confirm booking for ${selectedService.name}? Estimated: ₹${totalPrice}`)) {
            alert("Service Request Dispatched! Details sent via SMS.");
            router.push('/');
        }
    };

    return (
        <div className="flex flex-col h-screen bg-bg-light dark:bg-bg-dark font-sans relative overflow-hidden animate-fade-in">

            {/* 1. Map / Header Section */}
            <div className="absolute top-0 left-0 w-full h-[35vh] z-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <div
                    className="w-full h-full bg-cover bg-center grayscale-[0.5] opacity-80"
                    style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB2tLgg7HY6ysMKXQhyjM2Z5OVWAuN-1zgK7XR5J9o-GeWKoQ4pAT4oHC2NMOzDCJT-TNH56nSU2Zn0QXiiQxopURs4rsmeTEcZslaxLi3ap_UDVGuNP8mH92dR9poV7KECHUouGQizbOsWaLg-30V6x7gs32kvi0L7I6qHkl_V0blbXXCGZk1IMuf3CJLaki_tbWQOFP1zPTeWSSmDhrk5tKMgQjP9lRPx_-kHTUQqAF1GpSXYPSsbkYLGTWknrIhHYyPC0yM0zAc")' }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-white dark:to-gray-900"></div>

                {/* Top Nav */}
                <div className="absolute top-0 w-full p-4 flex justify-between items-center text-white">
                    <button onClick={() => router.back()} className="size-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition-colors">
                        <span className="material-symbols-outlined text-2xl">arrow_back</span>
                    </button>
                    <div className="bg-red-600 px-3 py-1 rounded-full flex items-center gap-1 animate-pulse shadow-lg">
                        <span className="material-symbols-outlined text-sm filled">emergency</span>
                        <span className="text-[10px] font-black uppercase tracking-widest">Emergency SOS</span>
                    </div>
                </div>

                {/* Live Tracking Mock */}
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 bg-white dark:bg-gray-800 px-4 py-2 rounded-xl shadow-xl flex items-center gap-3 w-[90%] max-w-sm">
                    <div className="flex-1">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Est. Arrival</p>
                        <p className="text-xl font-black text-slate-900 dark:text-white">{durationMins} Mins <span className="text-sm font-medium text-gray-400">({distanceKm} km away)</span></p>
                    </div>
                    <div className="size-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 animate-bounce">
                        <span className="material-symbols-outlined filled">near_me</span>
                    </div>
                </div>
            </div>

            {/* 2. Main Booking Sheet */}
            <div className="absolute top-[30vh] bottom-0 w-full bg-white dark:bg-gray-900 rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.2)] flex flex-col z-10 animate-slide-up overflow-hidden">

                <div className="flex-1 overflow-y-auto p-6 pb-24">
                    <div className="w-12 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-6"></div>

                    {/* Vehicle Selection */}
                    <section className="mb-8">
                        <h2 className="text-lg font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined text-red-500">ambulance</span> Select Service
                        </h2>
                        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 -mx-2 px-2 snap-x">
                            {AMBULANCE_TYPES.map((type) => (
                                <button
                                    key={type.id}
                                    onClick={() => setSelectedId(type.id)}
                                    className={`relative min-w-[160px] p-4 rounded-2xl border-2 transition-all snap-start text-left flex flex-col gap-3 ${selectedId === type.id
                                            ? `${type.color} shadow-lg ring-1 ring-offset-2 ring-offset-white dark:ring-offset-gray-900`
                                            : 'border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800 text-gray-400 opacity-80'
                                        }`}
                                >
                                    <div className="flex justify-between items-start">
                                        <span className="material-symbols-outlined text-3xl">{type.icon}</span>
                                        {selectedId === type.id && <span className="material-symbols-outlined filled text-xl">check_circle</span>}
                                    </div>
                                    <div>
                                        <p className="font-black text-sm uppercase tracking-tight leading-tight">{type.name}</p>
                                        <p className="text-[10px] font-bold opacity-80 mt-1">₹{type.baseFare} Base</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                        <p className="text-xs text-gray-500 mt-2 italic px-1">{selectedService.description}</p>
                    </section>

                    {/* Critical Add-ons (Only for Medical Ambulances) */}
                    {showMedicalAddons && (
                        <section className="mb-8">
                            <h3 className="text-sm font-black text-slate-900 dark:text-white mb-3 uppercase tracking-widest">Medical Add-ons</h3>
                            <div className="flex flex-col gap-3">
                                <div className={`flex items-center justify-between p-3 rounded-xl border transition-all ${addons.doctor ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' : 'bg-gray-50 dark:bg-gray-800 border-transparent'}`}>
                                    <div className="flex items-center gap-3">
                                        <div className="size-10 rounded-lg bg-white dark:bg-gray-700 flex items-center justify-center text-blue-500 shadow-sm">
                                            <span className="material-symbols-outlined">stethoscope</span>
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm text-slate-900 dark:text-white">Doctor on Board</p>
                                            <p className="text-[10px] text-gray-500 font-bold">+ ₹800</p>
                                        </div>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" checked={addons.doctor} onChange={() => toggleAddon('doctor')} className="sr-only peer" />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                                    </label>
                                </div>

                                <div className={`flex items-center justify-between p-3 rounded-xl border transition-all ${addons.nurse ? 'bg-teal-50 dark:bg-teal-900/20 border-teal-200 dark:border-teal-800' : 'bg-gray-50 dark:bg-gray-800 border-transparent'}`}>
                                    <div className="flex items-center gap-3">
                                        <div className="size-10 rounded-lg bg-white dark:bg-gray-700 flex items-center justify-center text-teal-500 shadow-sm">
                                            <span className="material-symbols-outlined">medication_liquid</span>
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm text-slate-900 dark:text-white">Nursing Staff</p>
                                            <p className="text-[10px] text-gray-500 font-bold">+ ₹400</p>
                                        </div>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" checked={addons.nurse} onChange={() => toggleAddon('nurse')} className="sr-only peer" />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
                                    </label>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* Inclusions & Exclusions */}
                    <section className="mb-8">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-emerald-50 dark:bg-emerald-900/10 p-4 rounded-2xl border border-emerald-100 dark:border-emerald-900/30">
                                <h4 className="text-xs font-black text-emerald-700 dark:text-emerald-400 uppercase tracking-widest mb-3 flex items-center gap-1">
                                    <span className="material-symbols-outlined text-sm filled">check_circle</span> Included
                                </h4>
                                <ul className="space-y-2">
                                    {selectedService.includes.map((item, i) => (
                                        <li key={i} className="text-[10px] font-bold text-slate-600 dark:text-slate-300 flex items-start gap-1.5">
                                            <span className="w-1 h-1 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span> {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="bg-slate-50 dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700">
                                <h4 className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1">
                                    <span className="material-symbols-outlined text-sm">cancel</span> Not Included
                                </h4>
                                <ul className="space-y-2">
                                    {selectedService.excludes.map((item, i) => (
                                        <li key={i} className="text-[10px] font-bold text-slate-500 dark:text-slate-400 flex items-start gap-1.5">
                                            <span className="w-1 h-1 rounded-full bg-slate-400 mt-1.5 shrink-0"></span> {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Trust Indicators */}
                    <section className="border-t border-gray-100 dark:border-gray-800 pt-6">
                        <div className="flex justify-around items-center opacity-70 grayscale">
                            <div className="flex flex-col items-center gap-1">
                                <span className="material-symbols-outlined text-2xl">verified_user</span>
                                <span className="text-[8px] font-black uppercase tracking-widest">Insured</span>
                            </div>
                            <div className="flex flex-col items-center gap-1">
                                <span className="material-symbols-outlined text-2xl">location_on</span>
                                <span className="text-[8px] font-black uppercase tracking-widest">GPS Tracked</span>
                            </div>
                            <div className="flex flex-col items-center gap-1">
                                <span className="material-symbols-outlined text-2xl">workspace_premium</span>
                                <span className="text-[8px] font-black uppercase tracking-widest">Certified</span>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Sticky Footer */}
                <div className="absolute bottom-0 left-0 w-full bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 p-4 pb-6 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] z-20">
                    <div className="flex items-center gap-4">
                        <div className="flex-1">
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Estimate</p>
                            <div className="flex items-baseline gap-1">
                                <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">₹{totalPrice.toLocaleString()}</span>
                                {selectedId !== 'air' && selectedId !== 'freezer_box' && <span className="text-xs font-bold text-gray-500">/ trip</span>}
                                {selectedId === 'freezer_box' && <span className="text-xs font-bold text-gray-500">/ 24 hrs</span>}
                            </div>
                        </div>
                        <button
                            onClick={handleBook}
                            className="flex-[2] h-14 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-black text-lg uppercase tracking-widest shadow-lg shadow-red-500/30 flex items-center justify-center gap-2 active:scale-95 transition-all"
                        >
                            <span className="material-symbols-outlined text-2xl animate-pulse">emergency</span>
                            Book Now
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
