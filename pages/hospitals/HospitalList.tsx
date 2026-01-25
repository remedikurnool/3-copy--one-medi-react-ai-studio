
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HOSPITALS } from '../../constants';

export default function HospitalList() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark text-slate-900 dark:text-white pb-24 font-sans">
      {/* Sticky Header Area */}
      <div className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800">
        {/* Top Bar */}
        <div className="flex items-center px-4 py-3 justify-between">
          <button onClick={() => navigate(-1)} className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="text-xl font-bold leading-tight flex-1 text-center pr-10">Find Hospitals</h1>
        </div>
        
        {/* Search Bar */}
        <div className="px-4 pb-3">
          <div className="flex w-full items-stretch rounded-xl h-14 bg-gray-100 dark:bg-gray-800 border border-transparent focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all">
            <div className="text-gray-500 flex items-center justify-center pl-4 pr-2">
              <span className="material-symbols-outlined text-2xl">search</span>
            </div>
            <input className="flex w-full min-w-0 flex-1 bg-transparent border-none focus:ring-0 text-base h-full placeholder:text-gray-500" placeholder="Search hospital, area, or specialty..." />
            <div className="flex items-center justify-center pr-4">
              <button className="flex items-center justify-center size-8 rounded-full bg-primary/10 text-primary">
                <span className="material-symbols-outlined text-[20px]">tune</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filter Chips */}
        <div className="flex gap-3 px-4 pb-4 overflow-x-auto no-scrollbar items-center">
          <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full bg-primary text-white px-4 shadow-md transition-colors">
            <span className="material-symbols-outlined text-[18px]">stethoscope</span>
            <p className="text-sm font-medium whitespace-nowrap">Specialty</p>
            <span className="material-symbols-outlined text-[18px]">arrow_drop_down</span>
          </button>
          {['Distance', 'Open Now', 'Insurance'].map(f => (
            <button key={f} className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-4 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <span className="material-symbols-outlined text-[18px] text-gray-500">{f === 'Distance' ? 'location_on' : f === 'Open Now' ? 'schedule' : 'verified_user'}</span>
              <p className="text-sm font-medium whitespace-nowrap">{f}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content List */}
      <div className="flex flex-col gap-4 p-4 pt-2">
        <div className="flex items-center justify-between pb-1">
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">{HOSPITALS.length} Hospitals found near <span className="text-primary font-bold">Kurnool</span></p>
          <div className="flex items-center gap-1 text-primary text-sm font-medium">
            <span className="material-symbols-outlined text-[18px]">map</span>
            <span>Map View</span>
          </div>
        </div>

        {/* Hospital Cards */}
        {HOSPITALS.map(hospital => (
          <div key={hospital.id} className="flex flex-col gap-0 rounded-2xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all">
            <div className="relative h-48 w-full bg-cover bg-center" style={{backgroundImage: `url("${hospital.image}")`}}>
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>
              {hospital.open24x7 && (
                <div className="absolute top-3 left-3 bg-green-500 text-white text-xs font-bold px-2.5 py-1 rounded-lg shadow-sm flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">check_circle</span>
                  Open 24/7
                </div>
              )}
              {hospital.insuranceAccepted && (
                <div className="absolute top-3 left-3 bg-secondary text-white text-xs font-bold px-2.5 py-1 rounded-lg shadow-sm flex items-center gap-1" style={{ marginLeft: hospital.open24x7 ? '90px' : '0' }}>
                  <span className="material-symbols-outlined text-[14px]">shield</span>
                  Insurance
                </div>
              )}
              <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-white/95 dark:bg-gray-900/95 px-2 py-1 rounded-lg shadow-sm">
                <span className="material-symbols-outlined text-yellow-500 text-[16px] filled">star</span>
                <span className="text-xs font-bold">{hospital.rating}</span>
                <span className="text-gray-500 text-xs">({hospital.reviews} reviews)</span>
              </div>
            </div>
            
            <div className="p-4 flex flex-col gap-3">
              <div>
                <h3 className="text-lg font-bold leading-tight">{hospital.name}</h3>
                <p className="text-secondary text-sm font-medium mt-1">{hospital.type}</p>
              </div>
              <div className="flex items-start gap-2 text-gray-500 dark:text-gray-400 text-sm">
                <span className="material-symbols-outlined text-[18px] shrink-0 mt-0.5">location_on</span>
                <p className="leading-snug">{hospital.location} <span className="text-gray-400">• {hospital.distance} away</span></p>
              </div>
              
              {hospital.facilities && (
                <div className="flex flex-wrap gap-2 mt-1">
                    {hospital.facilities.slice(0, 3).map((fac, i) => (
                        <span key={i} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-slate-600 dark:text-slate-300 text-[10px] font-bold uppercase rounded border border-gray-200 dark:border-gray-600">{fac}</span>
                    ))}
                    {hospital.facilities.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase rounded">+{hospital.facilities.length - 3}</span>
                    )}
                </div>
              )}

              <div className="h-px bg-gray-100 dark:bg-gray-700 my-1"></div>
              <div className="flex gap-3 mt-1">
                <button className="flex-1 h-12 rounded-xl bg-primary text-white font-bold text-base flex items-center justify-center gap-2 shadow-md shadow-primary/20 active:scale-[0.98] transition-all">
                  View Details
                </button>
                <button aria-label="Call Hospital" className="size-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center active:bg-primary/20 transition-colors">
                  <span className="material-symbols-outlined">call</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
