import React from 'react';

const PRODUCTS = [
    { title: 'SafeTouch Glucometer', price: '₹899', brand: 'OneTouch', image: 'glucose' },
    { title: 'Test Strips (50s)', price: '₹1,250', brand: 'Accu-Chek', image: 'sanitizer' },
    { title: 'Alcohol Swabs (100s)', price: '₹250', brand: 'MediSafe', image: 'cleaning_services' },
    { title: 'Insulin Cool Case', price: '₹599', brand: 'Generic', image: 'ice_skating' },
];

export default function DeviceStore() {
    return (
        <section className="mb-8">
            <div className="flex justify-between items-end mb-4 px-1">
                <div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white leading-none">Diabetes Essentials</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mt-1">Genuine Devices & Supplies</p>
                </div>
                <button className="text-xs font-black text-blue-600 uppercase tracking-widest hover:text-blue-700 transition-colors">Shop All</button>
            </div>

            <div className="grid grid-cols-2 gap-3">
                {PRODUCTS.map((p, idx) => (
                    <div key={idx} className="bg-white dark:bg-gray-800 p-3 rounded-2xl border border-slate-100 dark:border-gray-700 shadow-sm flex flex-col gap-2">
                        <div className="aspect-square bg-slate-50 dark:bg-gray-700 rounded-xl flex items-center justify-center text-slate-300 mb-2">
                            <span className="material-symbols-outlined text-4xl">{p.image}</span>
                        </div>

                        <div>
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">{p.brand}</span>
                            <h4 className="text-xs font-black text-slate-900 dark:text-white leading-tight line-clamp-1">{p.title}</h4>
                        </div>

                        <div className="flex items-center justify-between mt-auto">
                            <span className="text-xs font-bold text-slate-900 dark:text-white">{p.price}</span>
                            <button className="size-6 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center shadow-md active:scale-95 transition-transform">
                                <span className="material-symbols-outlined text-xs">add</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Promo Banner */}
            <div className="mt-4 bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 p-4 rounded-3xl flex items-center justify-between">
                <div>
                    <h4 className="text-sm font-black text-slate-900 dark:text-white mb-0.5">Free Glucose Monitor?</h4>
                    <p className="text-[10px] font-medium text-slate-600 dark:text-slate-400">Get it with our Yearly Care Plan.</p>
                </div>
                <button className="bg-white dark:bg-gray-800 text-slate-900 dark:text-white text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-lg shadow-sm">
                    Check Plan
                </button>
            </div>
        </section>
    );
}
