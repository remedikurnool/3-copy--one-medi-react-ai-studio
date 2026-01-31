'use client';

import React, { useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../components/AuthProvider';
import { useBookings } from '../../hooks';
import { motion, AnimatePresence } from 'framer-motion';

interface BookingCardProps {
    booking: {
        id: string;
        service_catalog_id: string;
        vendor_id?: string;
        booking_date: string;
        booking_time?: string;
        fulfillment_status: string;
        notes?: string;
        created_at: string;
    };
}

const BookingCard: React.FC<BookingCardProps> = ({ booking }) => {
    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'confirmed': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200/50';
            case 'pending': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200/50';
            case 'in_progress': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200/50';
            case 'completed': return 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 border-slate-200/50';
            case 'cancelled': return 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 border-red-100/50';
            default: return 'bg-gray-100 text-gray-600';
        }
    };

    const getStatusLabel = (status: string) => {
        return status.replace('_', ' ');
    };

    const formatDate = (dateStr: string) => {
        if (!dateStr) return 'N/A';
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) return 'Invalid';
        return date.toLocaleDateString(undefined, {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -2 }}
            className="bg-white dark:bg-gray-800 p-5 rounded-[2rem] shadow-sm hover:shadow-card-hover border border-slate-100 dark:border-slate-800/50 flex flex-col gap-4 group transition-shadow"
        >
            <div className="flex justify-between items-start">
                <div className="flex gap-4">
                    <div className="size-12 rounded-2xl bg-slate-50 dark:bg-slate-700/50 flex items-center justify-center border border-slate-100 dark:border-slate-700 shrink-0 group-hover:scale-105 transition-transform">
                        <span className="material-symbols-outlined text-slate-400 dark:text-slate-300">event_available</span>
                    </div>
                    <div>
                        <h3 className="font-black text-slate-900 dark:text-white leading-tight uppercase tracking-wide text-sm">
                            #{booking.id.slice(0, 8)}
                        </h3>
                        <p className="text-xs font-medium text-slate-500 mt-1 line-clamp-1">
                            {booking.notes || 'General Consultation'}
                        </p>
                    </div>
                </div>
                <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border ${getStatusStyle(booking.fulfillment_status)}`}>
                    {getStatusLabel(booking.fulfillment_status)}
                </span>
            </div>

            <div className="flex items-center gap-2 text-sm bg-slate-50 dark:bg-slate-700/30 p-3 rounded-xl border border-dashed border-slate-200 dark:border-slate-700">
                <span className="material-symbols-outlined text-slate-400">calendar_month</span>
                <span className="font-bold text-slate-700 dark:text-slate-200">
                    {formatDate(booking.booking_date)}
                </span>
                {booking.booking_time && (
                    <>
                        <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                        <span className="text-slate-500 dark:text-slate-400 font-medium">{booking.booking_time}</span>
                    </>
                )}
            </div>

            <div className="flex gap-3 mt-1">
                <button className="flex-1 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-slate-600 dark:text-slate-300">
                    Details
                </button>
                <button className="flex-1 py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[10px] font-black uppercase tracking-widest shadow-lg hover:opacity-90 active:scale-95 transition-all">
                    Track Status
                </button>
            </div>
        </motion.div>
    );
};

const BookingSkeleton = () => (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-800 animate-pulse">
        <div className="flex gap-4 mb-4">
            <div className="size-12 rounded-2xl bg-slate-100 dark:bg-slate-700"></div>
            <div className="flex-1 space-y-2">
                <div className="h-4 bg-slate-100 dark:bg-slate-700 rounded w-1/3"></div>
                <div className="h-3 bg-slate-100 dark:bg-slate-700 rounded w-1/2"></div>
            </div>
        </div>
        <div className="h-12 bg-slate-100 dark:bg-slate-700 rounded-xl mb-4"></div>
        <div className="flex gap-3">
            <div className="flex-1 h-10 bg-slate-100 dark:bg-slate-700 rounded-xl"></div>
            <div className="flex-1 h-10 bg-slate-100 dark:bg-slate-700 rounded-xl"></div>
        </div>
    </div>
);

function BookingsContent() {
    const [activeTab, setActiveTab] = useState('upcoming');
    const router = useRouter();
    const { user } = useAuth();
    const { data: allBookings, loading, error, refetch } = useBookings(user?.id);

    const upcomingBookings = allBookings?.filter(b =>
        ['pending', 'confirmed', 'in_progress'].includes(b.fulfillment_status)
    ) || [];

    const historyBookings = allBookings?.filter(b =>
        ['completed', 'cancelled'].includes(b.fulfillment_status)
    ) || [];

    return (
        <div className="min-h-screen bg-bg-light dark:bg-bg-dark pb-24 font-sans text-slate-900 dark:text-white">
            <header className="sticky top-0 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-slate-100 dark:border-gray-800 p-4 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                    <button onClick={() => router.back()} className="size-10 rounded-full bg-slate-50 dark:bg-gray-800 flex items-center justify-center hover:bg-slate-100 transition-colors">
                        <span className="material-symbols-outlined text-slate-600 dark:text-slate-300">arrow_back</span>
                    </button>
                    <h1 className="text-xl font-black uppercase tracking-tight">My Bookings</h1>
                </div>

                <div className="flex p-1.5 bg-slate-100 dark:bg-gray-800 rounded-2xl">
                    <button
                        onClick={() => setActiveTab('upcoming')}
                        className={`flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'upcoming' ? 'bg-white dark:bg-gray-700 shadow-md text-primary scale-[1.02]' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                        Upcoming {upcomingBookings.length > 0 && `(${upcomingBookings.length})`}
                    </button>
                    <button
                        onClick={() => setActiveTab('history')}
                        className={`flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'history' ? 'bg-white dark:bg-gray-700 shadow-md text-primary scale-[1.02]' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                        History {historyBookings.length > 0 && `(${historyBookings.length})`}
                    </button>
                </div>
            </header>

            <div className="p-4 flex flex-col gap-4 max-w-lg mx-auto w-full">
                {loading ? (
                    <>
                        <BookingSkeleton />
                        <BookingSkeleton />
                        <BookingSkeleton />
                    </>
                ) : error ? (
                    <div className="text-center py-20 opacity-50">
                        <span className="material-symbols-outlined text-5xl mb-2 text-red-400">wifi_off</span>
                        <p className="font-bold text-sm">Connection Error</p>
                        <button onClick={refetch} className="text-primary text-xs font-black uppercase tracking-wider mt-4 hover:underline">Retry</button>
                    </div>
                ) : (
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="flex flex-col gap-4"
                        >
                            {activeTab === 'upcoming' ? (
                                upcomingBookings.length > 0 ? (
                                    upcomingBookings.map(booking => (
                                        <BookingCard key={booking.id} booking={booking} />
                                    ))
                                ) : (
                                    <div className="text-center py-20 opacity-50">
                                        <span className="material-symbols-outlined text-6xl mb-4 text-slate-300">event_busy</span>
                                        <p className="font-bold text-sm">No upcoming bookings</p>
                                        <p className="text-xs mt-1 max-w-[200px] mx-auto">Your schedule is clear. Book a service to get started.</p>
                                    </div>
                                )
                            ) : (
                                historyBookings.length > 0 ? (
                                    historyBookings.map(booking => (
                                        <BookingCard key={booking.id} booking={booking} />
                                    ))
                                ) : (
                                    <div className="text-center py-20 opacity-50">
                                        <span className="material-symbols-outlined text-6xl mb-4 text-slate-300">history</span>
                                        <p className="font-bold text-sm">No booking history</p>
                                    </div>
                                )
                            )}
                        </motion.div>
                    </AnimatePresence>
                )}
            </div>
        </div>
    );
}

export default function BookingsPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-bg-light dark:bg-bg-dark flex items-center justify-center">
                <span className="material-symbols-outlined text-4xl text-slate-300 animate-spin">sync</span>
            </div>
        }>
            <BookingsContent />
        </Suspense>
    );
}
