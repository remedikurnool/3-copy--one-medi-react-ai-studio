'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const RecordCard = ({ title, date, type, value, status }: any) => (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col gap-2 animate-slide-up">
        <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
                <div className={`size-8 rounded-lg flex items-center justify-center text-white ${type === 'vitals' ? 'bg-red-500' : 'bg-blue-500'}`}>
                    <span className="material-symbols-outlined text-sm">{type === 'vitals' ? 'monitor_heart' : 'article'}</span>
                </div>
                <div>
                    <h4 className="font-bold text-sm dark:text-white">{title}</h4>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400">{date}</p>
                </div>
            </div>
            {status && <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${status === 'Normal' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'}`}>{status}</span>}
        </div>
        {value && <p className="text-xl font-bold pl-10 dark:text-white">{value}</p>}
    </div>
);

// Initial Mock Data
const INITIAL_RECORDS = [
    { id: 1, title: 'Blood Pressure', date: '14 Oct, 9:00 AM', type: 'vitals', value: '120/80 mmHg', status: 'Normal' },
    { id: 2, title: 'Full Body Checkup', date: '12 Oct, 11:30 AM', type: 'report', status: 'Completed', value: 'Report Generated' },
    { id: 3, title: 'Fasting Sugar', date: '25 Sep, 8:00 AM', type: 'vitals', value: '95 mg/dL', status: 'Normal' },
];

export default function HealthRecords() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('timeline');
    const [records, setRecords] = useState(INITIAL_RECORDS);
    const [showAddModal, setShowAddModal] = useState(false);

    // Form State
    const [newRecord, setNewRecord] = useState({
        type: 'vitals', // vitals | report
        title: '',
        value: ''
    });

    const handleAddRecord = () => {
        if (!newRecord.title || !newRecord.value) return;

        const record = {
            id: Date.now(),
            title: newRecord.title,
            value: newRecord.value,
            type: newRecord.type,
            date: 'Just Now',
            status: newRecord.type === 'vitals' ? 'Normal' : 'Uploaded'
        };

        setRecords([record, ...records]);
        setShowAddModal(false);
        setNewRecord({ type: 'vitals', title: '', value: '' });
    };

    return (
        <div className="min-h-screen bg-bg-light dark:bg-bg-dark text-slate-900 dark:text-white pb-10 font-sans relative">
            <header className="sticky top-0 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 px-4 py-3">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <button onClick={() => router.back()} className="size-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                            <span className="material-symbols-outlined text-[24px]">arrow_back</span>
                        </button>
                        <h1 className="text-lg font-bold">Health Records</h1>
                    </div>
                    <button onClick={() => router.push('/prescriptions')} className="bg-primary/10 text-primary px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-primary hover:text-white transition-colors">
                        Rx Vault
                    </button>
                </div>

                <div className="flex p-1 bg-gray-100 dark:bg-gray-800 rounded-xl">
                    <button onClick={() => setActiveTab('timeline')} className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'timeline' ? 'bg-white dark:bg-gray-700 shadow-sm text-primary' : 'text-gray-500'}`}>Timeline</button>
                    <button onClick={() => setActiveTab('vitals')} className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'vitals' ? 'bg-white dark:bg-gray-700 shadow-sm text-primary' : 'text-gray-500'}`}>Vitals</button>
                    <button onClick={() => setActiveTab('reports')} className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'reports' ? 'bg-white dark:bg-gray-700 shadow-sm text-primary' : 'text-gray-500'}`}>Reports</button>
                </div>
            </header>

            <main className="p-4 flex flex-col gap-4">
                {activeTab === 'timeline' && (
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="material-symbols-outlined text-gray-400">calendar_today</span>
                            <h3 className="font-bold text-gray-500 text-sm uppercase">Recent</h3>
                        </div>
                        {records.map(r => (
                            <RecordCard key={r.id} {...r} />
                        ))}
                    </div>
                )}

                {activeTab === 'vitals' && (
                    <div className="grid grid-cols-2 gap-3 animate-fade-in">
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                            <div className="flex items-center gap-2 mb-2 text-red-500">
                                <span className="material-symbols-outlined">favorite</span>
                                <span className="text-xs font-bold uppercase">Heart Rate</span>
                            </div>
                            <p className="text-2xl font-bold">72 <span className="text-sm font-normal text-gray-400">bpm</span></p>
                            <p className="text-[10px] text-gray-400 mt-1">Last checked: 2 days ago</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                            <div className="flex items-center gap-2 mb-2 text-blue-500">
                                <span className="material-symbols-outlined">water_drop</span>
                                <span className="text-xs font-bold uppercase">Blood Sugar</span>
                            </div>
                            <p className="text-2xl font-bold">98 <span className="text-sm font-normal text-gray-400">mg/dL</span></p>
                            <p className="text-[10px] text-gray-400 mt-1">Fasting • 1 week ago</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 col-span-2">
                            <div className="flex justify-between mb-2">
                                <div className="flex items-center gap-2 text-purple-500">
                                    <span className="material-symbols-outlined">monitor_weight</span>
                                    <span className="text-xs font-bold uppercase">Weight Log</span>
                                </div>
                                <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded">-2 kg</span>
                            </div>
                            <div className="h-24 flex items-end justify-between gap-2 px-2">
                                {[74, 73.5, 73, 72.8, 72.2, 72].map((w, i) => (
                                    <div key={i} className="flex flex-col items-center gap-1 group">
                                        <div className="w-8 bg-purple-200 dark:bg-purple-900/40 rounded-t-lg group-hover:bg-purple-500 transition-colors relative" style={{ height: `${(w - 60) * 4}px` }}>
                                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white px-1.5 rounded">{w}</div>
                                        </div>
                                        <span className="text-[10px] text-gray-400">W{i + 1}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'reports' && (
                    <div className="flex flex-col gap-3 animate-fade-in">
                        {records.filter(r => r.type === 'report').map((r) => (
                            <div key={r.id} className="flex gap-4 p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 items-center">
                                <div className="size-12 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-xl flex items-center justify-center shrink-0">
                                    <span className="material-symbols-outlined">picture_as_pdf</span>
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-sm">{r.title}</h4>
                                    <p className="text-xs text-gray-500">{r.date} • PDF</p>
                                </div>
                                <button className="size-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-gray-400">download</span>
                                </button>
                            </div>
                        ))}
                        {records.filter(r => r.type === 'report').length === 0 && (
                            <div className="text-center py-10 text-gray-400">
                                <p>No reports uploaded yet.</p>
                            </div>
                        )}
                    </div>
                )}
            </main>

            {/* Floating Add Button */}
            <div className="fixed bottom-6 right-6 z-30">
                <button
                    onClick={() => setShowAddModal(true)}
                    className="size-14 bg-primary text-white rounded-full shadow-lg shadow-primary/40 flex items-center justify-center active:scale-95 transition-transform"
                >
                    <span className="material-symbols-outlined text-2xl">add</span>
                </button>
            </div>

            {/* Add Record Modal */}
            {showAddModal && (
                <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center p-0 sm:p-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowAddModal(false)}></div>
                    <div className="relative w-full max-w-sm bg-white dark:bg-gray-900 rounded-t-3xl sm:rounded-3xl p-6 animate-slide-up shadow-2xl">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold">Add Health Record</h3>
                            <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>

                        <div className="flex flex-col gap-4">
                            {/* Type Toggle */}
                            <div className="flex p-1 bg-gray-100 dark:bg-gray-800 rounded-xl">
                                {['vitals', 'report'].map(type => (
                                    <button
                                        key={type}
                                        onClick={() => setNewRecord({ ...newRecord, type: type })}
                                        className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${newRecord.type === type ? 'bg-white dark:bg-gray-700 shadow-sm text-primary' : 'text-gray-500'}`}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-500 uppercase">Record Title</label>
                                <input
                                    placeholder={newRecord.type === 'vitals' ? "e.g. Heart Rate" : "e.g. Blood Test Report"}
                                    className="w-full h-12 px-4 rounded-xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-primary/50 text-sm font-semibold"
                                    value={newRecord.title}
                                    onChange={(e) => setNewRecord({ ...newRecord, title: e.target.value })}
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-500 uppercase">{newRecord.type === 'vitals' ? 'Value / Reading' : 'File Name / Note'}</label>
                                <input
                                    placeholder={newRecord.type === 'vitals' ? "e.g. 72 bpm" : "e.g. Report.pdf"}
                                    className="w-full h-12 px-4 rounded-xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-primary/50 text-sm font-semibold"
                                    value={newRecord.value}
                                    onChange={(e) => setNewRecord({ ...newRecord, value: e.target.value })}
                                />
                            </div>

                            <button
                                onClick={handleAddRecord}
                                className="w-full h-12 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/30 active:scale-95 transition-all mt-2"
                            >
                                Save Record
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
