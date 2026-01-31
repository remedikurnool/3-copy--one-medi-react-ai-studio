'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Command } from 'cmdk';
import { globalSearch } from '../../lib/supabase';

const NAVIGATION_ITEMS = [
  { label: 'Emergency Ambulance', icon: 'ambulance', path: '/ambulance', color: 'text-red-500' },
  { label: 'My Bookings', icon: 'receipt_long', path: '/bookings', color: 'text-blue-500' },
  { label: 'Upload Prescription', icon: 'upload_file', path: '/upload-rx', color: 'text-primary' },
  { label: 'Diabetes Care Hub', icon: 'bloodtype', path: '/diabetes-care', color: 'text-orange-500' }
];

export default function GlobalSearchBar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<{ medicines: any[], doctors: any[], labs: any[] }>({
    medicines: [],
    doctors: [],
    labs: []
  });

  // Toggle the menu when ⌘K or Ctrl+K is pressed
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  // Handle Search Fetching
  const fetchResults = useCallback(async (q: string) => {
    if (q.length < 2) {
      setResults({ medicines: [], doctors: [], labs: [] });
      return;
    }
    setLoading(true);
    try {
      const data = await globalSearch(q);
      setResults(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchResults(query);
    }, 250); // Snappy debounce
    return () => clearTimeout(timer);
  }, [query, fetchResults]);

  const handleSelect = (path: string, id?: string, type?: string) => {
    setOpen(false);
    setQuery('');
    if (type === 'scan') {
      // Passing state via router.push is not supported in Next.js App Router in the same way.
      // We generally use query params.
      router.push(`${path}?scanId=${id}`);
    } else {
      router.push(path);
    }
  };

  return (
    <>
      {/* Trigger Button (Acts as the visual search bar) */}
      <div
        onClick={() => setOpen(true)}
        className="group relative flex items-center w-full h-12 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 cursor-text transition-all hover:border-primary/50 hover:bg-white dark:hover:bg-gray-700 shadow-sm"
      >
        <span className="material-symbols-outlined text-gray-400 group-hover:text-primary transition-colors">search</span>
        <span className="ml-3 text-sm text-gray-400 font-medium">Search medicines, specialists, lab tests...</span>
        <div className="ml-auto flex items-center gap-2">
          <kbd className="hidden sm:flex h-6 items-center gap-1 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-1.5 font-sans text-[10px] font-black text-gray-400">
            <span className="text-xs">⌘</span>K
          </kbd>
        </div>
      </div>

      {/* Command Menu Modal */}
      {open && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[8vh] px-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-300"
            onClick={() => setOpen(false)}
          ></div>

          <Command
            label="Global Search"
            className="animate-scale-in relative z-10 w-full max-w-2xl bg-white dark:bg-gray-900 rounded-[2rem] shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden flex flex-col h-auto max-h-[80vh]"
            shouldFilter={false} // We handle filtering via "Supabase" logic
          >
            <div className="flex items-center border-b border-gray-100 dark:border-gray-800 px-5">
              <span className="material-symbols-outlined text-primary text-2xl">search</span>
              <Command.Input
                autoFocus
                placeholder="Search symptoms, salts, or doctors..."
                value={query}
                onValueChange={setQuery}
                className="flex-1 h-16 bg-transparent border-none focus:ring-0 text-base font-semibold text-slate-900 dark:text-white placeholder:text-gray-400"
              />
              {loading && (
                <div className="flex items-center gap-2 mr-2">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Searching</span>
                  <span className="material-symbols-outlined animate-spin text-primary">progress_activity</span>
                </div>
              )}
              <button
                onClick={() => setOpen(false)}
                className="size-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            <Command.List className="no-scrollbar overflow-y-auto">
              <Command.Empty className="p-16 text-center text-gray-400">
                <div className="size-20 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100 dark:border-gray-700">
                  <span className="material-symbols-outlined text-4xl opacity-50">search_off</span>
                </div>
                <p className="text-base font-black text-slate-600 dark:text-gray-300">No matches for "{query}"</p>
                <p className="text-xs mt-2 font-medium">Try searching for a salt like <span className="text-primary cursor-pointer hover:underline" onClick={() => setQuery('Paracetamol')}>"Paracetamol"</span> or a specialty.</p>
              </Command.Empty>

              {/* 1. Quick Actions (Empty Query State) */}
              {!query && (
                <Command.Group heading="Frequently Accessed">
                  {NAVIGATION_ITEMS.map((item) => (
                    <Command.Item key={item.path} onSelect={() => handleSelect(item.path)}>
                      <div className={`size-10 rounded-xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center ${item.color} shadow-sm border border-white dark:border-gray-700`}>
                        <span className="material-symbols-outlined">{item.icon}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-800 dark:text-gray-200">{item.label}</span>
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">Quick Navigate</span>
                      </div>
                    </Command.Item>
                  ))}
                </Command.Group>
              )}

              {/* 2. Medicines Group with Prioritization Subtext */}
              {results.medicines.length > 0 && (
                <Command.Group heading={`Medicines found (${results.medicines.length})`}>
                  {results.medicines.map((med) => {
                    const matchBySalt = med.composition.toLowerCase().includes(query.toLowerCase());
                    const matchByIndication = med.indications.some((i: string) => i.toLowerCase().includes(query.toLowerCase()));

                    return (
                      <Command.Item key={med.id} onSelect={() => handleSelect(`/medicines/${med.id}`)}>
                        <div className="size-12 rounded-2xl bg-blue-50 dark:bg-blue-900/30 p-1.5 flex items-center justify-center border border-blue-100 dark:border-blue-800 shadow-sm shrink-0 relative overflow-hidden">
                          <Image src={med.image} alt="" fill className="object-contain" unoptimized />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-black text-slate-900 dark:text-white truncate tracking-tight">{med.name}</p>
                          <div className="flex flex-wrap gap-2 mt-0.5">
                            <span className={`text-[9px] font-black uppercase tracking-tighter px-1.5 py-0.5 rounded border ${matchBySalt ? 'bg-primary text-white border-primary' : 'bg-slate-100 text-slate-500 border-slate-200 dark:bg-slate-800 dark:border-slate-700'}`}>
                              {med.composition}
                            </span>
                            {matchByIndication && (
                              <span className="text-[9px] font-black uppercase tracking-tighter px-1.5 py-0.5 rounded bg-amber-500 text-white border-amber-500">
                                Matches symptom
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="font-black text-sm text-slate-900 dark:text-white">₹{med.price}</p>
                          {med.discount && <span className="text-[9px] text-emerald-500 font-black">{med.discount}</span>}
                        </div>
                      </Command.Item>
                    );
                  })}
                </Command.Group>
              )}

              {/* 3. Doctors Group */}
              {results.doctors.length > 0 && (
                <Command.Group heading={`Specialists in Kurnool (${results.doctors.length})`}>
                  {results.doctors.map((doc) => (
                    <Command.Item key={doc.id} onSelect={() => handleSelect(`/doctors/${doc.id}`)}>
                      <div
                        className="size-12 rounded-[1.25rem] bg-cover bg-center shrink-0 border border-slate-200 dark:border-slate-700 shadow-sm"
                        style={{ backgroundImage: `url("${doc.image}")` }}
                      ></div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-black text-slate-900 dark:text-white truncate tracking-tight">{doc.name}</p>
                          <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-900/20 px-1.5 py-0.5 rounded-md border border-amber-100 dark:border-amber-900/40">
                            <span className="text-[9px] font-black text-amber-600">{doc.rating}</span>
                            <span className="material-symbols-outlined text-[10px] filled text-amber-500">star</span>
                          </div>
                        </div>
                        <p className="text-[10px] text-primary font-black uppercase tracking-widest mt-0.5">{doc.specialty} • {doc.experience} Exp</p>
                      </div>
                      <span className="material-symbols-outlined text-gray-300">chevron_right</span>
                    </Command.Item>
                  ))}
                </Command.Group>
              )}

              {/* 4. Lab Tests Group */}
              {results.labs.length > 0 && (
                <Command.Group heading={`Lab Tests & Packages (${results.labs.length})`}>
                  {results.labs.map((lab) => (
                    <Command.Item key={lab.id} onSelect={() => handleSelect(`/lab-tests/${lab.id}`)}>
                      <div className="size-12 rounded-2xl bg-teal-50 dark:bg-teal-900/30 flex items-center justify-center text-teal-600 border border-teal-100 dark:border-teal-800 shadow-sm shrink-0">
                        <span className="material-symbols-outlined text-2xl">biotech</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-black text-slate-900 dark:text-white truncate tracking-tight">{lab.name}</p>
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-0.5">{lab.parameterCount} Parameters • {lab.reportTime} Report</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="font-black text-sm text-primary">₹{lab.price}</p>
                        <span className="text-[8px] bg-emerald-500 text-white px-2 py-0.5 rounded-full uppercase font-black tracking-widest shadow-sm">NABL</span>
                      </div>
                    </Command.Item>
                  ))}
                </Command.Group>
              )}
            </Command.List>

            {/* Navigation Hint Footer */}
            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <div className="flex items-center gap-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[16px]">keyboard_arrow_up</span><span className="material-symbols-outlined text-[16px]">keyboard_arrow_down</span> Navigate</span>
                <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[16px]">keyboard_return</span> Select</span>
              </div>
              <span className="text-[9px] font-black text-primary bg-primary/10 px-2 py-1 rounded border border-primary/20 uppercase tracking-widest">Powered by One Medi Engine</span>
            </div>
          </Command>
        </div>
      )}
    </>
  );
}
