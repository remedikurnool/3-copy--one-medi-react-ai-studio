
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { useUserStore } from '../store/userStore';

export default function Checkout() {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const { items, totalPrice, totalMrp, clearCart } = useCartStore();
  const { profile } = useUserStore();

  const finalTotal = totalPrice();
  const finalMrp = totalMrp();
  const savings = finalMrp - finalTotal;
  const deliveryFee = finalTotal >= 500 ? 0 : 40;
  const grandTotal = finalTotal + deliveryFee;

  const handlePlaceOrder = () => {
    // Simulate order placement
    clearCart();
    navigate('/order-success');
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden pb-24 bg-bg-light dark:bg-bg-dark font-sans text-slate-900 dark:text-white">
      {/* Top App Bar */}
      <div className="sticky top-0 z-50 flex items-center bg-white dark:bg-gray-900 p-4 shadow-sm border-b border-gray-100 dark:border-gray-800">
        <button 
          onClick={() => navigate(-1)}
          className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-10">Checkout</h2>
      </div>

      {/* Progress Stepper */}
      <div className="bg-white dark:bg-gray-900 pb-6 pt-2 px-6">
        <div className="flex items-center justify-between relative">
          <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 dark:bg-gray-800 -z-0 rounded-full"></div>
          <div className="absolute top-1/2 left-0 w-1/2 h-1 bg-primary -z-0 rounded-full"></div>
          
          <div className="flex flex-col items-center gap-2 z-10">
            <div className="size-8 rounded-full bg-primary flex items-center justify-center text-white shadow-md ring-4 ring-white dark:ring-gray-900">
              <span className="material-symbols-outlined text-[16px] font-bold">check</span>
            </div>
            <span className="text-xs font-semibold text-primary">Address</span>
          </div>
          
          <div className="flex flex-col items-center gap-2 z-10">
            <div className="size-8 rounded-full bg-primary flex items-center justify-center text-white shadow-md ring-4 ring-white dark:ring-gray-900">
              <span className="text-xs font-bold">2</span>
            </div>
            <span className="text-xs font-bold text-primary">Payment</span>
          </div>
          
          <div className="flex flex-col items-center gap-2 z-10">
            <div className="size-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 ring-4 ring-white dark:ring-gray-900">
              <span className="text-xs font-bold">3</span>
            </div>
            <span className="text-xs font-medium text-gray-400">Confirm</span>
          </div>
        </div>
      </div>

      <div className="p-4 flex flex-col gap-5">
        {/* Delivery Address Section */}
        <section>
          <div className="flex items-center justify-between mb-3 px-1">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">location_on</span>
              Delivery Address
            </h3>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 opacity-10 pointer-events-none">
              <span className="material-symbols-outlined text-9xl text-gray-500">map</span>
            </div>
            <div className="relative z-10">
              <div className="flex justify-between items-start">
                <div className="bg-blue-50 dark:bg-blue-900/30 text-primary px-3 py-1 rounded-full text-xs font-bold inline-block mb-3">
                  HOME
                </div>
                <button className="text-primary text-sm font-bold px-3 py-1 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                  Change
                </button>
              </div>
              <h4 className="font-bold text-lg mb-1">{profile.name}</h4>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4 max-w-[85%]">
                Flat No. 402, Sai Residency,<br/>
                M.G. Road, Near Government Hospital,<br/>
                Kurnool, Andhra Pradesh - 518002
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="material-symbols-outlined text-[18px]">phone</span>
                <span>{profile.phone}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Order Summary */}
        <section>
          <h3 className="text-lg font-bold mb-3 flex items-center gap-2 px-1">
            <span className="material-symbols-outlined text-primary">shopping_bag</span>
            Order Summary
          </h3>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 divide-y divide-gray-100 dark:divide-gray-700">
            {items.map((item) => (
              <div key={item.id} className="p-4 flex gap-4">
                <div className="size-16 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center justify-center shrink-0 p-1">
                  {item.type === 'medicine' ? (
                     <img className="size-full object-contain mix-blend-multiply dark:mix-blend-normal rounded-md" src={item.image} alt={item.name} />
                  ) : (
                     <span className="material-symbols-outlined text-2xl text-blue-500">science</span>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-semibold text-sm">{item.name}</h4>
                    <span className="font-bold text-sm">₹{item.price * item.qty}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{item.packSize || 'Lab Test'}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-gray-600 dark:text-gray-300">Qty: {item.qty}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Offers & Coupons */}
        <section>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-secondary">local_offer</span>
              <div className="flex-1">
                <h4 className="font-bold text-sm">Apply Coupon</h4>
                <p className="text-xs text-gray-500">Save more on your order</p>
              </div>
              <span className="material-symbols-outlined text-gray-400">chevron_right</span>
            </div>
          </div>
        </section>

        {/* Payment Options */}
        <section>
          <h3 className="text-lg font-bold mb-3 flex items-center gap-2 px-1">
            <span className="material-symbols-outlined text-primary">payments</span>
            Payment Options
          </h3>
          <div className="flex flex-col gap-3">
            {/* UPI */}
            <label className="cursor-pointer relative">
              <input 
                className="peer sr-only" 
                name="payment_method" 
                type="radio" 
                checked={paymentMethod === 'upi'}
                onChange={() => setPaymentMethod('upi')}
              />
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex items-center justify-between peer-checked:border-primary peer-checked:ring-1 peer-checked:ring-primary peer-checked:bg-blue-50/30 dark:peer-checked:bg-blue-900/10 transition-all">
                <div className="flex items-center gap-4">
                  <div className="size-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300">
                    <span className="material-symbols-outlined">account_balance_wallet</span>
                  </div>
                  <div>
                    <p className="font-bold text-sm">UPI / Net Banking</p>
                    <p className="text-xs text-secondary">Extra 5% off via UPI</p>
                  </div>
                </div>
                <div className="size-5 rounded-full border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center peer-checked:border-primary peer-checked:bg-primary">
                  <div className="size-2 rounded-full bg-white opacity-0 peer-checked:opacity-100"></div>
                </div>
              </div>
            </label>
            {/* COD */}
            <label className="cursor-pointer relative">
              <input 
                className="peer sr-only" 
                name="payment_method" 
                type="radio" 
                checked={paymentMethod === 'cod'}
                onChange={() => setPaymentMethod('cod')}
              />
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex items-center justify-between peer-checked:border-primary peer-checked:ring-1 peer-checked:ring-primary peer-checked:bg-blue-50/30 dark:peer-checked:bg-blue-900/10 transition-all">
                <div className="flex items-center gap-4">
                  <div className="size-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300">
                    <span className="material-symbols-outlined">payments</span>
                  </div>
                  <div>
                    <p className="font-bold text-sm">Cash on Delivery</p>
                    <p className="text-xs text-gray-500">Pay when you receive</p>
                  </div>
                </div>
                <div className="size-5 rounded-full border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center peer-checked:border-primary peer-checked:bg-primary">
                  <div className="size-2 rounded-full bg-white opacity-0 peer-checked:opacity-100"></div>
                </div>
              </div>
            </label>
          </div>
        </section>

        {/* Bill Details */}
        <section className="pb-6">
          <h3 className="text-lg font-bold mb-3 flex items-center gap-2 px-1">
            <span className="material-symbols-outlined text-primary">receipt_long</span>
            Bill Details
          </h3>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex justify-between py-2 text-sm text-gray-600 dark:text-gray-400">
              <span>Item Total</span>
              <span className="font-medium text-slate-900 dark:text-white">₹{finalMrp}</span>
            </div>
            <div className="flex justify-between py-2 text-sm text-secondary font-medium">
              <span>Savings</span>
              <span>-₹{savings}</span>
            </div>
            <div className="flex justify-between py-2 text-sm text-gray-600 dark:text-gray-400 border-b border-dashed border-gray-200 dark:border-gray-700 pb-4">
              <span>Delivery Fee</span>
              <span className={deliveryFee === 0 ? "text-secondary font-bold" : ""}>{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
            </div>
            <div className="flex justify-between pt-4 text-base font-bold text-slate-900 dark:text-white items-end">
              <span>Grand Total</span>
              <span className="text-xl">₹{grandTotal}</span>
            </div>
          </div>
        </section>

        <div className="h-20"></div>

        {/* Sticky Footer */}
        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-50">
          <div className="flex items-center gap-4 max-w-md mx-auto">
            <div className="flex flex-col">
              <span className="text-xs text-gray-500 font-medium">Total Payable</span>
              <span className="text-xl font-bold">₹{grandTotal}</span>
            </div>
            <button 
              onClick={handlePlaceOrder}
              className="flex-1 bg-primary hover:bg-primary-dark text-white h-12 rounded-xl font-bold text-base shadow-lg shadow-blue-500/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              Place Order
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
