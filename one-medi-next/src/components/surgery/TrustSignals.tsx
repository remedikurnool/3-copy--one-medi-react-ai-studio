import React from 'react';
import { useCarousel } from '@/hooks/useUIConfig';

export default function TrustSignals() {
    const { data: carousel } = useCarousel('surgery_trust_signals');
    const items = carousel?.items || [];

    if (!items.length) return null;

    return (
        <section className="mb-10 animate-fade-in-up delay-100">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {items.map((signal, idx) => (
                    <div key={signal.id || idx} className="bg-white dark:bg-gray-800 p-4 rounded-3xl border border-slate-100 dark:border-gray-700 shadow-sm flex items-center gap-4 group hover:border-blue-100 dark:hover:border-blue-900 transition-colors">
                        <div className="size-12 rounded-2xl bg-blue-50 dark:bg-gray-700 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined text-2xl">{signal.image_url}</span>
                        </div>
                        <div>
                            <h4 className="text-sm font-black text-slate-900 dark:text-white leading-tight">{signal.title}</h4>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mt-0.5">{signal.subtitle}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
