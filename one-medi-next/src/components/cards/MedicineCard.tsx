'use client';
import React from 'react';
import { Medicine } from '../../types';
import { useCartStore } from '../../store/cartStore';
import { triggerCartAnimation } from '../ui/FlyingCartAnimation';
import { LazyImage } from '../ui/LazyImage';

interface MedicineCardProps {
  medicine: Medicine;
  onClick: () => void;
}

export const MedicineCard: React.FC<MedicineCardProps> = ({ medicine, onClick }) => {
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    triggerCartAnimation(e, medicine.image);
    addToCart({
      id: medicine.id,
      type: 'medicine',
      name: medicine.name,
      price: medicine.price || 0,
      mrp: medicine.mrp || 0,
      image: medicine.image || '/placeholder.png',
      packSize: medicine.packSize || '1 Pack',
      qty: 1,
      discount: medicine.discount,
      isPrescriptionRequired: medicine.prescriptionRequired
    });
  };

  return (
    <div
      onClick={onClick}
      className="group relative min-w-[170px] w-[170px] bg-white dark:bg-slate-900/60 rounded-[2rem] p-4 shadow-glass border border-white/40 dark:border-slate-800/50 cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-float active:scale-95 overflow-hidden"
    >
      {/* Dynamic Background Glow */}
      <div className="absolute -top-10 -right-10 size-24 bg-primary/10 blur-3xl group-hover:bg-primary/20 transition-colors duration-500"></div>

      {/* Glassmorphic Discount Badge */}
      {medicine.discount && (
        <div className="absolute top-3 left-3 z-20 backdrop-blur-md bg-green-500/80 text-white text-[9px] font-black px-2 py-1 rounded-full shadow-sm border border-white/20">
          {medicine.discount}
        </div>
      )}

      {/* Image Container with Floating Effect */}
      <div className="relative h-32 w-full mb-4 flex items-center justify-center">
        <div className="absolute inset-0 bg-slate-50 dark:bg-slate-800/50 rounded-2xl scale-90 group-hover:scale-100 transition-transform duration-500"></div>
        <LazyImage
          src={medicine.image}
          alt={medicine.name}
          wrapperClassName="h-28 w-28 z-10"
          className="h-full w-full object-contain drop-shadow-2xl group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* Product Details */}
      <div className="flex flex-col gap-1">
        <h3 className="text-sm font-extrabold text-slate-900 dark:text-white line-clamp-2 leading-tight h-9 group-hover:text-primary transition-colors">
          {medicine.name}
        </h3>
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
          {medicine.packSize}
        </p>

        <div className="mt-3 flex items-end justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 line-through font-bold">₹{medicine.mrp}</span>
            <span className="text-lg font-black text-slate-900 dark:text-white tracking-tighter">₹{medicine.price}</span>
          </div>

          <button
            onClick={handleAdd}
            className="size-10 rounded-2xl bg-gradient-to-br from-primary to-primary-dark text-white flex items-center justify-center shadow-lg shadow-primary/25 hover:scale-110 active:scale-90 transition-all border border-white/20"
          >
            <span className="material-symbols-outlined text-xl">add</span>
          </button>
        </div>
      </div>
    </div>
  );
};