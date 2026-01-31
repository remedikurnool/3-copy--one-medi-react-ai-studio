'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useDoctor } from '../../../hooks/useDoctors';
import PrescriptionUpload from '../../../components/ui/PrescriptionUpload';

export default function DoctorProfilePage() {
    const router = useRouter();
    const params = useParams();
    const id = params?.id as string;

    // Try to get from Supabase
    const { data: doctor, loading, error } = useDoctor(id);

    const [selectedType, setSelectedType] = useState('Clinic Visit');
    const [prescription, setPrescription] = useState<string | null>(null);

    // Default variants - mapped doctor object already has standardized fields
    const defaultVariants = doctor ? [
        { type: 'Clinic Visit', price: doctor.fee, icon: 'location_on', duration: '30 mins', nextSlot: 'Tomorrow, 10:30 AM' },
        { type: 'Video Consult', price: Math.round(doctor.fee * 0.8), icon: 'videocam', duration: '20 mins', nextSlot: 'Today, 06:15 PM' }
    ] : [];

    // Update selected variant when doctor loads
    useEffect(() => {
        if (defaultVariants.length > 0) {
            setSelectedType(defaultVariants[0].type);
        }
    }, [doctor]); // eslint-disable-line react-hooks/exhaustive-deps

    const handleBooking = () => {
        const currentVariant = defaultVariants.find((v: any) => v.type === selectedType);
        if (!currentVariant || !doctor) return;

        const queryParams = new URLSearchParams({
            doctorId: doctor.id,
            variantType: currentVariant.type,
            variantPrice: currentVariant.price.toString(),
            variantIcon: currentVariant.icon,
            prescription: prescription || ''
        }).toString();

        router.push(`/doctors/booking?${queryParams}`);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-bg-light dark:bg-bg-dark flex items-center justify-center">
                <div className="animate-spin rounded-full h-10 w-10 border-2 border-primary border-t-transparent"></div>
            </div>
        );
    }

    if (!doctor) return <div className="p-8 text-center text-slate-500">Doctor not found</div>;

    const currentVariant = defaultVariants.find((v: any) => v.type === selectedType) || { price: doctor.fee, nextSlot: 'Tomorrow', type: 'Clinic Visit' };

    return (
        <div className="min-h-screen bg-bg-light dark:bg-bg-dark pb-24 font-sans text-slate-900 dark:text-white">
            {/* Top App Bar */}
            <div className="sticky top-0 z-50 flex items-center bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm p-4 border-b border-gray-100 dark:border-gray-800 justify-between">
                <button
                    onClick={() => router.back()}
                    className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                    <span className="material-symbols-outlined text-2xl">arrow_back</span>
                </button>
                <h2 className="text-lg font-bold leading-tight tracking-tight">Doctor Profile</h2>
                <div className="flex w-20 items-center justify-end gap-1">
                    <button className="flex size-10 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                        <span className="material-symbols-outlined text-xl">share</span>
                    </button>
                    <button className="flex size-10 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                        <span className="material-symbols-outlined text-xl">favorite</span>
                    </button>
                </div>
            </div>

            {/* Doctor Header Profile */}
            <div className="relative flex flex-col items-center pt-6 pb-2 px-4 bg-white dark:bg-gray-900">
                <div className="flex flex-col items-center gap-4">
                    <div className="relative">
                        <div
                            className="bg-center bg-no-repeat bg-cover rounded-full h-32 w-32 border-4 border-white dark:border-gray-800 shadow-lg"
                            style={{ backgroundImage: `url("${doctor.image}")` }}
                        >
                        </div>
                        <div className="absolute bottom-1 right-1 bg-secondary text-white p-1.5 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center shadow-sm">
                            <span className="material-symbols-outlined text-[16px] font-bold">check</span>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center text-center">
                        <h1 className="text-2xl font-bold leading-tight tracking-tight">{doctor.name}</h1>
                        <p className="text-gray-500 dark:text-gray-400 text-base font-normal mt-1">{doctor.specialty}, {doctor.qualification}</p>
                        <div className="flex items-center gap-2 mt-2">
                            <span className="px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-primary text-xs font-bold border border-blue-100 dark:border-blue-800">Reg: APMC-48291</span>
                            <span className="px-2 py-0.5 rounded-full bg-green-50 dark:bg-green-900/30 text-secondary text-xs font-bold border border-green-100 dark:border-blue-800 flex items-center gap-1">
                                <span className="size-1.5 rounded-full bg-secondary animate-pulse"></span>
                                Available Now
                            </span>
                        </div>
                        {doctor.languages && (
                            <div className="flex gap-2 mt-2">
                                {doctor.languages.map(lang => (
                                    <span key={lang} className="text-[10px] text-gray-400 font-bold uppercase">{lang}</span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Stats Row */}
            <div className="bg-white dark:bg-gray-900 px-4 py-4 mb-2">
                <div className="flex gap-3 overflow-x-auto no-scrollbar">
                    <div className="flex min-w-[100px] flex-1 flex-col gap-1 rounded-xl bg-gray-50 dark:bg-gray-800 p-4 items-center text-center border border-gray-100 dark:border-gray-700">
                        <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-full mb-1 text-primary">
                            <span className="material-symbols-outlined text-xl">medical_services</span>
                        </div>
                        <p className="text-xl font-bold">{doctor.experience}</p>
                        <p className="text-gray-500 dark:text-gray-400 text-xs font-medium">Years Exp.</p>
                    </div>
                    <div className="flex min-w-[100px] flex-1 flex-col gap-1 rounded-xl bg-gray-50 dark:bg-gray-800 p-4 items-center text-center border border-gray-100 dark:border-gray-700">
                        <div className="bg-teal-100 dark:bg-teal-900/50 p-2 rounded-full mb-1 text-secondary">
                            <span className="material-symbols-outlined text-xl">groups</span>
                        </div>
                        <p className="text-xl font-bold">5k+</p>
                        <p className="text-gray-500 dark:text-gray-400 text-xs font-medium">Patients</p>
                    </div>
                    <div className="flex min-w-[100px] flex-1 flex-col gap-1 rounded-xl bg-gray-50 dark:bg-gray-800 p-4 items-center text-center border border-gray-100 dark:border-gray-700">
                        <div className="bg-amber-100 dark:bg-amber-900/50 p-2 rounded-full mb-1 text-amber-600">
                            <span className="material-symbols-outlined text-xl filled">star</span>
                        </div>
                        <p className="text-xl font-bold">{doctor.rating}</p>
                        <p className="text-gray-500 dark:text-gray-400 text-xs font-medium">Rating</p>
                    </div>
                </div>
            </div>

            {/* Enhanced About Section */}
            <div className="px-4 py-2">
                <section className="flex flex-col gap-5 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 shadow-sm">
                    <div className="flex items-center gap-2 text-primary border-b border-gray-100 dark:border-gray-800 pb-3">
                        <span className="material-symbols-outlined filled">info</span>
                        <h3 className="text-lg font-black uppercase tracking-tight">Biography</h3>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed font-medium">
                                {doctor.about || `${doctor.name} is a renowned ${doctor.specialty} based in Kurnool. With over ${doctor.experience} of clinical practice, they have successfully treated thousands of patients, focusing on evidence-based medicine and personalized care protocols.`}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            <div className="flex items-start gap-3">
                                <div className="size-8 rounded-lg bg-teal-50 dark:bg-teal-900/20 flex items-center justify-center text-primary shrink-0">
                                    <span className="material-symbols-outlined text-lg">school</span>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Education</p>
                                    <p className="text-sm font-bold text-slate-800 dark:text-gray-200">{doctor.qualification} from Top Medical University</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="size-8 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-secondary shrink-0">
                                    <span className="material-symbols-outlined text-lg">workspace_premium</span>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Specialization</p>
                                    <div className="flex flex-wrap gap-1 mt-1">
                                        <span className="bg-gray-100 dark:bg-gray-800 text-[10px] font-bold px-2 py-0.5 rounded-md text-gray-600 dark:text-gray-400">{doctor.specialty}</span>
                                        <span className="bg-gray-100 dark:bg-gray-800 text-[10px] font-bold px-2 py-0.5 rounded-md text-gray-600 dark:text-gray-400">Clinical Diagnosis</span>
                                        <span className="bg-gray-100 dark:bg-gray-800 text-[10px] font-bold px-2 py-0.5 rounded-md text-gray-600 dark:text-gray-400">Patient Care</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/* Consultation Type Selector */}
            <div className="px-4 py-2 mb-2">
                <h3 className="text-lg font-bold leading-tight mb-3 px-1">Consultation Type</h3>
                <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
                    {defaultVariants.map((v) => (
                        <button
                            key={v.type}
                            onClick={() => setSelectedType(v.type)}
                            className={`flex flex-col items-start gap-2 p-4 rounded-xl border min-w-[140px] transition-all relative ${selectedType === v.type
                                ? 'bg-primary text-white border-primary shadow-md'
                                : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-slate-700 dark:text-gray-300'
                                }`}
                        >
                            {selectedType === v.type && (
                                <div className="absolute top-2 right-2 bg-white/20 rounded-full p-0.5">
                                    <span className="material-symbols-outlined text-[16px] font-bold">check</span>
                                </div>
                            )}
                            <div className={`p-2 rounded-full flex items-center justify-center ${selectedType === v.type ? 'bg-white/20' : 'bg-gray-100 dark:bg-gray-700'}`}>
                                <span className="material-symbols-outlined text-xl">{v.icon}</span>
                            </div>
                            <div>
                                <p className="text-sm font-bold leading-tight">{v.type}</p>
                                <p className={`text-xs mt-0.5 ${selectedType === v.type ? 'text-blue-100' : 'text-gray-500'}`}>{v.duration}</p>
                            </div>
                            <div className="mt-1 font-bold text-lg">₹{v.price}</div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Prescription Upload Section */}
            <div className="px-4 py-2 mb-2">
                <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm">
                    <PrescriptionUpload
                        label="Upload Medical Records"
                        subLabel="Share past prescriptions or reports with the doctor (Optional)"
                        onUpload={setPrescription}
                        initialUrl={prescription}
                    />
                </div>
            </div>

            {/* Clinic & Fees Card */}
            <div className="px-4 py-2">
                <h3 className="text-lg font-bold leading-tight mb-3 px-1">Hospital Details</h3>
                <div className="flex flex-col gap-0 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                    {/* Map / Image Area */}
                    <div className="relative h-40 w-full bg-gray-100">
                        <div
                            className="w-full h-full bg-center bg-no-repeat bg-cover"
                            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB2tLgg7HY6ysMKXQhyjM2Z5OVWAuN-1zgK7XR5J9o-GeWKoQ4pAT4oHC2NMOzDCJT-TNH56nSU2Zn0QXiiQxopURs4rsmeTEcZslaxLi3ap_UDVGuNP8mH92dR9poV7KECHUouGQizbOsWaLg-30V6x7gs32kvi0L7I6qHkl_V0blbXXCGZk1IMuf3CJLaki_tbWQOFP1zPTeWSSmDhrk5tKMgQjP9lRPx_-kHTUQqAF1GpSXYPSsbkYLGTWknrIhHYyPC0yM0zAc")' }}
                        >
                        </div>
                        <div className="absolute bottom-3 right-3">
                            <button className="flex items-center gap-1 bg-white dark:bg-gray-800 text-slate-900 dark:text-white px-3 py-1.5 rounded-lg text-sm font-bold shadow-md border border-gray-100 dark:border-gray-700">
                                <span className="material-symbols-outlined text-primary text-[18px]">directions</span>
                                Get Directions
                            </button>
                        </div>
                    </div>
                    <div className="p-5 flex flex-col gap-4">
                        <div className="flex justify-between items-start">
                            <div className="flex flex-col gap-1">
                                <p className="text-lg font-bold leading-tight">{doctor.hospital || 'Sunrise Multi-Specialty Hospital'}</p>
                                <p className="text-gray-500 dark:text-gray-400 text-sm font-normal flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[16px]">location_on</span>
                                    {doctor.location || 'N.R. Peta, Kurnool, Andhra Pradesh'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Availability / Timings */}
            <div className="px-4 py-2 mb-4">
                <h3 className="text-lg font-bold leading-tight mb-3 px-1">Availability</h3>
                <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 shadow-sm">
                    <div className="flex items-center gap-4 mb-3">
                        <div className="size-10 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-primary shrink-0">
                            <span className="material-symbols-outlined">calendar_month</span>
                        </div>
                        <div className="flex flex-col">
                            <p className="font-bold">Monday - Saturday</p>
                            <p className="text-gray-500 dark:text-gray-400 text-sm">Working Days</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="size-10 rounded-full bg-teal-50 dark:bg-teal-900/30 flex items-center justify-center text-secondary shrink-0">
                            <span className="material-symbols-outlined">schedule</span>
                        </div>
                        <div className="flex flex-col">
                            <p className="font-bold">10:00 AM - 02:00 PM</p>
                            <p className="text-gray-500 dark:text-gray-400 text-sm">Evening: 06:00 PM - 09:00 PM</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Sticky Action Bar */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 z-40 pb-6 shadow-[0_-4px_20px_-4px_rgba(0,0,0,0.05)]">
                <div className="flex gap-4 items-center max-w-md mx-auto">
                    <div className="hidden xs:flex flex-col">
                        <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Next Slot</span>
                        <span className="text-sm font-bold">{currentVariant.nextSlot || 'Today, 11:30 AM'}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Fee</span>
                        <span className="text-xl font-bold">₹{currentVariant.price}</span>
                    </div>
                    <button
                        onClick={handleBooking}
                        className="flex-1 h-14 bg-primary hover:bg-primary-dark active:scale-[0.98] text-white rounded-xl text-lg font-bold shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 transition-all"
                    >
                        <span className="material-symbols-outlined">calendar_add_on</span>
                        Book {selectedType.split(' ')[0]}
                    </button>
                </div>
            </div>
        </div>
    );
}
