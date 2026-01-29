
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ICU_EQUIPMENT_RATES, NURSE_RATES } from '../../constants';
import { useHomeCareServices, ServiceMaster } from '../../hooks';

export default function ICUCalculator() {
    const navigate = useNavigate();
    const [days, setDays] = useState(15);
    const [nurseType, setNurseType] = useState<'icu' | 'general'>('icu');
    const [shifts, setShifts] = useState(2); // 1 = 12hr, 2 = 24hr
    const [equipment, setEquipment] = useState({
        ventilator: true,
        monitor: true,
        oxygen: true,
        hospitalBed: true,
        syringePump: false
    });

    // Fetch dynamic rates
    const { data: services, loading } = useHomeCareServices();
    const [rates, setRates] = useState({ nurse: NURSE_RATES, equipment: ICU_EQUIPMENT_RATES });

    useEffect(() => {
        if (services && services.length > 0) {
            const newRates = { ...rates };

            // Update Nurse Rates
            const icuNurse = services.find(s => s.name.toLowerCase().includes('icu nurse'));
            const generalNurse = services.find(s => s.name.toLowerCase().includes('nursing') && !s.name.toLowerCase().includes('icu'));

            if (icuNurse?.price) newRates.nurse.icu = icuNurse.price;
            if (generalNurse?.price) newRates.nurse.general = generalNurse.price;

            // Update Equipment Rates
            // Note: Assuming price in DB is per day/session similar to shifts or daily rental
            const equipmentMap: Record<string, string> = {
                ventilator: 'ventilator',
                monitor: 'monitor',
                oxygen: 'oxygen',
                hospitalBed: 'bed',
                syringePump: 'pump'
            };

            Object.entries(equipmentMap).forEach(([key, search]) => {
                const item = services.find(s => s.name.toLowerCase().includes(search));
                if (item?.price) {
                    // If price is very high (purchase), ignore. If rental (low), use it.
                    // Threshold: < 5000/day assumed rental.
                    if (item.price < 5000) {
                        newRates.equipment[key as keyof typeof ICU_EQUIPMENT_RATES] = item.price;
                    }
                }
            });

            setRates(newRates);
        }
    }, [services]);

    const toggleEq = (key: keyof typeof equipment) => {
        setEquipment(prev => ({ ...prev, [key]: !prev[key] }));
    };

    // Calculations
    const dailyEquipmentCost = Object.entries(equipment).reduce((acc, [key, active]) => {
        return active ? acc + (rates.equipment[key as keyof typeof ICU_EQUIPMENT_RATES] || 0) : acc;
    }, 0);

    const dailyNurseCost = rates.nurse[nurseType] * shifts;
    const totalDailyCost = dailyEquipmentCost + dailyNurseCost;
    const totalEstimate = totalDailyCost * days;

    return (
        <div className="min-h-screen bg-bg-light dark:bg-bg-dark text-slate-900 dark:text-white pb-32 font-sans">
            <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800 p-4 flex items-center gap-3">
                <button onClick={() => navigate(-1)} className="size-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center transition-colors">
                    <span className="material-symbols-outlined text-2xl">arrow_back</span>
                </button>
                <div>
                    <h1 className="text-lg font-bold">ICU Cost Estimator</h1>
                    {loading && <p className="text-[10px] text-primary animate-pulse">Updating live rates...</p>}
                </div>
            </header>

            <main className="p-4 max-w-xl mx-auto flex flex-col gap-6">
                {/* Duration */}
                <section className="bg-white dark:bg-gray-800 p-5 rounded-3xl shadow-sm">
                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Duration</h3>
                    <div className="flex items-center gap-4">
                        <input
                            type="range"
                            min="1"
                            max="60"
                            value={days}
                            onChange={(e) => setDays(parseInt(e.target.value))}
                            className="flex-1 accent-primary"
                        />
                        <div className="bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-xl font-black text-lg min-w-[80px] text-center">
                            {days} Days
                        </div>
                    </div>
                </section>

                {/* Nursing */}
                <section className="bg-white dark:bg-gray-800 p-5 rounded-3xl shadow-sm">
                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Nursing Care</h3>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                        <button onClick={() => setNurseType('icu')} className={`p-3 rounded-xl font-bold text-sm border-2 transition-all ${nurseType === 'icu' ? 'border-primary bg-primary/5 text-primary' : 'border-gray-100 dark:border-gray-700'}`}>
                            ICU Nurse
                            <span className="block text-xs font-normal text-gray-500 mt-1">₹{rates.nurse.icu}/shift</span>
                        </button>
                        <button onClick={() => setNurseType('general')} className={`p-3 rounded-xl font-bold text-sm border-2 transition-all ${nurseType === 'general' ? 'border-primary bg-primary/5 text-primary' : 'border-gray-100 dark:border-gray-700'}`}>
                            General Nurse
                            <span className="block text-xs font-normal text-gray-500 mt-1">₹{rates.nurse.general}/shift</span>
                        </button>
                    </div>
                    <div className="flex gap-3">
                        <button onClick={() => setShifts(1)} className={`flex-1 p-3 rounded-xl font-bold text-sm border-2 transition-all ${shifts === 1 ? 'border-primary bg-primary/5 text-primary' : 'border-gray-100 dark:border-gray-700'}`}>12 Hours</button>
                        <button onClick={() => setShifts(2)} className={`flex-1 p-3 rounded-xl font-bold text-sm border-2 transition-all ${shifts === 2 ? 'border-primary bg-primary/5 text-primary' : 'border-gray-100 dark:border-gray-700'}`}>24 Hours</button>
                    </div>
                </section>

                {/* Equipment */}
                <section className="bg-white dark:bg-gray-800 p-5 rounded-3xl shadow-sm">
                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Equipment Needed</h3>
                    <div className="flex flex-col gap-3">
                        {Object.entries(equipment).map(([key, active]) => (
                            <button
                                key={key}
                                onClick={() => toggleEq(key as keyof typeof equipment)}
                                className={`flex justify-between items-center p-3 rounded-xl border transition-all ${active ? 'border-primary bg-blue-50 dark:bg-blue-900/20' : 'border-gray-100 dark:border-gray-700'}`}
                            >
                                <div className="text-left">
                                    <span className="font-medium capitalize block">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                                    <span className="text-xs text-gray-500">₹{rates.equipment[key as keyof typeof ICU_EQUIPMENT_RATES]}/day</span>
                                </div>
                                {active && <span className="material-symbols-outlined text-primary text-sm filled">check_circle</span>}
                            </button>
                        ))}
                    </div>
                </section>

                {/* Total */}
                <div className="fixed bottom-0 left-0 w-full bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 p-4 pb-6 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] z-40">
                    <div className="max-w-xl mx-auto">
                        <div className="flex justify-between items-end mb-4">
                            <span className="text-gray-500 text-sm font-medium">Estimated Cost</span>
                            <div className="text-right">
                                <span className="text-3xl font-black text-slate-900 dark:text-white block leading-none">₹{totalEstimate.toLocaleString()}</span>
                                <span className="text-xs text-gray-400 font-bold">₹{totalDailyCost}/day approx</span>
                            </div>
                        </div>
                        <button onClick={() => alert('Consultation Request Sent!')} className="w-full h-14 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black text-lg uppercase tracking-widest shadow-xl active:scale-95 transition-all">
                            Book Consultation
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
