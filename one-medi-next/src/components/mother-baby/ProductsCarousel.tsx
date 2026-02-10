import React, { useRef } from 'react';

const PRODUCTS = [
    { id: 1, name: 'Pregnancy Pillow', price: '₹1,499', image: 'bed', stage: 'preg', rating: 4.8 },
    { id: 2, name: 'Folic Acid+', price: '₹499', image: 'medication', stage: 'preg', rating: 4.9 },
    { id: 3, name: 'Anti-Stretch Oil', price: '₹399', image: 'water_drop', stage: 'preg', rating: 4.7 },
    { id: 4, name: 'Baby Monitor', price: '₹2,999', image: 'videocam', stage: 'newborn', rating: 4.6 },
    { id: 5, name: 'Diaper Pack (L)', price: '₹899', image: 'child_care', stage: 'newborn', rating: 4.9 },
    { id: 6, name: 'Breast Pump', price: '₹1,299', image: 'water_pump', stage: 'newborn', rating: 4.8 },
    { id: 7, name: 'High Chair', price: '₹3,499', image: 'chair', stage: 'toddler', rating: 4.7 },
    { id: 8, name: 'Learning Tablet', price: '₹999', image: 'tablet', stage: 'toddler', rating: 4.5 },
];

export default function ProductsCarousel({ stage }: { stage: string }) {
    const scrollRef = useRef<HTMLDivElement>(null);

    // Filter products (show general if no match, or fallback logic)
    const filteredProducts = PRODUCTS.filter(p => p.stage === stage || stage === 'working'); // 'working' mocks generic for now if empty

    if (filteredProducts.length === 0) return null;

    return (
        <section className="mb-8">
            <div className="flex justify-between items-end mb-4 px-1">
                <div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white leading-none">Essentials for You</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mt-1">Curated devices & care products</p>
                </div>
                <button className="text-xs font-black text-rose-500 uppercase tracking-widest hover:text-rose-600 transition-colors">Shop All</button>
            </div>

            <div ref={scrollRef} className="flex gap-4 overflow-x-auto no-scrollbar pb-4 px-1 snap-x">
                {filteredProducts.map((product) => (
                    <div key={product.id} className="min-w-[140px] snap-center bg-white dark:bg-gray-800 rounded-[1.5rem] p-3 flex flex-col shadow-sm border border-slate-100 dark:border-gray-700 group cursor-pointer active:scale-95 transition-all">
                        <div className="aspect-square rounded-2xl bg-slate-50 dark:bg-gray-700 mb-3 flex items-center justify-center relative overflow-hidden group-hover:bg-rose-50 dark:group-hover:bg-gray-700 transition-colors">
                            <span className="material-symbols-outlined text-4xl text-slate-300 group-hover:text-rose-300 transition-colors">{product.image}</span>
                            <div className="absolute top-2 right-2 bg-white dark:bg-gray-800 rounded-full px-1.5 py-0.5 flex items-center gap-0.5 shadow-sm">
                                <span className="material-symbols-outlined text-[10px] text-amber-400 filled">star</span>
                                <span className="text-[9px] font-bold">{product.rating}</span>
                            </div>
                        </div>

                        <h4 className="text-xs font-black text-slate-900 dark:text-white leading-tight mb-1 line-clamp-2 min-h-[2.5em]">{product.name}</h4>
                        <div className="flex items-center justify-between mt-auto">
                            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{product.price}</span>
                            <button className="size-6 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-md shadow-rose-200 active:scale-90 transition-transform">
                                <span className="material-symbols-outlined text-sm">add</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
