
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCartStore } from '../../store/cartStore';
import { triggerCartAnimation } from '../../components/ui/FlyingCartAnimation';
import { Breadcrumbs } from '../../components/ui/Breadcrumbs';
import { PrescriptionPromo } from '../../components/ui/PrescriptionPromo';
import { useMedicine, useMedicineSearch } from '../../hooks/useMedicines';
import { MedicineCardSkeleton } from '../../components/ui/Skeletons';

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

const SafetyBadge = ({ type, status }: { type: string, status: string }) => {
  let color = 'bg-gray-100 text-gray-600';
  let icon = 'help';

  if (status === 'Safe') { color = 'bg-green-100 text-green-700'; icon = 'check_circle'; }
  else if (status === 'Caution') { color = 'bg-orange-100 text-orange-700'; icon = 'warning'; }
  else if (status === 'Unsafe' || status === 'Avoid') { color = 'bg-red-100 text-red-700'; icon = 'block'; }

  return (
    <div className={`flex flex-col items-center justify-center p-3 rounded-xl ${color} dark:bg-opacity-10 text-center gap-1`}>
      <span className="material-symbols-outlined text-xl mb-1">{type === 'Pregnancy' ? 'pregnant_woman' : type === 'Alcohol' ? 'liquor' : 'directions_car'}</span>
      <span className="text-[10px] font-bold uppercase tracking-wide">{type}</span>
      <span className="text-xs font-bold">{status}</span>
    </div>
  );
};

export default function MedicineDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const addToCart = useCartStore((state) => state.addToCart);
  const cartItemsCount = useCartStore((state) => state.items.length);

  const { data: medicine, loading } = useMedicine(id);
  // Search for alternatives by composition
  const { data: searchResults } = useMedicineSearch(medicine?.composition || '');

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (loading) return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark p-4">
      <div className="flex flex-col gap-4 animate-pulse">
        <div className="h-64 bg-gray-200 dark:bg-gray-800 rounded-3xl w-full"></div>
        <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded-xl w-3/4"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded-lg w-1/2"></div>
        <div className="h-20 bg-gray-200 dark:bg-gray-800 rounded-2xl w-full"></div>
      </div>
    </div>
  );

  if (!medicine) return <div className="p-8 text-center text-slate-900 dark:text-white">Product not found</div>;

  // Logic to find alternatives: Same generic name (composition), different ID
  const alternatives = searchResults ? searchResults.filter(m => m.id !== id).slice(0, 2) : [];

  const handleAddToCart = (e: React.MouseEvent, targetMedicine = medicine) => {
    e.stopPropagation();
    triggerCartAnimation(e, targetMedicine.image_url);

    addToCart({
      id: targetMedicine.id,
      type: 'medicine',
      name: targetMedicine.name,
      price: targetMedicine.price,
      mrp: targetMedicine.price * 1.2,
      image: targetMedicine.image_url,
      packSize: targetMedicine.pack_size,
      qty: 1,
      discount: '20% OFF',
      isPrescriptionRequired: targetMedicine.prescription_required
    });
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    handleAddToCart(e);
    setTimeout(() => {
      navigate('/cart');
    }, 400);
  };

  // Handle multiple images (fallback to single image)
  const displayImages = [medicine.image_url];
  const discountPercentage = 20;

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
        <div className="relative w-full bg-white dark:bg-gray-800 pt-2 pb-4 rounded-b-3xl shadow-sm mb-4">
          <div className="px-4 mb-2">
            <Breadcrumbs items={[
              { label: 'Medicines', path: '/medicines' },
              { label: medicine.category, path: `/medicines?cat=${medicine.category}` },
              { label: medicine.name }
            ]} />
          </div>

          <div className="px-4 pb-2 flex justify-center">
            <div className="flex gap-3 items-start max-w-full">
              <div className="shrink-0 w-44 h-44 aspect-square rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 bg-white shadow-sm relative group">
                <div
                  className="absolute inset-0 bg-center bg-contain bg-no-repeat p-4 transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url("${displayImages[selectedImageIndex]}")` }}
                >
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 mb-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="mb-3">
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white leading-tight mb-1">{medicine.name}</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Mfr: {medicine.manufacturer}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded border border-blue-100 font-bold uppercase tracking-wide">
                  {medicine.composition}
                </span>
                <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-200 font-bold uppercase tracking-wide">
                  {medicine.dosage_form}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              <span className="inline-flex items-center gap-1 bg-gray-100 dark:bg-gray-700 text-xs font-bold px-2.5 py-1 rounded-md text-gray-600 dark:text-gray-300">
                <span className="material-symbols-outlined text-[16px]">medication</span>
                {medicine.pack_size}
              </span>
              {medicine.prescription_required ? (
                <span className="inline-flex items-center gap-1 bg-red-50 dark:bg-red-900/20 text-xs font-bold px-2.5 py-1 rounded-md text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/30">
                  <span className="material-symbols-outlined text-[16px]">description</span>
                  Rx Required
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 bg-green-50 dark:bg-green-900/20 text-xs font-bold px-2.5 py-1 rounded-md text-green-600 dark:text-green-400 border border-green-100 dark:border-green-900/30">
                  OTC Product
                </span>
              )}
            </div>

            <div className="flex items-end justify-between border-t border-gray-100 dark:border-gray-700 pt-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-gray-400 text-sm line-through font-medium">₹{(medicine.price * 1.2).toFixed(2)}</span>
                  <span className="text-xs font-bold bg-secondary/10 text-secondary dark:text-teal-400 px-2 py-0.5 rounded-md">
                    {discountPercentage}% OFF
                  </span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">₹{medicine.price.toFixed(2)}</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Inclusive of all taxes</p>
              </div>
            </div>
          </div>
        </div>

        {/* GENERIC ALTERNATIVES SECTION */}
        {alternatives.length > 0 && (
          <div className="px-4 mb-4 animate-slide-up">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/10 rounded-2xl p-4 border border-green-200 dark:border-green-800 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <span className="material-symbols-outlined text-6xl text-green-600">savings</span>
              </div>

              <div className="flex items-center gap-2 mb-3 relative z-10">
                <div className="size-8 rounded-lg bg-green-100 dark:bg-green-800 flex items-center justify-center text-green-700 dark:text-green-300">
                  <span className="material-symbols-outlined text-lg">percent</span>
                </div>
                <h3 className="text-sm font-bold text-green-900 dark:text-green-100">Cheaper Substitute Available</h3>
              </div>

              {alternatives.map(alt => {
                const savingsPercent = 20;

                return (
                  <div key={alt.id} className="bg-white dark:bg-gray-800 rounded-xl p-3 border border-green-100 dark:border-green-900/50 shadow-sm flex items-center gap-3 relative z-10 mb-2 last:mb-0">
                    <div className="size-12 rounded-lg bg-gray-50 dark:bg-gray-700 flex items-center justify-center shrink-0">
                      <img src={alt.image_url} alt={alt.name} className="size-8 object-contain" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white truncate">{alt.name}</h4>
                      <p className="text-[10px] text-gray-500 dark:text-gray-400">By {alt.manufacturer}</p>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="font-black text-base text-green-600 dark:text-green-400">₹{alt.price}</span>
                        <span className="text-xs text-gray-400 line-through">₹{medicine.price}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="text-[9px] font-black bg-green-600 text-white px-2 py-0.5 rounded-full uppercase tracking-wide shadow-sm">
                        Save {savingsPercent}%
                      </span>
                      <button
                        onClick={(e) => handleAddToCart(e, alt)}
                        className="text-[10px] font-bold text-primary border border-primary px-3 py-1.5 rounded-lg hover:bg-primary hover:text-white transition-all active:scale-95"
                      >
                        ADD
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Chemical Composition Section */}
        <div className="px-4 mb-4">
          <div className="bg-teal-50 dark:bg-teal-900/20 rounded-2xl p-4 border border-teal-100 dark:border-teal-800">
            <div className="flex items-center gap-2 mb-3">
              <span className="material-symbols-outlined text-teal-600 dark:text-teal-400">science</span>
              <h3 className="text-sm font-bold text-teal-800 dark:text-teal-200">Chemical Composition</h3>
            </div>
            <p className="text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">Contains <span className="font-bold text-teal-700 dark:text-teal-400">{medicine.composition}</span></p>
            <p className="text-xs text-gray-500">Therapeutic Class: {medicine.category}</p>
          </div>
        </div>

        {/* Prescription Promo Moved Here */}
        <div className="px-4 mb-4">
          <PrescriptionPromo compact />
        </div>

        {medicine.indications && medicine.indications.length > 0 && (
          <div className="px-4 mb-4">
            <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest mb-3 px-1">Uses & Indications</h3>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700">
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600 dark:text-gray-300">
                {medicine.indications.map((use, i) => <li key={i}>{use}</li>)}
              </ul>
            </div>
          </div>
        )}

        {medicine.side_effects && medicine.side_effects.length > 0 && (
          <div className="px-4 mb-4">
            <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest mb-3 px-1">Side Effects</h3>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700">
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600 dark:text-gray-300">
                {medicine.side_effects.map((effect, i) => <li key={i}>{effect}</li>)}
              </ul>
            </div>
          </div>
        )}

        {medicine.warnings && medicine.warnings.length > 0 && (
          <div className="px-4 mb-4">
            <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest mb-3 px-1">Warnings & Precautions</h3>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700">
              <ul className="list-disc pl-5 space-y-1 text-sm text-red-600 dark:text-red-400">
                {medicine.warnings.map((w, i) => <li key={i}>{w}</li>)}
              </ul>
            </div>
          </div>
        )}

        {medicine.dosage_instructions && (
          <div className="px-4 mb-4">
            <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest mb-3 px-1">Dosage Instructions</h3>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-300">{medicine.dosage_instructions}</p>
              {medicine.route_of_administration && (
                <p className="mt-2 text-xs text-gray-500 font-bold">Route: {medicine.route_of_administration}</p>
              )}
            </div>
          </div>
        )}

        {/* Safety Advice Section - Moved to Bottom */}
        <div className="px-4 mb-6">
          <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest mb-3 px-1">Safety Advice</h3>
          <div className="grid grid-cols-3 gap-2">
            <SafetyBadge type="Pregnancy" status={medicine.safety_advice?.pregnancy || 'unknown'} />
            <SafetyBadge type="Alcohol" status={medicine.safety_advice?.alcohol || 'unknown'} />
            <SafetyBadge type="Driving" status={medicine.safety_advice?.driving || 'unknown'} />
          </div>
        </div>

        <div className="h-8"></div>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 p-4 pb-6 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <div className="flex gap-3 h-14 max-w-md mx-auto">
          <button onClick={(e) => handleAddToCart(e)} className="flex-1 rounded-xl border-2 border-primary bg-transparent text-primary dark:text-white font-bold text-lg hover:bg-primary/10 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
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
