
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BOOKINGS } from '../constants';

const BookingCard: React.FC<{ booking: any }> = ({ booking }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed': return 'bg-green-100 text-green-700';
      case 'Shipped': return 'bg-blue-100 text-blue-700';
      case 'Scheduled': return 'bg-purple-100 text-purple-700';
      case 'Completed': return 'bg-gray-100 text-gray-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'doctor': return 'stethoscope';
      case 'medicine': return 'medication';
      case 'lab': return 'science';
      default: return 'event';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col gap-3">
       <div className="flex justify-between items-start">
          <div className="flex gap-3">
             <div className="size-12 rounded-xl bg-gray-50 flex items-center justify-center border border-gray-100 shrink-0">
               {booking.image && !booking.image.includes('flaticon') ? (
                 <img src={booking.image} className="w-full h-full object-cover rounded-xl" alt="" />
               ) : (
                 <span className="material-symbols-outlined text-gray-400">{getIcon(booking.type)}</span>
               )}
             </div>
             <div>
                <h3 className="font-bold text-slate-900 dark:text-white leading-tight">{booking.title}</h3>
                <p className="text-xs text-gray-500 mt-0.5">{booking.subtitle}</p>
             </div>
          </div>
          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${getStatusColor(booking.status)}`}>{booking.status}</span>
       </div>
       
       <div className="h-px bg-gray-100 dark:bg-gray-700 w-full"></div>
       
       <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-300 font-medium">
             <span className="material-symbols-outlined text-lg">schedule</span>
             {booking.date}
          </div>
          <div className="font-bold">₹{booking.amount}</div>
       </div>

       <div className="flex gap-2 mt-1">
          <button className="flex-1 py-2 rounded-lg border border-gray-200 dark:border-gray-600 text-xs font-bold hover:bg-gray-50 dark:hover:bg-gray-700">View Details</button>
          <button className="flex-1 py-2 rounded-lg bg-primary/10 text-primary text-xs font-bold hover:bg-primary/20">Track / Help</button>
       </div>
    </div>
  );
};

export default function Bookings() {
  const [activeTab, setActiveTab] = useState('upcoming');
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark pb-24">
       <header className="sticky top-0 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 p-4">
          <h1 className="text-2xl font-bold mb-4">My Bookings</h1>
          <div className="flex p-1 bg-gray-100 dark:bg-gray-800 rounded-xl">
             <button 
               onClick={() => setActiveTab('upcoming')}
               className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'upcoming' ? 'bg-white dark:bg-gray-700 shadow-sm text-primary' : 'text-gray-500'}`}
             >
               Upcoming
             </button>
             <button 
               onClick={() => setActiveTab('history')}
               className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'history' ? 'bg-white dark:bg-gray-700 shadow-sm text-primary' : 'text-gray-500'}`}
             >
               History
             </button>
          </div>
       </header>

       <div className="p-4 flex flex-col gap-4">
          {activeTab === 'upcoming' ? (
             <>
                {BOOKINGS.filter(b => b.status !== 'Completed').map(booking => (
                   <BookingCard key={booking.id} booking={booking} />
                ))}
             </>
          ) : (
             <>
                {BOOKINGS.filter(b => b.status === 'Completed').map(booking => (
                   <BookingCard key={booking.id} booking={booking} />
                ))}
                {BOOKINGS.filter(b => b.status === 'Completed').length === 0 && (
                   <div className="text-center py-10 text-gray-400">
                      <span className="material-symbols-outlined text-4xl mb-2">history</span>
                      <p>No past bookings found.</p>
                   </div>
                )}
             </>
          )}
       </div>
    </div>
  );
}
