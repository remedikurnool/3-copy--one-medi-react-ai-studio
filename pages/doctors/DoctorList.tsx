import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DOCTORS } from '../../constants';
import { useLocationStore } from '../../store/locationStore';
import LocationModal from '../../components/ui/LocationModal';
import { DoctorCardSkeleton } from '../../components/ui/Skeletons';

export default function DoctorList() {
  const navigate = useNavigate();
  const { city } = useLocationStore();
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const specialties = ['All', 'General Physician', 'Cardiologist', 'Dentist', 'Gynecologist', 'Pediatrician', 'Dermatologist'];

  // Simulate loading
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [selectedSpecialty, search]);

  const filteredDoctors = DOCTORS.filter(doc => {
    const matchesSpecialty = selectedSpecialty === 'All' || doc.specialty === selectedSpecialty;
    const matchesSearch = doc.name.toLowerCase().includes(search.toLowerCase()) || doc.specialty.toLowerCase().includes(search.toLowerCase());
    return matchesSpecialty && matchesSearch;
  });

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden pb-24 bg-bg-light dark:bg-bg-dark font-sans text-slate-900 dark:text-white">
      <LocationModal isOpen={isLocationModalOpen} onClose={() => setIsLocationModalOpen(false)} />

      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 p-4 transition-colors">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('/')}
              className="text-primary flex size-10 shrink-0 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-900/20 active:scale-95 transition-transform"
            >
              <span className="material-symbols-outlined text-2xl">arrow_back</span>
            </button>
            <div>
              <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">ONE MEDI</h2>
              <div 
                onClick={() => setIsLocationModalOpen(true)}
                className="flex items-center gap-1 text-sm text-secondary font-medium cursor-pointer hover:text-primary transition-colors"
              >
                <span className="material-symbols-outlined text-[16px] filled">location_on</span>
                <span>{city || 'Kurnool'}, AP</span>
                <span className="material-symbols-outlined text-[16px]">expand_more</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Headline */}
      <div className="pt-5 px-4 pb-2">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Find Your Doctor</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 font-medium">Book appointments with top specialists</p>
      </div>

      {/* Unified Sticky Filter Bar (Search + Specialty) */}
      <div className="sticky top-[72px] z-40 bg-bg-light/95 dark:bg-bg-dark/95 backdrop-blur-sm transition-colors shadow-sm border-b border-gray-100 dark:border-gray-800 pb-3">
        <div className="px-4 py-3">
          <label className="flex flex-col h-12 w-full shadow-sm">
            <div className="flex w-full flex-1 items-stretch rounded-xl h-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all">
              <div className="text-primary flex items-center justify-center pl-4 pr-2">
                <span className="material-symbols-outlined text-xl">search</span>
              </div>
              <input 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl bg-transparent text-slate-900 dark:text-white focus:outline-0 border-none ring-0 placeholder:text-gray-400 dark:placeholder:text-gray-500 px-2 text-base font-medium leading-normal" 
                placeholder="Search name or hospital..." 
              />
              {search && (
                <button onClick={() => setSearch('')} className="pr-4 text-gray-400">
                  <span className="material-symbols-outlined text-xl">close</span>
                </button>
              )}
            </div>
          </label>
        </div>

        {/* Sticky Specialty Filter Chips */}
        <div className="flex gap-2 px-4 overflow-x-auto no-scrollbar scroll-pl-4">
          {specialties.map(specialty => (
            <button 
              key={specialty}
              onClick={() => setSelectedSpecialty(specialty)}
              className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full px-4 shadow-sm whitespace-nowrap active:scale-95 transition-all ${
                selectedSpecialty === specialty 
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md ring-2 ring-primary/10' 
                  : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-slate-600 dark:text-gray-400'
              }`}
            >
              <p className="text-[11px] font-black uppercase tracking-wider">{specialty}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Doctor Listing */}
      <main className="flex-1 flex flex-col gap-4 p-4">
        {/* Results Summary */}
        <div className="flex justify-between items-center mb-2 px-1">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.1em]">
            {isLoading ? 'Searching...' : `Available Doctors (${filteredDoctors.length})`}
          </p>
          {(selectedSpecialty !== 'All' || search) && (
            <button 
              onClick={() => { setSelectedSpecialty('All'); setSearch(''); }}
              className="text-[10px] font-black text-primary uppercase underline underline-offset-4"
            >
              Clear
            </button>
          )}
        </div>

        <div className="flex flex-col gap-4">
          {isLoading ? (
            Array(4).fill(0).map((_, i) => <DoctorCardSkeleton key={i} />)
          ) : (
            filteredDoctors.map((doc) => (
              <div 
                key={doc.id}
                onClick={() => navigate(`/doctors/${doc.id}`)}
                className="flex flex-col gap-3 rounded-[2rem] bg-white dark:bg-gray-800 p-5 shadow-glass border border-gray-100 dark:border-gray-700 transition-all cursor-pointer active:scale-[0.99] hover:shadow-float"
              >
                <div className="flex items-start gap-4">
                  <div className="relative shrink-0">
                    <div 
                      className="size-20 rounded-2xl bg-gray-200 bg-center bg-cover border border-gray-100 dark:border-gray-700 shadow-sm" 
                      style={{backgroundImage: `url("${doc.image}")`}}
                    ></div>
                    <div className="absolute -bottom-1 -right-1 bg-green-500 text-white size-6 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center shadow-sm">
                      <span className="material-symbols-outlined text-[14px] font-black">check</span>
                    </div>
                  </div>
                  <div className="flex flex-col flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="text-slate-900 dark:text-white text-lg font-black leading-tight truncate tracking-tight">{doc.name}</h3>
                      <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-900/20 px-1.5 py-0.5 rounded-lg text-[10px] font-black text-amber-600 border border-amber-100 dark:border-amber-800/30 shrink-0">
                        <span className="material-symbols-outlined text-[14px] filled">star</span>
                        {doc.rating}
                      </div>
                    </div>
                    <p className="text-primary text-xs font-black uppercase tracking-wider mt-0.5">{doc.specialty}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-xs font-bold mt-1 line-clamp-1">{doc.qualification} • {doc.experience} Exp</p>
                    <div className="flex items-center gap-1 text-gray-400 text-[10px] font-bold mt-2 uppercase tracking-tight">
                       <span className="material-symbols-outlined text-[14px]">apartment</span>
                       <span className="truncate">{doc.hospital}</span>
                    </div>
                  </div>
                </div>
                
                <div className="h-px bg-gray-100 dark:bg-gray-700/50 w-full mt-1"></div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-[9px] font-black uppercase tracking-widest">Consultation Fee</p>
                    <p className="text-slate-900 dark:text-white text-xl font-black tracking-tighter">₹{doc.fee}</p>
                  </div>
                  <button className="flex-1 max-w-[140px] flex items-center justify-center rounded-xl h-11 bg-primary hover:bg-primary-dark text-white gap-2 text-xs font-black uppercase tracking-widest shadow-lg shadow-primary/25 transition-all">
                    Book Now
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        
        {!isLoading && filteredDoctors.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center gap-4 opacity-50">
            <div className="size-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-4xl">person_search</span>
            </div>
            <div>
               <p className="font-black uppercase tracking-widest">No results found</p>
               <p className="text-xs font-bold text-gray-500 mt-1">Try changing specialty or search term</p>
            </div>
          </div>
        )}
      </main>

      {/* Floating Filter Button (Optional Shortcut) */}
      <button className="fixed bottom-28 right-6 z-40 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full pl-5 pr-6 py-3 shadow-float flex items-center gap-3 font-black text-xs uppercase tracking-widest active:scale-95 transition-all">
        <span className="material-symbols-outlined text-lg">tune</span>
        Filter
      </button>
    </div>
  );
}
