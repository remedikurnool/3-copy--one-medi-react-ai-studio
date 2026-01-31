'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocationStore } from '@/store/locationStore';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const POPULAR_CITIES = ['Kurnool', 'Nandyal', 'Adoni', 'Dhone', 'Hyderabad', 'Bangalore'];

export default function LocationModal({ isOpen, onClose }: LocationModalProps) {
  const { city, address, setManualLocation } = useLocationStore();
  const [detecting, setDetecting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // close on escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleDetectLocation = () => {
    setDetecting(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          // Mock reverse geocoding for now
          // In real app, call Google Maps / Mapbox API here
          setTimeout(() => {
            setManualLocation('Kurnool', 'Near Raj Vihar Centre');
            setDetecting(false);
            onClose();
          }, 1500);
        },
        (error) => {
          console.error(error);
          setDetecting(false);
          alert('Could not detect location. Please select manually.');
        }
      );
    } else {
      setDetecting(false);
      alert('Geolocation is not supported by your browser');
    }
  };

  const handleCitySelect = (selectedCity: string) => {
    setManualLocation(selectedCity, address);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-end lg:items-center justify-center sm:p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-t-[2rem] lg:rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="p-6 pb-2 border-b border-slate-100 dark:border-slate-800">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-black text-slate-900 dark:text-white">Select Location</h2>
                <button
                  onClick={onClose}
                  className="size-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-red-500 flex items-center justify-center transition-colors"
                >
                  <span className="material-symbols-outlined text-xl">close</span>
                </button>
              </div>

              {/* Search Bar */}
              <div className="relative mb-4">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined">search</span>
                <input
                  type="text"
                  placeholder="Search for area, street name..."
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-3 pl-10 pr-4 font-semibold text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Content Scroll */}
            <div className="flex-1 overflow-y-auto p-6 pt-2">
              {/* Detect Location Button */}
              <button
                onClick={handleDetectLocation}
                disabled={detecting}
                className="w-full flex items-center gap-4 p-4 mb-6 rounded-2xl bg-primary/5 hover:bg-primary/10 border border-primary/20 text-primary transition-all group active:scale-[0.98]"
              >
                <div className={`size-10 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/30 ${detecting ? 'animate-pulse' : ''}`}>
                  <span className="material-symbols-outlined text-xl">
                    {detecting ? 'location_searching' : 'my_location'}
                  </span>
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-base leading-tight">Use Current Location</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {detecting ? 'Detecting GPS...' : 'Using GPS'}
                  </p>
                </div>
                {!detecting && (
                  <span className="material-symbols-outlined ml-auto text-primary opacity-0 group-hover:opacity-100 transition-opacity">arrow_forward</span>
                )}
              </button>

              {/* Recent / Popular Cities */}
              <div className="mb-4">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Popular Cities</h3>
                <div className="grid grid-cols-3 gap-3">
                  {POPULAR_CITIES.filter(c => c.toLowerCase().includes(searchTerm.toLowerCase())).map((c) => (
                    <button
                      key={c}
                      onClick={() => handleCitySelect(c)}
                      className={`py-2 px-3 rounded-xl text-sm font-bold border transition-all ${city === c
                        ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20'
                        : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-primary hover:text-primary'
                        }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}