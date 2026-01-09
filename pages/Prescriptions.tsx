import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PrescriptionUpload from '../components/ui/PrescriptionUpload';

// Mock Data for Past Prescriptions
const PAST_PRESCRIPTIONS = [
  { id: 1, date: '12 Oct 2023', doctor: 'Dr. Ramesh Gupta', type: 'Medicine', url: 'https://cdn-icons-png.flaticon.com/512/3004/3004458.png' },
  { id: 2, date: '25 Sep 2023', doctor: 'Dr. Priya Sharma', type: 'Lab Test', url: 'https://cdn-icons-png.flaticon.com/512/3004/3004458.png' },
];

export default function Prescriptions() {
  const navigate = useNavigate();
  const [showUpload, setShowUpload] = useState(false);
  const [prescriptions, setPrescriptions] = useState(PAST_PRESCRIPTIONS);

  const handleUploadNew = (url: string | null) => {
    if (url) {
      const newPrescription = {
        id: Date.now(),
        date: 'Today',
        doctor: 'Self Uploaded',
        type: 'Record',
        url: url
      };
      setPrescriptions([newPrescription, ...prescriptions]);
      setShowUpload(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark text-slate-900 dark:text-white pb-28 font-sans">
      <header className="sticky top-0 z-50 bg-white dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 px-4 py-3">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate(-1)}
            className="flex size-10 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <span className="material-symbols-outlined text-[24px]">arrow_back</span>
          </button>
          <h1 className="text-lg font-bold">My Prescriptions</h1>
        </div>
      </header>

      <main className="p-4 flex flex-col gap-6">
        {/* Upload Action */}
        {!showUpload ? (
          <button 
            onClick={() => setShowUpload(true)}
            className="w-full py-4 rounded-2xl border-2 border-dashed border-primary/50 bg-blue-50/50 dark:bg-blue-900/10 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-primary flex flex-col items-center justify-center gap-2 transition-all active:scale-[0.98]"
          >
            <div className="size-12 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow-sm text-primary">
              <span className="material-symbols-outlined text-2xl">add</span>
            </div>
            <span className="font-bold">Upload New Prescription</span>
          </button>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 animate-in fade-in slide-in-from-top-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold">New Upload</h2>
              <button onClick={() => setShowUpload(false)} className="text-gray-400 hover:text-red-500">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <PrescriptionUpload onUpload={handleUploadNew} label="Select File" />
          </div>
        )}

        {/* List */}
        <section>
          <h2 className="font-bold text-gray-500 uppercase text-xs mb-3 px-1">Past Records</h2>
          <div className="flex flex-col gap-3">
            {prescriptions.map((p) => (
              <div key={p.id} className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-4">
                <div className="size-16 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-3xl text-gray-400">description</span>
                </div>
                <div className="flex-1">
                   <h3 className="font-bold text-sm leading-tight">{p.doctor}</h3>
                   <p className="text-xs text-gray-500 mt-1">{p.type} • {p.date}</p>
                </div>
                <button className="p-2 text-primary hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-full">
                  <span className="material-symbols-outlined">visibility</span>
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}