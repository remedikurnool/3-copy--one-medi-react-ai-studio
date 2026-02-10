import React from 'react';

export default function WellnessHero() {
    return (
        <section className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-teal-600 to-emerald-700 text-white p-8 md:p-12 shadow-2xl shadow-teal-900/20 mb-8 group">
            <div className="absolute top-0 right-0 w-full h-full opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

            <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
                <div>
                    <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-black uppercase tracking-widest mb-6 animate-fade-in">
                        Transform Your Life
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black leading-tight mb-6 tracking-tight">
                        Holistic Health,<br />
                        <span className="text-teal-200">Personalized for You</span>
                    </h1>
                    <p className="text-teal-50 text-base font-medium mb-8 max-w-md leading-relaxed opacity-90">
                        Expert-led diet plans, yoga routines, and mental wellness programs designed to help you achieve your health goals.
                    </p>

                    <div className="flex gap-4">
                        <button className="px-8 py-4 bg-white text-teal-700 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-teal-50 shadow-lg active:scale-95 transition-all flex items-center gap-2">
                            Start Journey
                            <span className="material-symbols-outlined text-lg">arrow_forward</span>
                        </button>
                        <button className="px-8 py-4 bg-teal-800/30 backdrop-blur-md border border-white/20 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-teal-800/50 transition-all">
                            View Plans
                        </button>
                    </div>
                </div>

                <div className="relative hidden md:flex justify-center">
                    <div className="relative size-72">
                        <div className="absolute inset-0 bg-white/10 rounded-full blur-3xl animate-pulse-slow"></div>
                        <div className="relative z-10 w-full h-full bg-white/10 backdrop-blur-sm rounded-full border border-white/20 flex items-center justify-center p-6">
                            <span className="material-symbols-outlined text-9xl text-white opacity-80">self_improvement</span>
                        </div>

                        {/* Floating Badges */}
                        <div className="absolute -top-4 right-0 bg-white text-teal-700 px-4 py-2 rounded-xl shadow-lg border-2 border-teal-100 flex items-center gap-2 animate-bounce">
                            <span className="material-symbols-outlined text-orange-500">local_fire_department</span>
                            <span className="text-xs font-black">Fat Loss</span>
                        </div>
                        <div className="absolute bottom-10 -left-6 bg-white text-teal-700 px-4 py-2 rounded-xl shadow-lg border-2 border-teal-100 flex items-center gap-2 animate-float">
                            <span className="material-symbols-outlined text-purple-500">spa</span>
                            <span className="text-xs font-black">Peace</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
