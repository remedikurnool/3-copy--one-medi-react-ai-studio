import React from 'react';

export default function DiabetesHero() {
    return (
        <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-blue-600 to-indigo-700 p-6 text-white shadow-lg shadow-blue-200 dark:shadow-none mb-6">
            {/* Background Patttern */}
            <div className="absolute top-0 right-0 -mt-4 -mr-4 size-32 rounded-full bg-white/10 blur-2xl"></div>
            <div className="absolute bottom-0 left-0 -mb-4 -ml-4 size-24 rounded-full bg-white/10 blur-xl"></div>

            <div className="relative z-10">
                <div className="flex items-start justify-between">
                    <div>
                        <p className="text-xs font-medium text-blue-100 uppercase tracking-wider mb-1">Good Morning</p>
                        <h2 className="text-2xl font-bold leading-tight">Your Diabetes<br />Dashboard</h2>
                    </div>
                    <div className="size-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20">
                        <span className="material-symbols-outlined text-xl">person</span>
                    </div>
                </div>

                <div className="mt-6 flex gap-3">
                    <div className="flex-1 bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="material-symbols-outlined text-base opacity-80">water_drop</span>
                            <span className="text-[10px] font-medium opacity-80 uppercase">Last Sugar</span>
                        </div>
                        <p className="text-lg font-bold">110 <span className="text-xs font-normal opacity-70">mg/dL</span></p>
                        <p className="text-[10px] text-emerald-200 mt-1">Normal Range</p>
                    </div>

                    <div className="flex-1 bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="material-symbols-outlined text-base opacity-80">event_upcoming</span>
                            <span className="text-[10px] font-medium opacity-80 uppercase">HbA1c</span>
                        </div>
                        <p className="text-lg font-bold">Due <span className="text-xs font-normal opacity-70">in 2 days</span></p>
                        <button className="text-[10px] bg-white text-blue-600 px-2 py-0.5 rounded-full mt-1 font-bold">Book Now</button>
                    </div>
                </div>
            </div>
        </section>
    );
}
