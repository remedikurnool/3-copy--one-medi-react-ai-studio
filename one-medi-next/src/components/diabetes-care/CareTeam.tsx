import React from 'react';

const TEAM = [
    {
        id: 1,
        name: 'Dr. T. Karthik',
        qual: 'MBBS, MD Gen. Med',
        role: 'Diabetes Specialist',
        exp: '15 Yrs',
        rating: 4.9,
        image: 'face_6',
        isMain: true
    },
    {
        id: 2,
        name: 'Dt. Anjali Rao',
        qual: 'M.Sc Nutrition',
        role: 'Clinical Dietician',
        exp: '8 Yrs',
        rating: 4.8,
        image: 'face_3',
        isMain: false
    },
    {
        id: 3,
        name: 'Dr. Sarah J',
        qual: 'DPM (Podiatry)',
        role: 'Foot Care Expert',
        exp: '12 Yrs',
        rating: 4.9,
        image: 'face_2',
        isMain: false
    },
];

export default function CareTeam() {
    return (
        <section className="mb-8">
            <div className="flex justify-between items-end mb-4 px-1">
                <div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white leading-none">Your Care Team</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mt-1">Multi-disciplinary Experts</p>
                </div>
            </div>

            <div className="flex flex-col gap-3">
                {TEAM.map((doc) => (
                    <div
                        key={doc.id}
                        className={`rounded-3xl p-4 flex gap-4 border shadow-sm transition-all cursor-pointer
                            ${doc.isMain
                                ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-200 dark:shadow-none'
                                : 'bg-white dark:bg-gray-800 border-slate-100 dark:border-gray-700 text-slate-900 dark:text-white hover:border-slate-200'
                            }`}
                    >
                        <div className={`size-16 rounded-2xl flex items-center justify-center shrink-0
                            ${doc.isMain ? 'bg-white/20 text-white' : 'bg-blue-50 dark:bg-gray-700 text-blue-500'}
                        `}>
                            <span className="material-symbols-outlined text-4xl">{doc.image}</span>
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h4 className="text-base font-black leading-tight mb-0.5">{doc.name}</h4>
                                    <p className={`text-xs font-bold uppercase tracking-wide mb-1 ${doc.isMain ? 'text-blue-100' : 'text-blue-500'}`}>{doc.role}</p>
                                </div>
                                <div className={`flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-lg ${doc.isMain ? 'bg-white/20' : 'bg-slate-100 dark:bg-gray-700'}`}>
                                    <span className="material-symbols-outlined text-xs filled">star</span> {doc.rating}
                                </div>
                            </div>

                            <p className={`text-[10px] line-clamp-1 ${doc.isMain ? 'text-blue-100' : 'text-slate-400'}`}>{doc.qual}</p>

                            <div className="flex items-center gap-4 mt-3">
                                <button className={`flex-1 text-[10px] font-black uppercase tracking-wider py-1.5 rounded-lg border ${doc.isMain ? 'border-white/30 hover:bg-white/10' : 'border-slate-200 hover:bg-slate-50 dark:border-gray-600 dark:hover:bg-gray-700'}`}>
                                    Profile
                                </button>
                                <button className={`flex-[2] text-[10px] font-black uppercase tracking-wider py-1.5 rounded-lg ${doc.isMain ? 'bg-white text-blue-600' : 'bg-blue-600 text-white'}`}>
                                    Book Consult
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
