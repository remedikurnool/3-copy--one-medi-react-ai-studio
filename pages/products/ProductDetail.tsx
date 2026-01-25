
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PRODUCTS } from '../../constants';
import { useCartStore } from '../../store/cartStore';
import { triggerCartAnimation } from '../../components/ui/FlyingCartAnimation';
import { Breadcrumbs } from '../../components/ui/Breadcrumbs';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = PRODUCTS.find(p => p.id === id);
  const addToCart = useCartStore((state) => state.addToCart);
  const cartItemsCount = useCartStore((state) => state.items.length);
  
  const [selectedImg, setSelectedImg] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(product?.variants ? product.variants[0] : null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
      if (product) {
          setSelectedImg(0);
          setSelectedVariant(product.variants ? product.variants[0] : null);
      }
  }, [id, product]);

  if (!product) return <div className="p-10 text-center font-bold">Product not found.</div>;

  const currentPrice = selectedVariant ? selectedVariant.price : product.price;
  const currentMrp = selectedVariant ? selectedVariant.mrp : product.mrp;
  const discountPercent = Math.round(((currentMrp - currentPrice) / currentMrp) * 100);

  const handleAddToCart = (e: React.MouseEvent) => {
    triggerCartAnimation(e, product.image);
    addToCart({
      id: product.id + (selectedVariant ? `-${selectedVariant.id}` : ''),
      type: 'medicine', // Using existing cart logic
      name: product.name + (selectedVariant ? ` (${selectedVariant.label})` : ''),
      price: currentPrice,
      mrp: currentMrp,
      image: product.image,
      packSize: selectedVariant?.label || product.subCategory,
      qty: qty,
      discount: `${discountPercent}% OFF`
    });
  };

  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark text-slate-900 dark:text-white pb-32 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 px-4 py-3 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="size-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <span className="material-symbols-outlined text-2xl">arrow_back</span>
        </button>
        <h1 className="text-lg font-bold truncate max-w-[200px]">{product.name}</h1>
        <button onClick={() => navigate('/cart')} className="relative size-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <span className="material-symbols-outlined text-2xl">shopping_cart</span>
          {cartItemsCount > 0 && <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] font-black px-1.5 rounded-full">{cartItemsCount}</span>}
        </button>
      </header>

      <main className="max-w-4xl mx-auto p-4 flex flex-col gap-6">
        {/* Breadcrumbs */}
        <Breadcrumbs items={[
            { label: product.category, path: '#' },
            { label: product.subCategory, path: '#' },
            { label: product.brand }
        ]} />

        {/* Top Section: Gallery & Basic Info */}
        <section className="bg-white dark:bg-gray-800 rounded-[2.5rem] p-6 shadow-sm border border-gray-100 dark:border-gray-700">
           <div className="flex flex-col lg:flex-row gap-8">
              {/* Image Gallery */}
              <div className="flex-1 flex flex-col gap-4">
                 <div className="aspect-square rounded-3xl bg-slate-50 dark:bg-gray-900 border border-slate-100 dark:border-gray-700 p-8 flex items-center justify-center relative overflow-hidden group">
                    <img src={product.images[selectedImg]} alt={product.name} className="max-h-full object-contain transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute top-4 left-4 bg-emerald-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">{discountPercent}% OFF</div>
                 </div>
                 <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                    {product.images.map((img, i) => (
                        <button 
                            key={i} 
                            onClick={() => setSelectedImg(i)}
                            className={`size-16 rounded-xl border-2 shrink-0 p-2 bg-white dark:bg-gray-900 transition-all ${selectedImg === i ? 'border-primary' : 'border-gray-100 dark:border-gray-700 opacity-60'}`}
                        >
                            <img src={img} className="size-full object-contain" alt="" />
                        </button>
                    ))}
                 </div>
              </div>

              {/* Main Info */}
              <div className="flex-1 flex flex-col justify-center">
                 <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">{product.brand}</span>
                    <span className="size-1 rounded-full bg-slate-300"></span>
                    <div className="flex items-center text-amber-500 font-bold text-xs">
                        <span className="material-symbols-outlined text-sm filled mr-0.5">star</span>
                        {product.rating}
                    </div>
                 </div>
                 <h2 className="text-2xl font-black leading-tight mb-2">{product.name}</h2>
                 <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 leading-relaxed">{product.description}</p>
                 
                 <div className="flex items-baseline gap-3 mb-6">
                    <span className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">₹{currentPrice}</span>
                    <span className="text-lg text-slate-400 line-through font-bold">₹{currentMrp}</span>
                 </div>

                 {/* Safety Badges (New Trust Signal) */}
                 {(product.isPregnancySafe || product.isBabySafe) && (
                    <div className="flex gap-2 mb-6">
                        {product.isPregnancySafe && (
                            <div className="flex items-center gap-2 px-3 py-2 bg-rose-50 dark:bg-rose-900/20 border border-rose-100 dark:border-rose-900 rounded-xl text-rose-600 dark:text-rose-400">
                                <span className="material-symbols-outlined text-lg filled">pregnant_woman</span>
                                <span className="text-[10px] font-black uppercase tracking-widest">Pregnancy Safe</span>
                            </div>
                        )}
                        {product.isBabySafe && (
                            <div className="flex items-center gap-2 px-3 py-2 bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-900 rounded-xl text-teal-600 dark:text-teal-400">
                                <span className="material-symbols-outlined text-lg filled">child_care</span>
                                <span className="text-[10px] font-black uppercase tracking-widest">Baby Safe</span>
                            </div>
                        )}
                    </div>
                 )}

                 {/* Variants Selector */}
                 {product.variants && (
                    <div className="mb-6">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Select Variant</p>
                        <div className="flex flex-wrap gap-2">
                            {product.variants.map(v => (
                                <button 
                                    key={v.id}
                                    onClick={() => setSelectedVariant(v)}
                                    className={`px-4 py-2.5 rounded-xl border-2 text-xs font-bold transition-all ${selectedVariant?.id === v.id ? 'border-primary bg-primary/5 text-primary' : 'border-gray-100 dark:border-gray-700 text-gray-500'}`}
                                >
                                    {v.label}
                                </button>
                            ))}
                        </div>
                    </div>
                 )}

                 {/* Trust Badges Bento */}
                 <div className="grid grid-cols-2 gap-3 mb-2">
                    <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-gray-700/50 rounded-2xl border border-slate-100 dark:border-gray-700">
                        <div className="size-8 rounded-lg bg-white dark:bg-gray-800 flex items-center justify-center text-primary shadow-sm">
                            <span className="material-symbols-outlined text-lg">verified_user</span>
                        </div>
                        <div>
                            <p className="text-[9px] font-black uppercase text-slate-400">Genuineness</p>
                            <p className="text-[10px] font-bold">100% Authentic</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-gray-700/50 rounded-2xl border border-slate-100 dark:border-gray-700">
                        <div className="size-8 rounded-lg bg-white dark:bg-gray-800 flex items-center justify-center text-secondary shadow-sm">
                            <span className="material-symbols-outlined text-lg">local_shipping</span>
                        </div>
                        <div>
                            <p className="text-[9px] font-black uppercase text-slate-400">Delivery</p>
                            <p className="text-[10px] font-bold">Today by 6 PM</p>
                        </div>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* Detailed Info Sections */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Features & What's in the Box */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-black mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">new_releases</span> Key Features
                </h3>
                <ul className="space-y-3">
                    {product.features?.map((f, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm font-medium text-slate-600 dark:text-gray-300">
                            <span className="material-symbols-outlined text-emerald-500 text-lg">check_circle</span>
                            {f}
                        </li>
                    ))}
                </ul>
                
                {product.whatsInTheBox && (
                    <div className="mt-8">
                        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">In the Box</h3>
                        <div className="flex flex-wrap gap-2">
                            {product.whatsInTheBox.map((item, i) => (
                                <span key={i} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-lg text-[10px] font-bold border border-gray-200 dark:border-gray-600">{item}</span>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Specifications & Usage */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-gray-700">
                {product.specifications ? (
                    <>
                        <h3 className="text-lg font-black mb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">settings_input_component</span> Specifications
                        </h3>
                        <div className="space-y-3">
                            {Object.entries(product.specifications).map(([key, val]) => (
                                <div key={key} className="flex justify-between items-center py-2 border-b border-gray-50 dark:border-gray-700 last:border-0">
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{key}</span>
                                    <span className="text-xs font-black text-slate-700 dark:text-gray-200">{val}</span>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <>
                        <h3 className="text-lg font-black mb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">help</span> How to Use
                        </h3>
                        <p className="text-sm font-medium text-slate-600 dark:text-gray-300 leading-relaxed italic">
                            "{product.howToUse || "Follow the instructions on the packaging or as advised by your healthcare professional."}"
                        </p>
                    </>
                )}

                {product.warranty && (
                    <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800 flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary">shield</span>
                        <div>
                            <p className="text-[10px] font-black uppercase text-primary tracking-widest">Authorized Warranty</p>
                            <p className="text-xs font-bold">{product.warranty}</p>
                        </div>
                    </div>
                )}
            </div>
        </section>

        {/* Similar Products Placeholder */}
        <section>
             <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4 px-1 text-center">Customers Also Bought</h3>
             <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4">
                 {PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).map(p => (
                     <div key={p.id} onClick={() => navigate(`/product/${p.id}`)} className="min-w-[180px] bg-white dark:bg-gray-800 p-4 rounded-[2rem] shadow-sm border border-gray-100 dark:border-gray-700 group cursor-pointer active:scale-95 transition-all">
                        <div className="h-28 bg-slate-50 dark:bg-gray-900 rounded-2xl mb-3 flex items-center justify-center p-3">
                            <img src={p.image} className="max-h-full object-contain group-hover:scale-110 transition-transform duration-500" alt="" />
                        </div>
                        <h4 className="text-xs font-black truncate leading-tight mb-1">{p.name}</h4>
                        <p className="text-base font-black text-primary">₹{p.price}</p>
                     </div>
                 ))}
             </div>
        </section>
      </main>

      {/* Sticky Bottom Bar */}
      <footer className="fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 p-4 pb-6 shadow-[0_-4px_20px_-4px_rgba(0,0,0,0.1)]">
        <div className="max-w-md mx-auto flex items-center gap-4">
            <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-xl h-14 p-1">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="size-10 flex items-center justify-center hover:bg-white dark:hover:bg-gray-700 rounded-lg transition-colors"><span className="material-symbols-outlined text-lg">remove</span></button>
                <span className="w-8 text-center font-black">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="size-10 flex items-center justify-center hover:bg-white dark:hover:bg-gray-700 rounded-lg transition-colors"><span className="material-symbols-outlined text-lg">add</span></button>
            </div>
            <button 
                onClick={handleAddToCart}
                className="flex-1 h-14 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-all group"
            >
                <span className="material-symbols-outlined group-hover:animate-bounce">shopping_cart</span>
                <span>Add to Cart</span>
            </button>
        </div>
      </footer>
    </div>
  );
}
