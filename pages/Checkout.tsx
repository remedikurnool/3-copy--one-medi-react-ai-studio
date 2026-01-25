
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { useUserStore } from '../store/userStore';

export default function Checkout() {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const { items, totalPrice, totalMrp, clearCart } = useCartStore();
  const { profile, language } = useUserStore();

  const t = (en: string, te: string) => language === 'te' ? te : en;

  const finalTotal = totalPrice();
  const finalMrp = totalMrp();
  const savings = finalMrp - finalTotal;
  const deliveryFee = finalTotal >= 500 ? 0 : 40;
  const grandTotal = finalTotal + deliveryFee;

  const handlePlaceOrder = () => {
    clearCart();
    navigate('/order-success');
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden pb-24 bg-bg-light dark:bg-bg-dark font-sans text-slate-900 dark:text-white">
      <div className="sticky top-0 z-50 flex items-center bg-white dark:bg-gray-900 p-4 shadow-sm border-b border-gray-100 dark:border-gray-800">
        <button onClick={() => navigate(-1)} className="size-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-lg font-black uppercase tracking-tight flex-1 text-center pr-10">{t('Checkout', 'చెక్‌అవుట్')}</h2>
      </div>

      <div className="p-4 flex flex-col gap-6">
        {/* Localized Estimate */}
        <section className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-[2.5rem] p-6 text-white shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 size-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
            <div className="relative z-10 flex items-center gap-4">
                <div className="size-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-inner border border-white/20">
                    <span className="material-symbols-outlined text-3xl filled">local_shipping</span>
                </div>
                <div>
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80 mb-1">{t('Estimated Delivery', 'అంచనా డెలివరీ సమయం')}</h3>
                    <p className="text-xl font-black leading-tight">
                        {t('By 6:00 PM Today to C-Camp, Kurnool', 'ఈరోజు సాయంత్రం 6:00 గంటలకు సి-క్యాంప్, కర్నూలు')}
                    </p>
                </div>
            </div>
        </section>

        {/* Deliver To */}
        <section>
          <div className="flex items-center justify-between mb-3 px-1">
            <h3 className="text-base font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-sm">location_on</span>
              {t('Delivering to', 'ఇక్కడకు డెలివరీ అవుతుంది')}
            </h3>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
              <h4 className="font-black text-lg mb-1">{profile.name}</h4>
              <p className="text-slate-500 dark:text-gray-400 text-sm leading-relaxed mb-4">
                Flat No. 402, Sai Residency, M.G. Road, Near Govt Hospital, Kurnool - 518002
              </p>
              <button onClick={() => navigate('/profile/addresses')} className="text-primary font-black text-xs uppercase tracking-widest border border-primary/20 px-4 py-2 rounded-xl hover:bg-primary hover:text-white transition-all">
                {t('Change Address', 'చిరునామా మార్చండి')}
              </button>
          </div>
        </section>

        {/* Payment Selection */}
        <section>
          <h3 className="text-base font-black uppercase tracking-widest text-slate-400 mb-3 px-1">{t('Payment Method', 'చెల్లింపు విధానం')}</h3>
          <div className="flex flex-col gap-3">
            {[
                {id: 'upi', label: 'UPI (PhonePe / GPay)', sub: 'Extra 5% Saving', icon: 'account_balance_wallet'},
                {id: 'cod', label: 'Cash on Delivery', sub: 'Pay at Doorstep', icon: 'payments'}
            ].map(method => (
                <label key={method.id} className="cursor-pointer">
                    <input type="radio" name="payment" className="peer sr-only" checked={paymentMethod === method.id} onChange={() => setPaymentMethod(method.id)} />
                    <div className="bg-white dark:bg-gray-800 p-5 rounded-3xl border-2 border-transparent peer-checked:border-primary peer-checked:bg-primary/5 flex items-center justify-between shadow-sm transition-all">
                        <div className="flex items-center gap-4">
                            <div className="size-12 bg-gray-50 dark:bg-gray-700 rounded-2xl flex items-center justify-center text-slate-500">
                                <span className="material-symbols-outlined text-3xl">{method.icon}</span>
                            </div>
                            <div>
                                <p className="font-black text-sm uppercase tracking-wider">{method.label}</p>
                                <p className={`text-[10px] font-bold uppercase tracking-widest mt-1 ${method.id === 'upi' ? 'text-emerald-600' : 'text-slate-400'}`}>{method.sub}</p>
                            </div>
                        </div>
                        <div className={`size-6 rounded-full border-2 flex items-center justify-center ${paymentMethod === method.id ? 'border-primary bg-primary' : 'border-gray-200'}`}>
                            {paymentMethod === method.id && <div className="size-2 bg-white rounded-full"></div>}
                        </div>
                    </div>
                </label>
            ))}
          </div>
        </section>

        {/* Trust Seals Section */}
        <section className="bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-100 dark:border-gray-700 grid grid-cols-3 gap-4">
            <div className="flex flex-col items-center text-center gap-2">
                <div className="size-10 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                    <span className="material-symbols-outlined text-xl filled">verified</span>
                </div>
                <span className="text-[8px] font-black uppercase tracking-widest text-slate-500">100% Genuine Medicine</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
                <div className="size-10 rounded-full bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600">
                    <span className="material-symbols-outlined text-xl filled">security</span>
                </div>
                <span className="text-[8px] font-black uppercase tracking-widest text-slate-500">Secure Payments</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
                <div className="size-10 rounded-full bg-teal-50 dark:bg-teal-900/30 flex items-center justify-center text-teal-600">
                    <span className="material-symbols-outlined text-xl filled">biotech</span>
                </div>
                <span className="text-[8px] font-black uppercase tracking-widest text-slate-500">NABL Certified Labs</span>
            </div>
        </section>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 p-4 pb-10 z-40 shadow-glass">
        <div className="max-w-md mx-auto flex items-center gap-6">
            <div className="flex flex-col">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('Total Payable', 'మొత్తం బిల్లు')}</span>
                <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">₹{grandTotal}</span>
                <button className="text-[10px] font-bold text-emerald-600 uppercase text-left underline">{t('View Savings Detail', 'పొదుపు వివరాలు')}</button>
            </div>
            <button 
                onClick={handlePlaceOrder}
                className="flex-1 h-14 bg-primary hover:bg-primary-dark text-white rounded-2xl font-black text-lg shadow-xl shadow-primary/30 flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
                {t('Place Order', 'ఆర్డర్ చేయండి')}
                <span className="material-symbols-outlined">check_circle</span>
            </button>
        </div>
      </div>
    </div>
  );
}
