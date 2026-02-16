'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '../../store/cartStore';
import { useUserStore } from '@/store/userStore';
import { useCreateOrder, useCoupon } from '@/hooks/useOrders';
import PageHeader from '@/components/ui/PageHeader';
import Image from 'next/image';

type PaymentMethod = 'cod' | 'upi' | 'card' | 'wallet';

export default function CheckoutPage() {
    const router = useRouter();
    const { items, totalPrice, totalMrp, prescription, clearCart } = useCartStore();
    const { isAuthenticated, profile, addresses } = useUserStore();

    const [selectedAddress, setSelectedAddress] = useState<string>(
        addresses.find(a => a.isDefault)?.id || addresses[0]?.id || ''
    );
    const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>('cod');
    const [couponCode, setCouponCode] = useState('');
    const [appliedCoupon, setAppliedCoupon] = useState<{ id: string; code: string; discount: number } | null>(null);
    const [orderError, setOrderError] = useState<string | null>(null);

    // Supabase hooks
    const { createOrder, loading: isOrderPlacing, error: createOrderError } = useCreateOrder();
    const { validateCoupon, loading: couponLoading, error: couponError } = useCoupon();

    const finalMrp = totalMrp();
    const itemTotal = totalPrice();
    const productDiscount = finalMrp - itemTotal;
    const deliveryFee = itemTotal >= 500 ? 0 : 40;
    const couponDiscount = appliedCoupon ? appliedCoupon.discount : 0;
    const finalTotal = itemTotal + deliveryFee - couponDiscount;

    const isConciergeMode = items.length === 0 && !!prescription;

    const handleApplyCoupon = async () => {
        if (!couponCode) return;
        setOrderError(null);

        const coupon = await validateCoupon(couponCode, itemTotal);
        if (coupon) {
            // Calculate actual discount
            let discount = 0;
            if (coupon.discount_type === 'percentage') {
                discount = Math.min(
                    (itemTotal * coupon.discount_value) / 100,
                    coupon.max_discount_amount || Infinity
                );
            } else {
                discount = coupon.discount_value;
            }
            setAppliedCoupon({ id: coupon.id, code: coupon.code, discount: Math.round(discount) });
            setCouponCode('');
        }
    };

    const handlePlaceOrder = async () => {
        setOrderError(null);

        const selectedAddr = addresses.find(a => a.id === selectedAddress);
        if (!selectedAddr && !isConciergeMode) {
            setOrderError('Please select a delivery address');
            return;
        }

        const order = await createOrder(
            items,
            finalMrp,
            productDiscount + couponDiscount,
            finalTotal,
            selectedAddr || null,
            selectedPayment,
            prescription || null,
            appliedCoupon?.id
        );

        if (order) {
            clearCart();
            router.push('/order-success');
        } else {
            setOrderError(createOrderError || 'Failed to place order. Please try again.');
        }
    };

    // Concierge checkout handling (prescription-only orders)
    if (isConciergeMode) {
        return (
            <div className="relative flex flex-col min-h-screen bg-surface-50 dark:bg-surface-950 font-sans text-slate-900 dark:text-white transition-colors duration-300">
                <PageHeader title="Submit Order" subtitle="Pharmacist Review" showCart={false} showLocation={false} />
                <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                    <div className="size-24 bg-teal-50 dark:bg-teal-900/30 rounded-full flex items-center justify-center mb-6 animate-pulse">
                        <span className="material-symbols-outlined text-4xl text-teal-600 dark:text-teal-400">support_agent</span>
                    </div>
                    <h2 className="text-2xl font-black mb-3">Prescription Uploaded!</h2>
                    <p className="text-slate-500 mb-8 max-w-sm">
                        Confirm your delivery details below to submit your prescription. Our pharmacist will call you with the order estimate.
                    </p>

                    {/* Address Selection for Concierge */}
                    <div className="w-full max-w-md bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 text-left mb-8">
                        <h3 className="font-bold mb-3 uppercase text-xs tracking-wider text-slate-400">Delivery Address</h3>
                        {addresses.length > 0 ? addresses.map(addr => (
                            <div key={addr.id}
                                onClick={() => setSelectedAddress(addr.id)}
                                className={`p-4 rounded-xl border-2 transition-all cursor-pointer mb-2 ${selectedAddress === addr.id ? 'border-primary bg-primary/5 dark:bg-primary/10' : 'border-transparent bg-slate-50 dark:bg-slate-700/50'}`}
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="material-symbols-outlined text-lg opacity-60">
                                                {addr.tag === 'Home' ? 'home' : 'work'}
                                            </span>
                                            <span className="font-bold text-sm">{addr.tag}</span>
                                        </div>
                                        <p className="text-xs text-slate-500 font-medium leading-relaxed">
                                            {addr.line1}, {addr.line2}, {addr.city} - {addr.pincode}
                                        </p>
                                    </div>
                                    {selectedAddress === addr.id && <span className="material-symbols-outlined text-primary">check_circle</span>}
                                </div>
                            </div>
                        )) : (
                            <p className="text-sm text-slate-400 text-center py-4">No saved addresses. Please add one in your profile.</p>
                        )}
                    </div>

                    {(orderError || createOrderError) && (
                        <div className="w-full max-w-md mb-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-100 dark:border-red-800/50 text-sm text-red-600 dark:text-red-400 font-medium">
                            {orderError || createOrderError}
                        </div>
                    )}

                    <button
                        onClick={handlePlaceOrder}
                        disabled={isOrderPlacing}
                        className="w-full max-w-md bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-4 rounded-2xl font-black uppercase tracking-widest shadow-xl flex items-center justify-center gap-2"
                    >
                        {isOrderPlacing ? (
                            <span className="material-symbols-outlined text-xl animate-spin">progress_activity</span>
                        ) : 'Submit Order'}
                    </button>
                </div>
            </div>
        )
    }

    if (items.length === 0 && !prescription) {
        router.push('/cart');
        return null;
    }

    return (
        <div className="relative flex flex-col min-h-screen mx-auto w-full bg-surface-50 dark:bg-surface-950 pb-32 font-sans text-slate-900 dark:text-white transition-colors duration-300">
            <PageHeader title="Checkout" subtitle="Secure Payment" showCart={false} showLocation={false} className="lg:top-20" />

            {/* Progress Stepper - Mobile Only */}
            <div className="sticky top-[72px] lg:top-[144px] z-30 bg-surface-50/95 dark:bg-surface-950/95 backdrop-blur-md pb-6 pt-2 px-4 shadow-sm border-b border-surface-200 dark:border-surface-800 lg:hidden transition-all">
                <div className="flex items-center justify-between relative max-w-sm mx-auto">
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 dark:bg-gray-800 -z-10 -translate-y-1/2 rounded-full"></div>
                    <div className="absolute top-1/2 left-0 w-2/3 h-1 bg-primary -z-10 -translate-y-1/2 rounded-full"></div>

                    <div className="flex flex-col items-center gap-2 opacity-50">
                        <div className="size-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shadow-lg shadow-primary/30 ring-4 ring-white dark:ring-gray-900">
                            <span className="material-symbols-outlined text-sm">check</span>
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-primary">Cart</span>
                    </div>

                    <div className="flex flex-col items-center gap-2">
                        <div className="size-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shadow-lg shadow-primary/30 ring-4 ring-white dark:ring-gray-900">2</div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-primary">Address</span>
                    </div>

                    <div className="flex flex-col items-center gap-2">
                        <div className="size-8 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-400 dark:text-gray-500 flex items-center justify-center font-bold text-sm ring-4 ring-white dark:ring-gray-900">3</div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Pay</span>
                    </div>
                </div>
            </div>

            <div className="p-4 pt-6 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Delivery & Items */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    {/* Delivery Address Section */}
                    <section className="bg-white dark:bg-surface-900 rounded-[2rem] p-6 shadow-sm border border-surface-200 dark:border-surface-800">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-black uppercase tracking-tight flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">location_on</span>
                                Delivery Address
                            </h2>
                            <button
                                onClick={() => router.push('/profile/addresses')}
                                className="text-xs font-black text-primary uppercase tracking-wider hover:underline"
                            >
                                + Add New
                            </button>
                        </div>

                        {addresses.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {addresses.map(addr => (
                                    <div
                                        key={addr.id}
                                        onClick={() => setSelectedAddress(addr.id)}
                                        className={`relative p-5 rounded-2xl border-2 transition-all cursor-pointer group hover:shadow-md ${selectedAddress === addr.id ? 'border-primary bg-primary/5 dark:bg-primary/10' : 'border-surface-200 dark:border-surface-700 hover:border-surface-300 dark:hover:border-surface-600'}`}
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="flex items-center gap-2">
                                                <div className={`p-1.5 rounded-lg ${selectedAddress === addr.id ? 'bg-primary text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-500'}`}>
                                                    <span className="material-symbols-outlined text-lg">
                                                        {addr.tag === 'Home' ? 'home' : 'work'}
                                                    </span>
                                                </div>
                                                <span className="font-bold text-sm">{addr.tag}</span>
                                                {addr.isDefault && <span className="bg-slate-100 dark:bg-slate-700 text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wide text-slate-500">Default</span>}
                                            </div>
                                            {selectedAddress === addr.id && (
                                                <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                                            )}
                                        </div>
                                        <h3 className="font-bold text-sm mb-1">{profile.name}</h3>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                                            {addr.line1}, {addr.line2}<br />
                                            {addr.city} - {addr.pincode}
                                        </p>
                                        <p className="text-xs font-bold text-slate-400 mt-2">{profile.phone}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <span className="material-symbols-outlined text-4xl text-slate-300 mb-2">add_location</span>
                                <p className="text-sm text-slate-400 mb-4">No saved addresses yet</p>
                                <button
                                    onClick={() => router.push('/profile/addresses')}
                                    className="text-sm font-bold text-primary hover:underline"
                                >
                                    Add an address to continue
                                </button>
                            </div>
                        )}
                    </section>

                    {/* Order Items Review */}
                    <section className="bg-white dark:bg-surface-900 rounded-[2rem] p-6 shadow-sm border border-surface-200 dark:border-surface-800">
                        <h2 className="text-lg font-black uppercase tracking-tight flex items-center gap-2 mb-6">
                            <span className="material-symbols-outlined text-primary">shopping_bag</span>
                            Order Items ({items.length})
                        </h2>
                        <div className="space-y-4">
                            {items.map(item => (
                                <div key={item.id} className="flex gap-4 p-3 bg-slate-50 dark:bg-slate-700/30 rounded-2xl border border-slate-100 dark:border-slate-700/50">
                                    <div className="size-16 bg-white dark:bg-slate-700 rounded-xl flex items-center justify-center p-1 border border-slate-100 dark:border-slate-600">
                                        {item.type === 'medicine' ? (
                                            <Image src={item.image || 'https://placehold.co/100'} alt={item.name} width={64} height={64} className="object-cover mix-blend-multiply dark:mix-blend-normal" unoptimized />
                                        ) : (
                                            <span className="material-symbols-outlined text-2xl text-slate-400">science</span>
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-sm line-clamp-1">{item.name}</h4>
                                        <p className="text-[10px] uppercase font-bold text-slate-400">{item.packSize}</p>
                                        <div className="flex justify-between items-center mt-2">
                                            <div className="flex items-center gap-1 text-xs font-bold bg-white dark:bg-slate-800 px-2 py-1 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700">
                                                <span>Qty: {item.qty}</span>
                                            </div>
                                            <span className="text-sm font-black">₹{item.price * item.qty}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Right Column: Payment & Summary (Sticky) */}
                <div className="lg:col-span-1">
                    <div className="space-y-6 lg:sticky lg:top-32">
                        {/* Coupon Section */}
                        <div className="bg-white dark:bg-surface-900 rounded-[2rem] p-5 shadow-sm border border-surface-200 dark:border-surface-800">
                            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-2">
                                <span className="material-symbols-outlined text-base">local_offer</span> Offers & Benefits
                            </h3>
                            <div className="flex gap-2">
                                <div className="relative flex-1">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400 text-lg">confirmation_number</span>
                                    <input
                                        type="text"
                                        placeholder="Enter Coupon Code"
                                        value={couponCode}
                                        onChange={(e) => setCouponCode(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-900 rounded-xl border-none text-sm font-bold outline-none focus:ring-2 focus:ring-primary/50 uppercase placeholder:normal-case"
                                    />
                                </div>
                                <button
                                    onClick={handleApplyCoupon}
                                    disabled={!couponCode || couponLoading}
                                    className="px-4 font-black text-sm bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl hover:opacity-90 disabled:opacity-50 uppercase tracking-wide"
                                >
                                    {couponLoading ? '...' : 'Apply'}
                                </button>
                            </div>
                            {couponError && (
                                <p className="mt-2 text-xs font-bold text-red-500">{couponError}</p>
                            )}
                            {appliedCoupon && (
                                <div className="mt-3 flex justify-between items-center bg-emerald-50 dark:bg-emerald-900/20 p-3 rounded-xl border border-emerald-100 dark:border-emerald-800/50">
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-emerald-600 text-lg">check_circle</span>
                                        <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">&apos;{appliedCoupon.code}&apos; applied — ₹{appliedCoupon.discount} off</span>
                                    </div>
                                    <button onClick={() => setAppliedCoupon(null)} className="text-emerald-600 hover:text-emerald-800 dark:text-emerald-400">
                                        <span className="material-symbols-outlined text-lg">close</span>
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Bill Summary */}
                        <div className="bg-white dark:bg-surface-900 rounded-[2rem] p-6 shadow-sm border border-surface-200 dark:border-surface-800 relative overflow-hidden">
                            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent opacity-50" />
                            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Bill Details</h3>

                            <div className="space-y-3 mb-4">
                                <div className="flex justify-between items-center text-sm font-medium text-slate-600 dark:text-slate-300">
                                    <span>Item Total</span>
                                    <span className="font-bold">₹{finalMrp}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm font-medium text-emerald-600">
                                    <span>Product Discount</span>
                                    <span>- ₹{productDiscount}</span>
                                </div>
                                {appliedCoupon && (
                                    <div className="flex justify-between items-center text-sm font-medium text-emerald-600">
                                        <span>Coupon Savings</span>
                                        <span>- ₹{appliedCoupon.discount}</span>
                                    </div>
                                )}
                                <div className="flex justify-between items-center text-sm font-medium text-slate-600 dark:text-slate-300">
                                    <span className="flex items-center gap-1">Delivery Fee</span>
                                    <span>{deliveryFee === 0 ? <span className="text-emerald-600 font-black uppercase text-xs">Free</span> : `₹${deliveryFee}`}</span>
                                </div>
                            </div>

                            <div className="border-t-2 border-dashed border-slate-100 dark:border-slate-700 pt-4 flex justify-between items-center mb-6">
                                <div className="flex flex-col">
                                    <span className="font-black text-lg text-slate-900 dark:text-white">To Pay</span>
                                    <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider">You Save ₹{productDiscount + couponDiscount + (itemTotal >= 500 ? 40 : 0)}</span>
                                </div>
                                <span className="font-black text-2xl text-slate-900 dark:text-white">₹{finalTotal}</span>
                            </div>

                            {/* Payment Options Preview */}
                            <div className="space-y-3 mb-6">
                                <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Preferred Payment</p>
                                <div
                                    onClick={() => setSelectedPayment('cod')}
                                    className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer transition-colors ${selectedPayment === 'cod' ? 'border-primary bg-primary/5' : 'border-surface-200 bg-surface-50 dark:border-surface-700 dark:bg-surface-800/50'}`}
                                >
                                    <div className={`size-4 rounded-full border-2 flex items-center justify-center ${selectedPayment === 'cod' ? 'border-primary' : 'border-slate-300 dark:border-slate-600'}`}>
                                        {selectedPayment === 'cod' && <div className="size-2 rounded-full bg-primary" />}
                                    </div>
                                    <span className="text-sm font-bold">Cash on Delivery</span>
                                </div>
                                <div
                                    onClick={() => setSelectedPayment('upi')}
                                    className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer transition-colors ${selectedPayment === 'upi' ? 'border-primary bg-primary/5' : 'border-surface-200 bg-surface-50 dark:border-surface-700 dark:bg-surface-800/50'}`}
                                >
                                    <div className={`size-4 rounded-full border-2 flex items-center justify-center ${selectedPayment === 'upi' ? 'border-primary' : 'border-slate-300 dark:border-slate-600'}`}>
                                        {selectedPayment === 'upi' && <div className="size-2 rounded-full bg-primary" />}
                                    </div>
                                    <span className="text-sm font-bold">UPI / Online Payment</span>
                                </div>
                            </div>

                            {/* Error Display */}
                            {(orderError || createOrderError) && (
                                <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-100 dark:border-red-800/50 text-sm text-red-600 dark:text-red-400 font-medium flex items-center gap-2">
                                    <span className="material-symbols-outlined text-lg">error</span>
                                    {orderError || createOrderError}
                                </div>
                            )}

                            {/* Checkout Button - Desktop */}
                            <button
                                onClick={handlePlaceOrder}
                                disabled={isOrderPlacing || addresses.length === 0}
                                className="hidden lg:flex w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed font-black text-sm uppercase tracking-widest py-4 px-6 rounded-2xl shadow-xl items-center justify-center gap-2 transition-all active:scale-[0.98]"
                            >
                                {isOrderPlacing ? (
                                    <span className="material-symbols-outlined text-xl animate-spin">progress_activity</span>
                                ) : (
                                    <>
                                        <span>Place Order</span>
                                        <span className="material-symbols-outlined text-lg">arrow_forward</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Footer */}
            <div className="lg:hidden fixed bottom-0 left-0 w-full z-50 bg-white/90 dark:bg-surface-900/90 backdrop-blur-xl border-t border-surface-200 dark:border-surface-800 p-4 pb-safe shadow-2xl">
                <div className="max-w-md mx-auto flex gap-4 items-center">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Total</span>
                        <span className="text-2xl font-black leading-none text-slate-900 dark:text-white">₹{finalTotal}</span>
                        <button className="text-[10px] text-primary font-bold underline mt-1 text-left">View Details</button>
                    </div>
                    <button
                        onClick={handlePlaceOrder}
                        disabled={isOrderPlacing || addresses.length === 0}
                        className="flex-1 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed font-black text-sm uppercase tracking-widest py-4 px-6 rounded-2xl shadow-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                    >
                        {isOrderPlacing ? (
                            <span className="material-symbols-outlined text-xl animate-spin">progress_activity</span>
                        ) : (
                            <>
                                <span>Place Order</span>
                                <span className="material-symbols-outlined text-lg">arrow_forward</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
