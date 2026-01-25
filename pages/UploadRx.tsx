
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';

const INSTRUCTIONS = [
  { icon: 'person_check', text: 'Doctor details & signature must be visible', color: 'text-blue-500 bg-blue-50 dark:bg-blue-900/20' },
  { icon: 'calendar_month', text: 'Date of issue should be within 6 months', color: 'text-green-500 bg-green-50 dark:bg-green-900/20' },
  { icon: 'blur_off', text: 'Ensure image is sharp and not cropped', color: 'text-orange-500 bg-orange-50 dark:bg-orange-900/20' },
];

export default function UploadRx() {
  const navigate = useNavigate();
  const setPrescription = useCartStore((state) => state.setPrescription);
  
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState<'Prescription' | 'Report'>('Prescription');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      const url = URL.createObjectURL(selectedFile);
      setFile(selectedFile);
      setPreview(url);
      
      // Simulate AI Analysis
      setIsAnalyzing(true);
      setTimeout(() => setIsAnalyzing(false), 2000);
    }
  };

  const handleContinue = () => {
    if (preview) {
      setPrescription(preview);
      if (activeTab === 'Prescription') {
          navigate('/cart');
      } else {
          // Could navigate to a specific report analysis page or chat
          navigate('/cart'); 
      }
    }
  };

  const clearFile = () => {
    setFile(null);
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (cameraInputRef.current) cameraInputRef.current.value = '';
  };

  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark font-sans text-slate-900 dark:text-white flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 px-4 py-3 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="size-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <span className="material-symbols-outlined text-2xl">arrow_back</span>
        </button>
        <h1 className="text-lg font-bold">Upload Documents</h1>
        <div className="size-10"></div>
      </header>

      <main className="flex-1 p-4 flex flex-col max-w-md mx-auto w-full">
        
        {/* Tabs */}
        <div className="flex p-1 bg-gray-200 dark:bg-gray-800 rounded-xl mb-6">
           <button 
             onClick={() => setActiveTab('Prescription')} 
             className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'Prescription' ? 'bg-white dark:bg-gray-700 shadow-sm text-primary' : 'text-gray-500'}`}
           >
             <span className="material-symbols-outlined text-lg">description</span>
             Prescription
           </button>
           <button 
             onClick={() => setActiveTab('Report')} 
             className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'Report' ? 'bg-white dark:bg-gray-700 shadow-sm text-primary' : 'text-gray-500'}`}
           >
             <span className="material-symbols-outlined text-lg">lab_profile</span>
             Lab Report
           </button>
        </div>

        {!preview ? (
          <div className="flex flex-col gap-6 animate-fade-in">
            {/* Upload Area */}
            <div className="bg-white dark:bg-gray-800 rounded-[2rem] p-8 shadow-sm border-2 border-dashed border-primary/30 flex flex-col items-center justify-center text-center gap-4 relative overflow-hidden group">
               <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
               
               <div className="size-20 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-primary mb-2 shadow-inner">
                  <span className="material-symbols-outlined text-5xl">cloud_upload</span>
               </div>
               
               <div>
                 <h2 className="text-xl font-black mb-1">Upload {activeTab}</h2>
                 <p className="text-sm text-gray-500 dark:text-gray-400">JPG, PNG or PDF (Max 5MB)</p>
               </div>

               <div className="flex gap-3 w-full mt-4">
                  {/* Hidden Inputs */}
                  <input ref={fileInputRef} type="file" accept="image/*,application/pdf" className="hidden" onChange={handleFileSelection} />
                  <input ref={cameraInputRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={handleFileSelection} />

                  <button 
                    onClick={() => cameraInputRef.current?.click()}
                    className="flex-1 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all"
                  >
                    <span className="material-symbols-outlined text-lg">photo_camera</span>
                    Camera
                  </button>
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="flex-1 py-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-600 active:scale-95 transition-all"
                  >
                    <span className="material-symbols-outlined text-lg">photo_library</span>
                    Gallery
                  </button>
               </div>
            </div>

            {/* Instructions */}
            <div className="flex flex-col gap-4">
               <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest px-1">Valid {activeTab} Guide</h3>
               {INSTRUCTIONS.map((ins, i) => (
                 <div key={i} className="flex items-center gap-4 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className={`size-10 rounded-xl flex items-center justify-center shrink-0 ${ins.color}`}>
                       <span className="material-symbols-outlined text-xl">{ins.icon}</span>
                    </div>
                    <p className="text-sm font-medium text-slate-700 dark:text-gray-300">{ins.text}</p>
                 </div>
               ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col h-full animate-slide-up">
             {/* Preview Card */}
             <div className="relative bg-white dark:bg-gray-800 rounded-[2rem] p-2 shadow-lg border border-gray-100 dark:border-gray-700 mb-6 group">
                <div className="relative h-[400px] w-full rounded-[1.5rem] overflow-hidden bg-gray-100 dark:bg-gray-900">
                   <img src={preview} alt="Preview" className="size-full object-contain" />
                   
                   {/* Analyzing Overlay */}
                   {isAnalyzing && (
                     <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center text-white z-10">
                        <div className="size-16 border-4 border-white/20 border-t-primary rounded-full animate-spin mb-4"></div>
                        <p className="font-bold text-lg animate-pulse">Analyzing Document...</p>
                        <p className="text-xs text-white/70 mt-1">Checking clarity & validity</p>
                     </div>
                   )}

                   {!isAnalyzing && (
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 animate-in zoom-in duration-300">
                         <span className="material-symbols-outlined text-lg filled">check_circle</span>
                         <span className="text-xs font-black uppercase tracking-wide">Document Valid</span>
                      </div>
                   )}
                </div>
                
                <button 
                  onClick={clearFile}
                  className="absolute top-4 right-4 size-10 bg-black/50 hover:bg-red-500 text-white rounded-full flex items-center justify-center backdrop-blur-md transition-colors"
                >
                   <span className="material-symbols-outlined">delete</span>
                </button>
             </div>

             {/* Actions */}
             <div className="mt-auto">
                <p className="text-center text-xs text-gray-500 dark:text-gray-400 mb-4 px-6">
                   By continuing, you agree to share your medical records with our pharmacists for order processing.
                </p>
                <div className="flex gap-3">
                   <button 
                     onClick={clearFile}
                     className="flex-1 h-14 rounded-2xl border-2 border-gray-200 dark:border-gray-700 font-bold text-slate-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                   >
                     Retake
                   </button>
                   <button 
                     onClick={handleContinue}
                     disabled={isAnalyzing}
                     className="flex-[2] h-14 rounded-2xl bg-primary text-white font-black text-lg shadow-xl shadow-primary/30 flex items-center justify-center gap-2 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
                   >
                     Continue
                     <span className="material-symbols-outlined">arrow_forward</span>
                   </button>
                </div>
             </div>
          </div>
        )}
      </main>
    </div>
  );
}
