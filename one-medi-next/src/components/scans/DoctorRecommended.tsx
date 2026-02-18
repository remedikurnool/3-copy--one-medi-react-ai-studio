import React from 'react';
import { useRouter } from 'next/navigation';
import { useCarousel } from '@/hooks/useUIConfig';

export default function DoctorRecommended() {
    const router = useRouter();
    const { data: carousel, loading } = useCarousel('doctor_recommended');
    const items = carousel?.items || [];

    if (!items.length && !loading) return null;

    return (
        <section className="mb-10 animate-fade-in">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 px-1">Doctor Recommended</h3>

            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                {items.map((doc) => (
                    <div
                        key={doc.id}
                        onClick={() => doc.link_url && router.push(doc.link_url)}
                        className="min-w-[200px] bg-slate-50 dark:bg-gray-800/50 p-4 rounded-2xl border border-slate-100 dark:border-gray-700 hover:border-indigo-200 transition-colors cursor-pointer group"
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <div className="size-10 rounded-full bg-white dark:bg-gray-700 shadow-sm flex items-center justify-center">
                                <span className="material-symbols-outlined text-indigo-500">{doc.image_url || 'medical_services'}</span>
                            </div>
                            <span className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wide">{doc.title}</span>
                        </div>

                        <div className="flex flex-wrap gap-1">
                            {doc.subtitle?.split(',').map((t, i) => (
                                <span key={i} className="text-[9px] font-bold text-slate-500 dark:text-slate-400 bg-white dark:bg-gray-900 px-2 py-1 rounded-md border border-slate-100 dark:border-gray-800 whitespace-nowrap">
                                    {t.trim()}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
