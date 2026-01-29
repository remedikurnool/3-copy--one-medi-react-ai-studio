
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function OrderSuccess() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col items-center justify-center p-6 text-center">
      <div className="size-24 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-6 animate-in zoom-in duration-500">
        <span className="material-symbols-outlined text-5xl text-green-600 dark:text-green-400">check_circle</span>
      </div>
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Order Placed Successfully!</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-xs mx-auto">
        Your order #OM-88392 has been confirmed and will be delivered shortly.
      </p>
      
      <div className="w-full max-w-xs flex flex-col gap-3">
        <button 
          onClick={() => navigate('/bookings')}
          className="w-full h-12 bg-primary hover:bg-primary-dark text-white rounded-xl font-bold shadow-lg shadow-primary/30 transition-all active:scale-95"
        >
          Track Order
        </button>
        <button 
          onClick={() => navigate('/')}
          className="w-full h-12 bg-gray-100 dark:bg-gray-800 text-slate-900 dark:text-white rounded-xl font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
