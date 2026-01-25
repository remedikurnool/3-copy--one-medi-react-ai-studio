
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const SERVICES = [
  { id: 'meds', icon: 'medication', label: 'Medicines', path: '/medicines', color: 'text-blue-500', bg: 'bg-blue-50/80 dark:bg-blue-900/20' },
  { id: 'labs', icon: 'biotech', label: 'Lab Tests', path: '/lab-tests', color: 'text-teal-500', bg: 'bg-teal-50/80 dark:bg-teal-900/20' },
  { id: 'docs', icon: 'stethoscope', label: 'Doctors', path: '/doctors', color: 'text-purple-500', bg: 'bg-purple-50/80 dark:bg-purple-900/20' },
  { id: 'scans', icon: 'radiology', label: 'Scans', path: '/scans', color: 'text-indigo-500', bg: 'bg-indigo-50/80 dark:bg-indigo-900/20' },
  { id: 'home', icon: 'home_health', label: 'Home Care', path: '/home-care', color: 'text-pink-500', bg: 'bg-pink-50/80 dark:bg-pink-900/20' },
  { id: 'amb', icon: 'ambulance', label: 'Ambulance', path: '/ambulance', color: 'text-red-500', bg: 'bg-red-50/80 dark:bg-red-900/20' },
];

export default function FloatingServiceMenu() {
  const navigate = useNavigate();
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
    <div ref={menuRef} className="fixed right-0 top-1/2 -translate-y-1/2 z-[90] flex items-center font-sans">
      {/* Menu Content - Slides out from right */}
      <div 
        className={`
          flex flex-col gap-2 p-3 
          bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl 
          border-y border-l border-white/40 dark:border-slate-700/50 
          shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] 
          rounded-l-2xl transition-all duration-500 ease-cubic-bezier(0.4, 0, 0.2, 1) origin-right
          ${isOpen ? 'translate-x-0 opacity-100 mr-0' : 'translate-x-[120%] opacity-0 pointer-events-none'}
        `}
      >
        <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center mb-2 px-1">
                <span className="text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Quick Access</span>
                <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-sm">close</span>
                </button>
            </div>
            {SERVICES.map((srv) => (
            <button
                key={srv.id}
                onClick={() => { navigate(srv.path); setIsOpen(false); }}
                className="group flex items-center gap-3 p-2 pr-6 rounded-xl hover:bg-white/50 dark:hover:bg-slate-800/50 transition-all active:scale-95 border border-transparent hover:border-white/20"
            >
                <div className={`size-9 rounded-lg flex items-center justify-center ${srv.bg} ${srv.color} shadow-sm group-hover:scale-110 transition-transform backdrop-blur-sm`}>
                    <span className="material-symbols-outlined text-lg">{srv.icon}</span>
                </div>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-200 whitespace-nowrap group-hover:text-primary transition-colors">{srv.label}</span>
            </button>
            ))}
        </div>
      </div>

      {/* Toggle Handle */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center justify-center w-9 h-28 
          bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl 
          shadow-[0_4px_30px_rgba(0,0,0,0.1)] 
          border-y border-l border-white/40 dark:border-slate-700/50
          rounded-l-xl transition-all duration-300 relative z-50 hover:w-10 group -ml-[1px]
          ${isOpen ? 'translate-x-full opacity-0 pointer-events-none' : 'translate-x-0 opacity-100'}
        `}
      >
        <div className="flex flex-col items-center gap-2">
            <span className="material-symbols-outlined text-primary text-xl animate-pulse drop-shadow-sm">
                grid_view
            </span>
            <span className="text-[10px] font-black text-primary uppercase tracking-widest [writing-mode:vertical-rl] rotate-180 drop-shadow-sm">
                Menu
            </span>
        </div>
      </button>
    </div>
  );
}
