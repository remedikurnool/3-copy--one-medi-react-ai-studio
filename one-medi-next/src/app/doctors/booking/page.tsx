'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDoctor, useDoctorBooking } from '../../../hooks';
import { supabase } from '../../../lib/supabase';

function DoctorBookingContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const doctorId = searchParams.get('doctorId');
    const variantType = searchParams.get('variantType');
    const variantPrice = searchParams.get('variantPrice');
    const variantIcon = searchParams.get('variantIcon');
    // prescription logic if needed, currently not used in booking API explicitly but maybe needed?

    const [selectedDate, setSelectedDate] = useState<string>('');
    const [selectedTime, setSelectedTime] = useState('11:30 AM');
    const [bookingError, setBookingError] = useState<string | null>(null);

    const { data: doctor, loading, error } = useDoctor(doctorId || undefined);
    const { bookDoctorAppointment, loading: bookingLoading, error: bookingHookError } = useDoctorBooking();

    // Reconstruct variant from URL params or fallback
    const currentVariant = {
        price: variantPrice ? parseFloat(variantPrice) : (doctor?.fee || 500),
        type: variantType || 'Clinic Visit',
        icon: variantIcon || 'apartment'
    };

    const timeSlots = ['10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '06:00 PM', '06:30 PM'];

    // Generate next 3 dates with full date info
    const getDates = () => {
        const dates = [];
        const today = new Date();
        for (let i = 0; i < 3; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            const day = date.toLocaleDateString('en-US', { weekday: 'short' });
            const num = date.getDate();
            const isoDate = date.toISOString().split('T')[0]; // YYYY-MM-DD format
            dates.push({ display: `${day}, ${num}`, iso: isoDate });
        }
        return dates;
    };

    const dates = getDates();

    // Initialize selectedDate to first date if not set
    useEffect(() => {
        if (!selectedDate && dates.length > 0) {
            setSelectedDate(dates[0].iso);
        }
    }, []);

    // Handle booking confirmation
    const handleConfirmBooking = async () => {
        setBookingError(null);

        // Get current user
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            setBookingError('Please login to book an appointment');
            router.push('/login?redirect=/doctors/booking'); // Improve auth flow later
            return;
        }

        if (!doctorId) {
            setBookingError('Invalid doctor selection');
            return;
        }

        if (!selectedDate || !selectedTime) {
            setBookingError('Please select date and time');
            return;
        }

        // Determine consultation type from variant
        const consultationType = currentVariant.type?.toLowerCase().includes('video') ? 'video'
            : currentVariant.type?.toLowerCase().includes('home') ? 'home'
                : 'clinic';

        const booking = await bookDoctorAppointment(
            user.id,
            doctorId,
            selectedDate,
            selectedTime,
            consultationType as 'clinic' | 'video' | 'home'
        );

        if (booking) {
            // Use URL param for success state or creating a dedicated success page
            router.push(`/bookings?newBookingId=${booking.id}`);
        } else {
            setBookingError(bookingHookError || 'Failed to create booking');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-bg-light dark:bg-bg-dark flex items-center justify-center">
                <div className="animate-spin rounded-full h-10 w-10 border-2 border-primary border-t-transparent"></div>
            </div>
        );
    }

    if (error || !doctor) {
        return (
            <div className="min-h-screen bg-bg-light dark:bg-bg-dark flex flex-col items-center justify-center text-center p-6 font-sans text-slate-900 dark:text-white">
                <span className="material-symbols-outlined text-4xl text-gray-300 mb-2">person_off</span>
                <h2 className="text-xl font-bold">Doctor Not Found</h2>
                <p className="text-sm text-gray-500 mt-1">Please select a doctor from the list.</p>
                <button onClick={() => router.push('/doctors')} className="mt-4 text-primary font-bold">Browse Doctors</button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-bg-light dark:bg-bg-dark font-sans text-slate-900 dark:text-white pb-32">
            <div className="relative flex flex-col max-w-md mx-auto bg-white dark:bg-gray-900 shadow-xl min-h-screen">
                {/* TopAppBar */}
                <div className="sticky top-0 z-20 flex items-center bg-white dark:bg-gray-900 p-4 pb-2 justify-between border-b border-gray-200 dark:border-gray-800">
                    <button
                        onClick={() => router.back()}
                        className="flex size-12 shrink-0 items-center justify-start cursor-pointer text-slate-900 dark:text-white hover:opacity-70 transition-opacity"
                    >
                        <span className="material-symbols-outlined text-[24px]">arrow_back</span>
                    </button>
                    <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">Review Booking</h2>
                </div>

                {/* Doctor Summary */}
                <div className="p-4 bg-white dark:bg-gray-900">
                    <div className="flex gap-4 items-center p-3 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm">
                        <div
                            className="size-16 rounded-xl bg-gray-200 bg-cover bg-center shrink-0"
                            style={{ backgroundImage: `url("${doctor.image || 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=200&h=200'}")` }}
                        ></div>
                        <div>
                            <h3 className="font-bold text-lg leading-tight">{doctor.name}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{doctor.specialty}</p>
                            <div className="flex items-center gap-1 text-xs font-bold text-primary mt-1">
                                <span className="material-symbols-outlined text-[14px]">{currentVariant.icon}</span>
                                {currentVariant.type}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Date & Time Selection */}
                <div className="flex flex-col px-4 pt-2">
                    <h3 className="text-lg font-bold leading-tight pb-3">Select Slot</h3>
                    <div className="flex gap-3 overflow-x-auto no-scrollbar pb-4">
                        {dates.map((d, i) => (
                            <button
                                key={i}
                                onClick={() => setSelectedDate(d.iso)}
                                className={`flex flex-col items-center justify-center min-w-[70px] h-[70px] rounded-xl border-2 transition-all ${selectedDate === d.iso ? 'border-primary bg-blue-50 dark:bg-blue-900/20 text-primary' : 'border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800'}`}
                            >
                                <span className="text-xs font-bold">{d.display.split(',')[0]}</span>
                                <span className="text-xl font-bold">{d.display.split(',')[1]}</span>
                            </button>
                        ))}
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                        {timeSlots.map(t => (
                            <button
                                key={t}
                                onClick={() => setSelectedTime(t)}
                                className={`py-2 rounded-lg text-sm font-bold border transition-all ${selectedTime === t ? 'bg-primary text-white border-primary' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-primary/50'}`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Fee Breakdown */}
                <div className="p-4 mt-4">
                    <h3 className="text-lg font-bold leading-tight pb-3">Bill Details</h3>
                    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Consultation Fee</span>
                            <span className="font-bold">₹{currentVariant.price}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Service Fee</span>
                            <span className="font-bold text-green-600">FREE</span>
                        </div>
                        <div className="h-px bg-gray-100 dark:bg-gray-700 my-1"></div>
                        <div className="flex justify-between text-base font-bold">
                            <span>Total Pay</span>
                            <span>₹{currentVariant.price}</span>
                        </div>
                    </div>
                </div>

                {/* Error Message */}
                {bookingError && (
                    <div className="mx-4 mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                        <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-2">
                            <span className="material-symbols-outlined text-lg">error</span>
                            {bookingError}
                        </p>
                    </div>
                )}

                {/* Footer */}
                <div className="fixed bottom-0 w-full max-w-md bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 p-4 pb-6 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
                    <button
                        onClick={handleConfirmBooking}
                        disabled={bookingLoading}
                        className="w-full h-14 bg-primary hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl text-lg font-bold shadow-lg shadow-primary/30 flex items-center justify-center gap-2 active:scale-95 transition-all"
                    >
                        {bookingLoading ? (
                            <>
                                <span className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></span>
                                Booking...
                            </>
                        ) : (
                            'Confirm Booking'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function DoctorBookingPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-bg-light dark:bg-bg-dark flex items-center justify-center"><div className="animate-spin rounded-full h-10 w-10 border-2 border-primary border-t-transparent"></div></div>}>
            <DoctorBookingContent />
        </Suspense>
    );
}
