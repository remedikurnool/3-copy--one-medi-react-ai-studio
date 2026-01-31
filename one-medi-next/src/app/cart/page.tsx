'use client';

import React, { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '../../store/cartStore';
import PrescriptionUpload from '../../components/ui/PrescriptionUpload';

function CartContent() {
    const router = useRouter();
    const { items, updateQuantity, removeFromCart, totalPrice, totalMrp, prescription, setPrescription } = useCartStore();

    const finalTotal = totalPrice();
    const finalMrp = totalMrp();
    const savings = finalMrp - finalTotal;

    const isConciergeMode = items.length === 0 && !!prescription;
    const isCartEmpty = items.length === 0 && !prescription;

    const isPrescriptionNeeded = items.some(item => item.isPrescriptionRequired);
    const canCheckout = (!isPrescriptionNeeded || (isPrescriptionNeeded && !!prescription)) || isConciergeMode;

    if (isCartEmpty) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-bg-light dark:bg-bg-dark text-slate-900 dark:text-white p-6 animate-fade-in">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="size-32 bg-slate-100 dark:bg-slate-800 rounded-[2.5rem] flex items-center justify-center mb-6 shadow-inner"
                >
                    <span className="material-symbols-outlined text-5xl text-slate-400">shopping_cart_off</span>
                </motion.div>
                <h2 className="text-2xl font-black mb-2 tracking-tight">Your cart is empty</h2>
                <p className="text-slate-500 font-medium text-center mb-8 max-w-xs">Looks like you haven't added anything yet. Start shopping now!</p>
                <button
                    onClick={() => router.push('/')}
                    className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-primary/30 transition-all hover:scale-105 active:scale-95"
                >
                    Explore Medicines
                </button>
            </div>
        );
    }

    return (
        <div className="relative flex flex-col min-h-screen mx-auto w-full bg-bg-light dark:bg-bg-dark pb-40 font-sans text-slate-900 dark:text-white overflow-x-hidden">
            {/* Header */}
            <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-white/20 dark:border-gray-800 px-4 py-3 flex items-center justify-between shadow-sm">
                <button onClick={() => router.back()} className="size-10 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-700 dark:text-slate-200 flex items-center justify-center">
                    <span className="material-symbols-outlined text-2xl">arrow_back</span>
                </button>
                <div className="flex-1 text-center pr-10">
                    <h1 className="text-lg font-black uppercase tracking-tight">My Cart</h1>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                        {isConciergeMode ? 'Prescription Order' : `${items.length} Items`}
                    </p>
                </div>
            </header>

            {/* Progress Stepper */}
            <div className="bg-white dark:bg-gray-900 pt-4 pb-6 px-8 rounded-b-[2rem] shadow-sm mb-4">
                <div className="flex items-center justify-between relative max-w-sm mx-auto">
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 dark:bg-gray-800 -z-10 -translate-y-1/2 rounded-full"></div>
                    <div className="absolute top-1/2 left-0 w-1/3 h-1 bg-primary -z-10 -translate-y-1/2 rounded-full"></div>

                    <div className="flex flex-col items-center gap-2">
                        <div className="size-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shadow-lg shadow-primary/30 ring-4 ring-white dark:ring-gray-900">1</div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-primary">Cart</span>
                    </div>

                    <div className="flex flex-col items-center gap-2">
                        <div className="size-8 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-400 dark:text-gray-500 flex items-center justify-center font-bold text-sm ring-4 ring-white dark:ring-gray-900">2</div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Address</span>
                    </div>

                    <div className="flex flex-col items-center gap-2">
                        <div className="size-8 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-400 dark:text-gray-500 flex items-center justify-center font-bold text-sm ring-4 ring-white dark:ring-gray-900">3</div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Pay</span>
                    </div>
                </div>
            </div>

            {/* Concierge Mode Alert */}
            {isConciergeMode && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mx-4 mt-2 bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-teal-900/30 dark:to-emerald-900/30 p-5 rounded-[1.5rem] border border-teal-100 dark:border-teal-800/50 flex gap-4 shadow-sm"
                >
                    <div className="size-12 rounded-2xl bg-white dark:bg-teal-800/50 flex items-center justify-center shrink-0 text-teal-600 dark:text-teal-300 shadow-sm">
                        <span className="material-symbols-outlined text-2xl">support_agent</span>
                    </div>
                    <div>
                        <h3 className="text-sm font-black text-teal-900 dark:text-teal-100 uppercase tracking-wide">Pharmacist Review</h3>
                        <p className="text-xs font-medium text-teal-700 dark:text-teal-300 mt-1 leading-relaxed">
                            Our pharmacist will review your uploaded prescription, add the medicines to your order, and call you for confirmation.
                        </p>
                    </div>
                </motion.div>
            )}

            {/* Free Delivery Nudge */}
            {!isConciergeMode && finalTotal < 500 && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mx-4 mt-2 p-4 bg-white dark:bg-gray-800 rounded-[1.5rem] shadow-sm border border-gray-100 dark:border-gray-700"
                >
                    <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center gap-2">
                            <div className="bg-amber-100 dark:bg-amber-900/30 p-1.5 rounded-lg text-amber-600">
                                <span className="material-symbols-outlined text-lg">local_shipping</span>
                            </div>
                            <p className="text-xs font-bold uppercase tracking-tight text-slate-700 dark:text-slate-300">Free Delivery</p>
                        </div>
                        <p className="text-[10px] font-black uppercase text-slate-400">Add ₹{500 - finalTotal} more</p>
                    </div>
                    <div className="h-2 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(finalTotal / 500) * 100}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"
                        />
                    </div>
                </motion.div>
            )}

            {/* Cart Items */}
            {!isConciergeMode && (
                <section className="mt-4 px-4 flex flex-col gap-4">
                    <AnimatePresence>
                        {items.map((item) => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -100 }}
                                className="bg-white dark:bg-gray-800 p-4 rounded-[2rem] shadow-sm border border-slate-50 dark:border-slate-800 flex gap-4 group"
                            >
                                <div className="shrink-0 relative">
                                    <div className="size-24 rounded-2xl bg-slate-50 dark:bg-slate-700/50 relative overflow-hidden flex items-center justify-center border border-slate-100 dark:border-slate-700">
                                        {item.type === 'medicine' ? (
                                            <Image src={item.image || 'https://placehold.co/600x400/e2e8f0/64748b?text=Product'} alt={item.name} fill className="object-cover mix-blend-multiply dark:mix-blend-normal p-2 group-hover:scale-110 transition-transform duration-500" unoptimized />
                                        ) : (
                                            <span className="material-symbols-outlined text-4xl text-primary opacity-50">science</span>
                                        )}
                                    </div>
                                </div>

                                <div className="flex-1 flex flex-col justify-between py-1">
                                    <div>
                                        <div className="flex justify-between items-start gap-2">
                                            <h3 className="text-base font-black leading-tight line-clamp-2 text-slate-900 dark:text-white tracking-tight">{item.name}</h3>
                                            <button onClick={() => removeFromCart(item.id)} className="text-slate-300 hover:text-red-500 transition-colors p-1 -mr-2 -mt-2">
                                                <span className="material-symbols-outlined text-xl">close</span>
                                            </button>
                                        </div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">{item.packSize || 'Unit'}</p>

                                        {item.isPrescriptionRequired && (
                                            <div className="inline-flex items-center gap-1 mt-2 px-2 py-0.5 bg-red-50 dark:bg-red-900/20 rounded-md border border-red-100 dark:border-red-900/30">
                                                <span className="material-symbols-outlined text-red-500 text-[12px]">description</span>
                                                <span className="text-[9px] text-red-600 dark:text-red-400 font-black uppercase tracking-wider">Rx Required</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex justify-between items-end mt-2">
                                        <div className="flex flex-col">
                                            <span className="text-lg font-black text-slate-900 dark:text-white">₹{item.price * item.qty}</span>
                                            {item.mrp > item.price && (
                                                <span className="text-[10px] text-slate-400 line-through font-bold">₹{item.mrp * item.qty}</span>
                                            )}
                                        </div>

                                        {/* Stepper */}
                                        <div className="flex items-center bg-slate-100 dark:bg-slate-900 rounded-xl p-1 shadow-inner">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.qty - 1)}
                                                className="size-8 flex items-center justify-center rounded-lg bg-white dark:bg-slate-800 shadow-sm text-slate-900 dark:text-white hover:bg-slate-50 active:scale-90 transition-all"
                                            >
                                                <span className="material-symbols-outlined text-base">remove</span>
                                            </button>
                                            <div className="w-8 text-center font-black text-sm">{item.qty}</div>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.qty + 1)}
                                                className="size-8 flex items-center justify-center rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md active:scale-90 transition-all"
                                            >
                                                <span className="material-symbols-outlined text-base">add</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </section>
            )}

            {/* Prescription Upload Section */}
            <section className="mx-4 mt-8">
                <PrescriptionUpload
                    required={isPrescriptionNeeded}
                    label="Upload Prescription"
                    initialUrl={prescription}
                    onUpload={setPrescription}
                    subLabel={isPrescriptionNeeded ? "Required for items marked with Rx" : "Optional for concierge order"}
                />
            </section>

            {/* Bill Details */}
            {!isConciergeMode && (
                <section className="mx-4 my-6 bg-white dark:bg-gray-800 rounded-[2rem] p-6 shadow-sm border border-slate-100 dark:border-slate-700 relative overflow-hidden">
                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent opacity-50" />
                    <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Payment Summary</h3>

                    <div className="space-y-3 mb-4">
                        <div className="flex justify-between items-center text-sm font-medium text-slate-600 dark:text-slate-300">
                            <span>Item Total</span>
                            <span className="font-bold">₹{finalMrp}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm font-medium text-slate-600 dark:text-slate-300">
                            <span className="flex items-center gap-1">Delivery Fee</span>
                            <span>{finalTotal >= 500 ? <span className="text-emerald-600 font-black uppercase text-xs">Free</span> : '₹40'}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm font-bold text-emerald-600">
                            <span>Total Savings</span>
                            <span>- ₹{savings}</span>
                        </div>
                    </div>

                    <div className="border-t-2 border-dashed border-slate-100 dark:border-slate-700 pt-4 flex justify-between items-center">
                        <span className="font-black text-lg text-slate-900 dark:text-white">To Pay</span>
                        <span className="font-black text-2xl text-slate-900 dark:text-white">₹{finalTotal + (finalTotal >= 500 ? 0 : 40)}</span>
                    </div>
                </section>
            )}

            {/* Trust Badge */}
            <div className="flex items-center justify-center gap-2 mb-8 text-slate-400 opacity-60">
                <span className="material-symbols-outlined text-xl">verified_user</span>
                <span className="text-[10px] font-black uppercase tracking-widest">Secure Payments • Verified Pharmacy</span>
            </div>

            {/* Sticky Footer */}
            <div className="fixed bottom-0 left-0 w-full z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-t border-slate-100 dark:border-slate-800 p-4 pb-safe shadow-2xl">
                <div className="max-w-md mx-auto flex gap-4 items-center">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Total</span>
                        <span className="text-2xl font-black leading-none text-slate-900 dark:text-white">
                            {isConciergeMode ? 'TBD' : `₹${finalTotal + (finalTotal >= 500 ? 0 : 40)}`}
                        </span>
                        {!isConciergeMode && <button className="text-[10px] text-primary font-bold underline mt-1 text-left">View Details</button>}
                    </div>
                    <button
                        disabled={!canCheckout}
                        onClick={() => router.push('/checkout')}
                        className="flex-1 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed font-black text-sm uppercase tracking-widest py-4 px-6 rounded-2xl shadow-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                    >
                        {canCheckout
                            ? (isConciergeMode ? 'Submit Order' : 'Checkout')
                            : 'Upload Rx'}
                        <span className="material-symbols-outlined text-lg">arrow_forward</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function CartPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-bg-light dark:bg-bg-dark flex items-center justify-center">
                <span className="material-symbols-outlined text-4xl text-slate-300 animate-spin">progress_activity</span>
            </div>
        }>
            <CartContent />
        </Suspense>
    );
}
