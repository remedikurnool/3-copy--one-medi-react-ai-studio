
import React from 'react';
import { Medicine } from '../../types';
import { useCartStore } from '../../store/cartStore';
import { triggerCartAnimation } from '../ui/FlyingCartAnimation';
import { LazyImage } from '../ui/LazyImage';
import { useUserStore } from '../../store/userStore';

interface MedicineCardProps {
  medicine: Medicine;
  onClick: () => void;
}

export const MedicineCard: React.FC<MedicineCardProps> = ({ medicine, onClick }) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const { language } = useUserStore();
  
  const t = (en: string, te: string) => language === 'te' ? te : en;

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    triggerCartAnimation(e, medicine.image);
    addToCart({
      id: medicine.id,
      type: 'medicine',
      name: medicine.name,
      price: medicine.price || 0,
      mrp: medicine.mrp || 0,
      image: medicine.image,
      packSize: medicine.packSize,
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
      
      {/* Trust Tags */}
      <div className="absolute top-3 left-3 z-20 flex flex-col gap-1">
        {medicine.discount && (
            <div className="backdrop-blur-md bg-green-500/80 text-white text-[8px] font-black px-2 py-0.5 rounded-full shadow-sm border border-white/20 uppercase tracking-tighter">
            {medicine.discount}
            </div>
        )}
        {medicine.verifiedByDoctor && (
            <div className="backdrop-blur-md bg-teal-600/90 text-white text-[7px] font-black px-2 py-0.5 rounded-full shadow-sm border border-white/10 uppercase tracking-tighter flex items-center gap-0.5">
                <span className="material-symbols-outlined text-[8px] filled">verified</span>
                {t('Verified', 'ధ్రువీకరించబడింది')}
            </div>
        )}
      </div>

      {/* Image Container */}
      <div className="relative h-28 w-full mb-3 flex items-center justify-center">
        <div className="absolute inset-0 bg-slate-50 dark:bg-slate-800/50 rounded-2xl scale-90 group-hover:scale-100 transition-transform duration-500"></div>
        <LazyImage 
          src={medicine.image} 
          alt={medicine.name} 
          wrapperClassName="h-24 w-24 z-10"
          className="h-full w-full object-contain drop-shadow-2xl group-hover:scale-110 transition-transform duration-500" 
        />
      </div>
      
      {/* Product Details */}
      <div className="flex flex-col gap-0.5">
        <h3 className="text-xs font-extrabold text-slate-900 dark:text-white line-clamp-2 leading-tight h-8 group-hover:text-primary transition-colors">
          {medicine.name}
        </h3>
        
        {/* Localized Delivery Promise */}
        <div className="flex items-center gap-1 text-[8px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mt-1">
            <span className="material-symbols-outlined text-[10px] filled">local_shipping</span>
            {t('2hr Delivery in Kurnool', '2గం.లో డెలివరీ')}
        </div>
        
        <div className="mt-2 flex items-end justify-between">
          <div className="flex flex-col">
             <span className="text-[9px] text-slate-400 line-through font-bold">₹{medicine.mrp}</span>
             <span className="text-base font-black text-slate-900 dark:text-white tracking-tighter">₹{medicine.price}</span>
          </div>
          
          <button 
            onClick={handleAdd}
            className="size-9 rounded-2xl bg-gradient-to-br from-primary to-primary-dark text-white flex items-center justify-center shadow-lg shadow-primary/25 hover:scale-110 active:scale-90 transition-all border border-white/20"
          >
            <span className="material-symbols-outlined text-lg">add</span>
          </button>
        </div>
      </div>
    </div>
  );
};
