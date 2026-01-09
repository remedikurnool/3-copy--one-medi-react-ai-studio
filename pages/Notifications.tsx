
import React from 'react';
import { useNavigate } from 'react-router-dom';

const NOTIFICATIONS = [
  { id: 1, title: 'Order Delivered', message: 'Your medicine order has been delivered successfully.', time: '2 hours ago', icon: 'local_shipping', color: 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400' },
  { id: 2, title: 'Appointment Reminder', message: 'Reminder: Dr. Ramesh Gupta at 4:30 PM today.', time: '5 hours ago', icon: 'event', color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400' },
  { id: 3, title: 'Flash Sale Alert', message: 'Flat 20% OFF on all diabetic care products. Limited time!', time: '1 day ago', icon: 'local_offer', color: 'bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400' },
];

export default function Notifications() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark text-slate-900 dark:text-white pb-20 font-sans">
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="size-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <span className="material-symbols-outlined text-[24px]">arrow_back</span>
        </button>
        <h1 className="text-lg font-bold">Notifications</h1>
      </header>

      <main className="p-4 flex flex-col gap-3">
        {NOTIFICATIONS.map((n) => (
          <div key={n.id} className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex gap-4">
            <div className={`size-12 rounded-xl flex items-center justify-center shrink-0 ${n.color}`}>
              <span className="material-symbols-outlined">{n.icon}</span>
            </div>
            <div>
              <h3 className="font-bold text-sm">{n.title}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">{n.message}</p>
              <p className="text-[10px] text-gray-400 mt-2">{n.time}</p>
            </div>
          </div>
        ))}
        {NOTIFICATIONS.length === 0 && (
            <div className="text-center py-20 text-gray-400">
                <span className="material-symbols-outlined text-4xl mb-2">notifications_off</span>
                <p>No new notifications</p>
            </div>
        )}
      </main>
    </div>
  );
}
