import React from 'react';

const TESTS = [
    { title: 'HbA1c (Glycosylated Hemoglobin)', price: '₹499', tag: 'Gold Standard', icon: 'bloodtype' },
    { title: 'Fasting Blood Sugar (FBS)', price: '₹150', tag: 'Basic', icon: 'water_drop' },
    { title: 'Lipid Profile', price: '₹699', tag: 'Heart Health', icon: 'monitor_heart' },
    { title: 'Kidney Function Test', price: '₹899', tag: 'Vital', icon: 'nephrology' },
];

export default function DiagnosticsGrid() {
    return (
        <section className="mb-8">
            <div className="flex justify-between items-end mb-4 px-1">
                <div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white leading-none">Lab Tests</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mt-1">Home Collection Available</p>
                </div>
                <button className="text-xs font-black text-blue-600 uppercase tracking-widest hover:text-blue-700 transition-colors">View All</button>
            </div>

            <div className="grid grid-cols-2 gap-3">
                {TESTS.map((t, idx) => (
                    <div key={idx} className="bg-white dark:bg-gray-800 p-4 rounded-3xl border border-slate-100 dark:border-gray-700 shadow-sm flex flex-col justify-between h-32 cursor-pointer hover:border-blue-100 transition-colors group">
                        <div className="flex justify-between items-start">
                            <div className="size-10 rounded-xl bg-blue-50 dark:bg-gray-700 flex items-center justify-center text-blue-500">
                                <span className="material-symbols-outlined">{t.icon}</span>
                            </div>
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50 dark:bg-gray-700 px-2 py-1 rounded-lg">
                                {t.tag}
                            </span>
                        </div>

                        <div>
                            <h4 className="text-xs font-black text-slate-900 dark:text-white leading-tight mb-1 line-clamp-2">{t.title}</h4>
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-slate-500">{t.price}</span>
                                <span className="material-symbols-outlined text-base text-slate-300 group-hover:text-blue-500 transition-colors">add_circle</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
