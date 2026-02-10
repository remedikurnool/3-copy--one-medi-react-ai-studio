import React from 'react';

const ACTIONS = [
    { label: 'Log Sugar', icon: 'edit_note', color: 'blue' },
    { label: 'Book HbA1c', icon: 'hematology', color: 'purple' },
    { label: 'Consult Dr.', icon: 'stethoscope', color: 'emerald' },
    { label: 'Order Meds', icon: 'pill', color: 'rose' },
];

export default function QuickActions() {
    return (
        <section className="mb-8">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3 px-1">Quick Actions</h3>
            <div className="grid grid-cols-4 gap-3">
                {ACTIONS.map((action, idx) => (
                    <button key={idx} className="flex flex-col items-center gap-2 group">
                        <div className={`size-14 rounded-2xl bg-${action.color}-50 dark:bg-gray-800 flex items-center justify-center border border-${action.color}-100 dark:border-gray-700 shadow-sm group-active:scale-95 transition-all text-${action.color}-500`}>
                            <span className="material-symbols-outlined text-2xl">{action.icon}</span>
                        </div>
                        <span className="text-[10px] font-bold text-slate-600 dark:text-gray-400 text-center leading-tight">{action.label}</span>
                    </button>
                ))}
            </div>
        </section>
    );
}
