import React from 'react';

interface ProductInfoProps {
    product: any;
}

export default function ProductInfo({ product }: ProductInfoProps) {
    return (
        <div className="flex flex-col gap-4">
            <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{product.category}</span>
                <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white leading-tight mb-2">
                    {product.name}
                </h1>
                <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 px-3 py-1 rounded-lg text-xs font-bold border border-blue-100 dark:border-blue-800">
                        {product.salt}
                    </span>
                    <span className="bg-slate-50 dark:bg-gray-700 text-slate-500 px-3 py-1 rounded-lg text-xs font-bold border border-slate-100 dark:border-gray-600">
                        {product.manufacturer}
                    </span>
                </div>
            </div>

            <div className="h-px bg-slate-100 dark:bg-gray-700"></div>

            <div className="flex flex-col gap-4">
                <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wide">Key Benefits</h3>
                <ul className="space-y-2">
                    {product.indications.map((ind: string, i: number) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 font-medium">
                            <span className="size-1.5 rounded-full bg-emerald-500"></span>
                            Treats {ind}
                        </li>
                    ))}
                    <li className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 font-medium">
                        <span className="size-1.5 rounded-full bg-emerald-500"></span>
                        Fast Action Formula
                    </li>
                </ul>
            </div>

            <div className="h-px bg-slate-100 dark:bg-gray-700"></div>

            <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-xl border border-blue-100 dark:border-blue-800/30">
                <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-blue-500">verified_user</span>
                    <div>
                        <h4 className="text-xs font-black text-blue-700 dark:text-blue-300 uppercase tracking-wide mb-1">Safety Advice</h4>
                        <p className="text-xs text-blue-600/80 dark:text-blue-300/70 leading-relaxed font-medium">
                            Take this medicine as prescribed. Do not exceed the recommended dose. Keep away from children.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
