'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useDoctor } from '../../../hooks/useDoctors';
import PrescriptionUpload from '../../../components/ui/PrescriptionUpload';
import PageHeader from '@/components/ui/PageHeader';
import { LazyImage } from '@/components/ui/LazyImage';
import { Doctor } from '@/types';

export default function DoctorProfilePage() {
    const router = useRouter();
    const params = useParams();
    const id = params?.id as string;

    // Try to get from Supabase
    const { data: doctor, loading, error } = useDoctor(id);

    const [selectedType, setSelectedType] = useState('Clinic Visit');
    const [prescription, setPrescription] = useState<string | null>(null);

    // Default variants - mapped doctor object already has standardized fields
    const defaultVariants = useMemo(() => {
        if (!doctor) return [];

        const variants = [
            {
                type: 'Clinic Visit',
                price: doctor.consultationFee,
                icon: 'location_on',
                duration: `${doctor.consultationDurationMinutes} mins`,
                nextSlot: 'Tomorrow, 10:30 AM'
            }
        ];

        if (doctor.availableOnline) {
            variants.push({
                type: 'Video Consult',
                price: Math.round(doctor.consultationFee * 0.8),
                icon: 'videocam',
                duration: '20 mins',
                nextSlot: 'Today, 06:15 PM'
            });
        }

        return variants;
    }, [doctor]);

    // Update selected variant when doctor loads
    useEffect(() => {
        if (defaultVariants.length > 0) {
            setSelectedType(defaultVariants[0].type);
        }
    }, [defaultVariants]);

    const handleBooking = () => {
        // Safe check for doctor
        if (!doctor) return;

        const currentVariant = defaultVariants.find((v: any) => v.type === selectedType);
        if (!currentVariant) return;

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

    const currentVariant = defaultVariants.find((v: any) => v.type === selectedType) || { price: doctor.consultationFee, nextSlot: 'Tommorrow', type: 'Clinic Visit' };

    return (
        <div className="min-h-screen bg-surface-50 dark:bg-surface-950 pb-24 font-sans text-slate-900 dark:text-white">
            {/* Top App Bar */}
            <PageHeader
                title="Doctor Profile"
                showSearch={false}
                showLocation={false}
                className="lg:top-20"
                actions={
                    <div className="flex items-center gap-1">
                        <button className="flex size-10 items-center justify-center rounded-full hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors">
                            <span className="material-symbols-outlined text-xl">share</span>
                        </button>
                        <button className="flex size-10 items-center justify-center rounded-full hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors">
                            <span className="material-symbols-outlined text-xl">favorite</span>
                        </button>
                    </div>
                }
            />

            {/* Doctor Header Profile */}
            <div className="relative flex flex-col items-center pt-6 pb-2 px-4 bg-surface-50 dark:bg-surface-950">
                <div className="flex flex-col items-center gap-4">
                    <div className="relative">
                        <div className="rounded-full h-32 w-32 border-4 border-surface-50 dark:border-surface-900 shadow-glass overflow-hidden relative">
                            <LazyImage
                                src={doctor.image}
                                alt={doctor.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="absolute bottom-1 right-1 bg-secondary text-white p-1.5 rounded-full border-2 border-surface-50 dark:border-surface-900 flex items-center justify-center shadow-sm z-10">
                            <span className="material-symbols-outlined text-[16px] font-bold">check</span>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center text-center">
                        <h1 className="text-2xl font-black leading-tight tracking-tight text-slate-900 dark:text-white">{doctor.name}</h1>
                        <p className="text-slate-500 dark:text-slate-400 text-base font-medium mt-1">{doctor.specialization}, {doctor.qualification}</p>
                        <div className="flex items-center gap-2 mt-2">
                            <span className="px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-primary text-xs font-bold border border-blue-100 dark:border-blue-800">Reg: {doctor.registrationNumber}</span>
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
            <div className="bg-surface-50 dark:bg-surface-950 px-4 py-4 mb-2">
                <div className="flex gap-3 overflow-x-auto no-scrollbar">
                    <div className="flex min-w-[100px] flex-1 flex-col gap-1 rounded-2xl bg-white dark:bg-surface-900 p-4 items-center text-center border border-surface-200 dark:border-surface-800 shadow-sm">
                        <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-full mb-1 text-primary">
                            <span className="material-symbols-outlined text-xl">medical_services</span>
                        </div>
                        <p className="text-xl font-black text-slate-900 dark:text-white">{doctor.experienceYears}</p>
                        <p className="text-slate-400 text-xs font-bold uppercase tracking-wide">Years Exp.</p>
                    </div>
                    <div className="flex min-w-[100px] flex-1 flex-col gap-1 rounded-2xl bg-white dark:bg-surface-900 p-4 items-center text-center border border-surface-200 dark:border-surface-800 shadow-sm">
                        <div className="bg-teal-100 dark:bg-teal-900/50 p-2 rounded-full mb-1 text-secondary">
                            <span className="material-symbols-outlined text-xl">groups</span>
                        </div>
                        <p className="text-xl font-black text-slate-900 dark:text-white">{doctor.totalConsultations}+</p>
                        <p className="text-slate-400 text-xs font-bold uppercase tracking-wide">Patients</p>
                    </div>
                    <div className="flex min-w-[100px] flex-1 flex-col gap-1 rounded-2xl bg-white dark:bg-surface-900 p-4 items-center text-center border border-surface-200 dark:border-surface-800 shadow-sm">
                        <div className="bg-amber-100 dark:bg-amber-900/50 p-2 rounded-full mb-1 text-amber-600">
                            <span className="material-symbols-outlined text-xl filled">star</span>
                        </div>
                        <p className="text-xl font-black text-slate-900 dark:text-white">{doctor.rating}</p>
                        <p className="text-slate-400 text-xs font-bold uppercase tracking-wide">Rating</p>
                    </div>
                </div>
            </div>

            {/* Enhanced About Section */}
            <div className="px-4 py-2">
                <section className="flex flex-col gap-5 rounded-[2rem] border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 p-6 shadow-sm">
                    <div className="flex items-center gap-2 text-primary border-b border-surface-100 dark:border-surface-800 pb-3">
                        <span className="material-symbols-outlined filled">info</span>
                        <h3 className="text-lg font-black uppercase tracking-tight">Biography</h3>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed font-medium">
                                {doctor.bio || `${doctor.name} is a renowned ${doctor.specialization} based in Kurnool. With over ${doctor.experienceYears} of clinical practice, they have successfully treated thousands of patients.`}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            <div className="flex items-start gap-3">
                                <div className="size-8 rounded-lg bg-teal-50 dark:bg-teal-900/20 flex items-center justify-center text-primary shrink-0">
                                    <span className="material-symbols-outlined text-lg">school</span>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Education</p>
                                    <p className="text-sm font-bold text-slate-800 dark:text-gray-200">{doctor.qualification}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="size-8 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-secondary shrink-0">
                                    <span className="material-symbols-outlined text-lg">workspace_premium</span>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Specialization</p>
                                    <div className="flex flex-wrap gap-1 mt-1">
                                        <span className="bg-gray-100 dark:bg-gray-800 text-[10px] font-bold px-2 py-0.5 rounded-md text-gray-600 dark:text-gray-400">{doctor.specialization}</span>
                                        {doctor.superSpecialization && (
                                            <span className="bg-gray-100 dark:bg-gray-800 text-[10px] font-bold px-2 py-0.5 rounded-md text-gray-600 dark:text-gray-400">{doctor.superSpecialization}</span>
                                        )}
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
                            className={`flex flex-col items-start gap-2 p-4 rounded-2xl border min-w-[140px] transition-all relative ${selectedType === v.type
                                ? 'bg-primary text-white border-primary shadow-lg shadow-primary/30'
                                : 'bg-white dark:bg-surface-900 border-surface-200 dark:border-surface-800 text-slate-700 dark:text-slate-300'
                                }`}
                        >
                            {selectedType === v.type && (
                                <div className="absolute top-2 right-2 bg-white/20 rounded-full p-0.5">
                                    <span className="material-symbols-outlined text-[16px] font-bold">check</span>
                                </div>
                            )}
                            <div className={`p-2 rounded-full flex items-center justify-center ${selectedType === v.type ? 'bg-white/20' : 'bg-surface-100 dark:bg-surface-800'}`}>
                                <span className="material-symbols-outlined text-xl">{v.icon}</span>
                            </div>
                            <div className="text-left">
                                <p className="text-sm font-bold leading-tight">{v.type}</p>
                                <p className={`text-xs mt-0.5 font-medium ${selectedType === v.type ? 'text-blue-100' : 'text-slate-400'}`}>{v.duration}</p>
                            </div>
                            <div className="mt-1 font-black text-lg">₹{v.price}</div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Prescription Upload Section */}
            <div className="px-4 py-2 mb-2">
                <div className="bg-white dark:bg-surface-900 rounded-[2rem] border border-surface-200 dark:border-surface-800 p-5 shadow-sm">
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
                <div className="flex flex-col gap-0 rounded-[2rem] bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-800 shadow-sm overflow-hidden">
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
                                <p className="text-lg font-bold leading-tight">{doctor.hospitalAffiliation || 'Sunrise Multi-Specialty Hospital'}</p>
                                <p className="text-gray-500 dark:text-gray-400 text-sm font-normal flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[16px]">location_on</span>
                                    N.R. Peta, Kurnool, Andhra Pradesh
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Availability / Timings */}
            <div className="px-4 py-2 mb-4">
                <h3 className="text-lg font-bold leading-tight mb-3 px-1">Availability</h3>
                <div className="rounded-[2rem] border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 p-4 shadow-sm">
                    <div className="flex items-center gap-4 mb-3">
                        <div className="size-10 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-primary shrink-0">
                            <span className="material-symbols-outlined">calendar_month</span>
                        </div>
                        <div className="flex flex-col">
                            <p className="font-bold">{doctor.availableDays.join(', ')}</p>
                            <p className="text-gray-500 dark:text-gray-400 text-sm">Working Days</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="size-10 rounded-full bg-teal-50 dark:bg-teal-900/30 flex items-center justify-center text-secondary shrink-0">
                            <span className="material-symbols-outlined">schedule</span>
                        </div>
                        <div className="flex flex-col">
                            {doctor.availableTimeSlots.map((slot, i) => (
                                <p key={i} className="font-bold">{slot}</p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Sticky Action Bar */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 dark:bg-surface-950/90 backdrop-blur-md border-t border-surface-200 dark:border-surface-800 z-40 pb-6 shadow-[0_-4px_20px_-4px_rgba(0,0,0,0.05)]">
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
