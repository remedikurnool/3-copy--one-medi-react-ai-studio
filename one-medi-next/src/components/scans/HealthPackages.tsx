import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

interface HealthPackage {
    id: string;
    title: string;
    testsCount: number;
    includes: string[];
    price: number;
    mrp: number;
    color: string;
    recommended: string;
}

export default function HealthPackages() {
    const router = useRouter();
    const [packages, setPackages] = useState<HealthPackage[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPackages() {
            try {
                // Fetch lab tests that are packages
                const { data: tests, error } = await supabase
                    .from('lab_tests')
                    .select('*, lab_pricing(*)')
                    .eq('category', 'Package')
                    .eq('is_active', true);

                if (error) throw error;

                // Transform data to match UI needs
                const mappedPackages: HealthPackage[] = (tests || []).map((test: any) => {
                    const pricing = test.lab_pricing?.[0] || {};
                    const includes = test.includes || [];

                    // Infer metadata purely for UI (since migration didn't store color/recommended in DB explicitly yet)
                    // In a perfect world, we'd add 'metadata' jsonb column to lab_tests for this.
                    // For now, mapping based on code/name or defaults.
                    let color = 'emerald';
                    let recommended = 'General Wellness';

                    if (test.code === 'pkg_senior') {
                        color = 'orange';
                        recommended = 'Geriatric Care';
                    } else if (test.code === 'pkg_women') {
                        color = 'pink';
                        recommended = 'Gynecologist';
                    }

                    return {
                        id: test.id,
                        title: test.name,
                        testsCount: 85, // Fallback if includes is empty, ideally includes.length
                        includes: includes,
                        price: pricing.price || 0,
                        mrp: pricing.mrp || 0,
                        color,
                        recommended
                    };
                });

                setPackages(mappedPackages);
            } catch (err) {
                console.error('Error fetching health packages:', err);
            } finally {
                setLoading(false);
            }
        }

        fetchPackages();
    }, []);

    if (loading) return null; // Or skeleton
    if (!packages.length) return null;

    return (
        <section className="mb-10 animate-fade-in">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 px-1">Curated Health Packages</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {packages.map((pkg) => (
                    <div
                        key={pkg.id}
                        onClick={() => router.push(`/scans/${pkg.id}`)}
                        className="card-modern relative overflow-hidden p-5 group cursor-pointer"
                    >
                        <div className={`absolute top-0 right-0 w-24 h-24 bg-${pkg.color}-500/10 rounded-full blur-2xl -mr-10 -mt-10 transition-all group-hover:bg-${pkg.color}-500/20`}></div>

                        <div className="flex justify-between items-start mb-4">
                            <span className={`bg-${pkg.color}-50 text-${pkg.color}-600 dark:bg-${pkg.color}-900/30 dark:text-${pkg.color}-300 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider`}>
                                {pkg.recommended}
                            </span>
                        </div>

                        <h4 className="text-lg font-black text-slate-900 dark:text-white leading-tight mb-2 pr-4">{pkg.title}</h4>

                        <div className="flex items-center gap-2 mb-4">
                            <div className="flex -space-x-2">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="size-6 rounded-full bg-slate-100 dark:bg-gray-700 border-2 border-white dark:border-gray-800 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-[10px] text-slate-400">hematology</span>
                                    </div>
                                ))}
                            </div>
                            <span className="text-xs font-bold text-slate-500">+{pkg.includes.length || pkg.testsCount} Tests included</span>
                        </div>

                        <div className="pt-4 border-t border-slate-50 dark:border-gray-700 flex items-end justify-between">
                            <div>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">Package Price</p>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-xl font-black text-slate-900 dark:text-white">₹{pkg.price}</span>
                                    {pkg.mrp > pkg.price && (
                                        <span className="text-xs font-bold text-slate-400 line-through">₹{pkg.mrp}</span>
                                    )}
                                </div>
                            </div>
                            <button className="size-10 btn bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-lg hover:scale-105 active:scale-95">
                                <span className="material-symbols-outlined text-lg">arrow_forward</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
