
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import PrescriptionUpload from '../components/ui/PrescriptionUpload';

export default function Cart() {
  const navigate = useNavigate();
  const { items, updateQuantity, removeFromCart, totalPrice, totalMrp, prescription, setPrescription } = useCartStore();
  
  const finalTotal = totalPrice();
  const finalMrp = totalMrp();
  const savings = finalMrp - finalTotal;
  
  // Logic: Cart is "active" if it has items OR a prescription is uploaded (Concierge Mode)
  const isConciergeMode = items.length === 0 && !!prescription;
  const isCartEmpty = items.length === 0 && !prescription;

  const isPrescriptionNeeded = items.some(item => item.isPrescriptionRequired);
  const canCheckout = (!isPrescriptionNeeded || (isPrescriptionNeeded && !!prescription)) || isConciergeMode;

  if (isCartEmpty) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-bg-light dark:bg-bg-dark text-slate-900 dark:text-white p-6">
        <div className="size-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
          <span className="material-symbols-outlined text-4xl text-gray-400">shopping_cart_off</span>
        </div>
        <h2 className="text-xl font-bold mb-2">Your cart is empty</h2>
        <p className="text-gray-500 text-center mb-6">Looks like you haven't added anything yet.</p>
        <button 
          onClick={() => navigate('/')} 
          className="bg-primary text-white px-6 py-3 rounded-xl font-bold"
        >
          Explore Medicines
        </button>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col min-h-screen mx-auto w-full bg-bg-light dark:bg-bg-dark pb-36 font-sans text-slate-900 dark:text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 py-3 flex items-center justify-between shadow-sm">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-slate-700 dark:text-slate-200">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div className="flex-1 text-center pr-8">
          <h1 className="text-lg font-bold">My Cart</h1>
          <p className="text-xs text-gray-500 font-medium">
            {isConciergeMode ? 'Prescription Order' : `${items.length} Items`}
          </p>
        </div>
      </header>

      {/* Progress Stepper */}
      <div className="bg-white dark:bg-gray-900 pt-4 pb-6 px-6">
        <div className="flex items-center justify-between relative">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 dark:bg-gray-700 -z-10 -translate-y-1/2"></div>
          
          <div className="flex flex-col items-center gap-1 bg-white dark:bg-gray-900 px-2">
            <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shadow-lg shadow-primary/30">1</div>
            <span className="text-xs font-bold text-primary">Cart</span>
          </div>
          
          <div className="flex flex-col items-center gap-1 bg-white dark:bg-gray-900 px-2">
            <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-400 dark:text-gray-500 flex items-center justify-center font-bold text-sm">2</div>
            <span className="text-xs font-medium text-gray-500">Address</span>
          </div>
          
          <div className="flex flex-col items-center gap-1 bg-white dark:bg-gray-900 px-2">
            <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-400 dark:text-gray-500 flex items-center justify-center font-bold text-sm">3</div>
            <span className="text-xs font-medium text-gray-500">Payment</span>
          </div>
        </div>
      </div>

      {/* Concierge Mode Alert */}
      {isConciergeMode && (
        <div className="mx-4 mt-4 bg-teal-50 dark:bg-teal-900/20 p-4 rounded-xl border border-teal-100 dark:border-teal-800 flex gap-3">
          <div className="size-10 rounded-full bg-teal-100 dark:bg-teal-800 flex items-center justify-center shrink-0 text-teal-600 dark:text-teal-300">
            <span className="material-symbols-outlined">support_agent</span>
          </div>
          <div>
            <h3 className="text-sm font-bold text-teal-800 dark:text-teal-200">Pharmacist Review</h3>
            <p className="text-xs text-teal-600 dark:text-teal-400 mt-1">
              You've uploaded a prescription. Our pharmacist will review it, add the medicines to your order, and call you for confirmation.
            </p>
          </div>
        </div>
      )}

      {/* Free Delivery Nudge (Only for regular orders) */}
      {!isConciergeMode && finalTotal < 500 && (
        <div className="mx-4 mt-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <div className="bg-secondary/10 p-1.5 rounded-full text-secondary">
                <span className="material-symbols-outlined text-xl">local_shipping</span>
              </div>
              <p className="text-sm font-semibold">Free Delivery</p>
            </div>
            <p className="text-xs font-medium text-gray-500">₹{500 - finalTotal} more to unlock</p>
          </div>
          <div className="h-2.5 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full bg-secondary rounded-full" style={{ width: `${(finalTotal / 500) * 100}%` }}></div>
          </div>
          <p className="text-xs text-secondary mt-2 font-medium">You're almost there! Add more items.</p>
        </div>
      )}

      {/* Cart Items */}
      {!isConciergeMode && (
        <section className="mt-6 px-4 flex flex-col gap-4">
            {items.map((item) => (
               <div key={item.id} className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex gap-4">
                <div className="shrink-0">
                  {item.type === 'medicine' ? (
                     <div 
                      className="w-20 h-20 rounded-lg bg-gray-100 dark:bg-gray-700 bg-cover bg-center" 
                      style={{backgroundImage: `url('${item.image}')`}}
                    ></div>
                  ) : (
                    <div className="w-20 h-20 rounded-lg bg-blue-50 dark:bg-gray-700 flex items-center justify-center text-primary dark:text-blue-400">
                      <span className="material-symbols-outlined text-4xl">science</span>
                    </div>
                  )}
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="text-base font-bold leading-tight line-clamp-2">{item.name}</h3>
                      <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500">
                        <span className="material-symbols-outlined text-lg">delete</span>
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{item.packSize || 'Package'}</p>
                    {item.isPrescriptionRequired && (
                      <div className="flex items-center gap-1 mt-1">
                        <span className="material-symbols-outlined text-red-500 text-[14px]">prescription</span>
                        <span className="text-[10px] text-red-500 font-bold uppercase">Prescription Required</span>
                      </div>
                    )}
                  </div>
                  <div className="flex justify-between items-end mt-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold">₹{item.price * item.qty}</span>
                        {item.mrp > item.price && <span className="text-xs text-gray-400 line-through">₹{item.mrp * item.qty}</span>}
                      </div>
                    </div>
                    {/* Large Stepper */}
                    <div className="flex items-center bg-gray-100 dark:bg-gray-900 rounded-lg p-1">
                      <button 
                        onClick={() => updateQuantity(item.id, item.qty - 1)}
                        className="w-8 h-8 flex items-center justify-center rounded-md bg-white dark:bg-gray-800 shadow-sm text-slate-900 dark:text-white"
                      >
                        <span className="material-symbols-outlined text-base">remove</span>
                      </button>
                      <input className="w-8 text-center bg-transparent border-none p-0 text-sm font-bold focus:ring-0" readOnly type="text" value={item.qty}/>
                      <button 
                        onClick={() => updateQuantity(item.id, item.qty + 1)}
                        className="w-8 h-8 flex items-center justify-center rounded-md bg-primary text-white shadow-sm shadow-primary/30"
                      >
                        <span className="material-symbols-outlined text-base">add</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </section>
      )}
      
      {/* Prescription Upload Section */}
      <section className="mx-4 mt-6 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
        <PrescriptionUpload 
          required={isPrescriptionNeeded}
          label="Upload Prescription"
          initialUrl={prescription}
          onUpload={setPrescription}
          subLabel={isPrescriptionNeeded ? "Required for items marked with Rx" : "Optional for concierge order"}
        />
      </section>

      {/* Bill Details (Hidden for Concierge Mode until pharmacist adds items) */}
      {!isConciergeMode && (
        <section className="mx-4 mb-6 mt-6 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-base font-bold mb-4 border-b border-gray-100 dark:border-gray-700 pb-2">Bill Details</h3>
          <div className="flex justify-between items-center mb-2 text-sm text-gray-600 dark:text-gray-300">
            <span>Item Total</span>
            <span>₹{finalMrp}</span>
          </div>
          <div className="flex justify-between items-center mb-2 text-sm text-gray-600 dark:text-gray-300">
            <span className="flex items-center gap-1">Delivery Fee <span className="material-symbols-outlined text-[16px] text-gray-400">info</span></span>
            <span>{finalTotal >= 500 ? <span className="text-green-600 font-bold">FREE</span> : '₹40'}</span>
          </div>
          <div className="flex justify-between items-center mb-4 text-sm text-secondary font-medium">
            <span>Total Savings</span>
            <span>- ₹{savings}</span>
          </div>
          <div className="border-t border-dashed border-gray-300 dark:border-gray-600 pt-3 flex justify-between items-center">
            <span className="font-bold text-lg">To Pay</span>
            <span className="font-bold text-lg">₹{finalTotal + (finalTotal >= 500 ? 0 : 40)}</span>
          </div>
        </section>
      )}

      {/* Trust Badge */}
      <div className="flex items-center justify-center gap-2 mb-8 text-gray-400">
        <span className="material-symbols-outlined text-lg">verified_user</span>
        <span className="text-xs font-medium">100% Secure Payments & Verified Pharmacy</span>
      </div>

      {/* Sticky Footer Action Bar */}
      <div className="fixed bottom-0 left-0 w-full z-50 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] p-4">
        <div className="max-w-md mx-auto flex gap-4 items-center">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 font-medium">Total</span>
            <span className="text-xl font-bold leading-tight">
              {isConciergeMode ? 'TBD' : `₹${finalTotal + (finalTotal >= 500 ? 0 : 40)}`}
            </span>
            {!isConciergeMode && <button className="text-[10px] text-primary underline text-left">View Details</button>}
          </div>
          <button 
            disabled={!canCheckout}
            onClick={() => navigate('/checkout')}
            className="flex-1 bg-primary hover:bg-primary-dark disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-primary/30 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          >
            {canCheckout 
              ? (isConciergeMode ? 'Submit Prescription' : 'Select Address') 
              : 'Upload Rx to Continue'}
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
}
