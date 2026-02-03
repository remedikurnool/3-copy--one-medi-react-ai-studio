'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { SURGERY_TYPES, DOCTORS, SURGERY_SPECIALTIES } from '@/constants';
import PrescriptionUpload from '@/components/ui/PrescriptionUpload';
import PageHeader from '@/components/ui/PageHeader';

function SecondOpinionForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const initialProcedure = searchParams.get('procedure') || '';
    const initialCategory = searchParams.get('category') || '';

    const [step, setStep] = useState(1);
    const [selectedSpecialty, setSelectedSpecialty] = useState(initialCategory);
    const [selectedProcedure, setSelectedProcedure] = useState(initialProcedure);
    const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
    const [report, setReport] = useState<string | null>(null);
    const [symptoms, setSymptoms] = useState('');

    // Filter doctors based on specialty (Mock logic mapping)
    const filteredDoctors = DOCTORS.filter(d => {
        if (!selectedSpecialty) return true;
        if (selectedSpecialty === 'Orthopedics') return d.specialty === 'Orthopedic' || d.specialty === 'General Physician';
        if (selectedSpecialty === 'Gynecology') return d.specialty === 'Gynecologist' || d.specialty === 'General Physician';
        return true;
    });

    const handleNext = () => {
        if (step === 1 && selectedProcedure) setStep(2);
        else if (step === 2 && selectedDoctor) setStep(3);
        else if (step === 3 && report) setStep(4);
    };

    const handlePay = () => {
        alert('Request Submitted! The doctor will review your case and contact you.');
        router.push('/surgeries');
    };

    return (
        <div className="min-h-screen bg-bg-light dark:bg-bg-dark text-slate-900 dark:text-white pb-24 font-sans">
            <PageHeader
                title="Second Opinion"
                subtitle={`Step ${step} of 4`}
                showCart={false}
                showLocation={false}
                className="lg:top-20"
                backUrl={step > 1 ? undefined : undefined} // PageHeader handles router.back() by default if backUrl is undefined
                customBackAction={step > 1 ? () => setStep(step - 1) : undefined}
            />

            <main className="p-4 pt-6 max-w-xl mx-auto flex flex-col gap-8 w-full">
                {/* Step Progress Bar */}
                <div className="h-1.5 w-full bg-indigo-50 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-primary transition-all duration-500 ease-out shadow-[0_0_10px_rgba(13,148,136,0.5)]" style={{ width: `${step * 25}%` }}></div>
                </div>

                {step === 1 && (
                    <div className="animate-fade-in flex flex-col gap-6">
                        <div className="text-center">
                            <h2 className="text-2xl font-black mb-2 tracking-tight">Select Surgery</h2>
                            <p className="text-sm text-gray-500 font-medium">Which procedure have you been advised?</p>
                        </div>

                        {/* Specialty Chips */}
                        <div className="flex flex-wrap justify-center gap-2">
                            {SURGERY_SPECIALTIES.filter(s => s.id !== 'all').map(spec => (
                                <button
                                    key={spec.id}
                                    onClick={() => setSelectedSpecialty(spec.id)}
                                    className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${selectedSpecialty === spec.id ? 'bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-900 shadow-md transform scale-105' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-gray-300'}`}
                                >
                                    {spec.label}
                                </button>
                            ))}
                        </div>

                        <div className="flex flex-col gap-3">
                            {SURGERY_TYPES.map(type => (
                                <button
                                    key={type.id}
                                    onClick={() => setSelectedProcedure(type.name)}
                                    className={`p-5 rounded-2xl border-2 text-left transition-all flex justify-between items-center group ${selectedProcedure === type.name ? 'border-primary bg-primary/5 shadow-md' : 'border-gray-100 bg-white dark:bg-gray-800 dark:border-gray-700 hover:border-gray-200 hover:shadow-sm'}`}
                                >
                                    <span className={`font-bold text-sm ${selectedProcedure === type.name ? 'text-primary' : 'text-slate-700 dark:text-slate-200'}`}>{type.name}</span>
                                    <div className={`size-5 rounded-full border-2 flex items-center justify-center transition-colors ${selectedProcedure === type.name ? 'border-primary' : 'border-gray-300 group-hover:border-gray-400'}`}>
                                        <div className={`size-2.5 bg-primary rounded-full transition-transform ${selectedProcedure === type.name ? 'scale-100' : 'scale-0'}`} />
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="animate-fade-in flex flex-col gap-6">
                        <div className="text-center">
                            <h2 className="text-2xl font-black mb-2 tracking-tight">Choose Surgeon</h2>
                            <p className="text-sm text-gray-500 font-medium">Select an expert for your review.</p>
                        </div>

                        <div className="flex flex-col gap-4">
                            {filteredDoctors.slice(0, 3).map(doc => (
                                <div
                                    key={doc.id}
                                    onClick={() => setSelectedDoctor(doc.id)}
                                    className={`p-4 rounded-[1.5rem] border-2 transition-all cursor-pointer relative group ${selectedDoctor === doc.id ? 'border-primary bg-primary/5 shadow-md' : 'border-gray-100 bg-white dark:bg-gray-800 dark:border-gray-700 hover:border-gray-200 hover:shadow-sm'}`}
                                >
                                    <div className="flex gap-4 items-center">
                                        <div className="size-16 rounded-2xl bg-gray-200 bg-cover bg-center shrink-0 shadow-inner" style={{ backgroundImage: `url("${doc.image}")` }}></div>
                                        <div className="flex-1">
                                            <h3 className={`font-black text-base ${selectedDoctor === doc.id ? 'text-primary' : 'text-slate-900 dark:text-white'}`}>{doc.name}</h3>
                                            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">{doc.specialty}</p>
                                            <div className="flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-gray-300">
                                                <span className="bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded text-[10px] font-bold">{doc.experience} Exp</span>
                                                <span>•</span>
                                                <span>{doc.hospital}</span>
                                            </div>
                                        </div>
                                    </div>
                                    {selectedDoctor === doc.id && (
                                        <div className="absolute top-4 right-4 text-primary bg-white dark:bg-gray-900 rounded-full">
                                            <span className="material-symbols-outlined filled text-xl">check_circle</span>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="animate-fade-in flex flex-col gap-6">
                        <div className="text-center">
                            <h2 className="text-2xl font-black mb-2 tracking-tight">Clinical Details</h2>
                            <p className="text-sm text-gray-500 font-medium">Help the doctor understand your case.</p>
                        </div>

                        <div className="flex flex-col gap-3">
                            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Symptoms / History</label>
                            <textarea
                                className="w-full h-40 p-5 rounded-[1.5rem] border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm font-medium focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none resize-none shadow-sm transition-all placeholder:text-gray-400"
                                placeholder="Describe your pain, history, and why surgery was advised. The more details, the better..."
                                value={symptoms}
                                onChange={(e) => setSymptoms(e.target.value)}
                            ></textarea>
                        </div>

                        <div className="bg-white dark:bg-gray-800 p-6 rounded-[2rem] shadow-sm border border-gray-100 dark:border-gray-700">
                            <PrescriptionUpload
                                onUpload={setReport}
                                initialUrl={report}
                                label="Upload Reports"
                                subLabel="MRI / X-Ray / Previous Prescription"
                            />
                        </div>
                    </div>
                )}

                {step === 4 && (
                    <div className="animate-fade-in flex flex-col gap-6">
                        <div className="text-center">
                            <h2 className="text-2xl font-black mb-2 tracking-tight">Summary & Pay</h2>
                            <p className="text-sm text-gray-500 font-medium">Review details before payment.</p>
                        </div>

                        <div className="bg-white dark:bg-gray-800 p-8 rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-gray-700 relative overflow-hidden">
                            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-30"></div>

                            <div className="flex justify-between items-center mb-6 border-b border-gray-50 dark:border-gray-700 pb-4">
                                <span className="text-gray-400 text-[10px] uppercase font-black tracking-widest">Procedure</span>
                                <span className="font-black text-base text-right">{selectedProcedure}</span>
                            </div>
                            <div className="flex justify-between items-center mb-6 border-b border-gray-50 dark:border-gray-700 pb-4">
                                <span className="text-gray-400 text-[10px] uppercase font-black tracking-widest">Surgeon</span>
                                <span className="font-bold text-sm text-right">{filteredDoctors.find(d => d.id === selectedDoctor)?.name}</span>
                            </div>
                            <div className="flex justify-between items-center mb-6">
                                <span className="text-gray-400 text-[10px] uppercase font-black tracking-widest">Reports</span>
                                <span className="font-bold text-xs text-right text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-lg border border-emerald-100 dark:border-emerald-800/30">Attached Successfully</span>
                            </div>

                            <div className="bg-slate-50 dark:bg-gray-900/50 p-4 rounded-2xl flex justify-between items-center mt-2">
                                <span className="font-black text-lg text-slate-900 dark:text-white">Total Fee</span>
                                <span className="font-black text-2xl text-primary">₹499</span>
                            </div>
                        </div>

                        <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-2xl flex gap-4 items-start border border-blue-100 dark:border-blue-800/30">
                            <span className="material-symbols-outlined text-blue-600 shrink-0 text-xl">info</span>
                            <p className="text-xs text-blue-800 dark:text-blue-200 leading-relaxed font-medium">
                                The doctor will review your reports and provide a detailed audio/text opinion within 24 hours. You can chat with them for clarifications.
                            </p>
                        </div>

                        <button onClick={handlePay} className="w-full h-16 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black text-base uppercase tracking-widest shadow-xl hover:shadow-2xl hover:-translate-y-1 active:scale-[0.98] transition-all mt-2 flex items-center justify-center gap-2">
                            Pay ₹499 & Submit
                            <span className="material-symbols-outlined text-lg">arrow_forward</span>
                        </button>
                    </div>
                )}

                {step < 4 && (
                    <button
                        onClick={handleNext}
                        disabled={
                            (step === 1 && !selectedProcedure) ||
                            (step === 2 && !selectedDoctor) ||
                            (step === 3 && (!report || symptoms.length < 10))
                        }
                        className="w-full mt-auto h-16 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black text-base uppercase tracking-widest shadow-xl hover:shadow-2xl hover:-translate-y-1 active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed disabled:shadow-none flex items-center justify-center gap-2"
                    >
                        Next Step
                        <span className="material-symbols-outlined text-lg">arrow_forward</span>
                    </button>
                )}
            </main>
        </div>
    );
}

export default function SecondOpinionPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-bg-light dark:bg-bg-dark flex items-center justify-center">
                <span className="material-symbols-outlined text-4xl text-slate-300 animate-spin">sync</span>
            </div>
        }>
            <SecondOpinionForm />
        </Suspense>
    );
}
