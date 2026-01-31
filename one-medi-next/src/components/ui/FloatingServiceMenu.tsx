'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

const SERVICES = [
  { id: 'meds', icon: 'medication', label: 'Medicines', path: '/medicines', color: 'text-blue-500', bg: 'bg-blue-50/80 dark:bg-blue-900/20' },
  { id: 'labs', icon: 'biotech', label: 'Lab Tests', path: '/lab-tests', color: 'text-teal-500', bg: 'bg-teal-50/80 dark:bg-teal-900/20' },
  { id: 'docs', icon: 'stethoscope', label: 'Doctors', path: '/doctors', color: 'text-purple-500', bg: 'bg-purple-50/80 dark:bg-purple-900/20' },
  { id: 'scans', icon: 'radiology', label: 'Scans', path: '/scans', color: 'text-indigo-500', bg: 'bg-indigo-50/80 dark:bg-indigo-900/20' },
  { id: 'home', icon: 'home_health', label: 'Home Care', path: '/home-care', color: 'text-pink-500', bg: 'bg-pink-50/80 dark:bg-pink-900/20' },
  { id: 'amb', icon: 'ambulance', label: 'Ambulance', path: '/ambulance', color: 'text-red-500', bg: 'bg-red-50/80 dark:bg-red-900/20' },
];

export default function FloatingServiceMenu() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={menuRef} className="fixed right-0 top-[60%] -translate-y-1/2 z-[90] flex items-center font-sans">
      {/* Menu Content - Slides out from right */}
      <div
        className={`
          flex flex-col gap-2 p-3 
          bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl 
          border-y border-l border-white/40 dark:border-slate-700/50 
          shadow-[0_8px_32px_0_rgba(13,148,136,0.15)] 
          rounded-l-[2rem] transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] origin-right
          ${isOpen ? 'translate-x-0 opacity-100 mr-0 scale-100' : 'translate-x-[120%] opacity-0 pointer-events-none scale-95'}
        `}
      >
        <div className="flex flex-col gap-1 min-w-[180px]">
          <div className="flex justify-between items-center mb-2 px-2">
            <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em]">Quick Access</span>
            <button
              onClick={() => setIsOpen(false)}
              className="size-6 rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all active:scale-90"
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          </div>

          {SERVICES.map((srv, index) => (
            <button
              key={srv.id}
              onClick={() => { router.push(srv.path); setIsOpen(false); }}
              style={{
                transitionDelay: isOpen ? `${index * 50}ms` : '0ms',
                transform: isOpen ? 'translateX(0)' : 'translateX(20px)',
                opacity: isOpen ? 1 : 0
              }}
              className={`
                  group flex items-center gap-3 p-2.5 pr-6 rounded-2xl 
                  hover:bg-primary/10 dark:hover:bg-primary/20 
                  transition-all duration-300 active:scale-[0.96] border border-transparent 
                  hover:border-primary/20 hover:shadow-sm
                `}
            >
              <div className={`size-10 rounded-xl flex items-center justify-center ${srv.bg} ${srv.color} shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 backdrop-blur-sm`}>
                <span className="material-symbols-outlined text-xl">{srv.icon}</span>
              </div>
              <div className="flex flex-col items-start overflow-hidden">
                <span className="text-[13px] font-bold text-slate-800 dark:text-slate-200 whitespace-nowrap group-hover:text-primary transition-colors">{srv.label}</span>
                <span className="text-[8px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity translate-y-1 group-hover:translate-y-0 duration-300">Open Service</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Toggle Handle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center justify-center w-10 h-32 
          bg-primary/90 dark:bg-primary/80 backdrop-blur-xl 
          shadow-[0_4px_20px_rgba(13,148,136,0.3)] 
          border-y border-l border-white/40 dark:border-slate-700/50
          rounded-l-2xl transition-all duration-500 relative z-50 hover:w-12 group -ml-[1px]
          ${isOpen ? 'translate-x-full opacity-0 pointer-events-none' : 'translate-x-0 opacity-100'}
        `}
      >
        <div className="flex flex-col items-center gap-3">
          <div className="size-7 rounded-lg bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-white text-lg animate-pulse drop-shadow-sm">
              grid_view
            </span>
          </div>
          <span className="text-[11px] font-black text-white uppercase tracking-[0.25em] [writing-mode:vertical-rl] rotate-180 drop-shadow-sm group-hover:tracking-[0.3em] transition-all">
            Quick Menu
          </span>
        </div>

        {/* Particle effect hint */}
        <div className="absolute top-1/2 -left-1 size-1 bg-white rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping"></div>
      </button>
    </div>
  );
}
