import React from 'react';

export default function ProfileSection() {
    return (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {/* Mother Profile */}
            <div className="bg-gradient-to-br from-rose-50 to-white dark:from-rose-900/20 dark:to-gray-800 rounded-[2rem] p-5 flex items-center gap-4 border border-rose-100 dark:border-rose-900/30 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-50">
                    <span className="material-symbols-outlined text-6xl text-rose-100 dark:text-rose-900/40 group-hover:scale-110 transition-transform">pregnant_woman</span>
                </div>

                <div className="size-16 rounded-full bg-white dark:bg-gray-700 border-2 border-rose-200 p-1 shadow-sm relative z-10">
                    <div className="w-full h-full rounded-full bg-slate-100 flex items-center justify-center overflow-hidden">
                        <span className="material-icons text-slate-300 text-3xl">person</span>
                    </div>
                    <div className="absolute bottom-0 right-0 size-5 bg-rose-500 rounded-full border-2 border-white flex items-center justify-center">
                        <span className="material-symbols-outlined text-white text-[10px] font-bold">edit</span>
                    </div>
                </div>

                <div className="relative z-10">
                    <p className="text-[10px] font-black text-rose-400 uppercase tracking-widest mb-1">Mother</p>
                    <h3 className="text-lg font-black text-slate-900 dark:text-white leading-none mb-1">Priya Sharma</h3>
                    <p className="text-xs font-medium text-slate-500">24 Weeks Pregnant <span className="text-rose-400">• Low Risk</span></p>
                </div>
            </div>

            {/* Baby Profile */}
            <div className="bg-gradient-to-br from-teal-50 to-white dark:from-teal-900/20 dark:to-gray-800 rounded-[2rem] p-5 flex items-center gap-4 border border-teal-100 dark:border-teal-900/30 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-50">
                    <span className="material-symbols-outlined text-6xl text-teal-100 dark:text-teal-900/40 group-hover:scale-110 transition-transform">child_care</span>
                </div>

                <div className="size-16 rounded-full bg-white dark:bg-gray-700 border-2 border-teal-200 p-1 shadow-sm relative z-10">
                    <div className="w-full h-full rounded-full bg-slate-100 flex items-center justify-center overflow-hidden">
                        <span className="material-symbols-outlined text-slate-300 text-3xl">face_5</span>
                    </div>
                    <div className="absolute bottom-0 right-0 size-5 bg-teal-500 rounded-full border-2 border-white flex items-center justify-center">
                        <span className="material-symbols-outlined text-white text-[10px] font-bold">add</span>
                    </div>
                </div>

                <div className="relative z-10">
                    <p className="text-[10px] font-black text-teal-500 uppercase tracking-widest mb-1">Baby</p>
                    <h3 className="text-lg font-black text-slate-900 dark:text-white leading-none mb-1">Baby Sharma</h3>
                    <p className="text-xs font-medium text-slate-500">Due: Aug 24, 2026 <span className="text-teal-500">• 1st Child</span></p>
                </div>
            </div>
        </section>
    );
}
