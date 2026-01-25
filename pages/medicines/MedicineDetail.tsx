
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MEDICINES, PRODUCTS } from '../../constants';
import { useCartStore } from '../../store/cartStore';
import { useUserStore } from '../../store/userStore';
import { triggerCartAnimation } from '../../components/ui/FlyingCartAnimation';
import { Breadcrumbs } from '../../components/ui/Breadcrumbs';

export default function MedicineDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language } = useUserStore();
  const medicine = MEDICINES.find(m => m.id === id);
  const addToCart = useCartStore((state) => state.addToCart);
  const cartItemsCount = useCartStore((state) => state.items.length);
  
  const [selectedVariant, setSelectedVariant] = useState(medicine ? medicine.variants[0] : null);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const t = (en: string, te: string) => language === 'te' ? te : en;

  useEffect(() => {
    if (medicine) {
        setSelectedVariant(medicine.variants[0]);
    }
  }, [id, medicine]);

  if (!medicine || !selectedVariant) return <div className="p-8 text-center text-slate-900 dark:text-white">Product not found</div>;

  const discountPercentage = Math.round(((selectedVariant.mrp - selectedVariant.sellingPrice) / selectedVariant.mrp) * 100);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    triggerCartAnimation(e, medicine.image);
    
    addToCart({
      id: medicine.id + `-${selectedVariant.id}`,
      type: 'medicine',
      name: medicine.name,
      price: isSubscribed ? selectedVariant.sellingPrice * 0.85 : selectedVariant.sellingPrice,
      mrp: selectedVariant.mrp,
      image: medicine.image,
      packSize: selectedVariant.packSize,
      qty: 1,
      discount: `${isSubscribed ? discountPercentage + 15 : discountPercentage}% OFF`,
      isPrescriptionRequired: medicine.prescriptionRequired
    });
  };

  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark pb-32 relative flex flex-col font-sans">
      <header className="sticky top-0 z-50 flex items-center justify-between bg-white/95 dark:bg-gray-900/95 backdrop-blur-md px-4 py-3 shadow-sm border-b border-gray-100 dark:border-gray-800">
        <button onClick={() => navigate(-1)} className="flex size-10 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <span className="material-symbols-outlined text-2xl">arrow_back</span>
        </button>
        <h1 className="text-lg font-bold truncate max-w-[200px] text-center flex-1">{t('Medicine Detail', 'మందుల వివరాలు')}</h1>
        <button id="cart-icon-target" onClick={() => navigate('/cart')} className="flex size-10 items-center justify-center rounded-full relative">
          <span className="material-symbols-outlined text-2xl">shopping_cart</span>
          {cartItemsCount > 0 && <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">{cartItemsCount}</span>}
        </button>
      </header>

      <main className="flex-1 w-full max-w-2xl mx-auto">
        <div className="bg-white dark:bg-gray-800 pt-4 pb-6 rounded-b-3xl shadow-sm mb-4">
          <div className="px-4 mb-4">
            <Breadcrumbs items={[{ label: t('Medicines', 'మందులు'), path: '/medicines' }, { label: medicine.name }]} />
          </div>
          
          {medicine.fulfilledBy && (
              <div className="px-4 mb-4">
                  <div className="flex items-center gap-2 p-2 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800 rounded-xl">
                      <div className="size-8 rounded-lg bg-white overflow-hidden shadow-sm">
                          <img src={medicine.fulfilledBy.image} className="size-full object-cover" alt="" />
                      </div>
                      <p className="text-[10px] font-black text-emerald-700 dark:text-emerald-400 uppercase tracking-widest">
                        {t('Fulfilled by', 'ద్వారా సరఫరా చేయబడింది')}: <span className="text-slate-900 dark:text-white">{medicine.fulfilledBy.name}</span>
                      </p>
                  </div>
              </div>
          )}

          <div className="px-4 flex justify-center">
            <div className="w-64 h-64 aspect-square rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 bg-white shadow-inner relative p-8">
                <img src={medicine.image} alt="" className="size-full object-contain" />
                {medicine.verifiedByDoctor && (
                    <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-2 py-1 rounded-lg shadow-md border border-primary/20 flex flex-col items-center">
                        <span className="material-symbols-outlined text-primary text-xl filled">verified</span>
                        <span className="text-[7px] font-black uppercase text-center text-slate-500 dark:text-gray-400 mt-0.5">{t('Doctor Verified', 'వైద్యుల ధ్రువీకరణ')}</span>
                    </div>
                )}
            </div>
          </div>
        </div>

        <div className="px-4 mb-4">
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="mb-4">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white leading-tight mb-1">{medicine.name}</h2>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">{medicine.manufacturer}</p>
            </div>
            
            <div className="flex items-end justify-between mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-gray-400 text-sm line-through font-bold">₹{selectedVariant.mrp}</span>
                  <span className="text-xs font-black bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-md">
                    {discountPercentage}% OFF
                  </span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">₹{selectedVariant.sellingPrice}</span>
                </div>
              </div>
              <div className="text-right">
                  <span className="inline-block px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-primary text-[10px] font-black uppercase rounded-lg border border-blue-100">
                    {selectedVariant.packSize}
                  </span>
              </div>
            </div>

            {/* Subscribe & Save Engine */}
            <div 
                onClick={() => setIsSubscribed(!isSubscribed)}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer relative overflow-hidden ${isSubscribed ? 'border-primary bg-primary/5' : 'border-gray-100 dark:border-gray-700'}`}
            >
                {isSubscribed && <div className="absolute top-0 right-0 bg-primary text-white text-[8px] font-black px-2 py-0.5 rounded-bl-lg">SAVING ACTIVE</div>}
                <div className="flex items-center gap-4">
                    <div className={`size-10 rounded-full flex items-center justify-center transition-colors ${isSubscribed ? 'bg-primary text-white shadow-lg' : 'bg-gray-100 text-gray-400'}`}>
                        <span className="material-symbols-outlined text-2xl">{isSubscribed ? 'check' : 'autorenew'}</span>
                    </div>
                    <div className="flex-1">
                        <h4 className="font-black text-sm text-slate-900 dark:text-white">{t('Subscribe & Save 15% Extra', 'సబ్స్క్రయిబ్ చేయండి & అదనంగా 15% ఆదా చేయండి')}</h4>
                        <p className="text-[10px] font-bold text-slate-500 dark:text-gray-400 uppercase tracking-widest">{t('Automatic monthly delivery to Kurnool', 'నెలకు ఒకసారి ఆటోమేటిక్ డెలివరీ')}</p>
                    </div>
                    <div className="size-5 rounded border-2 border-primary/30 flex items-center justify-center">
                        {isSubscribed && <div className="size-3 bg-primary rounded-sm"></div>}
                    </div>
                </div>
            </div>
          </div>
        </div>

        {/* Cross-Sell Carousel */}
        {medicine.crossSellIds && medicine.crossSellIds.length > 0 && (
             <div className="px-4 mb-6">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4 ml-1">{t('Frequently Bought Together', 'తరచుగా కలిసి కొనేవి')}</h3>
                <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                    {medicine.crossSellIds.map(csId => {
                        const csProduct = PRODUCTS.find(p => p.id === csId) || MEDICINES.find(m => m.id === csId);
                        if (!csProduct) return null;
                        return (
                            <div key={csId} onClick={() => navigate(`/product/${csId}`)} className="min-w-[150px] bg-white dark:bg-gray-800 p-4 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm group cursor-pointer active:scale-95 transition-all">
                                <img src={csProduct.image} className="h-20 w-full object-contain mb-2 group-hover:scale-110 transition-transform" alt="" />
                                <h4 className="text-[10px] font-bold leading-tight mb-1 line-clamp-2 h-6">{csProduct.name}</h4>
                                <div className="flex justify-between items-center">
                                    <span className="font-black text-xs">₹{csProduct.price}</span>
                                    <span className="material-symbols-outlined text-primary text-sm">add_circle</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
             </div>
        )}

        <div className="px-4 mb-6">
            <div className="bg-slate-900 text-white rounded-[2rem] p-5 shadow-lg relative overflow-hidden">
                <div className="absolute right-[-20px] bottom-[-20px] size-32 bg-white/5 rounded-full blur-2xl"></div>
                <div className="relative z-10 flex gap-4">
                    <div className="size-12 rounded-full border-2 border-primary overflow-hidden shrink-0">
                        <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=100" className="size-full object-cover" alt="" />
                    </div>
                    <div>
                        <p className="text-xs font-black text-primary uppercase tracking-widest mb-1">{t("Dr. Ramesh's Advice", "డాక్టర్ రమేష్ సలహా")}</p>
                        <p className="text-sm font-medium leading-relaxed italic opacity-90">
                            "{t("Dolo is very effective for seasonal fevers in Kurnool. Take it only after meals.", "కర్నూలులో వచ్చే సీజనల్ జ్వరాలకు డోలో చాలా ప్రభావవంతంగా పనిచేస్తుంది. ఆహారం తీసుకున్న తర్వాతే వేసుకోవాలి.")}"
                        </p>
                    </div>
                </div>
            </div>
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-gray-100 dark:border-gray-800 p-4 pb-8 shadow-[0_-8px_24px_rgba(0,0,0,0.05)]">
        <div className="max-w-md mx-auto flex gap-4">
            <button 
                onClick={handleAddToCart}
                className="flex-1 h-14 rounded-2xl border-2 border-primary text-primary font-black text-sm uppercase tracking-widest active:scale-95 transition-all flex items-center justify-center gap-2"
            >
                <span className="material-symbols-outlined">add_shopping_cart</span>
                {t('Add to Cart', 'కార్ట్‌కు జోడించు')}
            </button>
            <button 
                onClick={() => { handleAddToCart({} as any); setTimeout(() => navigate('/cart'), 300); }}
                className="flex-[1.5] h-14 rounded-2xl bg-primary text-white font-black text-sm uppercase tracking-widest shadow-xl shadow-primary/30 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
                <span className="material-symbols-outlined filled">bolt</span>
                {t('Buy Now', 'ఇప్పుడే కొనండి')}
            </button>
        </div>
      </footer>
    </div>
  );
}
