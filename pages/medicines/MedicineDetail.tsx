
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMedicine, useMedicineInventory } from '../../hooks/useMedicines';
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

// Loading skeleton component
const MedicineDetailSkeleton = () => (
  <div className="min-h-screen bg-bg-light dark:bg-bg-dark pb-24 animate-pulse">
    <header className="flex items-center justify-between bg-white dark:bg-gray-900 px-4 py-3">
      <div className="size-10 rounded-full bg-gray-200 dark:bg-gray-700"></div>
      <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
      <div className="size-10 rounded-full bg-gray-200 dark:bg-gray-700"></div>
    </header>
    <div className="p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-4">
        <div className="w-44 h-44 mx-auto bg-gray-200 dark:bg-gray-700 rounded-2xl mb-4"></div>
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
      </div>
    </div>
  </div>
);

export default function MedicineDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch medicine from Supabase
  const { data: medicine, loading, error } = useMedicine(id);
  const { data: inventory } = useMedicineInventory(id);

  const addToCart = useCartStore((state) => state.addToCart);
  const cartItemsCount = useCartStore((state) => state.items.length);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    setSelectedImageIndex(0);
  }, [id]);

  // Show loading state
  if (loading) {
    return <MedicineDetailSkeleton />;
  }

  // Show error or not found
  if (error || !medicine) {
    return (
      <div className="min-h-screen bg-bg-light dark:bg-bg-dark flex flex-col items-center justify-center p-8">
        <span className="material-symbols-outlined text-6xl text-gray-400 mb-4">medication</span>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Product not found</h2>
        <p className="text-gray-500 text-sm mb-6">The medicine you're looking for doesn't exist.</p>
        <button
          onClick={() => navigate('/medicines')}
          className="bg-primary text-white px-6 py-3 rounded-xl font-bold"
        >
          Browse Medicines
        </button>
      </div>
    );
  }

  // Get best price from inventory (if available)
  const bestInventory = inventory && inventory.length > 0
    ? inventory.reduce((best, curr) => curr.selling_price < best.selling_price ? curr : best, inventory[0])
    : null;

  const displayPrice = bestInventory?.selling_price || 0;
  const displayMrp = bestInventory?.mrp || displayPrice * 1.2;
  const discountPercentage = displayMrp > 0 ? Math.round(((displayMrp - displayPrice) / displayMrp) * 100) : 0;

  // Handle multiple images (use image_url or fallback)
  const displayImages = medicine.image_url ? [medicine.image_url] : ['https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80'];

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    triggerCartAnimation(e, displayImages[0]);

    addToCart({
      id: medicine.id,
      type: 'medicine',
      name: medicine.name,
      price: displayPrice,
      mrp: displayMrp,
      image: displayImages[0],
      packSize: medicine.pack_size || '1 Unit',
      qty: 1,
      discount: discountPercentage > 0 ? `${discountPercentage}% OFF` : '',
      isPrescriptionRequired: medicine.prescription_required || false
    });
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    handleAddToCart(e);
    setTimeout(() => {
      navigate('/cart');
    }, 400);
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
        <div className="relative w-full bg-white dark:bg-gray-800 pt-2 pb-4 rounded-b-3xl shadow-sm mb-4">
          <div className="px-4 mb-2">
            <Breadcrumbs items={[
              { label: 'Medicines', path: '/medicines' },
              { label: medicine.therapeutic_class || 'General', path: '/medicines' },
              { label: medicine.name }
            ]} />
          </div>

          {/* Image Gallery Section */}
          <div className="px-4 pb-2 flex justify-center">
            <div className="flex gap-3 items-start max-w-full">
              {/* Main Image */}
              <div className="shrink-0 w-44 h-44 aspect-square rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 bg-white shadow-sm relative group">
                <div
                  className="absolute inset-0 bg-center bg-contain bg-no-repeat p-4 transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url("${displayImages[selectedImageIndex]}")` }}
                >
                </div>
              </div>

              {/* Thumbnails Gallery - Vertical on Right */}
              {displayImages.length > 1 && (
                <div className="flex flex-col gap-2 h-44 overflow-y-auto no-scrollbar py-1">
                  {displayImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`size-12 shrink-0 rounded-lg border-2 overflow-hidden transition-all bg-white p-1 ${selectedImageIndex === idx ? 'border-primary scale-105 shadow-sm' : 'border-gray-200 dark:border-gray-700 opacity-60 hover:opacity-100'}`}
                    >
                      <img src={img} alt="" className="w-full h-full object-contain" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="px-4 mb-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="mb-3">
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white leading-tight mb-1">{medicine.name}</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Mfr: {medicine.manufacturer || 'Generic'}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {medicine.composition && (
                  <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded border border-blue-100 font-bold uppercase tracking-wide">
                    {medicine.composition}
                  </span>
                )}
                {medicine.dosage_form && (
                  <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-200 font-bold uppercase tracking-wide">
                    {medicine.dosage_form}
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              <span className="inline-flex items-center gap-1 bg-gray-100 dark:bg-gray-700 text-xs font-bold px-2.5 py-1 rounded-md text-gray-600 dark:text-gray-300">
                <span className="material-symbols-outlined text-[16px]">medication</span>
                {medicine.pack_size || '1 Unit'}
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

            {/* Inventory Availability */}
            {inventory && inventory.length > 0 && (
              <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-100 dark:border-green-800">
                <p className="text-xs font-bold text-green-700 dark:text-green-400">
                  <span className="material-symbols-outlined text-sm align-middle mr-1">check_circle</span>
                  Available at {inventory.length} vendor{inventory.length > 1 ? 's' : ''} near you
                </p>
              </div>
            )}

            <div className="flex items-end justify-between border-t border-gray-100 dark:border-gray-700 pt-4">
              <div>
                {discountPercentage > 0 && (
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-gray-400 text-sm line-through font-medium">₹{displayMrp.toFixed(2)}</span>
                    <span className="text-xs font-bold bg-secondary/10 text-secondary dark:text-teal-400 px-2 py-0.5 rounded-md">
                      {discountPercentage}% OFF
                    </span>
                  </div>
                )}
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">₹{displayPrice.toFixed(2)}</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Inclusive of all taxes</p>
              </div>
            </div>
          </div>
        </div>

        {/* Chemical Composition Section */}
        {medicine.composition && (
          <div className="px-4 mb-4">
            <div className="bg-teal-50 dark:bg-teal-900/20 rounded-2xl p-4 border border-teal-100 dark:border-teal-800">
              <div className="flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-teal-600 dark:text-teal-400">science</span>
                <h3 className="text-sm font-bold text-teal-800 dark:text-teal-200">Chemical Composition</h3>
              </div>
              <p className="text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">Contains <span className="font-bold text-teal-700 dark:text-teal-400">{medicine.composition}</span></p>
              {medicine.therapeutic_class && (
                <p className="text-xs text-gray-500">Therapeutic Class: {medicine.therapeutic_class}</p>
              )}
            </div>
          </div>
        )}

        {/* Prescription Promo */}
        <div className="px-4 mb-4">
          <PrescriptionPromo compact />
        </div>

        <div className="px-4 flex flex-col gap-3 pb-6">
          {/* Uses & Indications */}
          {medicine.indications && medicine.indications.length > 0 && (
            <AccordionItem icon="healing" title="Uses & Indications" colorClass="bg-blue-50 dark:bg-blue-900/30" iconColorClass="text-blue-600 dark:text-blue-400">
              <ul className="list-disc pl-5 space-y-1">
                {medicine.indications.map((use: string, i: number) => <li key={i}>{use}</li>)}
              </ul>
            </AccordionItem>
          )}

          {/* Dosage Instructions */}
          {medicine.dosage_instructions && (
            <AccordionItem icon="medication_liquid" title="Dosage Instructions" colorClass="bg-teal-50 dark:bg-teal-900/30" iconColorClass="text-teal-600 dark:text-teal-400">
              <p>{medicine.dosage_instructions}</p>
              {medicine.route_of_administration && (
                <p className="mt-2 text-xs text-gray-500 font-bold">Route: {medicine.route_of_administration}</p>
              )}
            </AccordionItem>
          )}

          {/* Side Effects */}
          {medicine.side_effects && medicine.side_effects.length > 0 && (
            <AccordionItem icon="warning" title="Side Effects" colorClass="bg-orange-50 dark:bg-orange-900/30" iconColorClass="text-orange-600 dark:text-orange-400">
              <p className="mb-2">Common side effects may include:</p>
              <ul className="list-disc pl-5 space-y-1">
                {medicine.side_effects.map((effect: string, i: number) => <li key={i}>{effect}</li>)}
              </ul>
            </AccordionItem>
          )}

          {/* Warnings */}
          {medicine.warnings && medicine.warnings.length > 0 && (
            <AccordionItem icon="block" title="Warnings & Precautions" colorClass="bg-red-50 dark:bg-red-900/30" iconColorClass="text-red-600 dark:text-red-400">
              <ul className="list-disc pl-5 space-y-1 text-red-600 dark:text-red-400">
                {medicine.warnings.map((w: string, i: number) => <li key={i}>{w}</li>)}
              </ul>
            </AccordionItem>
          )}
        </div>

        {/* Safety Advice Section */}
        {medicine.safety_advice && (
          <div className="px-4 mb-6">
            <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest mb-3 px-1">Safety Advice</h3>
            <div className="grid grid-cols-3 gap-2">
              <SafetyBadge type="Pregnancy" status={medicine.safety_advice.pregnancy || 'Consult'} />
              <SafetyBadge type="Alcohol" status={medicine.safety_advice.alcohol || 'Consult'} />
              <SafetyBadge type="Driving" status={medicine.safety_advice.driving || 'Consult'} />
            </div>
          </div>
        )}

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
