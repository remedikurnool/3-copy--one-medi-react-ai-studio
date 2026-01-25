
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { useUserStore } from '../store/userStore';
import PrescriptionUpload from '../components/ui/PrescriptionUpload';

export default function Cart() {
  const navigate = useNavigate();
  const { items, updateQuantity, removeFromCart, totalPrice, totalMrp, prescription, setPrescription } = useCartStore();
  const { language } = useUserStore();
  
  const finalTotal = totalPrice();
  const finalMrp = totalMrp();
  const savings = finalMrp - finalTotal;
  
  const t = (en: string, te: string) => language === 'te' ? te : en;

  const isPrescriptionNeeded = items.some(item => item.isPrescriptionRequired);
  const canCheckout = (!isPrescriptionNeeded || (isPrescriptionNeeded && !!prescription));

  const [showExitModal, setShowExitModal] = useState(false);

  useEffect(() => {
    const handlePopState = () => {
        if (items.length > 0) {
            setShowExitModal(true);
            window.history.pushState(null, '', window.location.href);
        }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [items.length]);

  if (items.length === 0 && !prescription) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-bg-light dark:bg-bg-dark text-slate-900 dark:text-white p-6">
        <div className="size-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
          <span className="material-symbols-outlined text-4xl text-gray-400">shopping_cart_off</span>
        </div>
        <h2 className="text-xl font-black mb-2">{t('Your cart is empty', 'మీ కార్ట్ ఖాళీగా ఉంది')}</h2>
        <button 
          onClick={() => navigate('/')} 
          className="bg-primary text-white px-8 py-3 rounded-2xl font-black uppercase tracking-widest shadow-lg"
        >
          {t('Order Medicines', 'మందులు ఆర్డర్ చేయండి')}
        </button>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col min-h-screen mx-auto w-full bg-bg-light dark:bg-bg-dark pb-36 font-sans text-slate-900 dark:text-white">
      <header className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 px-4 py-3 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="size-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-lg font-black uppercase tracking-tight">{t('My Cart', 'నా కార్ట్')}</h1>
        <button onClick={() => alert('Connecting to Pharmacist in Kurnool...')} className="text-primary font-black text-[10px] uppercase tracking-widest bg-primary/10 px-3 py-1.5 rounded-lg border border-primary/20">
          {t('Chat with Pharmacist', 'ఫార్మసిస్ట్‌తో చాట్')}
        </button>
      </header>

      {/* Threshold Nudges */}
      <section className="px-4 py-4 space-y-3">
          {finalTotal < 500 && (
              <div className="bg-white dark:bg-gray-800 p-4 rounded-3xl shadow-sm border border-secondary/20 flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <p className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                        <span className="material-symbols-outlined text-secondary filled">local_shipping</span>
                        {t('Add ₹', 'ఇంకా ₹')}{500 - finalTotal} {t('more for Free Express Delivery in Kurnool', 'మరిన్ని జోడిస్తే కర్నూలులో ఉచిత ఎక్స్‌ప్రెస్ డెలివరీ వస్తుంది')}
                    </p>
                  </div>
                  <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-secondary rounded-full transition-all duration-500" style={{ width: `${(finalTotal/500)*100}%` }}></div>
                  </div>
              </div>
          )}

          {finalTotal >= 1000 ? (
              <div className="bg-emerald-50 dark:bg-emerald-900/20 p-3 rounded-2xl border border-emerald-100 dark:border-emerald-800 flex items-center gap-3">
                  <span className="material-symbols-outlined text-emerald-600">verified</span>
                  <p className="text-xs font-black text-emerald-700 dark:text-emerald-400 uppercase tracking-widest">{t('Gold Discount Unlocked: Extra 5% Off!', 'గోల్డ్ డిస్కౌంట్ అన్‌లాక్ చేయబడింది: అదనపు 5% తగ్గింపు!')}</p>
              </div>
          ) : (
             <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-2xl border border-amber-100 dark:border-amber-800 flex items-center gap-3">
                <span className="material-symbols-outlined text-amber-600">lock_open</span>
                <p className="text-[10px] font-bold text-amber-700 dark:text-amber-400 uppercase tracking-widest">
                    {t('Spend ₹', 'మరో ₹')}{1000 - finalTotal} {t('more to unlock Gold Discount', 'ఖర్చు చేస్తే గోల్డ్ డిస్కౌంట్ వస్తుంది')}
                </p>
             </div>
          )}
      </section>

      <section className="px-4 flex flex-col gap-4">
          {items.map((item) => (
             <div key={item.id} className="bg-white dark:bg-gray-800 p-4 rounded-[2rem] shadow-sm border border-gray-50 dark:border-gray-700 flex gap-4">
                <div className="size-20 shrink-0 bg-slate-50 dark:bg-gray-700 rounded-2xl overflow-hidden p-2">
                    <img src={item.image} className="size-full object-contain" alt="" />
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                        <div className="flex justify-between items-start">
                            <h3 className="font-bold text-sm leading-tight line-clamp-2">{item.name}</h3>
                            <button onClick={() => removeFromCart(item.id)} className="text-gray-300 hover:text-red-500 transition-colors">
                                <span className="material-symbols-outlined text-lg">close</span>
                            </button>
                        </div>
                        <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">{item.packSize}</p>
                    </div>
                    <div className="flex justify-between items-end mt-2">
                        <span className="font-black text-base">₹{item.price * item.qty}</span>
                        <div className="flex items-center bg-slate-100 dark:bg-gray-700 rounded-lg p-1 gap-3">
                            <button onClick={() => updateQuantity(item.id, item.qty - 1)} className="size-6 bg-white dark:bg-gray-600 rounded flex items-center justify-center text-slate-900 dark:text-white shadow-sm"><span className="material-symbols-outlined text-xs">remove</span></button>
                            <span className="text-xs font-black">{item.qty}</span>
                            <button onClick={() => updateQuantity(item.id, item.qty + 1)} className="size-6 bg-primary text-white rounded flex items-center justify-center shadow-md"><span className="material-symbols-outlined text-xs">add</span></button>
                        </div>
                    </div>
                </div>
             </div>
          ))}
      </section>
      
      <section className="mx-4 mt-6">
        <PrescriptionUpload 
          required={isPrescriptionNeeded}
          onUpload={setPrescription}
          initialUrl={prescription}
        />
      </section>

      <section className="mx-4 mt-6 bg-white dark:bg-gray-800 rounded-3xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex justify-between items-center mb-4">
              <h3 className="font-black text-lg tracking-tighter uppercase">{t('Bill Summary', 'బిల్లు సారాంశం')}</h3>
              <div className="bg-emerald-50 dark:bg-emerald-900/40 px-3 py-1 rounded-full text-[10px] font-black text-emerald-600 tracking-widest">
                  {t('SAVED ₹', 'మీరు ₹')}{savings} {t('ON THIS ORDER!', 'ఆదా చేశారు!')}
              </div>
          </div>
          <div className="space-y-2 text-sm">
             <div className="flex justify-between text-gray-500">
                <span>{t('Item Total', 'వస్తువుల మొత్తం')}</span>
                <span className="font-bold">₹{finalMrp}</span>
             </div>
             <div className="flex justify-between text-emerald-600 font-bold">
                <span>{t('Discount', 'తగ్గింపు')}</span>
                <span>-₹{savings}</span>
             </div>
             <div className="flex justify-between text-gray-500">
                <span>{t('Delivery Fee', 'డెలివరీ ఛార్జీ')}</span>
                <span>{finalTotal >= 500 ? <span className="text-emerald-600 uppercase font-black tracking-widest">Free</span> : '₹40'}</span>
             </div>
             <div className="h-px bg-gray-100 dark:bg-gray-700 my-4"></div>
             <div className="flex justify-between items-end">
                <span className="font-black text-xl">{t('To Pay', 'చెల్లించాల్సిన మొత్తం')}</span>
                <span className="font-black text-2xl text-primary tracking-tighter">₹{finalTotal + (finalTotal >= 500 ? 0 : 40)}</span>
             </div>
          </div>
      </section>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 z-40 pb-10 shadow-glass">
         <button 
           disabled={!canCheckout}
           onClick={() => navigate('/checkout')}
           className="w-full max-w-md mx-auto h-14 bg-primary hover:bg-primary-dark disabled:bg-gray-300 text-white rounded-2xl font-black text-lg shadow-xl shadow-primary/30 flex items-center justify-center gap-3 transition-all active:scale-95"
         >
            {t('Proceed to Checkout', 'చెక్‌అవుట్‌కు వెళ్లండి')}
            <span className="material-symbols-outlined">arrow_forward</span>
         </button>
      </div>

      {/* Exit Intent Modal */}
      {showExitModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
              <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setShowExitModal(false)}></div>
              <div className="relative w-full max-w-sm bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 shadow-2xl text-center animate-slide-up overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-5">
                      <span className="material-symbols-outlined text-9xl">help_center</span>
                  </div>
                  <div className="size-20 bg-blue-50 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                    <span className="material-symbols-outlined text-5xl">support_agent</span>
                  </div>
                  <h3 className="text-2xl font-black mb-2 leading-tight">{t('Wait! Have a Question?', 'ఆగండి! ఏవైనా సందేహాలు ఉన్నాయా?')}</h3>
                  <p className="text-slate-500 dark:text-gray-400 font-bold text-sm mb-8">
                    {t('Our Kurnool pharmacist is ready to help you with your order for free.', 'మా కర్నూలు ఫార్మసిస్ట్ మీ ఆర్డర్ గురించి మీకు సహాయం చేస్తారు.')}
                  </p>
                  <div className="flex flex-col gap-3">
                    <button onClick={() => alert('Connecting...')} className="h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined">chat</span>
                        {t('Chat with Pharmacist', 'ఫార్మసిస్ట్‌తో చాట్')}
                    </button>
                    <button onClick={() => setShowExitModal(false)} className="h-14 text-slate-500 dark:text-gray-400 font-black text-xs uppercase tracking-widest hover:bg-gray-50 dark:hover:bg-gray-800 rounded-2xl transition-colors">
                        {t('I\'ll decide later', 'తర్వాత చూస్తాను')}
                    </button>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
}
