'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useInsurancePlans } from '@/hooks/useInsurance';

export default function InsuranceListPage() {
    const router = useRouter();
    const [activeCategory, setActiveCategory] = useState<'All' | 'Family' | 'Individual' | 'Senior' | 'Critical'>('All');
    const [compareList, setCompareList] = useState<string[]>([]);
    const [showQuoteWizard, setShowQuoteWizard] = useState(false);
    const [showCompareModal, setShowCompareModal] = useState(false);

    // Quote Wizard State
    const [quoteStep, setQuoteStep] = useState(1);
    const [quoteData, setQuoteData] = useState({ memberType: 'Family', age: '', pincode: '' });

    // Fetch insurance plans from Supabase
    const { data: allPlans, loading, error } = useInsurancePlans();

    const categories = ['All', 'Family', 'Individual', 'Senior', 'Critical'];

    const filteredPlans = (allPlans || []).filter((plan) =>
        activeCategory === 'All' || plan.plan_type === activeCategory
    );

    const handleToggleCompare = (id: string) => {
        if (compareList.includes(id)) {
            setCompareList(prev => prev.filter(item => item !== id));
        } else {
            if (compareList.length < 3) {
                setCompareList(prev => [...prev, id]);
            } else {
                alert("You can compare up to 3 plans only.");
            }
        }
    };

    const handleRequestCallback = () => {
        alert('Callback requested! Our insurance expert will call you shortly.');
    };

    const handleGetQuote = () => {
        setShowQuoteWizard(false);
        setQuoteStep(1);
        setActiveCategory(quoteData.memberType as any);
        alert(`Finding best plans for ${quoteData.memberType} in ${quoteData.pincode}... (Simulated)`);
    };

    // Format waiting period from days to readable format
    const formatWaitingPeriod = (days: number) => {
        if (days >= 365) return `${Math.floor(days / 365)} Year${days >= 730 ? 's' : ''}`;
        if (days >= 30) return `${Math.floor(days / 30)} Month${days >= 60 ? 's' : ''}`;
        return `${days} Days`;
    };

    return (
        <div className="min-h-screen bg-bg-light dark:bg-bg-dark font-sans text-slate-900 dark:text-white pb-24 relative animate-fade-in">
            {/* Header */}
            <header className="sticky top-0 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800 p-4">
                <div className="flex items-center gap-3 mb-3">
                    <button onClick={() => router.back()} className="size-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center transition-colors">
                        <span className="material-symbols-outlined text-2xl">arrow_back</span>
                    </button>
                    <div className="flex-1">
                        <h1 className="text-xl font-bold leading-none">Health Insurance</h1>
                        <p className="text-xs text-gray-500 font-medium mt-1">Secure your family&apos;s future</p>
                    </div>
                    <button
                        onClick={() => setShowQuoteWizard(true)}
                        className="bg-primary/10 text-primary px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest active:scale-95 transition-transform"
                    >
                        Get Quote
                    </button>
                </div>

                {/* Category Tabs */}
                <div className="flex gap-2 overflow-x-auto no-scrollbar">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat as any)}
                            className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${activeCategory === cat ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'bg-gray-100 dark:bg-gray-800 text-gray-500'}`}
                        >
                            {cat} Plans
                        </button>
                    ))}
                </div>
            </header>

            <main className="p-4 flex flex-col gap-5">
                {/* Loading State */}
                {loading && (
                    <div className="flex items-center justify-center py-12">
                        <div className="animate-spin rounded-full h-10 w-10 border-2 border-primary border-t-transparent"></div>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="text-center py-8 text-red-500">
                        <span className="material-symbols-outlined text-4xl mb-2">error</span>
                        <p className="text-sm font-medium">Failed to load insurance plans</p>
                    </div>
                )}

                {/* Banner */}
                {!loading && activeCategory === 'All' && (
                    <div className="p-5 rounded-3xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg relative overflow-hidden">
                        <div className="relative z-10">
                            <h2 className="text-xl font-black mb-1">Confused?</h2>
                            <p className="text-sm opacity-90 mb-4 max-w-[200px]">Talk to our certified insurance advisors in Kurnool for free.</p>
                            <button onClick={handleRequestCallback} className="bg-white text-blue-600 px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest shadow-md active:scale-95 transition-transform">Request Callback</button>
                        </div>
                        <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-9xl opacity-20">support_agent</span>
                    </div>
                )}

                {/* Plans List */}
                {!loading && filteredPlans.map((plan) => (
                    <div key={plan.id} className="bg-white dark:bg-gray-800 p-5 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 relative overflow-hidden transition-all hover:shadow-md">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex gap-3">
                                <div className="size-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center border border-primary/10">
                                    <span className="material-symbols-outlined text-primary text-2xl">verified_user</span>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold leading-tight">{plan.name}</h3>
                                    <p className="text-xs text-gray-500">{plan.provider}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-[9px] text-gray-500 uppercase font-black tracking-widest">Base Cover</p>
                                <p className="text-xl font-black text-slate-900 dark:text-white">₹{(plan.sum_insured / 100000).toFixed(0)}L</p>
                            </div>
                        </div>

                        {/* Key Stats Chips */}
                        <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar">
                            <div className="px-2 py-1 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-[9px] font-black uppercase rounded-lg border border-green-100 dark:border-green-800 whitespace-nowrap flex items-center gap-1">
                                <span className="material-symbols-outlined text-[10px] filled">bolt</span> Cashless
                            </div>
                            <div className="px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 text-[9px] font-black uppercase rounded-lg border border-blue-100 dark:border-blue-800 whitespace-nowrap">
                                {plan.network_hospitals.toLocaleString()}+ Hospitals
                            </div>
                            <div className="px-2 py-1 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 text-[9px] font-black uppercase rounded-lg border border-amber-100 dark:border-amber-800 whitespace-nowrap flex items-center gap-1">
                                <span className="material-symbols-outlined text-[10px]">timer</span> {formatWaitingPeriod(plan.waiting_period_days)}
                            </div>
                            {plan.claim_settlement_ratio >= 90 && (
                                <div className="px-2 py-1 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 text-[9px] font-black uppercase rounded-lg border border-purple-100 dark:border-purple-800 whitespace-nowrap">
                                    {plan.claim_settlement_ratio}% CSR
                                </div>
                            )}
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-3 mb-4">
                            <div className="grid grid-cols-2 gap-y-2">
                                {plan.features.slice(0, 4).map((f, i) => (
                                    <div key={i} className="flex items-center gap-2 text-[11px] font-bold text-slate-600 dark:text-gray-300">
                                        <span className="material-symbols-outlined text-emerald-500 text-[12px] filled">check_circle</span>
                                        <span className="truncate">{f}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-end justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                            <div>
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-0.5">Annual Premium</p>
                                <div className="flex items-baseline gap-1">
                                    <p className="text-lg font-black text-primary tracking-tighter">₹{plan.premium_yearly.toLocaleString('en-IN')}</p>
                                    <span className="text-[10px] text-gray-500 font-bold">/yr</span>
                                </div>
                                {plan.premium_monthly > 0 && <p className="text-[10px] text-emerald-600 font-black uppercase">₹{plan.premium_monthly.toLocaleString('en-IN')}/mo EMI</p>}
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleToggleCompare(plan.id)}
                                    className={`size-10 rounded-xl flex items-center justify-center border transition-all ${compareList.includes(plan.id) ? 'bg-slate-900 text-white border-slate-900 shadow-md' : 'bg-white dark:bg-gray-800 border-gray-200 text-gray-400'}`}
                                    title="Compare"
                                >
                                    <span className="material-symbols-outlined text-xl">compare_arrows</span>
                                </button>
                                <button className="bg-primary text-white px-5 h-10 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-primary-dark active:scale-95 transition-transform shadow-lg shadow-primary/30">
                                    Plan Details
                                </button>
                            </div>
                        </div>

                        <div className="absolute top-0 right-0 p-1 opacity-[0.03]">
                            <span className="material-symbols-outlined text-8xl">verified_user</span>
                        </div>
                    </div>
                ))}

                {/* Empty State */}
                {!loading && filteredPlans.length === 0 && (
                    <div className="text-center py-12 flex flex-col items-center gap-4">
                        <div className="size-20 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400">
                            <span className="material-symbols-outlined text-4xl">search_off</span>
                        </div>
                        <p className="text-gray-500 font-medium">No insurance plans found for this category.</p>
                    </div>
                )}
            </main>

            {/* Compare Floating Button */}
            {compareList.length > 0 && (
                <div className="fixed bottom-24 left-4 right-4 bg-slate-900 text-white p-4 rounded-2xl shadow-2xl z-50 flex justify-between items-center">
                    <p className="font-bold">{compareList.length} plan(s) selected</p>
                    <button
                        onClick={() => setShowCompareModal(true)}
                        className="bg-white text-slate-900 px-5 py-2 rounded-xl font-black text-xs uppercase tracking-widest active:scale-95 transition-transform"
                    >
                        Compare Now
                    </button>
                </div>
            )}

            {/* Quote Wizard Modal */}
            {showQuoteWizard && (
                <div className="fixed inset-0 bg-black/60 z-50 flex items-end justify-center p-4" onClick={() => setShowQuoteWizard(false)}>
                    <div className="bg-white dark:bg-gray-900 w-full max-w-lg rounded-3xl p-6 relative" onClick={e => e.stopPropagation()}>
                        <button onClick={() => setShowQuoteWizard(false)} className="absolute top-4 right-4 size-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                            <span className="material-symbols-outlined text-xl">close</span>
                        </button>
                        <h2 className="text-xl font-black mb-6">Get Free Quote</h2>

                        {quoteStep === 1 && (
                            <div>
                                <p className="text-sm text-gray-500 mb-4">Who are you buying for?</p>
                                <div className="grid grid-cols-2 gap-4">
                                    {['Individual', 'Family', 'Senior', 'Critical'].map(type => (
                                        <button
                                            key={type}
                                            onClick={() => { setQuoteData(p => ({ ...p, memberType: type })); setQuoteStep(2); }}
                                            className={`p-4 rounded-2xl border text-left flex flex-col gap-1 transition-all hover:shadow-md ${quoteData.memberType === type ? 'border-primary bg-primary/5' : 'border-gray-200 dark:border-gray-700'}`}
                                        >
                                            <span className="font-black text-sm">{type}</span>
                                            <span className="text-[10px] text-gray-400">
                                                {type === 'Individual' && 'Just for yourself'}
                                                {type === 'Family' && 'Spouse, Kids, Parents'}
                                                {type === 'Senior' && 'For parents 60+'}
                                                {type === 'Critical' && 'Cancer, Heart, major illness'}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                        {quoteStep === 2 && (
                            <div className="flex flex-col gap-4">
                                <div>
                                    <label className="text-xs font-bold uppercase text-gray-400 mb-1 block">Your Age</label>
                                    <input value={quoteData.age} onChange={e => setQuoteData(p => ({ ...p, age: e.target.value }))} type="number" placeholder="e.g. 32" className="w-full h-12 rounded-xl border border-gray-200 dark:border-gray-700 px-4 text-lg font-bold bg-transparent" />
                                </div>
                                <div>
                                    <label className="text-xs font-bold uppercase text-gray-400 mb-1 block">Your Pincode</label>
                                    <input value={quoteData.pincode} onChange={e => setQuoteData(p => ({ ...p, pincode: e.target.value }))} type="text" placeholder="e.g. 518002" className="w-full h-12 rounded-xl border border-gray-200 dark:border-gray-700 px-4 text-lg font-bold bg-transparent" />
                                </div>
                                <button onClick={handleGetQuote} className="w-full h-14 bg-primary text-white rounded-2xl font-black text-sm uppercase tracking-widest mt-4">View Plans</button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Compare Modal */}
            {showCompareModal && (
                <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setShowCompareModal(false)}>
                    <div className="bg-white dark:bg-gray-900 w-full max-w-3xl rounded-3xl p-6 max-h-[80vh] overflow-auto relative" onClick={e => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-6 sticky top-0 bg-inherit pb-4">
                            <h2 className="text-xl font-black">Compare Plans</h2>
                            <button onClick={() => setShowCompareModal(false)} className="size-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                                <span className="material-symbols-outlined text-xl">close</span>
                            </button>
                        </div>

                        <div className="grid grid-cols-3 min-w-[600px] gap-8">
                            {/* Headers */}
                            <div className="col-span-3 grid grid-cols-4 gap-4 border-b pb-6 border-gray-100 dark:border-gray-800">
                                <div className="font-black text-gray-400 uppercase text-[10px] pt-12 tracking-widest">Plan Features</div>
                                {compareList.map(id => {
                                    const plan = (allPlans || []).find((p) => p.id === id);
                                    return (
                                        <div key={id} className="text-center">
                                            <div className="h-12 flex items-center justify-center mb-3">
                                                <span className="material-symbols-outlined text-primary text-4xl">verified_user</span>
                                            </div>
                                            <p className="font-black text-sm text-slate-900 dark:text-white uppercase tracking-tighter leading-tight">{plan?.name}</p>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Rows */}
                            {['Cover Amount', 'Annual Premium', 'Network Hospitals', 'CSR', 'Waiting Period'].map((feature) => (
                                <div key={feature} className="col-span-3 grid grid-cols-4 gap-4 py-4 border-b border-gray-50 dark:border-gray-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                    <div className="text-xs font-black text-slate-500 uppercase tracking-wide">{feature}</div>
                                    {compareList.map(id => {
                                        const plan = (allPlans || []).find((p) => p.id === id);
                                        let val: any = '-';
                                        if (feature === 'Cover Amount') val = `₹${((plan?.sum_insured || 0) / 100000).toFixed(0)}L`;
                                        if (feature === 'Annual Premium') val = `₹${plan?.premium_yearly.toLocaleString('en-IN')}`;
                                        if (feature === 'Network Hospitals') val = `${plan?.network_hospitals.toLocaleString()}+`;
                                        if (feature === 'CSR') val = plan?.claim_settlement_ratio ? `${plan.claim_settlement_ratio}%` : '-';
                                        if (feature === 'Waiting Period') val = plan?.waiting_period_days ? formatWaitingPeriod(plan.waiting_period_days) : '-';

                                        return <div key={id} className="text-sm font-bold text-center text-slate-700 dark:text-gray-200">{val}</div>;
                                    })}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
