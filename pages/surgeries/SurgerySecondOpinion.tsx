
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { SURGERY_TYPES, DOCTORS, SURGERY_SPECIALTIES } from '../../constants';
import PrescriptionUpload from '../../components/ui/PrescriptionUpload';

export default function SurgerySecondOpinion() {
  const navigate = useNavigate();
  const location = useLocation();
  const initialState = location.state || {};

  const [step, setStep] = useState(1);
  const [selectedSpecialty, setSelectedSpecialty] = useState(initialState.category || '');
  const [selectedProcedure, setSelectedProcedure] = useState(initialState.procedure || '');
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
  const [report, setReport] = useState<string | null>(null);
  const [symptoms, setSymptoms] = useState('');

  // Filter doctors based on specialty (Mock logic mapping)
  const filteredDoctors = DOCTORS.filter(d => {
      if (!selectedSpecialty) return true;
      if (selectedSpecialty === 'Orthopedics') return d.specialty === 'Orthopedic'; // Mapping example
      if (selectedSpecialty === 'Gynecology') return d.specialty === 'Gynecologist';
      return true; // Default show all for demo if no map
  });

  const handleNext = () => {
      if (step === 1 && selectedProcedure) setStep(2);
      else if (step === 2 && selectedDoctor) setStep(3);
      else if (step === 3 && report) setStep(4);
  };

  const handlePay = () => {
      alert('Request Submitted! The doctor will review your case and contact you.');
      navigate('/surgeries');
  };

  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark text-slate-900 dark:text-white pb-24 font-sans">
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800 p-4 flex items-center gap-3">
         <button onClick={() => step > 1 ? setStep(step - 1) : navigate(-1)} className="size-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center transition-colors">
            <span className="material-symbols-outlined text-2xl">arrow_back</span>
         </button>
         <div>
             <h1 className="text-lg font-bold leading-none">Second Opinion</h1>
             <p className="text-xs text-gray-500 font-bold mt-0.5">Step {step} of 4</p>
         </div>
      </header>

      <main className="p-4 max-w-lg mx-auto flex flex-col gap-6">
         {/* Step Progress Bar */}
         <div className="h-1.5 w-full bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
            <div className="h-full bg-primary transition-all duration-300 ease-out" style={{ width: `${step * 25}%` }}></div>
         </div>

         {step === 1 && (
             <div className="animate-fade-in flex flex-col gap-6">
                 <div>
                    <h2 className="text-2xl font-black mb-2">Select Procedure</h2>
                    <p className="text-sm text-gray-500">What surgery have you been advised?</p>
                 </div>
                 
                 {/* Specialty Chips */}
                 <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                    {SURGERY_SPECIALTIES.filter(s => s.id !== 'all').map(spec => (
                        <button 
                            key={spec.id}
                            onClick={() => setSelectedSpecialty(spec.id)}
                            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${selectedSpecialty === spec.id ? 'bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-900' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'}`}
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
                            className={`p-4 rounded-2xl border-2 text-left transition-all flex justify-between items-center ${selectedProcedure === type.name ? 'border-primary bg-primary/5 shadow-sm' : 'border-gray-100 bg-white dark:bg-gray-800 dark:border-gray-700 hover:border-gray-300'}`}
                         >
                             <span className="font-bold text-sm">{type.name}</span>
                             <div className={`size-5 rounded-full border-2 flex items-center justify-center ${selectedProcedure === type.name ? 'border-primary' : 'border-gray-300'}`}>
                                {selectedProcedure === type.name && <div className="size-2.5 bg-primary rounded-full" />}
                             </div>
                         </button>
                     ))}
                 </div>
             </div>
         )}

         {step === 2 && (
             <div className="animate-fade-in flex flex-col gap-6">
                 <div>
                    <h2 className="text-2xl font-black mb-2">Choose Surgeon</h2>
                    <p className="text-sm text-gray-500">Select an expert for review.</p>
                 </div>
                 
                 <div className="flex flex-col gap-4">
                    {filteredDoctors.slice(0, 3).map(doc => (
                        <div 
                            key={doc.id}
                            onClick={() => setSelectedDoctor(doc.id)}
                            className={`p-4 rounded-2xl border-2 transition-all cursor-pointer relative ${selectedDoctor === doc.id ? 'border-primary bg-primary/5' : 'border-gray-100 bg-white dark:bg-gray-800 dark:border-gray-700'}`}
                        >
                            <div className="flex gap-4">
                                <div className="size-16 rounded-xl bg-gray-200 bg-cover bg-center shrink-0" style={{backgroundImage: `url("${doc.image}")`}}></div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-base">{doc.name}</h3>
                                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">{doc.specialty}</p>
                                    <p className="text-xs text-slate-600 dark:text-gray-300">{doc.experience} Years Exp • {doc.hospitalAffiliation}</p>
                                </div>
                            </div>
                            {selectedDoctor === doc.id && (
                                <div className="absolute top-4 right-4 text-primary">
                                    <span className="material-symbols-outlined filled">check_circle</span>
                                </div>
                            )}
                        </div>
                    ))}
                 </div>
             </div>
         )}

         {step === 3 && (
             <div className="animate-fade-in flex flex-col gap-6">
                 <div>
                    <h2 className="text-2xl font-black mb-2">Clinical Details</h2>
                    <p className="text-sm text-gray-500">Help the doctor understand your case.</p>
                 </div>

                 <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Symptoms / Current Condition</label>
                    <textarea 
                        className="w-full h-32 p-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:ring-2 focus:ring-primary outline-none resize-none"
                        placeholder="Describe your pain, history, and why surgery was advised..."
                        value={symptoms}
                        onChange={(e) => setSymptoms(e.target.value)}
                    ></textarea>
                 </div>

                 <div className="bg-white dark:bg-gray-800 p-5 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <PrescriptionUpload 
                        onUpload={setReport} 
                        initialUrl={report} 
                        label="Upload MRI / X-Ray / Prescription"
                        subLabel="Required for accurate opinion"
                        required 
                    />
                 </div>
             </div>
         )}

         {step === 4 && (
             <div className="animate-fade-in flex flex-col gap-6">
                 <div>
                    <h2 className="text-2xl font-black mb-2">Summary & Pay</h2>
                    <p className="text-sm text-gray-500">Review your request.</p>
                 </div>

                 <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
                     <div className="flex justify-between mb-3">
                         <span className="text-gray-500 text-xs uppercase font-bold tracking-wide">Procedure</span>
                         <span className="font-bold text-sm text-right">{selectedProcedure}</span>
                     </div>
                     <div className="flex justify-between mb-3">
                         <span className="text-gray-500 text-xs uppercase font-bold tracking-wide">Doctor</span>
                         <span className="font-bold text-sm text-right">{filteredDoctors.find(d => d.id === selectedDoctor)?.name}</span>
                     </div>
                     <div className="flex justify-between mb-4">
                         <span className="text-gray-500 text-xs uppercase font-bold tracking-wide">Report</span>
                         <span className="font-bold text-sm text-right text-green-600">Attached</span>
                     </div>
                     <div className="h-px bg-gray-100 dark:bg-gray-700 my-4"></div>
                     <div className="flex justify-between items-center">
                         <span className="font-black text-lg">Total Fee</span>
                         <span className="font-black text-xl text-primary">₹499</span>
                     </div>
                 </div>
                 
                 <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-2xl flex gap-3 items-start">
                    <span className="material-symbols-outlined text-blue-600 shrink-0">info</span>
                    <p className="text-xs text-blue-800 dark:text-blue-200 leading-relaxed">
                        The doctor will review your reports and provide a detailed audio/text opinion within 24 hours.
                    </p>
                 </div>

                 <button onClick={handlePay} className="w-full h-14 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black text-lg shadow-xl active:scale-95 transition-all mt-4">
                     Pay ₹499 & Submit
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
                className="w-full mt-auto h-14 bg-primary text-white rounded-2xl font-black text-lg shadow-xl active:scale-95 transition-all disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed"
             >
                 Next Step
             </button>
         )}
      </main>
    </div>
  );
}
