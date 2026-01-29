import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthProvider';
import { useBookings, useActiveBookings } from '../hooks';
import { NoBookingsState } from '../components/ui/EmptyState';

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
   const getStatusColor = (status: string) => {
      switch (status) {
         case 'confirmed': return 'bg-green-100 text-green-700';
         case 'pending': return 'bg-yellow-100 text-yellow-700';
         case 'in_progress': return 'bg-blue-100 text-blue-700';
         case 'completed': return 'bg-gray-100 text-gray-600';
         case 'cancelled': return 'bg-red-100 text-red-700';
         default: return 'bg-gray-100 text-gray-600';
      }
   };

   const getStatusLabel = (status: string) => {
      return status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
   };

   const formatDate = (dateStr: string) => {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-IN', {
         day: 'numeric',
         month: 'short',
         year: 'numeric'
      });
   };

   return (
      <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col gap-3">
         <div className="flex justify-between items-start">
            <div className="flex gap-3">
               <div className="size-12 rounded-xl bg-gray-50 dark:bg-gray-700 flex items-center justify-center border border-gray-100 dark:border-gray-600 shrink-0">
                  <span className="material-symbols-outlined text-gray-400">event</span>
               </div>
               <div>
                  <h3 className="font-bold text-slate-900 dark:text-white leading-tight">
                     Booking #{booking.id.slice(0, 8)}
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                     {booking.notes || 'Service booking'}
                  </p>
               </div>
            </div>
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${getStatusColor(booking.fulfillment_status)}`}>
               {getStatusLabel(booking.fulfillment_status)}
            </span>
         </div>

         <div className="h-px bg-gray-100 dark:bg-gray-700 w-full"></div>

         <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-300 font-medium">
               <span className="material-symbols-outlined text-lg">schedule</span>
               {formatDate(booking.booking_date)}
               {booking.booking_time && (
                  <span className="text-gray-400 ml-1">at {booking.booking_time}</span>
               )}
            </div>
         </div>

         <div className="flex gap-2 mt-1">
            <button className="flex-1 py-2 rounded-lg border border-gray-200 dark:border-gray-600 text-xs font-bold hover:bg-gray-50 dark:hover:bg-gray-700">
               View Details
            </button>
            <button className="flex-1 py-2 rounded-lg bg-primary/10 text-primary text-xs font-bold hover:bg-primary/20">
               Track / Help
            </button>
         </div>
      </div>
   );
};

// Loading skeleton for bookings
const BookingSkeleton = () => (
   <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 animate-pulse">
      <div className="flex gap-3 mb-4">
         <div className="size-12 rounded-xl bg-gray-200 dark:bg-gray-700"></div>
         <div className="flex-1">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
         </div>
      </div>
      <div className="h-px bg-gray-100 dark:bg-gray-700 w-full my-3"></div>
      <div className="flex gap-2">
         <div className="flex-1 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
         <div className="flex-1 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
      </div>
   </div>
);

export default function Bookings() {
   const [activeTab, setActiveTab] = useState('upcoming');
   const navigate = useNavigate();
   const { user } = useAuth();

   // Fetch all bookings for the user
   const { data: allBookings, loading, error, refetch } = useBookings(user?.id);

   // Filter bookings by active status
   const upcomingBookings = allBookings?.filter(b =>
      ['pending', 'confirmed', 'in_progress'].includes(b.fulfillment_status)
   ) || [];

   const historyBookings = allBookings?.filter(b =>
      ['completed', 'cancelled'].includes(b.fulfillment_status)
   ) || [];

   return (
      <div className="min-h-screen bg-bg-light dark:bg-bg-dark pb-24">
         <header className="sticky top-0 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 p-4">
            <h1 className="text-2xl font-bold mb-4">My Bookings</h1>
            <div className="flex p-1 bg-gray-100 dark:bg-gray-800 rounded-xl">
               <button
                  onClick={() => setActiveTab('upcoming')}
                  className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'upcoming' ? 'bg-white dark:bg-gray-700 shadow-sm text-primary' : 'text-gray-500'}`}
               >
                  Upcoming {upcomingBookings.length > 0 && `(${upcomingBookings.length})`}
               </button>
               <button
                  onClick={() => setActiveTab('history')}
                  className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'history' ? 'bg-white dark:bg-gray-700 shadow-sm text-primary' : 'text-gray-500'}`}
               >
                  History {historyBookings.length > 0 && `(${historyBookings.length})`}
               </button>
            </div>
         </header>

         <div className="p-4 flex flex-col gap-4">
            {loading ? (
               <>
                  <BookingSkeleton />
                  <BookingSkeleton />
                  <BookingSkeleton />
               </>
            ) : error ? (
               <div className="text-center py-10 text-red-500">
                  <span className="material-symbols-outlined text-4xl mb-2">error</span>
                  <p>Failed to load bookings. <button onClick={refetch} className="text-primary underline">Retry</button></p>
               </div>
            ) : activeTab === 'upcoming' ? (
               upcomingBookings.length > 0 ? (
                  upcomingBookings.map(booking => (
                     <BookingCard key={booking.id} booking={booking} />
                  ))
               ) : (
                  <NoBookingsState />
               )
            ) : (
               historyBookings.length > 0 ? (
                  historyBookings.map(booking => (
                     <BookingCard key={booking.id} booking={booking} />
                  ))
               ) : (
                  <div className="text-center py-10 text-gray-400">
                     <span className="material-symbols-outlined text-4xl mb-2">history</span>
                     <p>No past bookings found.</p>
                  </div>
               )
            )}
         </div>
      </div>
   );
}
