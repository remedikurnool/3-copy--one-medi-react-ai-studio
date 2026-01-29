
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HOSPITALS } from '../../constants';

export default function HospitalList() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark text-slate-900 dark:text-white pb-24 font-sans">
      <div className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center px-4 py-3 justify-between">
          <button onClick={() => navigate('/')} className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="text-xl font-bold leading-tight flex-1 text-center pr-10">Find Hospitals</h1>
        </div>
        
        <div className="px-4 pb-3">
          <div className="flex w-full items-stretch rounded-xl h-14 bg-gray-100 dark:bg-gray-800 border border-transparent focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all">
            <div className="text-gray-500 flex items-center justify-center pl-4 pr-2">
              <span className="material-symbols-outlined text-2xl">search</span>
            </div>
            <input className="flex w-full min-w-0 flex-1 bg-transparent border-none focus:ring-0 text-base h-full placeholder:text-gray-500" placeholder="Search hospital or specialty..." />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 p-4">
        {HOSPITALS.map(hospital => (
          <div 
            key={hospital.id} 
            onClick={() => navigate(`/hospitals/${hospital.id}`)}
            className="flex flex-col gap-0 rounded-3xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all cursor-pointer active:scale-[0.98]"
          >
            <div className="relative h-48 w-full bg-cover bg-center" style={{backgroundImage: `url("${hospital.image}")`}}>
              <div className="absolute top-3 left-3 bg-green-500 text-white text-[10px] font-black px-2.5 py-1 rounded-lg shadow-sm flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">check_circle</span>
                Open 24/7
              </div>
            </div>
            
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-bold leading-tight">{hospital.name}</h3>
                  <p className="text-secondary text-sm font-medium mt-0.5">{hospital.type}</p>
                </div>
                <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-900/20 px-1.5 py-0.5 rounded text-xs font-bold text-amber-600">
                    <span className="material-symbols-outlined text-sm filled">star</span> {hospital.rating}
                </div>
              </div>
              <div className="flex items-start gap-2 text-gray-500 dark:text-gray-400 text-sm">
                <span className="material-symbols-outlined text-[18px] shrink-0 mt-0.5">location_on</span>
                <p className="leading-snug">{hospital.location} • {hospital.distance} away</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
