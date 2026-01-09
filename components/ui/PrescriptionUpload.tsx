import React, { useState, useRef } from 'react';

interface PrescriptionUploadProps {
  onUpload: (fileUrl: string | null) => void;
  initialUrl?: string | null;
  label?: string;
  subLabel?: string;
  required?: boolean;
}

export default function PrescriptionUpload({ 
  onUpload, 
  initialUrl = null, 
  label = "Upload Prescription",
  subLabel = "JPG, PNG or PDF (Max 5MB)",
  required = false
}: PrescriptionUploadProps) {
  const [fileUrl, setFileUrl] = useState<string | null>(initialUrl);
  const [isUploading, setIsUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      
      // Simulate network upload delay
      setTimeout(() => {
        const url = URL.createObjectURL(file);
        setFileUrl(url);
        onUpload(url);
        setIsUploading(false);
      }, 1500);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFileUrl(null);
    onUpload(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-bold flex items-center gap-2 text-slate-900 dark:text-white">
          <span className="material-symbols-outlined text-teal-500">upload_file</span>
          {label} {required && <span className="text-red-500">*</span>}
        </h3>
        {!required && !fileUrl && <span className="text-xs text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full">Optional</span>}
      </div>

      {!fileUrl ? (
        <label 
          className={`flex items-center gap-3 p-4 rounded-xl border border-dashed cursor-pointer transition-all group relative overflow-hidden ${isUploading ? 'bg-gray-50 border-gray-300 pointer-events-none' : 'bg-blue-50/50 dark:bg-blue-900/10 border-primary/40 hover:bg-blue-50 dark:hover:bg-blue-900/20'}`}
        >
          <input 
            ref={inputRef}
            type="file" 
            accept="image/*,application/pdf" 
            className="hidden" 
            onChange={handleFileChange}
          />
          
          <div className="size-10 rounded-lg bg-white dark:bg-gray-800 shadow-sm flex items-center justify-center text-primary group-hover:scale-110 transition-transform shrink-0 z-10">
            {isUploading ? (
              <span className="material-symbols-outlined animate-spin">progress_activity</span>
            ) : (
              <span className="material-symbols-outlined">add_a_photo</span>
            )}
          </div>
          
          <div className="flex flex-col z-10">
            <span className="text-sm font-medium text-primary">{isUploading ? 'Uploading...' : 'Tap to upload'}</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">{subLabel}</span>
          </div>

          {isUploading && (
            <div className="absolute bottom-0 left-0 h-1 bg-primary transition-all duration-[1500ms] ease-out w-full animate-pulse"></div>
          )}
        </label>
      ) : (
        <div className="relative flex items-center gap-3 p-3 rounded-xl border border-teal-200 dark:border-teal-800 bg-teal-50 dark:bg-teal-900/20">
          <div className="size-12 rounded-lg bg-white dark:bg-gray-800 bg-cover bg-center shrink-0 border border-teal-100 dark:border-teal-700" style={{backgroundImage: `url("${fileUrl}")`}}></div>
          <div className="flex-1">
             <p className="text-sm font-bold text-teal-700 dark:text-teal-400">Prescription Attached</p>
             <p className="text-xs text-teal-600/70 dark:text-teal-500/70">Ready to submit</p>
          </div>
          <button 
            onClick={handleRemove}
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors"
          >
            <span className="material-symbols-outlined">delete</span>
          </button>
          
          <div className="absolute top-2 right-2 pointer-events-none opacity-0 animate-in fade-in zoom-in duration-300">
             <span className="material-symbols-outlined text-teal-500 filled">check_circle</span>
          </div>
        </div>
      )}
    </div>
  );
}