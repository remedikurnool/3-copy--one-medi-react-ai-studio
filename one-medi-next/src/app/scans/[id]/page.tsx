'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import PageHeader from '@/components/ui/PageHeader';
import { useMedicalScan } from '@/hooks/useMedicalScans';
import TestDetailView from '@/components/scans/TestDetailView';
import LabPartnerList from '@/components/scans/LabPartnerList';
import UploadPrescription from '@/components/scans/UploadPrescription';
import { useCartStore } from '@/store/cartStore';

export default function ScanDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const { addToCart } = useCartStore();
    const resolvedParams = React.use(params);
    const { data: test, loading } = useMedicalScan(resolvedParams.id);

    const handleAddToCart = () => {
        if (!test) return;
        addToCart({
            id: test.id,
            name: test.name,
            price: test.price,
            mrp: test.mrp,
            image: test.image,
            type: 'scan',
            qty: 1,
            discount: test.discountPercent ? `${test.discountPercent}% OFF` : undefined,
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-surface-50 dark:bg-surface-950 flex items-center justify-center">
                <span className="material-symbols-outlined text-4xl text-slate-300 animate-spin">progress_activity</span>
            </div>
        );
    }

    if (!test) return <div className="p-10 text-center">Test not found</div>;

    return (
        <div className="min-h-screen bg-surface-50 dark:bg-surface-950 font-sans text-slate-900 dark:text-white pb-32 animate-fade-in">
            <PageHeader
                title="Test Details"
                showSearch={false}
                className="lg:top-20"
            />

            <main className="p-4 max-w-4xl mx-auto w-full flex flex-col gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-[2.5rem] p-6 shadow-sm border border-slate-100 dark:border-gray-700">
                    <TestDetailView test={test} />
                </div>

                <LabPartnerList />

                <UploadPrescription />
            </main>

            {/* Bottom Cart Bar */}
            <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 p-4 pb-6 z-50">
                <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
                    <div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-black text-slate-900 dark:text-white">₹{test.price}</span>
                            <span className="text-sm font-bold text-slate-400 line-through">₹{test.mrp}</span>
                            {test.discountPercent && test.discountPercent > 0 && (
                                <span className="bg-indigo-50 text-indigo-500 text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider">{test.discountPercent}% OFF</span>
                            )}
                        </div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Included with Report</p>
                    </div>

                    <button
                        onClick={handleAddToCart}
                        className="h-14 px-8 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-indigo-500/30 hover:shadow-2xl hover:-translate-y-1 active:scale-95 transition-all flex items-center gap-2"
                    >
                        <span className="material-symbols-outlined">add_task</span>
                        Book Test
                    </button>
                </div>
            </div>
        </div>
    );
}
