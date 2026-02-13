import React from 'react';
import { Medicine } from '@/types';

interface ProductInfoProps {
    product: Medicine;
}

export default function ProductInfo({ product }: ProductInfoProps) {
    return (
        <div className="space-y-8 animate-fade-in-up">
            {/* Header / Basic Info */}
            <div className="border-b border-slate-100 dark:border-gray-700 pb-6">
                <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 rounded-md bg-slate-100 dark:bg-gray-700 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                        {product.category}
                    </span>
                    {product.prescriptionRequired && (
                        <span className="px-2 py-1 rounded-md bg-red-50 dark:bg-red-900/20 text-[10px] font-bold text-red-500 uppercase tracking-widest flex items-center gap-1">
                            <span className="material-symbols-outlined text-[12px]">prescriptions</span>
                            Rx Required
                        </span>
                    )}
                </div>

                <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">
                    {product.name}
                </h1>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-500 font-medium">
                    <p>
                        <span className="text-slate-400">Manufactured by: </span>
                        <span className="text-slate-700 dark:text-gray-300 font-bold">{product.manufacturer}</span>
                    </p>
                    <p>
                        <span className="text-slate-400">Composition: </span>
                        <span className="text-slate-700 dark:text-gray-300 font-bold">{product.composition}</span>
                    </p>
                </div>
            </div>

            {/* Key Highlights Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-slate-50 dark:bg-gray-700/50 p-4 rounded-2xl border border-slate-100 dark:border-gray-700">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Pack Size</p>
                    <p className="font-bold text-slate-700 dark:text-white">{product.packSize}</p>
                </div>
                <div className="bg-slate-50 dark:bg-gray-700/50 p-4 rounded-2xl border border-slate-100 dark:border-gray-700">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Dosage Form</p>
                    <p className="font-bold text-slate-700 dark:text-white">{product.dosageForm}</p>
                </div>
                <div className="bg-slate-50 dark:bg-gray-700/50 p-4 rounded-2xl border border-slate-100 dark:border-gray-700">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Unit</p>
                    <p className="font-bold text-slate-700 dark:text-white">{product.unit}</p>
                </div>
                <div className="bg-slate-50 dark:bg-gray-700/50 p-4 rounded-2xl border border-slate-100 dark:border-gray-700">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Stock</p>
                    <p className={`font-bold ${product.stockQuantity > 0 ? 'text-green-600' : 'text-red-500'}`}>
                        {product.stockQuantity > 0 ? 'In Stock' : 'Out of Stock'}
                    </p>
                </div>
            </div>

            {/* Description */}
            <div>
                <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined">description</span>
                    Product Description
                </h3>
                <div
                    className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-gray-300 text-sm leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: product.description }}
                />
            </div>

            {/* Instructions */}
            {(product.usageInstructions || product.storageInstructions) && (
                <div className="grid md:grid-cols-2 gap-6">
                    {product.usageInstructions && (
                        <div className="bg-blue-50 dark:bg-blue-900/10 p-5 rounded-2xl border border-blue-100 dark:border-blue-900/20">
                            <h4 className="text-sm font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                <span className="material-symbols-outlined text-lg">medication</span>
                                Usage Instructions
                            </h4>
                            <p className="text-sm text-slate-600 dark:text-gray-300">{product.usageInstructions}</p>
                        </div>
                    )}

                    {product.storageInstructions && (
                        <div className="bg-amber-50 dark:bg-amber-900/10 p-5 rounded-2xl border border-amber-100 dark:border-amber-900/20">
                            <h4 className="text-sm font-black text-amber-600 dark:text-amber-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                <span className="material-symbols-outlined text-lg">thermostat</span>
                                Storage
                            </h4>
                            <p className="text-sm text-slate-600 dark:text-gray-300">{product.storageInstructions}</p>
                        </div>
                    )}
                </div>
            )}

            {/* Return Policy */}
            <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-dashed border-gray-300 dark:border-gray-600">
                <span className="material-symbols-outlined text-gray-400">assignment_return</span>
                <div className="text-xs">
                    <p className="font-bold text-slate-700 dark:text-gray-200">
                        {product.returnEligible ? 'Return Policy' : 'No Returns'}
                    </p>
                    <p className="text-slate-500">
                        {product.returnEligible
                            ? 'Products are returnable within the applicable return window if you’ve received them in a condition that is physically damaged, has missing parts or accessories, defective or different from their description on the product detail page.'
                            : 'This item is not eligible for return due to hygiene/health and personal care/wellness nature of the item.'}
                    </p>
                </div>
            </div>
        </div>
    );
}
