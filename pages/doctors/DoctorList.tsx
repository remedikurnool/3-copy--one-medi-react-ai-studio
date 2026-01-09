
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DOCTORS } from '../../constants';
import { useLocationStore } from '../../store/locationStore';
import LocationModal from '../../components/ui/LocationModal';

export default function DoctorList() {
  const navigate = useNavigate();
  const { city } = useLocationStore();
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [search, setSearch] = useState('');

  const specialties = ['All', 'General Physician', 'Cardiologist', 'Dentist', 'Orthopedic'];

  const filteredDoctors = DOCTORS.filter(doc => {
    const matchesSpecialty = selectedSpecialty === 'All' || doc.specialty === selectedSpecialty;
    const matchesSearch = doc.name.toLowerCase().includes(search.toLowerCase()) || doc.specialty.toLowerCase().includes(search.toLowerCase());
    return matchesSpecialty && matchesSearch;
  });

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden pb-24 bg-bg-light dark:bg-bg-dark font-sans text-slate-900 dark:text-white">
      <LocationModal isOpen={isLocationModalOpen} onClose={() => setIsLocationModalOpen(false)} />

      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 p-4 pb-2 transition-colors">
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
      </div>

      {/* Headline */}
      <div className="pt-5 px-4 pb-2">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Find Your Doctor</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 font-medium">Book appointments with top specialists</p>
      </div>

      {/* Sticky Search Bar */}
      <div className="px-4 py-3 sticky top-[72px] z-40 bg-bg-light dark:bg-bg-dark transition-colors shadow-sm lg:shadow-none">
        <label className="flex flex-col h-12 w-full shadow-sm">
          <div className="flex w-full flex-1 items-stretch rounded-xl h-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all">
            <div className="text-primary flex items-center justify-center pl-4 pr-2">
              <span className="material-symbols-outlined text-xl">search</span>
            </div>
            <input 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl bg-transparent text-slate-900 dark:text-white focus:outline-0 border-none ring-0 placeholder:text-gray-400 dark:placeholder:text-gray-500 px-2 text-base font-normal leading-normal" 
              placeholder="Search doctors, specialties..." 
            />
          </div>
        </label>
      </div>

      {/* Specialties Chips (Carousel) */}
      <div className="flex gap-2 px-4 py-2 overflow-x-auto no-scrollbar scroll-pl-4">
        {specialties.map(specialty => (
          <button 
            key={specialty}
            onClick={() => setSelectedSpecialty(specialty)}
            className={`flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-xl px-4 shadow-sm whitespace-nowrap active:scale-95 transition-transform ${selectedSpecialty === specialty ? 'bg-primary text-white shadow-lg shadow-blue-500/20' : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-slate-900 dark:text-white'}`}
          >
            <p className="text-sm font-semibold">{specialty}</p>
          </button>
        ))}
      </div>

      {/* Doctor Listing */}
      <div className="flex flex-col gap-4 p-4">
        {filteredDoctors.map((doc) => (
          <div 
            key={doc.id}
            onClick={() => navigate(`/doctors/${doc.id}`)}
            className="flex flex-col gap-3 rounded-2xl bg-white dark:bg-gray-800 p-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 dark:border-gray-700 transition-colors cursor-pointer active:scale-[0.99]"
          >
            <div className="flex items-start gap-4">
              <div className="relative shrink-0">
                <div 
                  className="w-20 h-20 rounded-xl bg-gray-200 bg-center bg-cover border border-gray-100 dark:border-gray-700" 
                  style={{backgroundImage: `url("${doc.image}")`}}
                ></div>
                <div className="absolute -bottom-2 -right-2 bg-white dark:bg-gray-800 p-1 rounded-full shadow-sm">
                  <span className="material-symbols-outlined filled text-green-500 text-[20px] bg-green-50 dark:bg-green-900/30 rounded-full p-0.5">verified</span>
                </div>
              </div>
              <div className="flex flex-col flex-1 gap-1">
                <div className="flex justify-between items-start">
                  <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight">{doc.name}</h3>
                  <div className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-900/20 px-1.5 py-0.5 rounded-md text-xs font-bold text-yellow-700 dark:text-yellow-400 border border-yellow-100 dark:border-yellow-800/30">
                    <span className="material-symbols-outlined text-[14px] filled">star</span>
                    {doc.rating}
                  </div>
                </div>
                <p className="text-secondary text-sm font-bold">{doc.specialty}</p>
                <p className="text-gray-500 dark:text-gray-400 text-xs font-normal">{doc.qualification} • {doc.experience}</p>
                <p className="text-gray-500 dark:text-gray-400 text-xs font-normal mt-1">{doc.hospital}</p>
              </div>
            </div>
            <div className="h-px bg-gray-100 dark:bg-gray-700 w-full my-1"></div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-xs font-medium">Consultation Fee</p>
                <p className="text-slate-900 dark:text-white text-lg font-bold">₹{doc.fee}</p>
              </div>
              <button className="flex flex-1 max-w-[180px] cursor-pointer items-center justify-center rounded-xl h-11 bg-primary hover:bg-primary-dark active:bg-blue-700 text-white gap-2 text-sm font-bold leading-normal shadow-lg shadow-blue-500/30 transition-all active:scale-[0.98]">
                <span className="material-symbols-outlined text-[18px]">calendar_add_on</span>
                Book Now
              </button>
            </div>
          </div>
        ))}
        {filteredDoctors.length === 0 && (
          <div className="text-center py-10 text-gray-400">
            <span className="material-symbols-outlined text-4xl mb-2">person_search</span>
            <p>No doctors found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
