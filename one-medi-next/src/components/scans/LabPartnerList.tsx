import React from 'react';

const PARTNERS = [
    { name: 'Vijaya Diagnostics', rating: 4.8, price: 3500, time: '10:00 AM' },
    { name: 'Lucid Diagnostics', rating: 4.6, price: 3200, time: '11:30 AM' },
    { name: 'Apollo Diagnostics', rating: 4.9, price: 3800, time: '09:00 AM' },
];

export default function LabPartnerList() {
    return (
        <section className="mt-8">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Available at 3 Labs</h3>

            <div className="flex flex-col gap-3">
                {PARTNERS.map((lab, idx) => (
                    <div key={idx} className="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-slate-100 dark:border-gray-700 flex justify-between items-center group hover:border-indigo-100 transition-colors">
                        <div>
                            <h4 className="text-sm font-black text-slate-900 dark:text-white mb-1">{lab.name}</h4>
                            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500">
                                <span className="flex items-center gap-0.5 text-amber-500"><span className="material-symbols-outlined text-[10px] filled">star</span> {lab.rating}</span>
                                <span className="w-px h-3 bg-slate-200"></span>
                                <span>{lab.time} Slot Available</span>
                            </div>
                        </div>

                        <div className="text-right">
                            <p className="text-sm font-black text-slate-900 dark:text-white mb-1">₹{lab.price}</p>
                            <button className="px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg text-[10px] font-black uppercase tracking-wider hover:bg-indigo-100 transition-colors">
                                Select
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
