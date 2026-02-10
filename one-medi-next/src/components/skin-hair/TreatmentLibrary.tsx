import React from 'react';
import type { ServiceMaster } from '@/hooks/useServices';
import { useRouter } from 'next/navigation';

export default function TreatmentLibrary({ services, loading }: { services: ServiceMaster[], loading: boolean }) {
    const router = useRouter();

    if (loading) {
        return (
            <section className="py-2">
                <h3 className="text-xl font-black text-slate-900 dark:text-white leading-none mb-4 px-1">Popular Treatments</h3>
                <div className="flex gap-3 overflow-x-auto no-scrollbar pb-4 px-1">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="min-w-[200px] h-32 bg-slate-100 dark:bg-gray-800 rounded-[1.75rem] animate-pulse"></div>
                    ))}
                </div>
            </section>
        );
    }

    if (services.length === 0) {
        return (
            <section className="py-8 text-center bg-slate-50 dark:bg-gray-800/50 rounded-3xl border border-dashed border-slate-200">
                <p className="text-sm font-medium text-slate-500">No treatments found matching your criteria.</p>
            </section>
        );
    }

    return (
        <section className="py-2">
            <h3 className="text-xl font-black text-slate-900 dark:text-white leading-none mb-4 px-1">
                {services.length < 5 ? 'Recommended Treatments' : 'Popular Treatments'}
            </h3>

            <div className="flex gap-3 overflow-x-auto no-scrollbar pb-4 px-1">
                {services.map((t) => (
                    <div
                        key={t.id}
                        onClick={() => router.push(`/home-care/${t.id}`)}
                        className="min-w-[200px] bg-white dark:bg-gray-800 p-4 rounded-[1.75rem] border border-slate-100 dark:border-gray-700 shadow-sm flex flex-col gap-2 hover:shadow-md transition-shadow cursor-pointer group"
                    >
                        <div className="flex justify-between items-start">
                            <span className="px-2 py-1 rounded-full bg-slate-50 dark:bg-gray-700 text-[9px] font-black uppercase text-slate-500 tracking-wider group-hover:bg-indigo-50 group-hover:text-indigo-500 transition-colors">
                                {t.category === 'SKIN_HAIR' ? (t.concern || 'General') : t.category}
                            </span>
                            <span className="material-symbols-outlined text-slate-300 group-hover:text-indigo-400 transition-colors">arrow_outward</span>
                        </div>

                        <h4 className="text-sm font-black text-slate-900 dark:text-white leading-tight line-clamp-2 min-h-[2.5em]">{t.name}</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium line-clamp-2">{t.description || 'Professional aesthetic treatment.'}</p>

                        <div className="mt-auto pt-3 flex items-center gap-1 text-slate-900 dark:text-white font-bold text-xs">
                            <span className="text-[10px] text-slate-400 font-normal">Starts at</span>
                            {t.price ? `₹${t.price}` : 'Contact'}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
