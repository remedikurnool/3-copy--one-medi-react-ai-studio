
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MEDICINES } from '../../constants';
import { useCartStore } from '../../store/cartStore';
import { triggerCartAnimation } from '../../components/ui/FlyingCartAnimation';
import { Breadcrumbs } from '../../components/ui/Breadcrumbs';
import { PrescriptionPromo } from '../../components/ui/PrescriptionPromo';

interface AccordionItemProps {
  icon: string;
  title: string;
  children?: React.ReactNode;
  colorClass: string;
  iconColorClass: string;
}

const AccordionItem = ({ icon, title, children, colorClass, iconColorClass }: AccordionItemProps) => (
  <details className="group bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm open:ring-2 open:ring-primary/20 transition-all duration-300">
    <summary className="flex items-center justify-between p-4 cursor-pointer list-none">
      <div className="flex items-center gap-3">
        <div className={`size-8 rounded-full flex items-center justify-center ${colorClass} ${iconColorClass}`}>
          <span className="material-symbols-outlined text-lg">{icon}</span>
        </div>
        <span className="font-bold text-base text-slate-900 dark:text-white">{title}</span>
      </div>
      <span className="material-symbols-outlined text-gray-400 transition-transform duration-300 group-open:rotate-180">expand_more</span>
    </summary>
    <div className="px-4 pb-4 pt-0 text-sm leading-relaxed text-gray-600 dark:text-gray-300 border-t border-gray-50 dark:border-gray-800 mt-2">
      <div className="pt-2">{children}</div>
    </div>
  </details>
);

export default function MedicineDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const medicine = MEDICINES.find(m => m.id === id);
  const addToCart = useCartStore((state) => state.addToCart);
  const cartItemsCount = useCartStore((state) => state.items.length);

  if (!medicine) return <div className="p-8 text-center text-slate-900 dark:text-white">Product not found</div>;

  const handleAddToCart = (e: React.MouseEvent) => {
    triggerCartAnimation(e, medicine.image);
    addToCart({
      id: medicine.id,
      type: 'medicine',
      name: medicine.name,
      price: medicine.price,
      mrp: medicine.mrp,
      image: medicine.image,
      packSize: medicine.packSize,
      qty: 1,
      discount: medicine.discount,
      isPrescriptionRequired: medicine.isPrescriptionRequired
    });
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    handleAddToCart(e);
    setTimeout(() => {
        navigate('/cart');
    }, 400); // Small delay to let animation start
  };

  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark pb-24 relative flex flex-col font-sans">
      <header className="sticky top-0 z-50 flex items-center justify-between bg-white/95 dark:bg-gray-900/95 backdrop-blur-md px-4 py-3 shadow-sm border-b border-gray-100 dark:border-gray-800">
        <button 
          onClick={() => navigate(-1)} 
          className="flex size-10 items-center justify-center rounded-full text-slate-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <span className="material-symbols-outlined text-2xl">arrow_back</span>
        </button>
        <h1 className="text-lg font-bold leading-tight tracking-tight text-slate-900 dark:text-white text-center flex-1">Product Details</h1>
        <button 
          id="cart-icon-target"
          onClick={() => navigate('/cart')} 
          className="flex size-10 items-center justify-center rounded-full text-slate-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative"
        >
          <span className="material-symbols-outlined text-2xl">shopping_cart</span>
          {cartItemsCount > 0 && <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">{cartItemsCount}</span>}
        </button>
      </header>

      <main className="flex-1 w-full">
        <div className="relative w-full bg-white dark:bg-gray-800 pt-4 pb-6 rounded-b-3xl shadow-sm mb-4">
          <div className="px-4 mb-2">
            <Breadcrumbs items={[
              { label: 'Medicines', path: '/medicines' },
              { label: medicine.category, path: '/medicines' },
              { label: medicine.name }
            ]} />
          </div>
          <div className="flex justify-center px-4 pb-4">
            <div className="shrink-0 w-[85%] sm:w-[300px] aspect-square rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 bg-white shadow-sm relative group mx-auto">
              <div 
                className="absolute inset-0 bg-center bg-contain bg-no-repeat p-8" 
                style={{backgroundImage: `url("${medicine.image}")`}}
              >
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 mb-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="mb-3">
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white leading-tight mb-1">{medicine.name}</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">{medicine.manufacturer}</p>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="inline-flex items-center gap-1 bg-gray-100 dark:bg-gray-700 text-xs font-bold px-2.5 py-1 rounded-md text-gray-600 dark:text-gray-300">
                <span className="material-symbols-outlined text-[16px]">medication</span>
                {medicine.packSize}
              </span>
              <span className="inline-flex items-center gap-1 bg-blue-50 dark:bg-blue-900/20 text-xs font-bold px-2.5 py-1 rounded-md text-blue-700 dark:text-blue-300">
                <span className="material-symbols-outlined text-[16px] filled">verified_user</span>
                Genuine
              </span>
              {medicine.isPrescriptionRequired && (
                <span className="inline-flex items-center gap-1 bg-red-50 dark:bg-red-900/20 text-xs font-bold px-2.5 py-1 rounded-md text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/30">
                  <span className="material-symbols-outlined text-[16px]">prescription</span>
                  Rx Required
                </span>
              )}
            </div>

            <div className="flex items-end justify-between border-t border-gray-100 dark:border-gray-700 pt-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-gray-400 text-sm line-through font-medium">₹{medicine.mrp.toFixed(2)}</span>
                  {medicine.discount && (
                    <span className="text-xs font-bold bg-secondary/10 text-secondary dark:text-teal-400 px-2 py-0.5 rounded-md">{medicine.discount}</span>
                  )}
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">₹{medicine.price.toFixed(2)}</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Inclusive of all taxes</p>
              </div>
            </div>
          </div>
        </div>

        {/* Generic Alternatives Section */}
        <div className="px-4 mb-4">
           <div className="bg-teal-50 dark:bg-teal-900/20 rounded-2xl p-4 border border-teal-100 dark:border-teal-800">
              <div className="flex items-center gap-2 mb-3">
                 <span className="material-symbols-outlined text-teal-600 dark:text-teal-400">savings</span>
                 <h3 className="text-sm font-bold text-teal-800 dark:text-teal-200">Generic Alternative Available</h3>
              </div>
              <div className="flex justify-between items-center bg-white dark:bg-gray-800 p-3 rounded-xl shadow-sm">
                 <div>
                    <p className="font-bold text-sm text-slate-800 dark:text-white">Generic {medicine.name.split(' ')[0]}</p>
                    <p className="text-xs text-gray-500">Same Composition</p>
                 </div>
                 <div className="text-right">
                    <p className="font-bold text-lg text-green-600">₹{(medicine.price * 0.4).toFixed(2)}</p>
                    <p className="text-[10px] text-gray-400">Save 60%</p>
                 </div>
                 <button className="bg-teal-100 text-teal-700 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-teal-200 transition-colors">
                    View
                 </button>
              </div>
           </div>
        </div>

        <div className="px-4 mb-6">
          <div className="flex items-center justify-between gap-2 p-3 bg-blue-50/50 dark:bg-blue-900/10 rounded-xl border border-blue-100 dark:border-blue-900/30">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-blue-600 dark:text-blue-400">local_shipping</span>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-blue-900 dark:text-blue-100">{medicine.deliveryTime || 'Fast'} Delivery</span>
                <span className="text-[10px] text-blue-700 dark:text-blue-300">in Kurnool</span>
              </div>
            </div>
            <div className="w-px h-8 bg-blue-200 dark:bg-blue-800"></div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-green-600 dark:text-green-400 filled">verified</span>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-blue-900 dark:text-blue-100">Safe & Secure</span>
                <span className="text-[10px] text-blue-700 dark:text-blue-300">Payment</span>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 flex flex-col gap-3 pb-6">
          {medicine.description && (
            <AccordionItem icon="description" title="Description" colorClass="bg-blue-50 dark:bg-blue-900/30" iconColorClass="text-blue-600 dark:text-blue-400">
              <p>{medicine.description}</p>
            </AccordionItem>
          )}

          {medicine.uses && (
             <AccordionItem icon="healing" title="Uses" colorClass="bg-teal-50 dark:bg-teal-900/30" iconColorClass="text-teal-600 dark:text-teal-400">
               <ul className="list-disc pl-5 space-y-1">
                 {medicine.uses.map((use, i) => <li key={i}>{use}</li>)}
               </ul>
             </AccordionItem>
          )}

          {medicine.sideEffects && (
            <AccordionItem icon="warning" title="Side Effects" colorClass="bg-red-50 dark:bg-red-900/30" iconColorClass="text-red-600 dark:text-red-400">
               <p className="mb-2">Common side effects may include:</p>
               <ul className="list-disc pl-5 space-y-1">
                  {medicine.sideEffects.map((effect, i) => <li key={i}>{effect}</li>)}
               </ul>
            </AccordionItem>
          )}
        </div>

        {/* Prescription Promo in Detail Page */}
        <div className="px-4 pb-6">
          <PrescriptionPromo compact />
        </div>
        
        <div className="h-8"></div>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 p-4 pb-6 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <div className="flex gap-3 h-14 max-w-md mx-auto">
          <button onClick={handleAddToCart} className="flex-1 rounded-xl border-2 border-primary bg-transparent text-primary dark:text-white font-bold text-lg hover:bg-primary/10 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
             <span className="material-symbols-outlined">shopping_cart</span>
             Add to Cart
          </button>
          <button onClick={handleBuyNow} className="flex-1 rounded-xl bg-primary text-white font-bold text-lg hover:brightness-105 hover:shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-md shadow-primary/30">
             <span className="material-symbols-outlined filled">flash_on</span>
             Buy Now
          </button>
        </div>
      </footer>
    </div>
  );
}
