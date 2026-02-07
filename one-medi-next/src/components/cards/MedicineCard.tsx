'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useCartStore } from '@/store/cartStore';
import { LazyImage } from '../ui/LazyImage';

// Helper for discount calculation
const calculateDiscount = (mrp: number, sellingPrice: number) => {
  if (!mrp || !sellingPrice || mrp <= sellingPrice) return 0;
  return Math.round(((mrp - sellingPrice) / mrp) * 100);
};

export const MedicineCard = ({ medicine, onClick }: { medicine: any, onClick?: () => void }) => {
  const { addToCart: addItem } = useCartStore();

  const discount = calculateDiscount(medicine.mrp, medicine.selling_price);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem({ ...medicine, type: 'medicine' });
    // TODO: Add toast notification here
  };

  return (
    <motion.div
      className="group relative card-modern p-3 w-[160px] h-full flex flex-col cursor-pointer"
      onClick={onClick}
    >
      {/* Discount Badge */}
      {discount > 0 && (
        <div className="absolute top-3 left-3 z-10 bg-red-500/90 backdrop-blur-sm text-white text-[10px] font-black px-2 py-0.5 rounded-lg shadow-sm border border-white/10">
          {discount}% OFF
        </div>
      )}

      {/* Image Container */}
      <div className="relative w-full aspect-square rounded-2xl bg-surface-50 dark:bg-surface-800 mb-3 overflow-hidden group-hover:bg-surface-100 transition-colors">
        <LazyImage
          src={medicine.image_url || 'https://images.unsplash.com/photo-1584308666746-953a5e66c7c9?auto=format&fit=crop&q=80&w=400'}
          alt={medicine.name || 'Medicine'}
          fill
          sizes="160px"
          className="object-cover mix-blend-multiply dark:mix-blend-normal p-2 group-hover:scale-110 transition-transform duration-500"
        />

        {/* Quick Add Button (Visible on Hover/Mobile) */}
        <motion.button
          onClick={handleAddToCart}
          className="absolute bottom-2 right-2 size-9 bg-white dark:bg-surface-700 rounded-full shadow-lg flex items-center justify-center text-primary-600 group-hover:scale-100 scale-0 transition-transform duration-300 pointer-events-auto border border-surface-100 dark:border-surface-600"
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
        >
          <span className="material-symbols-outlined text-xl">add_shopping_cart</span>
        </motion.button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col">
        <h3 className="font-bold text-slate-800 dark:text-gray-100 text-sm leading-tight line-clamp-2 mb-1 group-hover:text-primary-600 transition-colors font-manrope">
          {medicine.name}
        </h3>
        <p className="text-[10px] text-slate-500 dark:text-slate-400 mb-2 line-clamp-1 font-medium">
          {medicine.manufacturer || 'Generic'}
        </p>

        <div className="mt-auto flex items-end justify-between border-t border-dashed border-slate-100 dark:border-slate-700 pt-2">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 line-through decoration-red-400/50">
              ₹{medicine.mrp}
            </span>
            <span className="text-sm font-black text-slate-900 dark:text-white">
              ₹{medicine.selling_price}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            className="lg:hidden size-8 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center active:bg-primary-600 active:text-white transition-colors"
          >
            <span className="material-symbols-outlined text-lg">add</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};