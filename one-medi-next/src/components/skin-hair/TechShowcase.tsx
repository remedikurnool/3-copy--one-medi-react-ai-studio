import React from 'react';

const DEVICES = [
    { name: 'Alma Soprano Ice', type: 'Laser Hair Removal', tag: 'Pain-Free' },
    { name: 'Candela V-Beam', type: 'Vascular Laser', tag: 'Gold Standard' },
    { name: 'HydraFacial MD', type: 'Skin Health', tag: 'Original' },
    { name: 'Morpheus8', type: 'Radiofrequency', tag: 'Skin Tightening' },
    { name: 'Emsculpt NEO', type: 'Body Contouring', tag: 'Fat + Muscle' },
];

export default function TechShowcase() {
    return (
        <section className="py-4">
            <div className="flex justify-between items-end mb-4 px-1">
                <div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white leading-none">World-Class Tech</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mt-1">FDA-Approved Medical Devices</p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
                {DEVICES.map((d, idx) => (
                    <div key={idx} className="bg-slate-50 dark:bg-gray-800 p-4 rounded-3xl border border-slate-100 dark:border-gray-700 flex flex-col justify-between h-28 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <span className="material-symbols-outlined text-4xl">precision_manufacturing</span>
                        </div>

                        <span className="inline-block px-2 py-0.5 rounded-md bg-white dark:bg-gray-700 w-fit text-[9px] font-bold uppercase tracking-wider text-slate-500 shadow-sm border border-slate-100 dark:border-gray-600">
                            {d.tag}
                        </span>

                        <div>
                            <h4 className="text-sm font-black text-slate-900 dark:text-white leading-tight">{d.name}</h4>
                            <p className="text-[10px] font-medium text-slate-500 dark:text-slate-400 mt-0.5">{d.type}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
