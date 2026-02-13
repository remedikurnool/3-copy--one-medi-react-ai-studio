import React from 'react';
import { Medicine } from '@/types';

interface SafetyProps {
    data: Medicine['safety'];
}

export default function SafetyStatus({ data }: SafetyProps) {
    if (!data) return null;

    const getStatusColor = (status?: string) => {
        if (!status) return 'text-slate-400 bg-slate-50 border-slate-100';
        const s = status.toLowerCase();
        if (s.includes('safe') && !s.includes('unsafe')) return 'text-emerald-500 bg-emerald-50 border-emerald-100';
        if (s.includes('unsafe') || s.includes('avoid')) return 'text-red-500 bg-red-50 border-red-100';
        return 'text-amber-500 bg-amber-50 border-amber-100';
    };

    const items = [
        { key: 'pregnancy', label: 'Pregnancy', icon: 'pregnant_woman', value: data.pregnancy },
        { key: 'alcohol', label: 'Alcohol', icon: 'local_bar', value: data.alcohol },
        { key: 'driving', label: 'Driving', icon: 'directions_car', value: data.driving },
        { key: 'breastfeeding', label: 'Breastfeeding', icon: 'child_care', value: data.breastfeeding },
        { key: 'kidney', label: 'Kidney', icon: 'kidney', value: data.kidney },
        { key: 'liver', label: 'Liver', icon: 'science', value: data.liver },
    ].filter(item => item.value); // Only show defined items

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {items.map((item) => (
                <div key={item.key} className={`p-3 rounded-2xl border flex flex-col items-center text-center ${getStatusColor(item.value)} dark:bg-gray-800 dark:border-gray-700`}>
                    <span className="material-symbols-outlined mb-1 text-xl">{item.icon}</span>
                    <span className="text-[9px] font-black uppercase tracking-wider opacity-70 mb-0.5">{item.label}</span>
                    <span className="text-xs font-bold">{item.value}</span>
                </div>
            ))}
        </div>
    );
}
