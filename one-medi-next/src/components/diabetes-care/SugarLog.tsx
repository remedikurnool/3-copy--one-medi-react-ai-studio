import React, { useState } from 'react';

const TABS = [
    { id: 'fasting', label: 'Fasting' },
    { id: 'pp', label: 'Post-Meal' },
    { id: 'random', label: 'Random' },
];

export default function SugarLog() {
    const [activeTab, setActiveTab] = useState('fasting');
    const [value, setValue] = useState('');

    return (
        <section className="bg-white dark:bg-gray-800 p-4 rounded-3xl shadow-sm border border-slate-100 dark:border-gray-700 mb-6">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="material-symbols-outlined text-rose-500">water_drop</span>
                    Log Blood Sugar
                </h3>
                <button className="text-[10px] text-blue-600 font-bold uppercase tracking-wider">View History</button>
            </div>

            {/* Tabs */}
            <div className="flex bg-slate-100 dark:bg-gray-700 p-1 rounded-xl mb-4">
                {TABS.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-wide rounded-lg transition-all
                            ${activeTab === tab.id
                                ? 'bg-white dark:bg-gray-600 text-slate-900 dark:text-white shadow-sm'
                                : 'text-slate-400 hover:text-slate-600'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="flex gap-3">
                <div className="relative flex-1">
                    <input
                        type="number"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder="0"
                        className="w-full text-3xl font-black bg-transparent border-b-2 border-slate-200 dark:border-gray-600 focus:border-blue-500 outline-none pb-1 placeholder:text-slate-200 text-slate-900 dark:text-white transition-colors"
                    />
                    <span className="absolute bottom-2 right-0 text-xs text-slate-400 font-bold">mg/dL</span>
                </div>

                <button className="bg-blue-600 text-white rounded-xl px-6 font-bold shadow-lg shadow-blue-200 dark:shadow-none active:scale-95 transition-transform flex flex-col justify-center items-center gap-0.5">
                    <span className="material-symbols-outlined text-lg">save</span>
                    <span className="text-[9px] uppercase tracking-wider">Save</span>
                </button>
            </div>

            {/* Context/Nudge */}
            {value && (
                <div className="mt-3 text-[10px] font-medium text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-2 rounded-lg flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">check_circle</span>
                    Normal range for fasting is 70-100 mg/dL.
                </div>
            )}
        </section>
    );
}
