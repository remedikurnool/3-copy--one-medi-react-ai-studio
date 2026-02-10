import React from 'react';

interface SafetyProps {
    data: { pregnancy: string; alcohol: string; driving: string };
}

export default function SafetyStatus({ data }: SafetyProps) {
    const getStatusColor = (status: string) => {
        if (status === 'Safe') return 'text-emerald-500 bg-emerald-50 border-emerald-100';
        if (status === 'Unsafe') return 'text-red-500 bg-red-50 border-red-100';
        return 'text-amber-500 bg-amber-50 border-amber-100';
    };

    return (
        <div className="grid grid-cols-3 gap-3">
            <div className={`p-3 rounded-2xl border flex flex-col items-center text-center ${getStatusColor(data.pregnancy)} dark:bg-gray-800 dark:border-gray-700`}>
                <span className="material-symbols-outlined mb-1">pregnant_woman</span>
                <span className="text-[9px] font-black uppercase tracking-wider opacity-70 mb-0.5">Pregnancy</span>
                <span className="text-xs font-bold">{data.pregnancy}</span>
            </div>
            <div className={`p-3 rounded-2xl border flex flex-col items-center text-center ${getStatusColor(data.alcohol)} dark:bg-gray-800 dark:border-gray-700`}>
                <span className="material-symbols-outlined mb-1">local_bar</span>
                <span className="text-[9px] font-black uppercase tracking-wider opacity-70 mb-0.5">Alcohol</span>
                <span className="text-xs font-bold">{data.alcohol}</span>
            </div>
            <div className={`p-3 rounded-2xl border flex flex-col items-center text-center ${getStatusColor(data.driving)} dark:bg-gray-800 dark:border-gray-700`}>
                <span className="material-symbols-outlined mb-1">directions_car</span>
                <span className="text-[9px] font-black uppercase tracking-wider opacity-70 mb-0.5">Driving</span>
                <span className="text-xs font-bold">{data.driving}</span>
            </div>
        </div>
    );
}
