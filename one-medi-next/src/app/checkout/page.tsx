'use client';

import React, { useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '../../store/cartStore';
import { useUserStore } from '../../store/userStore';
import { useCreateOrder, useCoupon } from '../../hooks';

function CheckoutContent() {
    const router = useRouter();
    const [paymentMethod, setPaymentMethod] = useState('upi');
    const [couponCode, setCouponCode] = useState('');
    const [appliedCoupon, setAppliedCoupon] = useState<any>(null);

    const { items, totalPrice, totalMrp, clearCart, prescription } = useCartStore();
    const { profile, addresses } = useUserStore();

    const { createOrder, loading: creatingOrder, error: orderError } = useCreateOrder();
    const { validateCoupon, loading: validatingCoupon, error: couponError } = useCoupon();

    const cartTotal = totalPrice();
    const cartMrp = totalMrp();

    let couponDiscount = 0;
    if (appliedCoupon) {
        if (appliedCoupon.discount_type === 'percentage') {
            couponDiscount = (cartTotal * appliedCoupon.discount_value) / 100;
            if (appliedCoupon.max_discount_amount) {
                couponDiscount = Math.min(couponDiscount, appliedCoupon.max_discount_amount);
            }
        } else {
            couponDiscount = appliedCoupon.discount_value;
        }
    }

    const savings = cartMrp - cartTotal;
    const deliveryFee = cartTotal >= 500 ? 0 : 40;
    const finalAmount = cartTotal - couponDiscount + deliveryFee;

    const deliveryAddress = addresses.find(a => a.isDefault) || addresses[0];

    const handleApplyCoupon = async () => {
        if (!couponCode) return;
        const coupon = await validateCoupon(couponCode, cartTotal);
        if (coupon) {
            setAppliedCoupon(coupon);
        } else {
            setAppliedCoupon(null);
        }
    };

    const handleRemoveCoupon = () => {
        setAppliedCoupon(null);
        setCouponCode('');
    };

    const handlePlaceOrder = async () => {
        if (!deliveryAddress) {
            alert('Please add a delivery address first.');
            return;
        }

        const order = await createOrder(
            items,
            cartTotal,
            couponDiscount,
            finalAmount,
            deliveryAddress,
            paymentMethod,
            prescription,
            appliedCoupon?.id
        );

        if (order) {
            clearCart();
            router.push(`/order-success?orderId=${order.id}`);
        }
    };

    if (items.length === 0 && !prescription) {
        router.push('/cart');
        return null;
    }

    return (
        <div className="relative flex min-h-screen flex-col bg-bg-light dark:bg-bg-dark font-sans text-slate-900 dark:text-white pb-32">
            {/* Top App Bar */}
            <header className="sticky top-0 z-50 flex items-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl p-4 shadow-sm border-b border-white/20 dark:border-gray-800">
                <button
                    onClick={() => router.back()}
                    className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                    <span className="material-symbols-outlined text-xl">arrow_back</span>
                </button>
                <div className="flex-1 text-center pr-10">
                    <h2 className="text-lg font-black uppercase tracking-tight">Checkout</h2>
                </div>
            </header>

            {/* Progress Stepper */}
            <div className="bg-white dark:bg-gray-900 pb-8 pt-4 px-8 rounded-b-[2.5rem] shadow-sm mb-4">
                <div className="flex items-center justify-between relative max-w-sm mx-auto">
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 dark:bg-gray-800 -z-0 rounded-full"></div>
                    <div className="absolute top-1/2 left-0 w-2/3 h-1 bg-primary -z-0 rounded-full shadow-[0_0_10px_rgba(13,148,136,0.5)]"></div>

                    <div className="flex flex-col items-center gap-2 z-10">
                        <motion.div
                            initial={{ scale: 0 }} animate={{ scale: 1 }}
                            className="size-8 rounded-full bg-primary flex items-center justify-center text-white shadow-lg ring-4 ring-white dark:ring-gray-900"
                        >
                            <span className="material-symbols-outlined text-[16px] font-black">check</span>
                        </motion.div>
                        <span className="text-[9px] font-black uppercase tracking-widest text-primary">Cart</span>
                    </div>

                    <div className="flex flex-col items-center gap-2 z-10">
                        <motion.div
                            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1 }}
                            className="size-8 rounded-full bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/40 ring-4 ring-white dark:ring-gray-900"
                        >
                            <span className="text-xs font-black">2</span>
                        </motion.div>
                        <span className="text-[9px] font-black uppercase tracking-widest text-primary">Details</span>
                    </div>

                    <div className="flex flex-col items-center gap-2 z-10">
                        <div className="size-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-gray-500 ring-4 ring-white dark:ring-gray-900">
                            <span className="text-xs font-bold">3</span>
                        </div>
                        <span className="text-[9px] font-bold uppercase tracking-widest text-slate-300">Confirm</span>
                    </div>
                </div>
            </div>

            <main className="p-5 flex flex-col gap-6 max-w-lg mx-auto w-full">
                {/* Delivery Address Section */}
                <section>
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3 px-2">Delivery Address</h3>
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white dark:bg-gray-800 rounded-[2rem] p-6 shadow-glass border border-white/40 dark:border-gray-700 relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />

                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-4">
                                <div className="bg-blue-50 dark:bg-blue-900/30 text-primary px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider shadow-sm">
                                    {deliveryAddress?.tag || 'HOME'}
                                </div>
                                <button className="text-primary text-[10px] font-black uppercase tracking-widest bg-primary/10 px-3 py-1.5 rounded-lg hover:bg-primary hover:text-white transition-colors">
                                    Change
                                </button>
                            </div>
                            <h4 className="font-black text-lg mb-1 dark:text-white">{profile.name}</h4>
                            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed mb-4 max-w-[85%]">
                                {deliveryAddress ? (
                                    <>
                                        {deliveryAddress.line1}, {deliveryAddress.line2}<br />
                                        {deliveryAddress.city} - <span className="text-slate-900 dark:text-white font-bold">{deliveryAddress.pincode}</span>
                                    </>
                                ) : (
                                    <span className="text-red-500 font-bold flex items-center gap-1"><span className="material-symbols-outlined text-sm">warning</span> No address found.</span>
                                )}
                            </p>
                            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wide">
                                <span className="material-symbols-outlined text-[16px]">smartphone</span>
                                <span>{profile.phone}</span>
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* Order Summary */}
                <section>
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3 px-2">Order Items</h3>
                    <div className="bg-white dark:bg-gray-800 rounded-[2rem] p-2 shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col gap-2">
                        {items.map((item) => (
                            <div key={item.id} className="p-3 rounded-2xl flex gap-4 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                                <div className="size-16 bg-slate-100 dark:bg-slate-700 rounded-xl flex items-center justify-center shrink-0 relative overflow-hidden">
                                    {item.type === 'medicine' ? (
                                        <Image src={item.image || 'https://placehold.co/600x400/e2e8f0/64748b?text=Product'} alt={item.name} fill className="object-cover mix-blend-multiply dark:mix-blend-normal" unoptimized />
                                    ) : (
                                        <span className="material-symbols-outlined text-2xl text-primary opacity-50">science</span>
                                    )}
                                </div>
                                <div className="flex-1 py-1">
                                    <div className="flex justify-between items-start mb-1">
                                        <h4 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-1">{item.name}</h4>
                                        <span className="font-black text-sm text-slate-900 dark:text-white">₹{item.price * item.qty}</span>
                                    </div>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{item.packSize || 'Lab Test'}</p>
                                    <div className="flex items-center gap-2 mt-2">
                                        <span className="text-[10px] font-bold bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded text-slate-500 dark:text-slate-300">x{item.qty}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Coupon Section */}
                <section>
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3 px-2">Offers & Benefits</h3>
                    <div className="bg-white dark:bg-gray-800 p-5 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm transition-all hover:shadow-md">
                        <AnimatePresence mode='wait'>
                            {!appliedCoupon ? (
                                <motion.div
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                    className="flex gap-2"
                                >
                                    <div className="flex-1 relative">
                                        <input
                                            type="text"
                                            placeholder="ENTER CODE"
                                            className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none uppercase font-black tracking-wider text-slate-700 dark:text-white placeholder:font-bold placeholder:text-slate-300"
                                            value={couponCode}
                                            onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                                        />
                                        <span className="material-symbols-outlined absolute left-3 top-3 text-slate-300">local_activity</span>
                                    </div>
                                    <button
                                        onClick={handleApplyCoupon}
                                        disabled={validatingCoupon || !couponCode}
                                        className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg active:scale-95 transition-all disabled:opacity-50 disabled:shadow-none"
                                    >
                                        {validatingCoupon ? '...' : 'APPLY'}
                                    </button>
                                </motion.div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                                    className="flex items-center justify-between bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/50 p-4 rounded-xl"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="size-8 rounded-full bg-emerald-100 dark:bg-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-300">
                                            <span className="material-symbols-outlined text-lg">check</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-black text-emerald-800 dark:text-emerald-300 uppercase tracking-tight">Code {appliedCoupon.code} applied</p>
                                            <p className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">You saved ₹{couponDiscount.toFixed(2)}</p>
                                        </div>
                                    </div>
                                    <button onClick={handleRemoveCoupon} className="text-slate-400 hover:text-red-500 p-2 transition-colors">
                                        <span className="material-symbols-outlined text-xl">block</span>
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                        {couponError && (
                            <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-[10px] text-red-500 mt-2 font-bold flex items-center gap-1 uppercase tracking-wider">
                                <span className="material-symbols-outlined text-sm">error</span>
                                {couponError}
                            </motion.p>
                        )}
                    </div>
                </section>

                {/* Trust Badges */}
                <div className="grid grid-cols-2 gap-3 opacity-80">
                    <div className="bg-white dark:bg-gray-800 p-3 rounded-2xl shadow-sm flex items-center gap-3 border border-slate-50 dark:border-slate-800">
                        <div className="size-8 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-500">
                            <span className="material-symbols-outlined text-lg">verified</span>
                        </div>
                        <span className="text-[10px] font-black text-slate-600 dark:text-slate-300 uppercase tracking-wider leading-tight">Genuine<br />Products</span>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-3 rounded-2xl shadow-sm flex items-center gap-3 border border-slate-50 dark:border-slate-800">
                        <div className="size-8 rounded-full bg-green-50 dark:bg-green-900/30 flex items-center justify-center text-green-500">
                            <span className="material-symbols-outlined text-lg">lock</span>
                        </div>
                        <span className="text-[10px] font-black text-slate-600 dark:text-slate-300 uppercase tracking-wider leading-tight">Secure<br />Payment</span>
                    </div>
                </div>

                {/* Payment Options */}
                <section>
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3 px-2">Payment Mode</h3>
                    <div className="flex flex-col gap-3">
                        <label className="cursor-pointer relative group">
                            <input
                                className="peer sr-only"
                                name="payment_method"
                                type="radio"
                                checked={paymentMethod === 'upi'}
                                onChange={() => setPaymentMethod('upi')}
                            />
                            <div className="bg-white dark:bg-gray-800 p-5 rounded-[1.5rem] border border-slate-100 dark:border-slate-800 shadow-sm flex items-center justify-between peer-checked:border-primary peer-checked:ring-2 peer-checked:ring-primary/20 peer-checked:shadow-lg peer-checked:shadow-primary/10 transition-all hover:bg-slate-50 dark:hover:bg-slate-800/50">
                                <div className="flex items-center gap-4">
                                    <div className="size-12 rounded-2xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-white relative overflow-hidden group-peer-checked:bg-primary/10 group-peer-checked:text-primary">
                                        <span className="material-symbols-outlined text-2xl">account_balance_wallet</span>
                                    </div>
                                    <div>
                                        <p className="font-black text-sm text-slate-900 dark:text-white uppercase tracking-tight">UPI / Net Banking</p>
                                        <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider mt-0.5">Extra 5% off via UPI</p>
                                    </div>
                                </div>
                                <div className="size-6 rounded-full border-2 border-slate-200 dark:border-slate-600 flex items-center justify-center peer-checked:border-primary peer-checked:bg-primary transition-all">
                                    <div className="size-2.5 rounded-full bg-white scale-0 peer-checked:scale-100 transition-transform"></div>
                                </div>
                            </div>
                        </label>
                        <label className="cursor-pointer relative group">
                            <input
                                className="peer sr-only"
                                name="payment_method"
                                type="radio"
                                checked={paymentMethod === 'cod'}
                                onChange={() => setPaymentMethod('cod')}
                            />
                            <div className="bg-white dark:bg-gray-800 p-5 rounded-[1.5rem] border border-slate-100 dark:border-slate-800 shadow-sm flex items-center justify-between peer-checked:border-primary peer-checked:ring-2 peer-checked:ring-primary/20 peer-checked:shadow-lg peer-checked:shadow-primary/10 transition-all hover:bg-slate-50 dark:hover:bg-slate-800/50">
                                <div className="flex items-center gap-4">
                                    <div className="size-12 rounded-2xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-white">
                                        <span className="material-symbols-outlined text-2xl">payments</span>
                                    </div>
                                    <div>
                                        <p className="font-black text-sm text-slate-900 dark:text-white uppercase tracking-tight">Cash on Delivery</p>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">Pay when you receive</p>
                                    </div>
                                </div>
                                <div className="size-6 rounded-full border-2 border-slate-200 dark:border-slate-600 flex items-center justify-center peer-checked:border-primary peer-checked:bg-primary transition-all">
                                    <div className="size-2.5 rounded-full bg-white scale-0 peer-checked:scale-100 transition-transform"></div>
                                </div>
                            </div>
                        </label>
                    </div>
                </section>

                {/* Bill Details */}
                <section className="bg-white dark:bg-gray-800 rounded-[2rem] p-6 shadow-glass border border-slate-100 dark:border-slate-800">
                    <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4 border-b border-slate-100 dark:border-slate-700 pb-2">Bill Summary</h3>

                    <div className="space-y-3 mb-4">
                        <div className="flex justify-between items-center text-sm font-medium text-slate-600 dark:text-slate-300">
                            <span>Item Total</span>
                            <span className="font-bold">₹{cartMrp}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm font-medium text-emerald-600">
                            <span>Price Savings</span>
                            <span>-₹{savings}</span>
                        </div>
                        {appliedCoupon && (
                            <div className="flex justify-between items-center text-sm font-bold text-primary">
                                <span>Coupon ({appliedCoupon.code})</span>
                                <span>-₹{couponDiscount}</span>
                            </div>
                        )}
                        <div className="flex justify-between items-center text-sm font-medium text-slate-600 dark:text-slate-300">
                            <span>Delivery Fee</span>
                            <span className={deliveryFee === 0 ? "text-emerald-600 font-black uppercase text-xs" : "font-bold"}>{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
                        </div>
                    </div>

                    <div className="border-t-2 border-dashed border-slate-100 dark:border-slate-700 pt-4 flex justify-between items-center">
                        <span className="font-black text-lg text-slate-900 dark:text-white tracking-tight">To Pay</span>
                        <span className="font-black text-2xl text-slate-900 dark:text-white tracking-tighter">₹{finalAmount}</span>
                    </div>
                </section>
            </main>

            {/* Sticky Footer */}
            <div className="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-t border-slate-100 dark:border-slate-800 p-4 pb-safe shadow-2xl z-50">
                <div className="flex items-center gap-4 max-w-md mx-auto">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Total Payable</span>
                        <span className="text-2xl font-black leading-none text-slate-900 dark:text-white">₹{finalAmount}</span>
                    </div>
                    <button
                        onClick={handlePlaceOrder}
                        disabled={creatingOrder || !deliveryAddress}
                        className="flex-1 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90 disabled:opacity-50 h-14 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:cursor-not-allowed"
                    >
                        {creatingOrder ? (
                            <>
                                <span className="material-symbols-outlined animate-spin text-xl">progress_activity</span>
                                Processing
                            </>
                        ) : (
                            <>
                                Place Order
                                <span className="material-symbols-outlined text-xl">arrow_forward</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function CheckoutPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-bg-light dark:bg-bg-dark flex items-center justify-center">
                <span className="material-symbols-outlined text-4xl text-slate-300 animate-spin">sync</span>
            </div>
        }>
            <CheckoutContent />
        </Suspense>
    );
}
