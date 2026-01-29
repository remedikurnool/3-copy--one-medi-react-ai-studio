import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSurgeryPackages, ServiceMaster } from '../../hooks';

const SURGERY_SPECIALTIES = [
    { id: 'all', label: 'All', icon: 'category' },
    { id: 'Orthopedics', label: 'Ortho', icon: 'skeleton' },
    { id: 'Cardiology', label: 'Heart', icon: 'cardiology' },
    { id: 'General', label: 'General', icon: 'surgical' },
    { id: 'Eye', label: 'Eye', icon: 'visibility' },
    { id: 'ENT', label: 'ENT', icon: 'hearing' },
    { id: 'Gastro', label: 'Gastro', icon: 'gastroenterology' },
];

export default function SurgeryList() {
    const navigate = useNavigate();
    const [selectedSpecialty, setSelectedSpecialty] = useState('all');
    const [search, setSearch] = useState('');

    // Fetch surgery packages from Supabase
    const { data: surgeryPackages, loading, error } = useSurgeryPackages();

    const filteredSurgeries = (surgeryPackages || []).filter((pkg: ServiceMaster) => {
        const matchesSpecialty = selectedSpecialty === 'all' || pkg.category === selectedSpecialty || pkg.name.toLowerCase().includes(selectedSpecialty.toLowerCase());
        const matchesSearch = !search ||
            pkg.name.toLowerCase().includes(search.toLowerCase()) ||
            pkg.description?.toLowerCase().includes(search.toLowerCase());
        return matchesSpecialty && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-bg-light dark:bg-bg-dark font-sans text-slate-900 dark:text-white pb-24">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800">
                <div className="p-4 flex items-center gap-3">
                    <button onClick={() => navigate(-1)} className="size-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center transition-colors">
                        <span className="material-symbols-outlined text-2xl">arrow_back</span>
                    </button>
                    <div className="flex-1">
                        <h1 className="text-xl font-bold leading-none">Surgeries</h1>
                        <p className="text-xs text-gray-500 font-medium mt-0.5">Expert Care & Packages</p>
                    </div>
                    <button onClick={() => navigate('/surgeries/second-opinion')} className="px-3 py-1.5 bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-lg text-[10px] font-bold uppercase tracking-wide">
                        Get Opinion
                    </button>
                </div>

                {/* Search */}
                <div className="px-4 pb-2">
                    <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-2xl px-4 py-2.5 border border-transparent focus-within:border-primary/30 focus-within:ring-2 focus-within:ring-primary/10 transition-all">
                        <span className="material-symbols-outlined text-gray-400 text-xl">search</span>
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search surgery, symptom or hospital..."
                            className="bg-transparent border-none focus:ring-0 w-full text-sm font-medium ml-2 placeholder:text-gray-400"
                        />
                    </div>
                </div>

                {/* Specialty Filter */}
                <div className="flex gap-2 px-4 py-3 overflow-x-auto no-scrollbar">
                    {SURGERY_SPECIALTIES.map((spec) => (
                        <button
                            key={spec.id}
                            onClick={() => setSelectedSpecialty(spec.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all whitespace-nowrap active:scale-95 ${selectedSpecialty === spec.id ? 'bg-primary text-white border-primary shadow-md' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-slate-600 dark:text-gray-300'}`}
                        >
                            <span className="material-symbols-outlined text-lg">{spec.icon}</span>
                            <span className="text-xs font-bold uppercase tracking-wide">{spec.label}</span>
                        </button>
                    ))}
                </div>
            </header>

            <main className="p-4 flex flex-col gap-6">
                {/* Loading State */}
                {loading && (
                    <div className="flex items-center justify-center py-12">
                        <div className="animate-spin rounded-full h-10 w-10 border-2 border-primary border-t-transparent"></div>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="text-center py-8 text-red-500">
                        <span className="material-symbols-outlined text-4xl mb-2">error</span>
                        <p className="text-sm font-medium">Failed to load surgeries</p>
                    </div>
                )}

                {/* Second Opinion Banner */}
                {!loading && selectedSpecialty === 'all' && !search && (
                    <div
                        onClick={() => navigate('/surgeries/second-opinion')}
                        className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6 shadow-xl cursor-pointer group"
                    >
                        <div className="absolute right-0 top-0 size-40 bg-white/5 rounded-full -mr-10 -mt-10 blur-3xl"></div>
                        <div className="relative z-10 flex items-center justify-between gap-4">
                            <div>
                                <span className="bg-white/20 backdrop-blur-md px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-widest mb-2 inline-block">Free Consult</span>
                                <h2 className="text-xl font-black mb-1 leading-tight">Need a Second Opinion?</h2>
                                <p className="text-xs text-slate-300 max-w-[200px] mb-4">Upload your reports and get advice from top surgeons in Kurnool.</p>
                                <button className="bg-white text-slate-900 px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-200 transition-colors">Start Now</button>
                            </div>
                            <div className="size-24 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/10 shrink-0">
                                <span className="material-symbols-outlined text-5xl opacity-80">medical_services</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Surgery List */}
                {!loading && (
                    <div>
                        <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4 ml-1">
                            {selectedSpecialty === 'all' ? 'Popular Surgeries' : `${selectedSpecialty} Procedures`}
                        </h3>

                        {filteredSurgeries.length > 0 ? (
                            <div className="flex flex-col gap-4">
                                {filteredSurgeries.map((pkg: ServiceMaster) => (
                                    <div
                                        key={pkg.id}
                                        onClick={() => navigate(`/surgeries/detail/${pkg.id}`)}
                                        className="bg-white dark:bg-gray-800 p-4 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col gap-3 cursor-pointer active:scale-[0.98] transition-all hover:shadow-md"
                                    >
                                        <div className="flex gap-4">
                                            <div className="size-24 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 shrink-0 overflow-hidden relative flex items-center justify-center">
                                                <span className="material-symbols-outlined text-4xl text-primary/60">surgical</span>
                                            </div>
                                            <div className="flex-1 py-1 min-w-0">
                                                <div className="flex justify-between items-start">
                                                    <span className="text-[9px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded uppercase tracking-wider">{pkg.category}</span>
                                                    <span className="material-symbols-outlined text-gray-300">chevron_right</span>
                                                </div>
                                                <h4 className="text-base font-black leading-tight mb-1 truncate mt-1 text-slate-900 dark:text-white">{pkg.name}</h4>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 truncate flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-[14px]">apartment</span>
                                                    Available at Kurnool hospitals
                                                </p>
                                                <div className="mt-3 flex items-center gap-2">
                                                    {pkg.duration_minutes && (
                                                        <div className="flex items-center gap-1 bg-gray-50 dark:bg-gray-700/50 px-2 py-1 rounded-lg border border-gray-100 dark:border-gray-700">
                                                            <span className="material-symbols-outlined text-[12px] text-gray-500">schedule</span>
                                                            <span className="text-[10px] font-bold text-gray-600 dark:text-gray-300">{pkg.duration_minutes}m Procedure</span>
                                                        </div>
                                                    )}
                                                    {pkg.is_home_service && (
                                                        <div className="flex items-center gap-1 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-lg border border-green-100 dark:border-green-800">
                                                            <span className="material-symbols-outlined text-[12px] text-green-600">home_health</span>
                                                            <span className="text-[10px] font-bold text-green-600 dark:text-green-300">Home Care</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="h-px bg-gray-50 dark:bg-gray-700/50"></div>
                                        <div className="flex justify-between items-center px-1">
                                            <div>
                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Kurnool Best Rates</p>
                                                <p className="text-base font-black text-slate-900 dark:text-white">Contact for Quote</p>
                                            </div>
                                            <button className="text-primary text-xs font-black uppercase tracking-widest hover:underline">View Details</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12 flex flex-col items-center gap-3 opacity-60">
                                <span className="material-symbols-outlined text-4xl">search_off</span>
                                <p className="text-sm font-bold">No surgeries found.</p>
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}
