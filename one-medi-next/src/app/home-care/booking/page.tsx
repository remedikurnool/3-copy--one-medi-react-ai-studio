'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useBookingStore } from '@/store/bookingStore';
import { useUserStore } from '@/store/userStore';
import { useCreateBooking } from '@/hooks/useBookings';
import { supabase } from '@/lib/supabase';

export default function HomeCareBookingPage() {
    const router = useRouter();
    const { service, plan, isHomeVisit, preferences } = useBookingStore();
    const { addresses } = useUserStore();

    const [selectedDate, setSelectedDate] = useState('today');
    const [selectedTime, setSelectedTime] = useState('09:00 AM');
    const [selectedAddressId, setSelectedAddressId] = useState(addresses[0]?.id);
    const [mounted, setMounted] = useState(false);
    const [bookingError, setBookingError] = useState<string | null>(null);

    const { createBooking, loading: bookingLoading, error: bookingHookError } = useCreateBooking();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    if (!service) {
        return (
            <div className="min-h-screen flex items-center justify-center flex-col gap-4 bg-bg-light dark:bg-bg-dark text-slate-900 dark:text-white p-4 text-center">
                <div className="size-20 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center mb-2">
                    <span className="material-symbols-outlined text-4xl text-gray-400">error</span>
                </div>
                <p className="font-bold text-lg">No service selected.</p>
                <p className="text-gray-500 text-sm max-w-xs">Please go back and select a service to proceed with booking.</p>
                <button onClick={() => router.push('/home-care')} className="text-primary font-bold bg-primary/10 px-6 py-3 rounded-xl mt-2">Go Home</button>
            </div>
        );
    }

    const basePrice = plan ? plan.price : service.price;
    const visitFee = isHomeVisit ? (service.homeVisitFee || 0) : 0;
    const totalAmount = basePrice + visitFee;

    const handleConfirm = async () => {
        setBookingError(null);

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            setBookingError('Please login to book a service');
            return;
        }

        if (!service?.id) {
            setBookingError('Invalid service selection');
            return;
        }

        const booking = await createBooking(
            user.id,
            {
                service_catalog_id: service.id,
                booking_date: selectedDate === 'today' ? new Date().toISOString().split('T')[0] : selectedDate,
                booking_time: selectedTime,
                notes: `Plan: ${plan?.name || 'Standard'}, ${isHomeVisit ? 'Home Visit' : 'Clinic Visit'}${preferences?.requestFemale ? ', Female Staff Requested' : ''}`
            }
        );

        if (booking) {
            router.push(`/bookings?newBookingId=${booking.id}`);
        } else {
            setBookingError(bookingHookError || 'Failed to create booking');
        }
    };

    return (
        <div className="min-h-screen bg-bg-light dark:bg-bg-dark font-sans text-slate-900 dark:text-white pb-32 animate-fade-in">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800 p-4 flex items-center gap-3">
                <button onClick={() => router.back()} className="size-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    <span className="material-symbols-outlined text-[24px]">arrow_back</span>
                </button>
                <h1 className="text-lg font-bold">Complete Booking</h1>
            </header>

            <main className="p-4 flex flex-col gap-6 max-w-lg mx-auto">
                {/* Service Summary */}
                <section className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex gap-4 items-start">
                    <div className="size-20 rounded-xl bg-gray-100 shrink-0 overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={service.image} alt="" className="size-full object-cover" />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-bold text-base leading-tight">{service.name}</h3>
                        <p className="text-xs text-gray-500 mt-1">{plan?.name || 'Standard Service'}</p>

                        <div className="flex flex-wrap gap-2 mt-2">
                            <span className="text-[10px] font-bold bg-blue-50 dark:bg-blue-900/20 text-blue-600 px-2 py-0.5 rounded border border-blue-100 dark:border-blue-800">
                                {isHomeVisit ? 'Home Visit' : 'Clinic Visit'}
                            </span>
                            {preferences?.requestFemale && (
                                <span className="text-[10px] font-bold bg-pink-50 dark:bg-pink-900/20 text-pink-600 px-2 py-0.5 rounded border border-pink-100 dark:border-pink-800 flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[12px]">female</span> Female Staff
                                </span>
                            )}
                        </div>
                    </div>
                </section>

                {/* Schedule */}
                <section>
                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Date & Time</h3>
                    <div className="flex gap-3 overflow-x-auto no-scrollbar mb-4">
                        {['Today, 14 Oct', 'Tomorrow, 15 Oct', 'Wed, 16 Oct'].map(date => (
                            <button
                                key={date}
                                onClick={() => setSelectedDate(date)}
                                className={`px-4 py-3 rounded-xl border-2 text-xs font-bold whitespace-nowrap transition-all ${selectedDate === date ? 'border-primary bg-primary/5 text-primary' : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'}`}
                            >
                                {date}
                            </button>
                        ))}
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                        {['09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM', '06:00 PM'].map(time => (
                            <button
                                key={time}
                                onClick={() => setSelectedTime(time)}
                                className={`py-2 rounded-lg text-xs font-bold border transition-all ${selectedTime === time ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-transparent' : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'}`}
                            >
                                {time}
                            </button>
                        ))}
                    </div>
                </section>

                {/* Address Selection (Only if Home Visit) */}
                {isHomeVisit && (
                    <section>
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Service Location</h3>
                            <button onClick={() => router.push('/profile/addresses')} className="text-xs font-bold text-primary">Add New</button>
                        </div>
                        <div className="flex flex-col gap-3">
                            {addresses.length > 0 ? addresses.map(addr => (
                                <div
                                    key={addr.id}
                                    onClick={() => setSelectedAddressId(addr.id)}
                                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-3 ${selectedAddressId === addr.id ? 'border-primary bg-blue-50/50 dark:bg-blue-900/10' : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'}`}
                                >
                                    <div className={`size-5 rounded-full border-2 flex items-center justify-center mt-0.5 ${selectedAddressId === addr.id ? 'border-primary' : 'border-gray-300'}`}>
                                        {selectedAddressId === addr.id && <div className="size-2.5 rounded-full bg-primary" />}
                                    </div>
                                    <div>
                                        <span className="text-xs font-black uppercase tracking-widest bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded text-gray-600 dark:text-gray-300">{addr.tag}</span>
                                        <p className="text-sm font-bold mt-1">{addr.line1}</p>
                                        <p className="text-xs text-gray-500">{addr.line2}, {addr.city} - {addr.pincode}</p>
                                    </div>
                                </div>
                            )) : (
                                <div onClick={() => router.push('/profile/addresses')} className="p-6 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-700 flex flex-col items-center justify-center gap-2 text-gray-500 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                                    <span className="material-symbols-outlined text-3xl">add_location_alt</span>
                                    <span className="text-sm font-bold">Add Service Address</span>
                                </div>
                            )}
                        </div>
                    </section>
                )}

                {/* Bill Details */}
                <section className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <h3 className="text-sm font-bold mb-4">Payment Summary</h3>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between text-gray-500 dark:text-gray-400">
                            <span>Service Cost</span>
                            <span>₹{basePrice}</span>
                        </div>
                        {isHomeVisit && (
                            <div className="flex justify-between text-gray-500 dark:text-gray-400">
                                <span>Home Visit Fee</span>
                                <span>₹{visitFee}</span>
                            </div>
                        )}
                        <div className="flex justify-between text-gray-500 dark:text-gray-400">
                            <span>Taxes & Fees</span>
                            <span>₹18</span>
                        </div>
                        <div className="h-px bg-gray-100 dark:bg-gray-700 my-2"></div>
                        <div className="flex justify-between font-black text-lg">
                            <span>Total Pay</span>
                            <span>₹{totalAmount + 18}</span>
                        </div>
                    </div>
                </section>
            </main>

            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 z-40 pb-6 shadow-[0_-4px_20px_-4px_rgba(0,0,0,0.05)]">
                <div className="max-w-lg mx-auto">
                    <button
                        onClick={handleConfirm}
                        disabled={bookingLoading}
                        className="w-full h-14 bg-primary hover:bg-primary-dark disabled:opacity-50 text-white rounded-xl text-lg font-bold shadow-lg shadow-primary/30 flex items-center justify-center gap-2 active:scale-95 transition-all"
                    >
                        {bookingLoading ? (
                            <><span className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></span> Booking...</>
                        ) : (
                            'Confirm Booking'
                        )}
                    </button>
                    {bookingError && (
                        <p className="text-xs text-red-500 font-bold mt-2 text-center">{bookingError}</p>
                    )}
                </div>
            </div>
        </div>
    );
}
