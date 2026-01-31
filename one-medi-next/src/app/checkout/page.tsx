'use client';

import React, { useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useCartStore } from '../../store/cartStore';
import { useUserStore } from '../../store/userStore';
import { useCreateOrder, useCoupon } from '../../hooks';

function CheckoutContent() {
    const router = useRouter();
    const [paymentMethod, setPaymentMethod] = useState('upi');
    const [couponCode, setCouponCode] = useState('');
    const [appliedCoupon, setAppliedCoupon] = useState<any>(null); // Type: Coupon

    const { items, totalPrice, totalMrp, clearCart, prescription } = useCartStore();
    const { profile, addresses } = useUserStore();

    const { createOrder, loading: creatingOrder, error: orderError } = useCreateOrder();
    const { validateCoupon, loading: validatingCoupon, error: couponError } = useCoupon();

    const cartTotal = totalPrice();
    const cartMrp = totalMrp();

    // Calculate potential discount from coupon
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

    // Get default address or first one
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
            alert('Please add a delivery address first.'); // Replace with toast ideally
            return;
        }

        const order = await createOrder(
            items,
            cartTotal, // total_amount
            couponDiscount, // discount_amount
            finalAmount, // final_amount
            deliveryAddress, // delivery_address
            paymentMethod,
            prescription, // prescription_url from cart store
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
        <div className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden pb-24 bg-bg-light dark:bg-bg-dark font-sans text-slate-900 dark:text-white">
            {/* Top App Bar */}
            <div className="sticky top-0 z-50 flex items-center bg-white dark:bg-gray-900 p-4 shadow-sm border-b border-gray-100 dark:border-gray-800">
                <button
                    onClick={() => router.back()}
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
                                    {deliveryAddress?.tag || 'HOME'}
                                </div>
                                <button className="text-primary text-sm font-bold px-3 py-1 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                                    Change
                                </button>
                            </div>
                            <h4 className="font-bold text-lg mb-1">{profile.name}</h4>
                            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4 max-w-[85%]">
                                {deliveryAddress ? (
                                    <>
                                        {deliveryAddress.line1}, {deliveryAddress.line2}<br />
                                        {deliveryAddress.city} - {deliveryAddress.pincode}
                                    </>
                                ) : (
                                    <span className="text-red-500">No address found. Please add one.</span>
                                )}
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
                                <div className="size-16 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center justify-center shrink-0 p-1 relative overflow-hidden">
                                    {item.type === 'medicine' ? (
                                        <Image src={item.image || '/placeholder.png'} alt={item.name} fill className="object-cover" unoptimized />
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

                {/* Coupon Section */}
                <section>
                    <h3 className="text-lg font-bold mb-3 flex items-center gap-2 px-1">
                        <span className="material-symbols-outlined text-primary">local_offer</span>
                        Coupon Code
                    </h3>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                        {!appliedCoupon ? (
                            <div className="flex gap-2">
                                <div className="flex-1 relative">
                                    <input
                                        type="text"
                                        placeholder="Enter coupon code"
                                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none uppercase font-bold text-slate-700 dark:text-white placeholder:font-normal"
                                        value={couponCode}
                                        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                                    />
                                    <span className="material-symbols-outlined absolute left-3 top-2.5 text-gray-400">confirmation_number</span>
                                </div>
                                <button
                                    onClick={handleApplyCoupon}
                                    disabled={validatingCoupon || !couponCode}
                                    className="bg-primary text-white px-5 py-2.5 rounded-lg font-bold text-sm shadow-lg shadow-primary/30 disabled:opacity-50 disabled:shadow-none transition-all"
                                >
                                    {validatingCoupon ? 'APPLYING...' : 'APPLY'}
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center justify-between bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-3 rounded-lg">
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-green-600">check_circle</span>
                                    <div>
                                        <p className="text-sm font-bold text-green-800 dark:text-green-300">Code {appliedCoupon.code} applied!</p>
                                        <p className="text-xs text-green-600 dark:text-green-400">You saved ₹{couponDiscount.toFixed(2)}</p>
                                    </div>
                                </div>
                                <button onClick={handleRemoveCoupon} className="text-red-500 hover:text-red-600 p-1">
                                    <span className="material-symbols-outlined text-lg">close</span>
                                </button>
                            </div>
                        )}
                        {couponError && (
                            <p className="text-xs text-red-500 mt-2 font-bold flex items-center gap-1">
                                <span className="material-symbols-outlined text-sm">error</span>
                                {couponError}
                            </p>
                        )}
                    </div>
                </section>

                {/* Trust Badges */}
                <section className="bg-emerald-50 dark:bg-emerald-900/10 rounded-2xl p-4 border border-emerald-100 dark:border-emerald-800/30 flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                        <div className="size-10 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center text-emerald-600 shadow-sm shrink-0">
                            <span className="material-symbols-outlined filled">verified_user</span>
                        </div>
                        <div>
                            <p className="text-xs font-black uppercase tracking-widest text-emerald-800 dark:text-emerald-300">One Medi Trust Lock</p>
                            <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">Your health and safety are our top priorities.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white dark:bg-gray-800 p-3 rounded-xl shadow-sm flex items-center gap-2 border border-emerald-100 dark:border-emerald-900/40">
                            <span className="material-symbols-outlined text-primary text-xl">pill</span>
                            <span className="text-[10px] font-bold text-slate-700 dark:text-gray-300 leading-tight">100% Genuine Medicine</span>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-3 rounded-xl shadow-sm flex items-center gap-2 border border-emerald-100 dark:border-emerald-900/40">
                            <span className="material-symbols-outlined text-primary text-xl">biotech</span>
                            <span className="text-[10px] font-bold text-slate-700 dark:text-gray-300 leading-tight">NABL Certified Labs</span>
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
                            <span className="font-medium text-slate-900 dark:text-white">₹{cartMrp}</span>
                        </div>
                        <div className="flex justify-between py-2 text-sm text-secondary font-medium">
                            <span>Savings</span>
                            <span>-₹{savings}</span>
                        </div>
                        {appliedCoupon && (
                            <div className="flex justify-between py-2 text-sm text-green-600 font-bold bg-green-50 dark:bg-green-900/10 px-2 rounded-lg -mx-2">
                                <span>Coupon Discount</span>
                                <span>-₹{couponDiscount}</span>
                            </div>
                        )}
                        <div className="flex justify-between py-2 text-sm text-gray-600 dark:text-gray-400 border-b border-dashed border-gray-200 dark:border-gray-700 pb-4">
                            <span>Delivery Fee</span>
                            <span className={deliveryFee === 0 ? "text-secondary font-bold" : ""}>{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
                        </div>
                        <div className="flex justify-between pt-4 text-base font-bold text-slate-900 dark:text-white items-end">
                            <span>Grand Total</span>
                            <span className="text-xl">₹{finalAmount}</span>
                        </div>
                    </div>
                </section>

                <div className="h-20"></div>

                {/* Sticky Footer */}
                <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-50">
                    <div className="flex items-center gap-4 max-w-md mx-auto">
                        <div className="flex flex-col">
                            <span className="text-xs text-gray-500 font-medium">Total Payable</span>
                            <span className="text-xl font-bold">₹{finalAmount}</span>
                        </div>
                        <button
                            onClick={handlePlaceOrder}
                            disabled={creatingOrder || !deliveryAddress}
                            className="flex-1 bg-primary hover:bg-primary-dark text-white h-12 rounded-xl font-bold text-base shadow-lg shadow-blue-500/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:bg-gray-300 disabled:shadow-none disabled:cursor-not-allowed"
                        >
                            {creatingOrder ? (
                                <>
                                    <span className="material-symbols-outlined animate-spin text-[20px]">progress_activity</span>
                                    Processing...
                                </>
                            ) : (
                                <>
                                    Place Order
                                    <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function CheckoutPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CheckoutContent />
        </Suspense>
    );
}
