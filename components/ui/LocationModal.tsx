import React from 'react';
import { useLocationStore } from '../../store/locationStore';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LocationModal({ isOpen, onClose }: LocationModalProps) {
  const { detectLocation, setManualLocation, isDetecting, error, city: currentCity } = useLocationStore();

  const handleDetect = async () => {
    await detectLocation();
    onClose();
  };

  const handleSelectCity = (city: string) => {
    setManualLocation(city, `${city} City Center`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center p-0 sm:p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-800">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Select Location</h3>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <span className="material-symbols-outlined text-gray-500">close</span>
          </button>
        </div>

        <div className="p-5 max-h-[80vh] overflow-y-auto">
          
          {/* GPS Detection Button */}
          <button 
            onClick={handleDetect}
            disabled={isDetecting}
            className="w-full flex items-center gap-4 p-4 rounded-xl border-2 border-primary/10 bg-blue-50/50 dark:bg-blue-900/10 hover:border-primary/30 transition-all active:scale-[0.98] group"
          >
            <div className={`size-12 rounded-full flex items-center justify-center shrink-0 transition-colors ${isDetecting ? 'bg-gray-200 animate-pulse' : 'bg-white text-primary shadow-sm group-hover:bg-primary group-hover:text-white'}`}>
              {isDetecting ? (
                 <span className="material-symbols-outlined animate-spin">progress_activity</span>
              ) : (
                 <span className="material-symbols-outlined text-2xl">my_location</span>
              )}
            </div>
            <div className="text-left">
              <p className="text-base font-bold text-primary">
                {isDetecting ? 'Detecting Location...' : 'Use Current Location'}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Using GPS</p>
            </div>
            {!isDetecting && <span className="material-symbols-outlined text-gray-400 ml-auto">chevron_right</span>}
          </button>

          {error && (
            <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-300 text-xs font-medium rounded-lg flex items-center gap-2">
              <span className="material-symbols-outlined text-base">error</span>
              {error}
            </div>
          )}

          <div className="my-6 border-t border-gray-100 dark:border-gray-800 relative">
             <span className="absolute left-1/2 -top-2.5 -translate-x-1/2 bg-white dark:bg-gray-900 px-3 text-xs font-bold text-gray-400 uppercase tracking-widest">OR</span>
          </div>

          {/* Saved Addresses (Mock) */}
          <div className="mb-6">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Saved Addresses</h4>
            <div className="flex flex-col gap-2">
               <button onClick={() => handleSelectCity('Kurnool')} className="flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-colors text-left group">
                  <span className="material-symbols-outlined text-gray-400 group-hover:text-primary">home</span>
                  <div>
                    <p className="text-sm font-bold text-slate-800 dark:text-white">Home</p>
                    <p className="text-xs text-gray-500 truncate max-w-[200px]">Flat 402, Sai Residency, Kurnool</p>
                  </div>
               </button>
               <button onClick={() => handleSelectCity('Hyderabad')} className="flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-colors text-left group">
                  <span className="material-symbols-outlined text-gray-400 group-hover:text-primary">work</span>
                  <div>
                    <p className="text-sm font-bold text-slate-800 dark:text-white">Office</p>
                    <p className="text-xs text-gray-500 truncate max-w-[200px]">Hitech City, Hyderabad</p>
                  </div>
               </button>
            </div>
          </div>

          {/* Popular Cities */}
          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Popular Cities</h4>
            <div className="grid grid-cols-3 gap-3">
               {['Kurnool', 'Hyderabad', 'Bangalore', 'Vijayawada', 'Tirupati', 'Vizag'].map(city => (
                 <button 
                   key={city}
                   onClick={() => handleSelectCity(city)}
                   className={`px-2 py-2.5 rounded-lg text-sm font-bold border transition-all ${currentCity === city ? 'bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-900' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-primary hover:text-primary'}`}
                 >
                   {city}
                 </button>
               ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}