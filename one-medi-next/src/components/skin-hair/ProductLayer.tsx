import React from 'react';

const PRODUCTS = [
    { title: 'Vit-C Serum', brand: 'SkinCeuticals', price: '₹2,500', tag: 'Brightening' },
    { title: 'Retinol 0.5%', brand: 'Minimalist', price: '₹699', tag: 'Anti-Aging' },
    { title: 'Sunscreen Gel', brand: 'La Shield', price: '₹850', tag: 'Protection' },
    { title: 'Hair Growth Serum', brand: 'Redensyl', price: '₹1,200', tag: 'Hair Fall' },
];

export default function ProductLayer() {
    return (
        <section className="py-4">
            <div className="flex justify-between items-end mb-4 px-1">
                <div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white leading-none">Shop Skincare</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mt-1">Dermatologist Recommended</p>
                </div>
                <button className="text-xs font-black text-rose-500 uppercase tracking-widest hover:text-rose-600 transition-colors">View All</button>
            </div>

            <div className="grid grid-cols-2 gap-3">
                {PRODUCTS.map((p, idx) => (
                    <div key={idx} className="bg-white dark:bg-gray-800 rounded-3xl p-4 border border-slate-100 dark:border-gray-700 shadow-sm flex flex-col items-center text-center cursor-pointer active:scale-[0.98] transition-all">
                        <div className="size-20 bg-slate-50 dark:bg-gray-700 rounded-2xl mb-3 flex items-center justify-center text-slate-300">
                            <span className="material-symbols-outlined text-4xl">shopping_bag</span>
                        </div>

                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">{p.brand}</span>
                        <h4 className="text-xs font-black text-slate-900 dark:text-white leading-tight mb-2 line-clamp-1">{p.title}</h4>

                        <div className="mt-auto flex items-center justify-between w-full">
                            <span className="text-xs font-bold text-slate-900 dark:text-white">{p.price}</span>
                            <button className="size-6 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center shadow-lg active:scale-90 transition-transform">
                                <span className="material-symbols-outlined text-xs">add</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
