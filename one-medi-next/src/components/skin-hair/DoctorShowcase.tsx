import React from 'react';

const DOCTORS = [
    { id: 1, name: 'Dr. Ananya Rao', role: 'Chief Dermatologist', exp: '12 Yrs', rating: 4.9, image: 'face_3' },
    { id: 2, name: 'Dr. Vikram S', role: 'Hair Transplant Surgeon', exp: '15 Yrs', rating: 4.8, image: 'face_6' },
    { id: 3, name: 'Dr. Sarah J', role: 'Aesthetic Physician', exp: '8 Yrs', rating: 4.9, image: 'face_2' },
];

export default function DoctorShowcase() {
    return (
        <section className="py-4">
            <div className="flex justify-between items-end mb-4 px-1">
                <div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white leading-none">Meet the Experts</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mt-1">Board-certified Specialists</p>
                </div>
            </div>

            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 px-1">
                {DOCTORS.map((doc) => (
                    <div key={doc.id} className="min-w-[240px] bg-white dark:bg-gray-800 rounded-3xl p-4 flex gap-4 shadow-sm border border-slate-100 dark:border-gray-700">
                        <div className="size-16 rounded-2xl bg-indigo-50 dark:bg-gray-700 flex items-center justify-center text-indigo-400 shrink-0">
                            <span className="material-symbols-outlined text-4xl">{doc.image}</span>
                        </div>

                        <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-black text-slate-900 dark:text-white leading-tight mb-0.5">{doc.name}</h4>
                            <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-wide mb-2">{doc.role}</p>

                            <div className="flex items-center gap-3 text-[10px] font-medium text-slate-500 dark:text-slate-400">
                                <span className="flex items-center gap-0.5"><span className="material-symbols-outlined text-xs text-amber-400 filled">star</span> {doc.rating}</span>
                                <span className="w-px h-2.5 bg-slate-200"></span>
                                <span>{doc.exp}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
