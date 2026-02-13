import React from 'react';
import Image from 'next/image';
import { useCartStore } from '@/store/cartStore';
import { Medicine } from '@/types';

interface ProductCardProps {
    product: Medicine;
    onClick?: () => void;
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
    const { addToCart } = useCartStore();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation();
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            mrp: product.mrp,
            image: product.thumbnailImage || product.images[0],
            type: 'medicine',
            qty: 1,
            discount: product.discountPercent ? `${product.discountPercent}% OFF` : undefined,
        });
        // Optional: Add toast notification here
    };

    return (
        <div
            onClick={onClick}
            className="group bg-white dark:bg-gray-800 rounded-[2rem] p-4 border border-slate-100 dark:border-gray-700 shadow-sm flex flex-col h-full cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
            <div className="relative h-40 w-full bg-slate-50 dark:bg-gray-700 rounded-2xl overflow-hidden mb-4 shrink-0">
                <Image
                    src={product.thumbnailImage || product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {product.discountPercent && (
                    <span className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded-lg uppercase tracking-wider shadow-sm">
                        {product.discountPercent}% OFF
                    </span>
                )}
            </div>

            <div className="flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-1">
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider line-clamp-1">{product.category}</p>
                    {product.prescriptionRequired && (
                        <span className="text-[9px] font-bold text-blue-500 bg-blue-50 dark:bg-blue-900/30 px-1.5 py-0.5 rounded">Rx</span>
                    )}
                </div>

                <h4 className="text-sm font-black text-slate-900 dark:text-white leading-tight mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                    {product.name}
                </h4>
                <p className="text-[10px] text-slate-500 font-medium mb-3 line-clamp-1">{product.composition}</p>

                <div className="mt-auto pt-3 border-t border-slate-50 dark:border-gray-700 flex items-center justify-between">
                    <div>
                        <p className="flex items-baseline gap-1.5">
                            <span className="text-lg font-black text-slate-900 dark:text-white">₹{product.price}</span>
                            <span className="text-xs font-bold text-slate-400 line-through">₹{product.mrp}</span>
                        </p>
                        <p className="text-[9px] text-slate-400 font-medium">{product.packSize}</p>
                    </div>

                    <button
                        onClick={handleAddToCart}
                        className="bg-primary/10 text-primary hover:bg-primary hover:text-white size-10 rounded-xl flex items-center justify-center transition-all active:scale-95 shadow-sm"
                        aria-label="Add to cart"
                    >
                        <span className="material-symbols-outlined">add_shopping_cart</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
