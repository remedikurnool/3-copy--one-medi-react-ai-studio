import React from 'react';

interface ProgramCardProps {
    program: any;
    onClick: () => void;
}

export default function ProgramCard({ program, onClick }: ProgramCardProps) {
    return (
        <div
            onClick={onClick}
            className="group relative bg-white dark:bg-gray-800 rounded-[2.5rem] p-4 flex flex-col gap-4 cursor-pointer border border-slate-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
        >
            {/* Image Section */}
            <div className="relative h-48 w-full rounded-[2rem] overflow-hidden">
                <img
                    src={program.image}
                    alt={program.title}
                    className="size-full object-cover group-hover:scale-110 transition-transform duration-700"
                />

                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-slate-900 shadow-sm">
                    {program.category}
                </div>

                <div className="absolute bottom-4 right-4 bg-slate-900/80 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm text-yellow-400 filled">star</span>
                    {program.rating}
                </div>
            </div>

            {/* Content Section */}
            <div className="px-2 pb-2 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-black text-slate-900 dark:text-white leading-tight line-clamp-2 group-hover:text-teal-600 transition-colors">
                        {program.title}
                    </h3>
                </div>

                <div className="flex items-center gap-2 mb-4 text-xs font-bold text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">schedule</span>
                        {program.duration}
                    </span>
                    <span className="size-1 bg-slate-300 rounded-full"></span>
                    <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">person</span>
                        {program.expert}
                    </span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                    {program.tags.map((tag: string) => (
                        <span key={tag} className="text-[9px] font-bold uppercase tracking-wider bg-slate-50 dark:bg-gray-700/50 text-slate-500 dark:text-slate-400 px-2 py-1 rounded-lg border border-slate-100 dark:border-gray-700">
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="mt-auto pt-4 border-t border-slate-50 dark:border-gray-700 flex items-center justify-between">
                    <div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">Full Program</p>
                        <div className="flex items-baseline gap-2">
                            <span className="text-xl font-black text-slate-900 dark:text-white">₹{program.price}</span>
                            <span className="text-xs font-bold text-slate-400 line-through">₹{program.mrp}</span>
                        </div>
                    </div>

                    <button className="size-10 rounded-full bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 flex items-center justify-center group-hover:bg-teal-600 group-hover:text-white transition-all shadow-sm">
                        <span className="material-symbols-outlined">arrow_forward</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
